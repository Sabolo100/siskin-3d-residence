export type Apartment = {
  id: string
  name: string
  floor: number
  rooms: number
  area: number
  terrace: number
  orientation: string
  price: number
  status: 'Elérhető' | 'Utolsó ezen a szinten'
  accent: string
  short: string
  features: string[]
  roomsList: { label: string; size: number }[]
  plan: 'compact' | 'family' | 'corner' | 'penthouse'
  side: 'left' | 'right'
}

export const apartments: Apartment[] = [
  {
    id: 'a203',
    name: 'A–203',
    floor: 2,
    rooms: 2,
    area: 56.8,
    terrace: 11.5,
    orientation: 'DNy',
    price: 89.9,
    status: 'Elérhető',
    accent: '#c7d53c',
    short: 'Kompakt városi otthon, tágas nappalival és napos terasszal.',
    features: ['Délutáni napfény', 'Csendes kertre néz', 'Akadálymentes'],
    roomsList: [
      { label: 'Nappali + konyha', size: 27.4 },
      { label: 'Hálószoba', size: 13.2 },
      { label: 'Előszoba', size: 5.7 },
      { label: 'Fürdő', size: 5.1 },
      { label: 'Háztartási helyiség', size: 5.4 },
    ],
    plan: 'compact',
    side: 'left',
  },
  {
    id: 'b405',
    name: 'B–405',
    floor: 4,
    rooms: 3,
    area: 72.4,
    terrace: 16.2,
    orientation: 'D–K',
    price: 118.9,
    status: 'Elérhető',
    accent: '#87a98f',
    short: 'Rugalmas alaprajz pároknak vagy külön dolgozószobával.',
    features: ['Kétirányú tájolás', 'Home office', 'Reggeli napfény'],
    roomsList: [
      { label: 'Nappali + étkező', size: 30.8 },
      { label: 'Hálószoba', size: 13.6 },
      { label: 'Dolgozó / kisszoba', size: 9.8 },
      { label: 'Konyha', size: 7.2 },
      { label: 'Fürdő + közlekedő', size: 11.0 },
    ],
    plan: 'family',
    side: 'right',
  },
  {
    id: 'c607',
    name: 'C–607',
    floor: 6,
    rooms: 4,
    area: 94.6,
    terrace: 21.8,
    orientation: 'D–Ny',
    price: 154.9,
    status: 'Utolsó ezen a szinten',
    accent: '#d9a98f',
    short: 'Világos saroklakás családoknak, körbefutó terasszal.',
    features: ['Panorámás sarok', '3 hálószoba', 'Szeparált master suite'],
    roomsList: [
      { label: 'Nappali + konyha', size: 34.2 },
      { label: 'Szülői háló', size: 15.1 },
      { label: 'Hálószoba 2', size: 11.4 },
      { label: 'Hálószoba 3', size: 10.8 },
      { label: 'Kiszolgáló terek', size: 23.1 },
    ],
    plan: 'corner',
    side: 'left',
  },
  {
    id: 'p902',
    name: 'P–902',
    floor: 8,
    rooms: 4,
    area: 126.2,
    terrace: 42.6,
    orientation: 'K–D–Ny',
    price: 219.5,
    status: 'Elérhető',
    accent: '#b6a7d8',
    short: 'Visszahúzott penthouse három égtáj felé nyíló panorámával.',
    features: ['Privát tetőterasz', 'Budai panoráma', 'Prémium gépészet'],
    roomsList: [
      { label: 'Nappali + étkező', size: 42.5 },
      { label: 'Master suite', size: 24.8 },
      { label: 'Hálószoba 2', size: 13.2 },
      { label: 'Dolgozó / háló', size: 12.6 },
      { label: 'Kiszolgáló terek', size: 33.1 },
    ],
    plan: 'penthouse',
    side: 'right',
  },
]

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 1 }).format(price) + ' M Ft'

export const formatArea = (area: number) =>
  new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 1 }).format(area) + ' m²'
