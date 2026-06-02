export type Category = 'film' | 'music' | 'photo' | 'biography' | 'art' | 'innovation';

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: Category;
  address: string;
  neighbourhood: string;
  city: string;
  lat: number;
  lng: number;
  distanceM?: number;
  year: number;
  score: number;
  imageColor: string;
  url?: string;
  tags: string[];
}

export const CATEGORY_LABELS: Record<Category, string> = {
  film: 'Film scene',
  music: 'Music history',
  photo: 'Iconic photo',
  biography: 'Biography',
  art: 'Art & culture',
  innovation: 'Innovation',
};

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; light: string }> = {
  film:       { bg: 'bg-blue-100',   text: 'text-blue-800',   light: 'bg-blue-50' },
  music:      { bg: 'bg-purple-100', text: 'text-purple-800', light: 'bg-purple-50' },
  photo:      { bg: 'bg-amber-100',  text: 'text-amber-800',  light: 'bg-amber-50' },
  biography:  { bg: 'bg-rose-100',   text: 'text-rose-800',   light: 'bg-rose-50' },
  art:        { bg: 'bg-emerald-100',text: 'text-emerald-800',light: 'bg-emerald-50' },
  innovation: { bg: 'bg-orange-100', text: 'text-orange-800', light: 'bg-orange-50' },
};

export const stories: Story[] = [
  {
    id: '1',
    title: 'The photo that launched the environmental movement',
    excerpt: 'In 1971, twelve activists left this exact spot on a converted halibut seiner — and Greenpeace was born.',
    body: "In September 1971, a converted halibut seiner called the Phyllis Cormack left the foot of Gore Avenue carrying twelve activists bound for Amchitka Island, Alaska — to protest a US nuclear weapons test. The photo taken from this dock became one of the most reproduced environmental images of the 20th century. The voyage didn't stop the test, but the media coverage ignited a global movement. Greenpeace, the organization that grew from that trip, now operates in 55 countries. It started here, on this waterfront, with a borrowed boat and a borrowed idea that the world was worth fighting for.",
    category: 'photo',
    address: 'Foot of Gore Ave',
    neighbourhood: 'Gastown',
    city: 'Vancouver',
    lat: 49.2827,
    lng: -123.0942,
    distanceM: 210,
    year: 1971,
    score: 98,
    imageColor: 'from-amber-900 to-amber-700',
    tags: ['environment', 'activism', 'history'],
  },
  {
    id: '2',
    title: 'X-Men: Days of Future Past — the Gastown chase',
    excerpt: 'The opening chase sequence was filmed on Water Street in 2013. Four city blocks, four nights, one very confused neighbourhood.',
    body: "In the summer of 2013, production on X-Men: Days of Future Past shut down three blocks of Water Street for four consecutive nights. The sequence — where a future version of the X-Men evade Sentinel robots — used Gastown's Victorian architecture as a stand-in for a dystopian future city. The production brought in $4.2 million to Vancouver's local economy during filming. Extras reported being fed craft service meals at 3am in the Steamworks parking lot. The film grossed $746 million worldwide. The cobblestones are the same ones you're standing on.",
    category: 'film',
    address: 'Water St at Cambie St',
    neighbourhood: 'Gastown',
    city: 'Vancouver',
    lat: 49.2838,
    lng: -123.1088,
    distanceM: 80,
    year: 2013,
    score: 91,
    imageColor: 'from-blue-900 to-blue-700',
    tags: ['marvel', 'blockbuster', 'production'],
  },
  {
    id: '3',
    title: "U2's first North American show — to a half-empty room",
    excerpt: 'In 1981 U2 played the Commodore on their first North American tour. The sprung dance floor is still the original.',
    body: "On March 4, 1981, U2 played the Commodore Ballroom on their first-ever North American tour. The room was half full. Bono was 20 years old. The band had just released Boy, their debut album, to modest reviews. The Commodore's legendary sprung hardwood dance floor — built in 1929 using a layer of horsehair padding beneath the boards — is still the original. The venue has hosted everyone from the Rolling Stones to Nirvana since. That night in 1981, a soundman named Joe O'Herlihy reportedly told the band's manager Paul McGuinness that they had something special. O'Herlihy went on to be U2's front-of-house engineer for the next 30 years.",
    category: 'music',
    address: '868 Granville St',
    neighbourhood: 'Downtown',
    city: 'Vancouver',
    lat: 49.2788,
    lng: -123.1208,
    distanceM: 340,
    year: 1981,
    score: 89,
    imageColor: 'from-purple-900 to-purple-700',
    tags: ['rock', 'live music', 'venue'],
  },
  {
    id: '4',
    title: "Where Bryan Adams wrote Summer of '69",
    excerpt: "The riff came to him in a False Creek rehearsal space. He was 19. The studio no longer exists but the address does.",
    body: "Bryan Adams was 19 years old when he wrote the opening riff to Summer of '69 in a rehearsal space near the south end of False Creek. The song, released in 1985, was actually written years earlier — the title refers not to the year but to a sexual position, a fact Adams has confirmed in interviews with characteristic Canadian bluntness. The rehearsal space has since been redeveloped into condominiums. Adams grew up in North Delta and attended Argyle Secondary in North Vancouver, but it was in these False Creek warehouses that he developed the sound that would eventually sell over 65 million albums worldwide.",
    category: 'biography',
    address: 'False Creek, 6th Ave area',
    neighbourhood: 'False Creek',
    city: 'Vancouver',
    lat: 49.2711,
    lng: -123.1187,
    distanceM: 1200,
    year: 1979,
    score: 86,
    imageColor: 'from-rose-900 to-rose-700',
    tags: ['canadian music', 'rock', 'songwriter'],
  },
  {
    id: '5',
    title: 'Douglas Coupland coins "Generation X" — in this building',
    excerpt: 'The term that defined a generation was written in a Powell Street loft. The building is now a co-working space.',
    body: "Douglas Coupland wrote much of Generation X: Tales for an Accelerated Culture — the 1991 novel that gave a name to the post-baby boom demographic — in a loft on Powell Street in East Vancouver. The book introduced terms like McJob, Veal-Fattening Pen, and of course Generation X into the cultural vocabulary. Published when Coupland was 29, it sold modestly at first, then became one of the defining cultural documents of the 1990s. The building, a former light industrial space, has been through several incarnations since and currently operates as a co-working space. A small plaque was proposed by the city in 2019 but never installed.",
    category: 'biography',
    address: 'Powell St, East Vancouver',
    neighbourhood: 'Strathcona',
    city: 'Vancouver',
    lat: 49.2827,
    lng: -123.0789,
    distanceM: 420,
    year: 1990,
    score: 84,
    imageColor: 'from-rose-800 to-pink-700',
    tags: ['literature', 'pop culture', 'writing'],
  },
  {
    id: '6',
    title: 'The Deadpool alley — where Ryan Reynolds insisted on the real location',
    excerpt: "The gritty scenes were shot on Alexander Street. Reynolds reportedly refused a studio recreation.",
    body: "The alley fight sequences from Deadpool (2016) were shot on and around Alexander Street in Gastown. According to production reports, Ryan Reynolds — who had spent over a decade getting the film made — insisted on shooting in actual Vancouver locations rather than building sets, wanting the film to feel grounded in the city where he grew up. Reynolds was born in Vancouver and has spoken frequently about the city's influence on his sensibility. The film was made for $58 million and grossed $783 million worldwide, making it the highest-grossing R-rated film in history at the time of release. The alley is unremarkable by day. At night it looks exactly like the movie.",
    category: 'film',
    address: 'Alexander St, Gastown',
    neighbourhood: 'Gastown',
    city: 'Vancouver',
    lat: 49.2843,
    lng: -123.1012,
    distanceM: 60,
    year: 2015,
    score: 93,
    imageColor: 'from-red-900 to-red-700',
    tags: ['marvel', 'ryan reynolds', 'comedy'],
  },
  {
    id: '7',
    title: 'The original Greenpeace office — above a shoe store',
    excerpt: "The organization that would become the world's largest environmental group started in a second-floor office on West 4th.",
    body: "The original Greenpeace office was located above a shoe store at 2007 West 4th Avenue in Kitsilano. The space rented for $175 a month in 1971. Founding members including Bob Hunter, Robert Lund, and Irving Stowe held their early planning meetings here, surrounded by anti-war posters and a donated mimeograph machine used to print their first newsletters. The shoe store is long gone. The building was renovated in the 1990s and now houses a yoga studio on the ground floor — a transition that Greenpeace co-founder Rex Weyler has described in interviews as 'cosmically appropriate.' The second-floor office space is used for storage.",
    category: 'innovation',
    address: '2007 W 4th Ave',
    neighbourhood: 'Kitsilano',
    city: 'Vancouver',
    lat: 49.2666,
    lng: -123.1557,
    distanceM: 3800,
    year: 1971,
    score: 82,
    imageColor: 'from-emerald-900 to-teal-700',
    tags: ['environment', 'activism', 'nonprofit'],
  },
  {
    id: '8',
    title: 'Expo 86 — where Vancouver decided to become a world city',
    excerpt: "22 million visitors. 86 days. The exposition that changed Vancouver's identity permanently.",
    body: "Expo 86 ran from May to October 1986 on the north shore of False Creek, on land that had been a contaminated rail yard. Over 86 days, 22 million people visited — more than five times Vancouver's metropolitan population. The exposition's theme was transportation and communication, and it introduced the world to SkyTrain, Canada Place, and a vision of Vancouver as a Pacific Rim gateway city. The land was subsequently developed into Concord Pacific Place, the largest urban redevelopment project in Canadian history. The geodesic dome — originally the US Pavilion — still stands and is now Science World. Almost everything else is condominiums. The decision to host Expo 86 is widely credited with transforming Vancouver from a regional city into an international one.",
    category: 'innovation',
    address: 'False Creek North (Science World area)',
    neighbourhood: 'False Creek',
    city: 'Vancouver',
    lat: 49.2734,
    lng: -123.1039,
    distanceM: 900,
    year: 1986,
    score: 95,
    imageColor: 'from-teal-900 to-cyan-700',
    tags: ['expo', 'urban development', 'history'],
  },
];

export function getStoriesByDistance(stories: Story[]): Story[] {
  return [...stories].sort((a, b) => (a.distanceM ?? 9999) - (b.distanceM ?? 9999));
}

export function getStoriesByScore(stories: Story[]): Story[] {
  return [...stories].sort((a, b) => b.score - a.score);
}

export function getStoriesByCategory(stories: Story[], category: Category): Story[] {
  return stories.filter(s => s.category === category);
}
