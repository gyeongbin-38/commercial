/*
 * Demo data for the MARLOWE landing page.
 * MARLOWE is a fictional motorsport brand. Jett Marlowe, the #71 car,
 * every circuit, result, product, price and figure on the page is
 * invented demo content. Photos are stock imagery, not real events.
 */

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&sat=-100&q=80`;

export const MAR_IMAGES = {
  hero: img("photo-1535732820275-9ffd998cac22", 900, 1200),
  cap: img("photo-1531891437562-4301cf35b7e4", 1200, 900),
  garage: img("photo-1492144534655-ae79c964c9d7", 900, 900),
  headlight: img("photo-1542282088-fe8426682b8f", 1200, 900),
  portrait: img("photo-1500648767791-00dcc994a43e", 800, 1000),
} as const;

/* Next race on the calendar - drives the live countdown */
export const NEXT_RACE = {
  round: "R07",
  gp: "Vulcan Pass GP",
  circuit: "Vulcan Pass",
  date: "Sep 28",
  iso: "2026-09-28T14:00:00",
} as const;

/* 2026 season - completed rounds */
export const MAR_RESULTS = [
  { round: "R01", gp: "Kaze Bay Street GP", circuit: "Kaze Bay", date: "Mar 09", pos: "P2" },
  { round: "R02", gp: "Porto Azul GP", circuit: "Porto Azul", date: "Mar 23", pos: "P1" },
  { round: "R03", gp: "Valdorra Ring", circuit: "Valdorra", date: "Apr 13", pos: "P1" },
  { round: "R04", gp: "Nordkapp GP", circuit: "Nordkapp", date: "May 04", pos: "DNF" },
  { round: "R05", gp: "Meridian City GP", circuit: "Meridian City", date: "Jun 08", pos: "P1" },
  { round: "R06", gp: "Solenne Coast GP", circuit: "Solenne Coast", date: "Aug 17", pos: "P3" },
] as const;

/* 2026 season - remaining rounds */
export const MAR_UPCOMING = [
  { round: "R07", gp: "Vulcan Pass GP", circuit: "Vulcan Pass", date: "Sep 28" },
  { round: "R08", gp: "Aurelia Night GP", circuit: "Aurelia", date: "Oct 19" },
  { round: "R09", gp: "Cape Orix Finale", circuit: "Cape Orix", date: "Nov 09" },
] as const;

export const MAR_STATS = [
  { value: "3", label: "Wins" },
  { value: "5", label: "Podiums" },
  { value: "4", label: "Poles" },
  { value: "187", label: "Points" },
] as const;

/* Latest merch drop - four products, four cells */
export const MAR_PRODUCTS = [
  {
    id: "cap",
    name: "71 Team Cap",
    price: "$52",
    tag: "New",
    img: MAR_IMAGES.cap,
    alt: "Model wearing a dark baseball cap against a shutter wall",
  },
  {
    id: "hoodie",
    name: "Grid Hoodie",
    price: "$124",
    tag: "New",
    img: null,
    alt: "",
  },
  {
    id: "tee",
    name: "Paddock Tee",
    price: "$68",
    tag: null,
    img: MAR_IMAGES.garage,
    alt: "Sports cars parked inside a dim garage",
  },
  {
    id: "jacket",
    name: "GP Shell Jacket",
    price: "$240",
    tag: "Last units",
    img: MAR_IMAGES.headlight,
    alt: "Car headlight glowing in a dark garage",
  },
] as const;

export const MAR_MEDIA = [
  {
    id: "m1",
    title: "Onboard: Valdorra quali lap",
    length: "02:41",
    img: img("photo-1449965408869-eaa3f722e40d", 800, 500),
    alt: "Driver point of view inside a car at dusk",
  },
  {
    id: "m2",
    title: "Night run: Meridian City",
    length: "04:12",
    img: img("photo-1525609004556-c46c7d6cf023", 800, 500),
    alt: "Sports car front end under city lights",
  },
  {
    id: "m3",
    title: "72 hours in the garage",
    length: "08:36",
    img: img("photo-1492144534655-ae79c964c9d7", 800, 500),
    alt: "Sports cars lined up inside a garage",
  },
  {
    id: "m4",
    title: "Test days: Vulcan Pass",
    length: "03:58",
    img: img("photo-1568605117036-5fe5e7bab0b7", 800, 500),
    alt: "Sports car on an open desert road",
  },
] as const;

export const MAR_MARQUEE = [
  "Jett Marlowe",
  "#71",
  "Marlowe Racing",
  "World GP Series",
  "Flat out",
] as const;
