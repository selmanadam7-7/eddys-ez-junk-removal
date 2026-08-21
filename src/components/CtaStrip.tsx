import { BUSINESS } from '@/lib/business'
import { BtnLink, Arrow } from './ui'

export default function CtaStrip({
  title = 'Not sure which one you need?',
  body = `Text a photo of the pile to ${BUSINESS.phone} and Eddy will tell you what it is, what it costs, and when he can be there.`,
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="border-t border-edge bg-coal">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div>
          <h2 className="display text-3xl text-chrome sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">{body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <BtnLink href="/book" size="lg">
            Book a pickup
            <Arrow className="h-4 w-4" />
          </BtnLink>
          <BtnLink href={BUSINESS.smsHref} variant="outline" size="lg">
            Text a photo
          </BtnLink>
        </div>
      </div>
    </section>
  )
}
