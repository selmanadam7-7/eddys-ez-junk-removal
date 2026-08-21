/**
 * Single source of truth for everything about the business.
 * Sourced from the Google Business Profile and the Thumbtack Top Pro profile.
 */

export const BUSINESS = {
  name: "Eddy's EZ Junk Removal LLC",
  shortName: "Eddy's EZ",
  owner: 'Edward "Eddy" Vargas',
  tagline: 'Fast · Reliable · Affordable',
  phone: '(443) 623-4488',
  phoneRaw: '4436234488',
  phoneHref: 'tel:+14436234488',
  smsHref: 'sms:+14436234488',
  street: '201 Baker Dr',
  city: 'Luray',
  state: 'VA',
  zip: '22835',
  address: '201 Baker Dr, Luray, VA 22835',
  lat: 38.6653141,
  lng: -78.4934411,
  plusCode: 'MG84+4J Luray, Virginia',
  hours: { open: '6:00 AM', close: '11:00 PM', days: 'Every day' },
  hoursShort: 'Open every day, 6am–11pm',
  yearsInBusiness: 7,
  crewSize: 3,
  hires: 38,
  rating: 5.0,
  reviewCount: 25,
  googleReviewCount: 3,
  attributes: ['Family owned', 'Latino-owned', 'LGBTQ+ friendly', 'Background checked'],
  links: {
    google: 'https://maps.app.goo.gl/qKLxD9TY8iE9nivVA',
    thumbtack:
      'https://www.thumbtack.com/va/luray/junk-removal/eddys-ez-junk-removal-llc/service/579192283803926530',
  },
  payments: [
    'Cash',
    'Credit card',
    'Venmo',
    'Zelle',
    'Cash App',
    'PayPal',
    'Apple Pay',
    'Samsung Pay',
  ],
} as const

export type ServiceIcon =
  | 'truck'
  | 'hammer'
  | 'brick'
  | 'car'
  | 'sofa'
  | 'box'
  | 'leaf'
  | 'washer'

export type Service = {
  slug: string
  name: string
  short: string
  blurb: string
  hero: string
  icon: ServiceIcon
  takes: string[]
  photos: string[]
  faqs: { q: string; a: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: 'junk-removal',
    name: 'Junk Removal',
    short: 'Point at it. It’s gone.',
    blurb:
      'The everyday job. You show us the pile — in a basement, a garage, a spare room, a curb — and we carry it out, sweep up behind us, and haul it off. No renting a dumpster, no borrowing a truck, no four trips to the transfer station.',
    hero: 'basement-packed-a',
    icon: 'truck',
    takes: [
      'Household clutter and boxes',
      'Bagged trash and bulk waste',
      'Old furniture and mattresses',
      'Appliances and electronics',
      'Exercise equipment',
      'Toys, bikes, and outdoor gear',
    ],
    photos: [
      'basement-packed-a',
      'basement-packed-b',
      'basement-bags-boxes',
      'basement-black-bags',
      'truck-bed-loaded-furniture',
      'basement-shelving-clutter',
    ],
    faqs: [
      {
        q: 'Do I have to move anything to the curb first?',
        a: 'No. Full-service means full-service — we go where the junk is. Basement, attic, third floor, back of the shed. You point, we carry.',
      },
      {
        q: 'How fast can you get here?',
        a: 'Often the same day or the next. One customer had a full basement, a couch, and a rack of appliances cleared the very next morning — done in about two hours with a team of three.',
      },
    ],
  },
  {
    slug: 'light-demolition',
    name: 'Light Demolition',
    short: 'Take it apart, then take it away.',
    blurb:
      'Sheds, fences, decks, wall paneling, old cabinets, built-ins, storm doors. We do the tear-out and the haul-off as one job, so you are not left standing over a pile of broken lumber wondering who takes it.',
    hero: 'garage-shelving-debris',
    icon: 'hammer',
    takes: [
      'Fences and gates',
      'Sheds and playsets',
      'Decks and stairs',
      'Interior wall paneling',
      'Kitchen and bath cabinets',
      'Built-in shelving and closets',
    ],
    photos: [
      'garage-shelving-debris',
      'yard-before',
      'yard-after',
      'carpet-roll-debris',
      'basement-appliances-debris',
    ],
    faqs: [
      {
        q: 'Do you fix the ground after a fence comes out?',
        a: 'We do. On one job the crew pulled a full backyard fence, then filled and reseeded every post hole without being asked. The customer wrote that it "looks beautiful."',
      },
      {
        q: 'How do I know if my project counts as light demolition?',
        a: 'If it comes apart with hand tools and a saw and it is not holding up the house, it is our kind of job. Anything structural needs a licensed contractor — we will tell you straight if that is the case.',
      },
    ],
  },
  {
    slug: 'construction-debris-removal',
    name: 'Construction Debris Removal',
    short: 'Keep the jobsite moving.',
    blurb:
      'Renovation waste piles up faster than any crew can deal with. Drywall, framing scrap, torn-out carpet, busted tile, packaging, old fixtures. We clear it on your schedule so the next trade can get in.',
    hero: 'carpet-roll-debris',
    icon: 'brick',
    takes: [
      'Drywall and plaster',
      'Lumber and framing scrap',
      'Carpet, pad, and flooring',
      'Tile, brick, and concrete',
      'Roofing tear-off',
      'Windows, doors, and fixtures',
    ],
    photos: [
      'carpet-roll-debris',
      'basement-paint-cans-floor',
      'garage-shelving-debris',
      'trailer-driveway',
      'truck-at-transfer-station',
    ],
    faqs: [
      {
        q: 'Can you come back on a schedule during a long renovation?',
        a: 'Yes. Recurring pickups during a build are common for us — cheaper and cleaner than parking a roll-off in the driveway for a month.',
      },
      {
        q: 'Will you work around other trades?',
        a: 'That is most of what we do. Tell us the window and we work inside it.',
      },
    ],
  },
  {
    slug: 'car-hauling',
    name: 'Car Hauling',
    short: 'Dead car? We take the whole problem.',
    blurb:
      'The non-runner in the side yard, the project that never got finished, the car that has not moved since two owners ago. We load it on the trailer and take it out of your life.',
    hero: 'truck-trailer-hillside',
    icon: 'car',
    takes: [
      'Non-running cars and trucks',
      'Project cars and parts vehicles',
      'ATVs, mowers, and small equipment',
      'Trailers and campers',
      'Scrap metal and machinery',
    ],
    photos: [
      'truck-trailer-hillside',
      'truck-trailer-driveway-trees',
      'trailer-truck-street',
      'truck-at-transfer-station',
    ],
    faqs: [
      {
        q: 'Does it need to run?',
        a: 'No. Flat tires, no keys, no engine — all fine. We just need to be able to reach it.',
      },
      {
        q: 'Do I need the title?',
        a: 'Have it ready if you can. Call and tell us the situation and we will tell you exactly what we need before we come out.',
      },
    ],
  },
  {
    slug: 'furniture-and-appliance-removal',
    name: 'Furniture & Appliance Removal',
    short: 'The heavy, awkward stuff.',
    blurb:
      'Sectionals that will not make the turn. Fridges on the second floor. Upright pianos. Treadmills. The things that need three people and moving straps, not a favor from your brother-in-law.',
    hero: 'piano-on-porch',
    icon: 'sofa',
    takes: [
      'Sofas, sectionals, and recliners',
      'Mattresses and box springs',
      'Refrigerators, washers, and dryers',
      'Pianos and organs',
      'Treadmills and home gyms',
      'Hot tubs and safes',
    ],
    photos: [
      'piano-on-porch',
      'piano-carryout',
      'piano-in-living-room',
      'bedroom-appliances-a',
      'laundry-appliances',
      'truck-bed-loaded-furniture',
    ],
    faqs: [
      {
        q: 'It is up two flights of stairs. Is that a problem?',
        a: 'No, and it is not a surprise charge either — just tell us about the stairs when you book so we bring the right crew. We have carried couches down two flights and had the whole house done in two hours.',
      },
      {
        q: 'Can you move something instead of hauling it away?',
        a: 'Yes. We do in-home moves and heavy lifting too. Same crew, same trucks.',
      },
    ],
  },
  {
    slug: 'garage-and-basement-cleanouts',
    name: 'Garage & Basement Cleanouts',
    short: 'Get the whole room back.',
    blurb:
      'Twenty years of "we might need that" comes out in an afternoon. We sort, carry, load, and sweep, and you walk back down into a room you can actually park in or finish.',
    hero: 'garage-before',
    icon: 'box',
    takes: [
      'Whole-room clutter',
      'Shelving and workbenches',
      'Paint, chemicals, and yard products',
      'Old tools and equipment',
      'Holiday decorations and storage bins',
      'Anything the last owner left behind',
    ],
    photos: [
      'garage-before',
      'garage-after',
      'basement-boxes-a',
      'garage-packed-ramp-a',
      'garage-moving-blankets',
      'basement-packed-b',
    ],
    faqs: [
      {
        q: 'Do you sort out what should be donated?',
        a: 'We will set aside anything you flag as keep or donate before it goes on the truck. Just walk us through it when we arrive.',
      },
      {
        q: 'Is the floor swept afterward?',
        a: 'Always. Every job ends with a broom.',
      },
    ],
  },
  {
    slug: 'estate-and-storage-cleanouts',
    name: 'Estate & Storage Unit Cleanouts',
    short: 'Handled with care, finished on time.',
    blurb:
      'Emptying a parent’s house or closing out a storage unit is rarely just a logistics problem. We work carefully, we set aside anything you want kept, and we get the space fully empty by your deadline.',
    hero: 'storage-unit-before',
    icon: 'washer',
    takes: [
      'Full estate and property cleanouts',
      'Storage units of any size',
      'Rental turnovers and evictions',
      'Foreclosure and pre-sale cleanouts',
      'Hoarding situations',
      'Downsizing and move-outs',
    ],
    photos: [
      'storage-unit-before',
      'storage-unit-after',
      'retro-hall',
      'storage-unit-2078',
      'room-before',
      'room-after',
    ],
    faqs: [
      {
        q: 'I have a hard deadline from the storage facility.',
        a: 'Tell us the date when you book. Meeting a lockout or a closing date is exactly the kind of job we schedule around.',
      },
      {
        q: 'Can you do the whole property, inside and out?',
        a: 'Yes. One investment-property job had a crew of five to seven people clearing years of debris and even taking down trees. The owner called the transformation "incredible."',
      },
    ],
  },
  {
    slug: 'yard-waste-and-property-cleanup',
    name: 'Yard Waste & Property Cleanup',
    short: 'Brush, scrap, and whatever the storm left.',
    blurb:
      'Limbs, brush piles, rotten lumber, scrap metal, a decade of stuff behind the shed. We bring the dump trailer to the pile instead of asking you to bag it.',
    hero: 'yard-before',
    icon: 'leaf',
    takes: [
      'Brush, limbs, and storm debris',
      'Old lumber and pallets',
      'Scrap metal and fencing',
      'Tires and drums',
      'Overgrown lot cleanup',
      'Post-tenant yard cleanup',
    ],
    photos: [
      'yard-before',
      'yard-after',
      'yard-cleared-wide',
      'rig-truck-trailer-field',
      'yard-clean-lawn',
    ],
    faqs: [
      {
        q: 'Can you get the trailer back to the pile?',
        a: 'Usually yes — the dump trailer goes on grass and gravel. If the ground is soft we carry it out. Send a photo when you book and we will tell you before we roll.',
      },
      {
        q: 'Do you take tree limbs?',
        a: 'We do, and on bigger jobs we have taken down whole trees as part of a property cleanup.',
      },
    ],
  },
]

export const SERVICE_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
)

export type City = {
  slug: string
  name: string
  county: string
  drive: string
  note: string
}

/** Shenandoah Valley + Page County — roughly a 45-minute radius from the shop in Luray. */
export const CITIES: City[] = [
  {
    slug: 'luray',
    name: 'Luray',
    county: 'Page County',
    drive: 'Home base',
    note: 'The shop is on Baker Drive, so Luray jobs get the fastest turnaround we offer — often same day.',
  },
  {
    slug: 'front-royal',
    name: 'Front Royal',
    county: 'Warren County',
    drive: '35 min',
    note: 'Regular runs up Route 340 for rental turnovers, basement cleanouts, and construction debris.',
  },
  {
    slug: 'harrisonburg',
    name: 'Harrisonburg',
    county: 'Rockingham County',
    drive: '45 min',
    note: 'Move-out season keeps us busy here — furniture, mattresses, and whole-apartment cleanouts.',
  },
  {
    slug: 'new-market',
    name: 'New Market',
    county: 'Shenandoah County',
    drive: '30 min',
    note: 'Straight over the mountain on 211. Farm scrap, brush piles, and outbuilding tear-downs.',
  },
  {
    slug: 'shenandoah',
    name: 'Shenandoah',
    county: 'Page County',
    drive: '15 min',
    note: 'Right down the road. Small loads and single-item pickups are no trouble here.',
  },
  {
    slug: 'stanley',
    name: 'Stanley',
    county: 'Page County',
    drive: '12 min',
    note: 'Page County neighbor — same-day service most weeks.',
  },
  {
    slug: 'elkton',
    name: 'Elkton',
    county: 'Rockingham County',
    drive: '35 min',
    note: 'South end of the valley. Property cleanups, appliance hauling, and light demo.',
  },
  {
    slug: 'woodstock',
    name: 'Woodstock',
    county: 'Shenandoah County',
    drive: '45 min',
    note: 'North valley coverage along I-81 for construction sites and estate cleanouts.',
  },
]

export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c])
)

/** Junk removal is priced by how much room the load takes, not by the hour. */
export const LOAD_SIZES = [
  {
    id: 'single',
    label: 'A few items',
    fraction: 0.14,
    example: 'One couch, a fridge, a mattress, a treadmill',
    truck: 'Part of a pickup bed',
  },
  {
    id: 'quarter',
    label: 'Quarter load',
    fraction: 0.25,
    example: 'A small room, a shed, a curb pile',
    truck: 'Quarter of a pickup truck',
  },
  {
    id: 'half',
    label: 'Half load',
    fraction: 0.5,
    example: 'A packed garage bay or a big bedroom',
    truck: 'Half a pickup truck',
  },
  {
    id: 'full',
    label: 'Full load',
    fraction: 0.82,
    example: 'A full garage, a basement, a storage unit',
    truck: 'One full pickup truck',
  },
  {
    id: 'multi',
    label: 'More than one load',
    fraction: 1,
    example: 'Whole-house, estate, or property cleanout',
    truck: 'Two or more trailer loads',
  },
] as const

export const STAIRS = ['No stairs', 'One flight', 'Two flights', 'Three or more', 'Elevator'] as const

export const TIMING = [
  'As soon as possible',
  'Within a few days',
  'Pick a date',
  'Just getting a price',
] as const

export const SITE_URL = 'https://eddysezjunkremoval.com'
