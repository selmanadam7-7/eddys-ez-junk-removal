'use client'


import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { BUSINESS, SERVICES, CITIES, LOAD_SIZES, STAIRS } from '@/lib/business'

import { Btn, BtnLink, Phone, Check, Arrow, Stars } from './ui'

const ITEMS = [
  'Furniture & mattresses',
  'Appliances',
  'Bagged trash',
  'Boxes & clutter',
  'Yard waste & brush',
  'Construction debris',
  'Scrap metal',
  'Electronics',
  'Hot tub / shed / playset',
  'A vehicle',
]

const STORAGE_KEY = 'eddys-booking-draft'

type Draft = {
  step: number
  job: string
  items: string[]
  size: string
  stairs: string
  address: string
  town: string
  timing: string
  date: string
  name: string
  phone: string
  notes: string
}

const EMPTY: Draft = {
  step: 0,
  job: '',
  items: [],
  size: '',
  stairs: STAIRS[0],
  address: '',
  town: '',
  timing: 'As soon as possible',
  date: '',
  name: '',
  phone: '',
  notes: '',
}

const STEPS = ['The job', 'How much', 'Where', 'When', 'Your info'] as const

/* ---- Saved-draft store, read through useSyncExternalStore so it stays
   hydration-safe and never needs a setState inside an effect. ---- */

let draftVersion = 0
const listeners = new Set<() => void>()

function bumpDraft() {
  draftVersion++
  listeners.forEach((l) => l())
}

function subscribeDraft(cb: () => void) {
  listeners.add(cb)
  window.addEventListener('storage', cb)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', cb)
  }
}

let cachedKey = -1
let cachedDraft: Draft | null = null

function getDraft(): Draft | null {
  if (cachedKey === draftVersion) return cachedDraft
  cachedKey = draftVersion
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    cachedDraft = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Draft>), step: 0 } : null
  } catch {
    cachedDraft = null
  }
  return cachedDraft
}

/** The server has no localStorage, so it always renders "no draft". */
const getServerDraft = () => null

function isMeaningful(d: Draft | null) {
  return !!d && (d.job !== '' || d.items.length > 0 || d.name !== '' || d.town !== '')
}

export default function BookingForm() {
  const [d, setD] = useState<Draft>(EMPTY)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [dismissedDraft, setDismissedDraft] = useState(false)
  const [touched, setTouched] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const saved = useSyncExternalStore(subscribeDraft, getDraft, getServerDraft)
  const showResume = !touched && !dismissedDraft && isMeaningful(saved)

  // Persist as they go, so a dropped call or a closed tab doesn't lose the job.
  useEffect(() => {
    if (!touched) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(d))
    } catch {}
  }, [d, touched])

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setTouched(true)
    setD((p) => ({ ...p, [k]: v }))
  }

  const toggleItem = (item: string) => {
    setTouched(true)
    setD((p) => ({
      ...p,
      items: p.items.includes(item) ? p.items.filter((i) => i !== item) : [...p.items, item],
    }))
  }

  const resume = () => {
    if (!saved) return
    setTouched(true)
    setD(saved)
  }

  const discardDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    bumpDraft()
    setDismissedDraft(true)
  }

  const canAdvance = useMemo(() => {
    switch (d.step) {
      case 0:
        return d.job !== '' || d.items.length > 0
      case 1:
        return d.size !== ''
      case 2:
        return d.town.trim() !== ''
      case 3:
        return d.timing !== '' && (d.timing !== 'Pick a date' || d.date !== '')
      case 4:
        return d.name.trim().length > 1 && d.phone.replace(/\D/g, '').length >= 10
      default:
        return false
    }
  }, [d])

  const summary = useMemo(() => {
    const size = LOAD_SIZES.find((s) => s.id === d.size)
    const lines = [
      `Junk removal request — ${d.name || 'name'}`,
      '',
      `Job: ${d.job || 'General junk removal'}`,
      d.items.length ? `Items: ${d.items.join(', ')}` : '',
      size ? `Size: ${size.label} (${size.truck})` : '',
      `Stairs: ${d.stairs}`,
      `Where: ${[d.address, d.town].filter(Boolean).join(', ')}`,
      `When: ${d.timing === 'Pick a date' && d.date ? d.date : d.timing}`,
      d.notes ? `Notes: ${d.notes}` : '',
      '',
      `Call me back at ${d.phone}`,
    ]
    return lines.filter((l) => l !== '').join('\n')
  }, [d])

  const smsHref = useMemo(() => {
    const body = encodeURIComponent(summary)
    // iOS wants &body=, most Android builds want ?body=. This form satisfies both.
    return `sms:+14436234488${/iP(hone|ad|od)|Mac/.test(
      typeof navigator === 'undefined' ? '' : navigator.userAgent
    )
      ? '&'
      : '?'}body=${body}`
  }, [summary])

  const goto = (n: number) => {
    set('step', n)
    topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const submit = () => {
    setSent(true)
    topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {}
  }

  if (sent) return <Sent summary={summary} smsHref={smsHref} copy={copy} copied={copied} onEdit={() => { setSent(false); goto(4) }} />

  const size = LOAD_SIZES.find((s) => s.id === d.size)

  return (
    <div ref={topRef} className="scroll-mt-28">
      {showResume && (
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 border border-acid/40 bg-acid/[0.05] px-4 py-3">
          <p className="flex-1 text-sm text-chrome">
            You started a request earlier
            {saved?.job ? ` for ${saved.job.toLowerCase()}` : ''}. Want to pick it back up?
          </p>
          <button
            type="button"
            onClick={resume}
            className="font-display text-xs font-extrabold uppercase tracking-tight text-acid hover:text-acid-bright"
          >
            Resume
          </button>
          <button
            type="button"
            onClick={discardDraft}
            className="text-xs font-semibold text-slate hover:text-chrome"
          >
            Start fresh
          </button>
        </div>
      )}

      {/* Progress */}
      <ol className="mb-8 flex gap-1.5" aria-label="Booking progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <button
              type="button"
              disabled={i > d.step}
              onClick={() => goto(i)}
              className="group block w-full text-left disabled:cursor-default"
            >
              <span
                className={`block h-1 w-full transition-colors ${
                  i < d.step ? 'bg-acid-deep' : i === d.step ? 'bg-acid' : 'bg-iron'
                }`}
              />
              <span
                className={`mt-2 hidden text-[0.6875rem] font-semibold uppercase tracking-widest sm:block ${
                  i === d.step ? 'text-acid' : i < d.step ? 'text-ash' : 'text-slate'
                }`}
              >
                {label}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* Step 0 — the job */}
      {d.step === 0 && (
        <Step
          n="01"
          title="What are we hauling?"
          sub="Pick the closest match, then tag anything in the pile. If it is a mix, just check them all."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <Choice
                key={s.slug}
                selected={d.job === s.name}
                onClick={() => set('job', d.job === s.name ? '' : s.name)}
              >
                <span className="font-display text-sm font-extrabold uppercase tracking-tight">
                  {s.name}
                </span>
                <span className="mt-0.5 block text-xs text-ash">{s.short}</span>
              </Choice>
            ))}
          </div>

          <p className="eyebrow mt-8 mb-3 text-slate">What&rsquo;s in it?</p>
          <div className="flex flex-wrap gap-2">
            {ITEMS.map((item) => {
              const on = d.items.includes(item)
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleItem(item)}
                  className={`flex items-center gap-1.5 border px-3 py-2 text-[0.8125rem] font-medium transition-colors ${
                    on
                      ? 'border-acid bg-acid/10 text-acid'
                      : 'border-edge text-ash hover:border-slate hover:text-chrome'
                  }`}
                >
                  {on && <Check className="h-3 w-3" />}
                  {item}
                </button>
              )
            })}
          </div>
        </Step>
      )}

      {/* Step 1 — load size */}
      {d.step === 1 && (
        <Step
          n="02"
          title="Roughly how much is there?"
          sub="Junk removal is priced by the room your load takes up, not by the hour. A close guess is plenty — Eddy confirms the price on site before anything is loaded."
        >
          <div className="grid gap-2.5">
            {LOAD_SIZES.map((s) => {
              const on = d.size === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => set('size', s.id)}
                  className={`group flex items-center gap-4 border p-3.5 text-left transition-colors ${
                    on ? 'border-acid bg-acid/[0.06]' : 'border-edge hover:border-slate'
                  }`}
                >
                  <LoadGauge fill={s.fraction} active={on} />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-display text-base font-extrabold uppercase tracking-tight ${
                        on ? 'text-acid' : 'text-chrome'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-ash">{s.example}</span>
                  </span>
                  <span className="hidden shrink-0 text-right text-[0.6875rem] font-semibold uppercase tracking-widest text-slate sm:block">
                    {s.truck}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="mt-5 border-l-2 border-acid bg-coal py-3 pr-4 pl-4 text-xs leading-relaxed text-ash">
            Not sure? Take a photo of the pile and text it to{' '}
            <a href={BUSINESS.smsHref} className="font-semibold text-acid underline underline-offset-2">
              {BUSINESS.phone}
            </a>
            . Eddy will price it off the picture.
          </p>
        </Step>
      )}

      {/* Step 2 — where */}
      {d.step === 2 && (
        <Step n="03" title="Where is it?" sub="Street address helps, but the town is enough to get you a price.">
          <Field label="Town" required>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => set('town', c.name + ', VA')}
                  className={`border px-3 py-2 text-[0.8125rem] font-medium transition-colors ${
                    d.town === c.name + ', VA'
                      ? 'border-acid bg-acid/10 text-acid'
                      : 'border-edge text-ash hover:border-slate hover:text-chrome'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={d.town}
              onChange={(e) => set('town', e.target.value)}
              placeholder="Or type your town"
              className={inputCls + ' mt-3'}
            />
          </Field>

          <Field label="Street address" hint="Optional — helps us plan the route and the parking">
            <input
              type="text"
              value={d.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder="123 Main St"
              autoComplete="street-address"
              className={inputCls}
            />
          </Field>

          <Field label="Stairs" hint="So the right size crew shows up. It is not a surprise charge.">
            <div className="flex flex-wrap gap-2">
              {STAIRS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set('stairs', s)}
                  className={`border px-3 py-2 text-[0.8125rem] font-medium transition-colors ${
                    d.stairs === s
                      ? 'border-acid bg-acid/10 text-acid'
                      : 'border-edge text-ash hover:border-slate hover:text-chrome'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>
        </Step>
      )}

      {/* Step 3 — when */}
      {d.step === 3 && (
        <Step
          n="04"
          title="When do you need it gone?"
          sub={`We run ${BUSINESS.hours.days.toLowerCase()} from 6am to 11pm, and same-day and next-day are normal for us.`}
        >
          <div className="grid gap-2.5 sm:grid-cols-2">
            {['As soon as possible', 'Within a few days', 'Pick a date', 'Just getting a price'].map((t) => (
              <Choice key={t} selected={d.timing === t} onClick={() => set('timing', t)}>
                <span className="font-display text-sm font-extrabold uppercase tracking-tight">{t}</span>
                <span className="mt-0.5 block text-xs text-ash">
                  {t === 'As soon as possible'
                    ? 'Today or tomorrow if the trailer is free'
                    : t === 'Within a few days'
                      ? 'We will find a window that works'
                      : t === 'Pick a date'
                        ? 'Closings, lockouts, move-out deadlines'
                        : 'No pressure, no obligation'}
                </span>
              </Choice>
            ))}
          </div>

          {d.timing === 'Pick a date' && (
            <Field label="Which day?" required>
              <input
                type="date"
                value={d.date}
                onChange={(e) => set('date', e.target.value)}
                className={inputCls}
              />
            </Field>
          )}
        </Step>
      )}

      {/* Step 4 — contact */}
      {d.step === 4 && (
        <Step n="05" title="Where should Eddy call you back?" sub="Two fields. That is the whole form.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" required>
              <input
                type="text"
                value={d.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="First and last"
                autoComplete="name"
                className={inputCls}
              />
            </Field>
            <Field label="Mobile number" required>
              <input
                type="tel"
                inputMode="tel"
                value={d.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="(540) 555-0134"
                autoComplete="tel"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Anything else?" hint="Gate codes, a dog in the yard, the couch that will not fit the stairs">
            <textarea
              value={d.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={3}
              placeholder="Optional"
              className={inputCls + ' resize-y py-3'}
            />
          </Field>

          {/* Job ticket preview */}
          <div className="mt-6 border border-edge bg-coal">
            <div className="hazard h-1" aria-hidden />
            <div className="p-4">
              <p className="eyebrow mb-3 text-slate">Your job ticket</p>
              <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <Row k="Job" v={d.job || 'General junk removal'} />
                <Row k="Size" v={size ? `${size.label} — ${size.truck}` : '—'} />
                <Row k="Where" v={[d.address, d.town].filter(Boolean).join(', ') || '—'} />
                <Row k="Stairs" v={d.stairs} />
                <Row k="When" v={d.timing === 'Pick a date' && d.date ? d.date : d.timing} />
                <Row k="Items" v={d.items.length ? d.items.join(', ') : '—'} />
              </dl>
            </div>
          </div>
        </Step>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center gap-3">
        {d.step > 0 && (
          <Btn variant="outline" onClick={() => goto(d.step - 1)} type="button">
            Back
          </Btn>
        )}
        {d.step < STEPS.length - 1 ? (
          <Btn
            size="lg"
            className="flex-1 sm:flex-none"
            disabled={!canAdvance}
            onClick={() => goto(d.step + 1)}
            type="button"
          >
            Next
            <Arrow />
          </Btn>
        ) : (
          <Btn size="lg" className="flex-1 sm:flex-none" disabled={!canAdvance} onClick={submit} type="button">
            Send it to Eddy
            <Arrow />
          </Btn>
        )}
        <a
          href={BUSINESS.phoneHref}
          className="ml-auto hidden items-center gap-2 text-sm font-semibold text-ash transition-colors hover:text-acid sm:flex"
        >
          <Phone className="h-3.5 w-3.5" />
          Rather just call? {BUSINESS.phone}
        </a>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Sent({
  summary,
  smsHref,
  copy,
  copied,
  onEdit,
}: {
  summary: string
  smsHref: string
  copy: () => void
  copied: boolean
  onEdit: () => void
}) {
  return (
    <div className="scroll-mt-28">
      <div className="border border-acid/40 bg-acid/[0.05] p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center bg-acid text-ink">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="display mt-5 text-3xl text-chrome sm:text-4xl">One tap left</h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ash">
          Your job ticket is ready. Send it straight to Eddy&rsquo;s phone and he&rsquo;ll text or call
          you back with a price — usually within the hour during working hours.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <BtnLink href={smsHref} size="lg" className="flex-1">
            Text my job ticket
          </BtnLink>
          <BtnLink href={BUSINESS.phoneHref} variant="outline" size="lg" className="flex-1">
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phone}
          </BtnLink>
        </div>
      </div>

      <div className="mt-6 border border-edge bg-coal">
        <div className="flex items-center justify-between border-b border-edge px-4 py-3">
          <p className="eyebrow text-slate">Your job ticket</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="text-xs font-semibold text-ash transition-colors hover:text-acid"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
            <span className="text-edge">|</span>
            <button
              type="button"
              onClick={onEdit}
              className="text-xs font-semibold text-ash transition-colors hover:text-acid"
            >
              Edit
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto p-4 font-sans text-[0.8125rem] leading-relaxed whitespace-pre-wrap text-chrome">
          {summary}
        </pre>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate">
        <span className="flex items-center gap-1.5 text-acid">
          <Stars size={11} />
        </span>
        <span>
          {BUSINESS.rating.toFixed(1)} from {BUSINESS.reviewCount} reviews · Thumbtack Top Pro ·{' '}
          {BUSINESS.hires} jobs booked
        </span>
        <Link href="/reviews" className="text-ash underline underline-offset-2 hover:text-acid">
          Read them
        </Link>
      </div>
    </div>
  )
}

const inputCls =
  'w-full border border-edge bg-ink px-3.5 py-3 text-sm text-chrome placeholder:text-slate transition-colors focus:border-acid focus:outline-none'

function Step({
  n,
  title,
  sub,
  children,
}: {
  n: string
  title: string
  sub?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="eyebrow flex items-center gap-3 text-acid">
        <span className="inline-flex h-5 items-center bg-acid px-1.5 text-[0.625rem] text-ink">{n}</span>
      </p>
      <h2 className="display mt-3 text-3xl text-chrome sm:text-[2.5rem]">{title}</h2>
      {sub && <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">{sub}</p>}
      <div className="mt-7">{children}</div>
    </div>
  )
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border p-3.5 text-left transition-colors ${
        selected ? 'border-acid bg-acid/[0.06] text-acid' : 'border-edge text-chrome hover:border-slate'
      }`}
    >
      {children}
    </button>
  )
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="mt-5 block first:mt-0">
      <span className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-widest text-slate">
        {label}
        {required && <span className="ml-1 text-acid">*</span>}
      </span>
      {hint && <span className="mb-2 block text-xs text-ash">{hint}</span>}
      {children}
    </label>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-16 shrink-0 text-[0.6875rem] font-semibold uppercase tracking-widest text-slate">
        {k}
      </dt>
      <dd className="min-w-0 flex-1 text-chrome">{v}</dd>
    </div>
  )
}

/** A little dump-trailer fill gauge — reads instantly, and it is on-brand. */
function LoadGauge({ fill, active }: { fill: number; active: boolean }) {
  return (
    <span className="relative block h-12 w-16 shrink-0" aria-hidden>
      <svg viewBox="0 0 64 48" className="h-full w-full">
        <defs>
          <clipPath id={`bed-${Math.round(fill * 100)}`}>
            <rect x="6" y="14" width="46" height="20" />
          </clipPath>
        </defs>
        {/* load */}
        <rect
          x="6"
          y={34 - 20 * fill}
          width="46"
          height={20 * fill}
          clipPath={`url(#bed-${Math.round(fill * 100)})`}
          className={active ? 'fill-acid' : 'fill-iron'}
        />
        {/* trailer body */}
        <path
          d="M6 14v20h46V14"
          fill="none"
          className={active ? 'stroke-acid' : 'stroke-edge'}
          strokeWidth="2"
        />
        <path d="M6 34h48" fill="none" className={active ? 'stroke-acid' : 'stroke-edge'} strokeWidth="2" />
        <circle cx="18" cy="38" r="3.5" fill="none" className={active ? 'stroke-acid' : 'stroke-edge'} strokeWidth="2" />
        <circle cx="42" cy="38" r="3.5" fill="none" className={active ? 'stroke-acid' : 'stroke-edge'} strokeWidth="2" />
        <path d="M52 24h6" fill="none" className={active ? 'stroke-acid' : 'stroke-edge'} strokeWidth="2" />
      </svg>
    </span>
  )
}
