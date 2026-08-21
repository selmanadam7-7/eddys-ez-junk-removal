/**
 * Every photo on this site is Eddy's own — pulled from the Google Business Profile
 * and the 78-photo project gallery on the Thumbtack Top Pro page.
 */

export type PhotoCategory =
  | 'rigs'
  | 'cleanouts'
  | 'garages'
  | 'basements'
  | 'storage'
  | 'yards'
  | 'heavy'

export type Photo = {
  name: string
  w: number
  h: number
  alt: string
  cat: PhotoCategory
}

const P = (name: string, w: number, h: number, cat: PhotoCategory, alt: string): Photo => ({
  name,
  w,
  h,
  cat,
  alt,
})

export const PHOTOS: Photo[] = [
  // Rigs
  P('rig-truck-trailer-field', 1800, 1350, 'rigs', 'Eddy’s Ram 2500 and dump trailer parked beside a brush pile on a Shenandoah Valley property'),
  P('rig-loaded-commercial', 1800, 1350, 'rigs', 'Dump trailer loaded with cabinets and appliances outside a commercial building'),
  P('card-dusk', 829, 1106, 'rigs', 'Eddy’s EZ Junk Removal business card held up in front of the truck and trailer at dusk'),
  P('trailer-driveway', 1350, 1800, 'rigs', 'Black dump trailer staged in a residential driveway before a cleanout'),
  P('trailer-branded-driveway', 1350, 1800, 'rigs', 'Branded Eddy’s EZ dump trailer loaded with demolition debris in a driveway'),
  P('trailer-truck-street', 1350, 1800, 'rigs', 'Truck and loaded dump trailer parked on a residential street'),
  P('truck-bed-loaded-furniture', 1350, 1800, 'rigs', 'Pickup bed packed with old furniture and a red patio chair'),
  P('truck-loaded-brick-house', 1350, 1800, 'rigs', 'Loaded truck bed strapped down outside a brick house'),
  P('truck-road-shenandoah', 1024, 1365, 'rigs', 'The Eddy’s EZ truck heading out on a valley road'),
  P('truck-trailer-hillside', 1018, 764, 'rigs', 'Truck and dump trailer backed onto a grassy hillside property'),
  P('truck-trailer-driveway-trees', 1018, 764, 'rigs', 'Truck and trailer positioned under trees for a property cleanup'),
  P('truck-trailer-night-lot', 1024, 1009, 'rigs', 'The rig at a lot after dark — Eddy’s runs until 11pm'),
  P('trucks-dumpster-lot', 1018, 764, 'rigs', 'Two work trucks beside a roll-off container on a commercial lot'),
  P('truck-at-transfer-station', 1018, 764, 'rigs', 'The truck at the transfer station unloading a full trailer'),
  P('truck-trailer-canopy-flag', 1018, 764, 'rigs', 'Truck and trailer under a fuel canopy on an early-morning run'),
  P('truck-trailer-station-canopy', 1018, 764, 'rigs', 'The rig fueling up between jobs'),
  P('truck-storefront-lot', 1018, 764, 'rigs', 'Truck parked outside a storefront for a commercial cleanout'),
  P('truck-townhouse-curb', 1018, 764, 'rigs', 'Truck at the curb of a townhouse job'),
  P('truck-box-truck-load', 1024, 1365, 'rigs', 'Loading a box truck during a full-property move-out'),
  P('truck-at-landfill', 828, 1474, 'rigs', 'Unloading at the landfill so the customer never has to make the trip'),

  // Basements
  P('basement-packed-a', 1350, 1800, 'basements', 'A basement packed wall to wall with boxes, bags, and stored clutter before the crew started'),
  P('basement-packed-b', 1350, 1800, 'basements', 'Another angle of a full basement cleanout in progress'),
  P('basement-boxes-a', 1350, 1800, 'basements', 'Basement stacked with cardboard boxes and household goods'),
  P('basement-boxes-b', 1350, 1800, 'basements', 'Boxes, bags, and furniture staged for removal in a basement'),
  P('basement-bags-boxes', 1018, 764, 'basements', 'Bagged waste and boxes lined up along a basement wall'),
  P('basement-bags-boxes-2', 1018, 764, 'basements', 'A basement mid-cleanout with bags ready to carry out'),
  P('basement-shelving-clutter', 1018, 764, 'basements', 'Shelving and stored clutter being cleared from a basement'),
  P('basement-black-bags', 1018, 764, 'basements', 'Black contractor bags filled and staged for the trailer'),
  P('boxes-stacked-close', 1024, 1365, 'basements', 'A close look at the volume of boxes handled on a single job'),
  P('basement-paint-cans-floor', 1018, 764, 'basements', 'Old paint cans and debris cleared off a basement floor'),
  P('basement-appliances-debris', 1024, 1365, 'basements', 'Appliances and construction debris pulled out of a basement'),

  // Garages
  P('garage-before', 1350, 1800, 'garages', 'Before: a garage floor buried under collapsed boxes and bagged clutter'),
  P('garage-after', 1350, 1800, 'garages', 'After: the same garage swept clean and completely empty'),
  P('garage-packed-ramp-a', 1024, 1365, 'garages', 'A packed garage with a ramp set for loading'),
  P('garage-packed-ramp-b', 1024, 1365, 'garages', 'Garage cleanout in progress with the ramp down'),
  P('garage-moving-blankets', 1024, 1365, 'garages', 'Furniture wrapped in moving blankets inside a garage'),
  P('garage-shelving-debris', 1018, 764, 'garages', 'Built-in shelving and debris removed from a garage'),

  // Storage
  P('storage-unit-before', 1024, 1365, 'storage', 'Before: storage unit M168 packed front to back with boxes and furniture'),
  P('storage-unit-after', 1024, 1365, 'storage', 'After: unit M168 emptied down to bare concrete'),
  P('storage-unit-2078', 1024, 1365, 'storage', 'Another storage unit cleared out for a customer on deadline'),

  // Yards
  P('yard-before', 1018, 764, 'yards', 'Before: a backyard with dismantled fence panels and years of debris'),
  P('yard-after', 1018, 764, 'yards', 'After: the same backyard cleared, raked, and ready to reseed'),
  P('yard-cleared-wide', 1800, 1350, 'yards', 'Wide view of a finished backyard cleanup with fence hauled away'),
  P('yard-clean-lawn', 1018, 764, 'yards', 'A cleaned-up lawn after a full property cleanup'),
  P('street-truck-neighborhood', 1024, 1365, 'yards', 'The truck working a neighborhood property cleanup'),
  P('lot-truck-trailer-townhomes', 1018, 764, 'yards', 'Truck and trailer set up at a townhome community job'),

  // Heavy items
  P('piano-on-porch', 1024, 1365, 'heavy', 'An upright piano moved out onto the porch and ready for the truck'),
  P('piano-carryout', 1024, 1365, 'heavy', 'Carrying an upright piano out of a house'),
  P('piano-in-living-room', 1018, 764, 'heavy', 'An old upright piano in a living room before removal'),
  P('piano-hardwood', 831, 1480, 'heavy', 'A piano staged on hardwood before the crew took it out'),
  P('carpet-roll-debris', 1018, 764, 'heavy', 'Rolled carpet, bagged waste, and renovation debris loaded up'),
  P('laundry-appliances', 831, 1480, 'heavy', 'A washer and dryer removed from a laundry room'),
  P('bedroom-appliances-a', 1350, 1800, 'heavy', 'A bedroom stacked with appliances and household items awaiting pickup'),
  P('bedroom-appliances-b', 1350, 1800, 'heavy', 'Appliances, bedding, and boxes cleared from a bedroom'),

  // Room / whole-property cleanouts
  P('room-before', 1024, 1365, 'cleanouts', 'Before: a room with a crib, an office chair, and leftover furniture'),
  P('room-after', 1024, 1365, 'cleanouts', 'After: the same room emptied and vacuumed'),
  P('playroom-cleared', 1018, 764, 'cleanouts', 'A cleared playroom at the end of an apartment cleanout'),
  P('bedroom-dresser-bag', 1024, 1365, 'cleanouts', 'Last items being pulled from a bedroom'),
  P('bedframe-linens', 1024, 1365, 'cleanouts', 'A bed frame and linens broken down for removal'),
  P('stairwell-clutter', 1024, 1365, 'cleanouts', 'Clutter cleared from a stairwell and landing'),
  P('bedroom-bedframe-bag', 1018, 764, 'cleanouts', 'A bedroom stripped down during a move-out cleanout'),
  P('closet-utility-clutter', 1024, 1365, 'cleanouts', 'A utility closet emptied of stored equipment'),
  P('nursery-furniture-out', 1024, 1365, 'cleanouts', 'Nursery furniture carried out during a full-home cleanout'),
  P('playroom-easel-clutter', 1024, 1365, 'cleanouts', 'A playroom mid-cleanout'),
  P('closet-cleanout', 1024, 1365, 'cleanouts', 'A closet cleared of clothing and stored boxes'),
  P('closet-after', 1024, 1365, 'cleanouts', 'An empty closet after the crew finished'),
  P('retro-dining-room', 831, 1480, 'cleanouts', 'A dated dining room cleared for a property turnover'),
  P('retro-hall', 831, 1480, 'cleanouts', 'A hallway emptied during an estate cleanout'),
  P('kitchen-cleared', 1024, 1365, 'cleanouts', 'A kitchen cleared out ahead of a renovation'),
]

export const PHOTO_BY_NAME: Record<string, Photo> = Object.fromEntries(
  PHOTOS.map((p) => [p.name, p])
)

export function photo(name: string): Photo {
  return (
    PHOTO_BY_NAME[name] ?? {
      name,
      w: 1200,
      h: 900,
      cat: 'rigs',
      alt: 'Eddy’s EZ Junk Removal on the job',
    }
  )
}

export function src(name: string) {
  return `/photos/${name}.webp`
}

export const CATEGORY_LABELS: { id: PhotoCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'cleanouts', label: 'Cleanouts' },
  { id: 'basements', label: 'Basements' },
  { id: 'garages', label: 'Garages' },
  { id: 'storage', label: 'Storage units' },
  { id: 'yards', label: 'Yards & property' },
  { id: 'heavy', label: 'Heavy items' },
  { id: 'rigs', label: 'The trucks' },
]

/**
 * Verified before/after pairs — each pair is the same space, photographed by the
 * crew at the start and the end of the same job.
 */
export const BEFORE_AFTER = [
  {
    id: 'storage',
    title: 'Storage unit M168',
    where: 'Climate-controlled unit, full to the door',
    before: 'storage-unit-before',
    after: 'storage-unit-after',
    note: 'Boxes, framed art, an antique settee, and a hand truck — out and swept to bare concrete.',
  },
  {
    id: 'garage',
    title: 'Two-car garage',
    where: 'Collapsed boxes and bagged clutter',
    before: 'garage-before',
    after: 'garage-after',
    note: 'The pile you stop seeing after a while. Gone in an afternoon, floor swept behind it.',
  },
  {
    id: 'yard',
    title: 'Backyard fence tear-out',
    where: 'Dismantled fence and years of debris',
    before: 'yard-before',
    after: 'yard-after',
    note: 'Fence pulled, debris hauled, post holes filled and reseeded without being asked.',
  },
  {
    id: 'room',
    title: 'Spare room',
    where: 'Crib, office chair, leftover furniture',
    before: 'room-before',
    after: 'room-after',
    note: 'A rental turnover cleared and vacuumed, ready to show the next day.',
  },
] as const
