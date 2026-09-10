export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  brand: string;
  powerType: 'Cordless' | 'Corded' | 'Manual';
  voltage?: string;
  rating: number;
  reviews: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  variants: { id: string; name: string; price: number }[];
}

export const CATEGORIES = [
  { id: '1', name: 'Machines', slug: 'machines', image: '/categories/machines.jpg' },
  { id: '2', name: 'Blades', slug: 'blades', image: '/categories/blades.jpg' },
  { id: '3', name: 'Bits', slug: 'bits', image: '/categories/bits.jpg' },
  { id: '4', name: 'Accessories', slug: 'accessories', image: '/categories/accessories.jpg' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Pro-Impact 20V Max Cordless Drill',
    slug: 'pro-impact-20v-max-cordless-drill',
    description: 'A heavy-duty, high-performance cordless drill for professional contractors.',
    price: 199.99,
    category: 'machines',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
    brand: 'Pro-Power',
    powerType: 'Cordless',
    voltage: '20V',
    rating: 4.8,
    reviews: 342,
    isNewArrival: true,
    isFeatured: true,
    variants: [
      { id: 'v1', name: 'Tool Only', price: 129.99 },
      { id: 'v2', name: 'Kit (w/ 2 Batteries)', price: 199.99 },
    ]
  },
  {
    id: 'p2',
    name: 'Industrial Angle Grinder 4-1/2"',
    slug: 'industrial-angle-grinder-4-1-2',
    description: 'High-speed angle grinder for cutting and grinding metal.',
    price: 89.99,
    category: 'machines',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80',
    brand: 'Pro-Power',
    powerType: 'Corded',
    rating: 4.5,
    reviews: 120,
    isFeatured: true,
    variants: [
      { id: 'v3', name: 'Standard', price: 89.99 },
    ]
  },
  {
    id: 'p3',
    name: 'Titanium Drill Bit Set (14-Piece)',
    slug: 'titanium-drill-bit-set-14-piece',
    description: 'Durable titanium-coated drill bits for wood, metal, and plastic.',
    price: 34.99,
    category: 'bits',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80',
    brand: 'Titan',
    powerType: 'Manual',
    rating: 4.9,
    reviews: 875,
    isFeatured: false,
    variants: [
      { id: 'v4', name: '14-Piece', price: 34.99 },
    ]
  },
  {
    id: 'p4',
    name: 'Circular Saw Blade 7-1/4" 24T',
    slug: 'circular-saw-blade-7-1-4-24t',
    description: 'Carbide-tipped circular saw blade for framing and general purpose cutting.',
    price: 19.99,
    category: 'blades',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&q=80',
    brand: 'CutPro',
    powerType: 'Manual',
    rating: 4.6,
    reviews: 210,
    isNewArrival: true,
    variants: [
      { id: 'v5', name: 'Single Pack', price: 19.99 },
      { id: 'v6', name: '3-Pack', price: 49.99 },
    ]
  },
  {
    id: 'p5',
    name: 'Heavy-Duty Tool Belt',
    slug: 'heavy-duty-tool-belt',
    description: 'Rugged leather tool belt with 12 pockets for quick access to tools.',
    price: 79.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1510166089176-b57564a542b1?w=800&q=80',
    brand: 'GearPro',
    powerType: 'Manual',
    rating: 4.7,
    reviews: 154,
    variants: [
      { id: 'v7', name: 'Standard (32"-42")', price: 79.99 },
    ]
  },
  {
    id: 'p6',
    name: '18V Brushless Circular Saw',
    slug: '18v-brushless-circular-saw',
    description: 'High-performance cordless circular saw with brushless motor for longer runtime.',
    price: 249.99,
    category: 'machines',
    image: 'https://images.unsplash.com/photo-1536768310328-98e6da5a43ab?w=800&q=80',
    brand: 'Pro-Power',
    powerType: 'Cordless',
    voltage: '18V',
    rating: 4.9,
    reviews: 405,
    isNewArrival: true,
    isFeatured: true,
    variants: [
      { id: 'v8', name: 'Tool Only', price: 159.99 },
      { id: 'v9', name: 'Kit (w/ 1 Battery)', price: 249.99 },
    ]
  },
  {
    id: 'p7',
    name: 'Pro Laser Level 360',
    slug: 'pro-laser-level-360',
    description: 'Self-leveling 360-degree green beam cross line laser for precise alignment.',
    price: 189.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=800&q=80',
    brand: 'LaserPro',
    powerType: 'Cordless',
    rating: 4.8,
    reviews: 142,
    variants: [
      { id: 'v10', name: 'Standard Kit', price: 189.99 },
    ]
  },
  {
    id: 'p8',
    name: 'Diamond Cutting Disc 4.5"',
    slug: 'diamond-cutting-disc-4-5',
    description: 'Segmented diamond blade for fast cutting of concrete, brick, and masonry.',
    price: 24.99,
    category: 'blades',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&q=80', // reused saw image for demo
    brand: 'CutPro',
    powerType: 'Manual',
    rating: 4.6,
    reviews: 89,
    variants: [
      { id: 'v11', name: 'Single Pack', price: 24.99 },
      { id: 'v12', name: '5-Pack', price: 99.99 },
    ]
  },
  {
    id: 'p9',
    name: 'SDS-Plus Hammer Drill Bits (5-Piece)',
    slug: 'sds-plus-hammer-drill-bits',
    description: 'Carbide-tipped masonry drill bits for rotary hammers.',
    price: 45.99,
    category: 'bits',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80', // reused drill bits image
    brand: 'Titan',
    powerType: 'Manual',
    rating: 4.9,
    reviews: 312,
    isFeatured: true,
    variants: [
      { id: 'v13', name: 'Standard Set', price: 45.99 },
    ]
  },
  {
    id: 'p10',
    name: 'Corded Reciprocating Saw 12 AMP',
    slug: 'corded-reciprocating-saw-12-amp',
    description: 'Heavy-duty reciprocating saw with variable speed trigger for aggressive cutting.',
    price: 119.99,
    category: 'machines',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80', // reused grinder image
    brand: 'Pro-Power',
    powerType: 'Corded',
    rating: 4.4,
    reviews: 76,
    isNewArrival: true,
    variants: [
      { id: 'v14', name: 'Standard', price: 119.99 },
    ]
  }
];
