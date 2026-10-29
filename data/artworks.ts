export interface Painting {
  id: string;
  title: string;
  year: string;
  dimensions: string;
  medium: string;
  description: string;
  image: string;
  isMainHighlight?: boolean;
  editionDetails?: string;
  priceNote?: string;
  aspectRatio?: string;
  colorPalette?: string[];
}

export interface NotebookWork {
  id: string;
  image: string;
  title?: string;
  notes?: string;
  pageNumber: number;
}

export interface WritingFragment {
  id: string;
  image: string;
  title: string;
  category: "sketch" | "writing" | "symbol";
  snippet?: string;
}

export interface ExhibitionPhoto {
  id: string;
  image: string;
  caption: string;
  location: string;
  photographer?: string;
}

export const MAIN_PAINTINGS: Painting[] = [
  {
    id: "white-elephant",
    title: "White Elephant",
    year: "2026",
    dimensions: "80 × 60 cm",
    medium: "Acrylic on canvas",
    description: "The freedom to wander into the worlds within us. As kids everything felt big. Especially the grown-ups. We longed to be lifted up, perhaps we just wanted to feel a little closer to the sky.",
    image: "/paintings/white-elephant.jpg",
    isMainHighlight: true,
    editionDetails: "Original canvas & limited archival prints available (50 editions)",
    priceNote: "Inquire for original & archival prints",
    colorPalette: ["#A48CB8", "#FFFFFF", "#1E1E28", "#596855"]
  },
  {
    id: "edge-of-the-universe",
    title: "Edge of the Universe",
    year: "2026",
    dimensions: "130 × 100 cm",
    medium: "Acrylic on canvas",
    description: "A conversation that feels like being on the edge of the universe.",
    image: "/paintings/edge-of-the-universe.jpg",
    isMainHighlight: true,
    editionDetails: "Museum-scale original canvas. Archival Giclée posters available.",
    priceNote: "Inquire for availability",
    colorPalette: ["#6398A8", "#223B49", "#D9AE43", "#121820"]
  },
  {
    id: "deep-sea",
    title: "Deep Sea",
    year: "2026",
    dimensions: "60 × 50 cm",
    medium: "Acrylic on canvas",
    description: "When we have been in deep sea for too long, we learn to float. To rest. To breathe for a second. And maybe it is enough for now?",
    image: "/paintings/deep-sea.jpg",
    isMainHighlight: true,
    editionDetails: "Original acrylic on canvas & limited poster prints",
    priceNote: "Available for acquisition",
    colorPalette: ["#16283C", "#3C6382", "#A4BFCB", "#E8EFF4"]
  },
  {
    id: "last-cup-of-coffee",
    title: "Last Cup of Coffee",
    year: "2023",
    dimensions: "88 × 58 cm",
    medium: "Acrylic mix oil on canvas",
    description: "Looking for God within while clinging to the last cup of coffee. When the norms of this world does not fit anymore fear sneaks in while letting it die.",
    image: "/paintings/last-cup-of-coffee.jpg",
    isMainHighlight: true,
    editionDetails: "Original mixed media. Archival cotton rag poster.",
    priceNote: "Inquire for collector details",
    colorPalette: ["#234A74", "#4A8BB8", "#121A21", "#D6B278"]
  },
  {
    id: "dirty-pink",
    title: "Dirty Pink",
    year: "2025",
    dimensions: "65 × 50 cm",
    medium: "Acrylic on canvas",
    description: "What to do to find the quiet corner of one's heart?",
    image: "/paintings/dirty-pink.jpg",
    isMainHighlight: true,
    editionDetails: "Original framed painting & signed posters",
    priceNote: "Inquire for price & print edition",
    colorPalette: ["#D88DAA", "#B9D4C8", "#1A2624", "#F4E0E8"]
  },
  {
    id: "glitch",
    title: "Glitch",
    year: "2024",
    dimensions: "61.5 × 43 cm",
    medium: "Acrylic on wooden board",
    description: "For a moment, I glitched. Have we forgotten?",
    image: "/paintings/glitch.jpg",
    isMainHighlight: true,
    editionDetails: "Hand-crafted wooden board piece & archival posters",
    priceNote: "Inquire for availability",
    colorPalette: ["#26384C", "#53738C", "#E2E8EE", "#0F1620"]
  },
  {
    id: "white-plate",
    title: "White Plate",
    year: "2024",
    dimensions: "18 × 24 cm",
    medium: "Acrylic on canvas",
    description: "I wonder if I still remember the depth, the weightlessness, the quiet of belonging somewhere vast. How did I end up being so far away from it?",
    image: "/paintings/white-plate.jpg",
    isMainHighlight: true,
    editionDetails: "Intimate study on canvas & limited small format prints",
    priceNote: "Inquire for acquisition",
    colorPalette: ["#3D596D", "#E4DEC9", "#0E1116", "#5C7E95"]
  },
  {
    id: "home",
    title: "Home",
    year: "2024",
    dimensions: "30 × 20 cm",
    medium: "Acrylic on canvas",
    description: "I recognize everything from my childhood. The vase is still a vase. The cup is still a cup. Everything is where it belongs. Except me.",
    image: "/paintings/home.jpg",
    isMainHighlight: true,
    editionDetails: "Original acrylic on canvas & archival posters",
    priceNote: "Inquire for availability",
    colorPalette: ["#E2DAC8", "#2F4F70", "#8A3B2B", "#17181D"]
  },
  {
    id: "blue",
    title: "Blue",
    year: "2024",
    dimensions: "60 × 50 cm",
    medium: "Acrylic on canvas",
    description: "Where the moon shines, even when the world goes dark.",
    image: "/paintings/blue.jpg",
    isMainHighlight: true,
    editionDetails: "Original canvas & numbered museum poster edition",
    priceNote: "Inquire for availability",
    colorPalette: ["#246E98", "#122A3E", "#E6F3FA", "#63A8C7"]
  },
  {
    id: "still-here-2021",
    title: "2021 (I'm Still Here)",
    year: "2021",
    dimensions: "60 × 60 cm",
    medium: "Acrylic on canvas & sculpted frame",
    description: "i'm still here. Do not search for pieces of yourself.",
    image: "/paintings/still-here-2021.png",
    isMainHighlight: true,
    editionDetails: "Sculptural folded canvas on stretcher bar & art prints",
    priceNote: "Private collection / prints available",
    colorPalette: ["#141416", "#9EAE9E", "#D5B185", "#EBEAE6"]
  }
];

export const EXHIBITION_INFO = {
  past: [
    {
      title: "BETWEEN WORLDS",
      date: "5 September 2026",
      gallery: "Barnab Gallery",
      city: "Kutaisi, Georgia",
      description: "A solo exhibition showcasing recent paintings, folded canvas pieces, and poetic studies exploring memory, foreignness, and belonging between Denmark and Georgia.",
      collaborators: [
        { role: "Gallery Host", name: "Barnab Gallery" },
        { role: "Videographer & Documentation", name: "Dea Shalamberidze" }
      ],
      heroImage: "/exhibition/_DSC1524.JPG",
      atmosphereImage: "/exhibition/EF27FDBF-235F-48C7-A002-9F80DE75077C.jpg"
    }
  ],
  upcoming: [
    {
      title: "FRAGMENTS",
      date: "28 November 2026",
      gallery: "Barnab Gallery",
      city: "Kutaisi, Georgia",
      focus: "Photoart & Videoart Installation",
      note: "An experimental synthesis of moving images, analog photographs, and poetic voice notes."
    },
    {
      title: "Christmas Group Exhibition",
      date: "15 – 17 January 2027",
      gallery: "Barnab Gallery",
      city: "Kutaisi, Georgia",
      focus: "Winter Showcase & Salon",
      note: "Selected winter pieces and intimate sketchbook works."
    },
    {
      title: "Weekly Creative Workshops",
      date: "Recurring Weekly 2026–2027",
      gallery: "Barnab Gallery Atelier",
      city: "Kutaisi, Georgia",
      focus: "Painting, Stream-of-Consciousness & Visual Diaries",
      note: "Guided intimate studio sessions exploring personal inner worlds and intuitive mark-making."
    }
  ]
};

export const ARTIST_INFO = {
  name: "Keso",
  tagline: "Rooms Within — A Collection of Inner Worlds",
  statement: "Just a Danish/Georgian girl. My work is a way of exploring what it means to belong, to remember and to exist between worlds.",
  bio: `Working between Denmark and Georgia, Keso's paintings exist as intimate thresholds between the physical space we inhabit and the unspoken interior realms we carry.

Employing acrylics, oil mixes, raw pigments, and tactile canvas manipulations, her works are populated by silent sentinels—elongated horses, hovering celestial fish, weeping pools of coffee, and floating mermaids searching for air.

Each room in this digital sanctuary is an invitation to pause, breathe, and dwell in the quiet corner of one's heart.`,
  instagram: "@platform888",
  instagramUrl: "https://instagram.com/platform888",
  location: "Kutaisi, Georgia & Denmark",
  disciplines: ["Acrylic Painting", "Sculptural Canvas", "Visual Poetry", "Sketches & Notebooks"]
};
