/**
 * Real, verbatim customer reviews from the Thumbtack Top Pro profile.
 * Nothing here is written or embellished — only trimmed where noted with an ellipsis.
 */

export type Review = {
  author: string
  date: string
  rating: 5
  body: string
  details?: string
  job: string
  source: 'Thumbtack'
  featured?: boolean
  pull?: string
}

export const REVIEWS: Review[] = [
  {
    author: 'Karen J.',
    date: 'July 9, 2026',
    rating: 5,
    job: 'Junk Removal + Demolition',
    source: 'Thumbtack',
    featured: true,
    pull: 'On Eddy’s initiative, they filled and reseeded all holes in the ground; it looks beautiful.',
    body: `We highly recommend Eddy and his crew. They completed two projects (junk removal and demolition) for us this past week. We definitely will call again, as needed.

We are renovating a home before moving in. Eddy came within a day to provide an estimate, and he provided a crew a day after we confirmed with him.

They worked hard, diligently, and quickly over the next two days to first remove junk, like old carpeting and fixtures, we set in the garage. They then removed heavier objects, like two old refrigerators and shelving from inside the home and garage, that we could not handle ourselves. They uninstalled and hauled away a sizable backyard fence; on Eddy's initiative, they filled and reseeded all holes in the ground; it looks beautiful.

They also uninstalled and removed old wall paneling, cabinets, additional appliances, and storm doors from the home and garage. Eddy offered valuable guidance on strategy throughout this process, and he made sure all was done right.

Eddy's pricing is fair and honest. These projects expanded as we discovered new tasks. He offered a reasonable price when adding onto the original agreement, and all got done on time.

Eddie and crew all express a positive and can-do attitude, and focus on doing quality work. They clearly are concerned the customer is happy with the final results. We concentrated on our own renovation tasks while there, and found working alongside them a genuine pleasure.`,
    details: 'Large items to haul · Mixed trash · Enough to fill four or more pickup trucks · No stairs',
  },
  {
    author: 'Corinne U.',
    date: 'July 16, 2026',
    rating: 5,
    job: 'Junk Removal',
    source: 'Thumbtack',
    featured: true,
    pull: 'They removed debris that had been there for years, and even cleared several trees for me. The transformation was incredible.',
    body: `I had an excellent experience with Eddy's EZ Junk Removal! Eddy is respectful, professional, and truly a man of his word. I explained my overall goals for cleaning up my investment property, and he took it from there.

On the scheduled day, he arrived on time with a crew of 5–7 hardworking people who were ready to get the job done. They went above and beyond, clearing a significant amount of junk from the property, removing debris that had been there for years, and even clearing several trees for me. The transformation was incredible.

If you're looking for someone who is dependable, works hard, and delivers on what they promise, I highly recommend Eddy's EZ Junk Removal. I wouldn't hesitate to hire Eddy again for future projects. Thank you for a job well done!`,
    details:
      'Large items to haul · Yard waste, construction debris or scrap metal · Enough to fill two pickup trucks · No stairs',
  },
  {
    author: 'Tashina L.',
    date: 'June 30, 2026',
    rating: 5,
    job: 'Junk Removal',
    source: 'Thumbtack',
    featured: true,
    pull: 'They came out the very next day and they were done in about 2 hours with a team of 3 guys. This was no small job!',
    body: `Eddy's Junk removal was great. I had a basement full of junk. I also had a large couch upstairs and a rack of appliances that needed to be removed (pics below). They came out the very next day and they were done in about 2 hours with a team of 3 guys. This was no small job! I am so glad they were able to come and get everything done so quickly as I had already scheduled a deep cleaning the very next day. Very nice guys as well and reasonably priced!`,
    details:
      'Large items to haul · Furniture, appliances or electronics · Enough to fill three pickup trucks · Two flights',
  },
  {
    author: 'Glenda R.',
    date: 'July 2026',
    rating: 5,
    job: 'Junk Removal',
    source: 'Thumbtack',
    featured: true,
    pull: 'They went above and beyond to remove all of our unwanted junk. This was a five-star removal!',
    body: `Eddy and his assistant were amazing! They showed up on time and were friendly, helpful, and professional. They went above and beyond to remove all of our unwanted junk. I highly recommend their service! This was a five-star removal!`,
    details:
      'Large items to haul · Furniture, appliances or electronics · Enough to fill one pickup truck · One flight',
  },
  {
    author: 'Jim C.',
    date: 'May 17, 2026',
    rating: 5,
    job: 'Furniture Moving & Heavy Lifting',
    source: 'Thumbtack',
    featured: true,
    pull: 'EZ Junk Removal was the first and only company that responded.',
    body: `Five stars across the board!!! My son was moving from Charlottesville for a new job and had limited time to move. We reached out to thumbtack and picked three companies. EZ Junk Removal was the first and only company that responded. Excellent communication skills and a great value. If you need something heavy moved or need a team to pack you out and move you, EZ Junk Removal should be your first and only call you need to make!!!`,
    details:
      '6–10 items · Sofa · Loveseat · Dining table · Bed frame · Mattress · Boxes · Stairs to unload',
  },
]

/** What Thumbtack customers rated highest, straight from the profile. */
export const RATED_HIGHLY_FOR = ['Professionalism', 'Work quality', 'Responsiveness'] as const

/** Words that show up most often across the 25 reviews, per Thumbtack. */
export const REVIEW_KEYWORDS = [
  { word: 'removal', count: 12 },
  { word: 'removed', count: 12 },
  { word: 'junk', count: 10 },
  { word: 'quick', count: 7 },
  { word: 'price', count: 6 },
  { word: 'haul', count: 2 },
  { word: 'items', count: 2 },
  { word: 'trash', count: 2 },
  { word: 'efficient', count: 2 },
] as const
