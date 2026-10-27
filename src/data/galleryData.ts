export interface GalleryPhoto {
  id: string;
  topicNumber: number;
  title: string;
  category: 'general' | 'campus' | 'hardware' | 'training';
  description: string;
  badge: string;
  altText: string;
  visualType: 'hero-lab' | 'microscope' | 'software' | 'tools' | 'iphone' | 'reballing';
  imageUrl?: string;
  location?: string;
}

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'gallery-1',
    topicNumber: 1,
    title: 'Campus Building',
    category: 'campus',
    description: '109, 1st Floor, Urmila Tower commercial complex located in the heart of Bank More, Dhanbad.',
    badge: 'Campus Facility',
    altText: 'Urmila Tower building in Bank More Dhanbad housing MOBNET International institute',
    visualType: 'tools',
    imageUrl: '/assets/aistudio/IMG_20261024_134321_21b92a37.jpg',
    location: '109, 1st Floor, Urmila Tower, Bank More, Dhanbad'
  },
  {
    id: 'gallery-2',
    topicNumber: 2,
    title: 'Rework and Testing Equipment',
    category: 'hardware',
    description: 'SMD hot air rework guns, regulated 30V/5A DC power supplies, and short-killer circuit testers.',
    badge: 'Hardware Bench',
    altText: 'Digital SMD rework station and DC power supply on mobile repair workbench',
    visualType: 'tools',
    imageUrl: '/assets/aistudio/IMG_20261024_134237_ccc0e82f.jpg',
    location: 'Practical Hardware Lab, Bank More, Dhanbad'
  },
  {
    id: 'gallery-3',
    topicNumber: 3,
    title: 'Welcome Area',
    category: 'general',
    description: 'Front welcome desk, student reception, and admission counseling counter at MOBNET International institute.',
    badge: 'Welcome Area',
    altText: 'Welcome Area and student reception desk at MOBNET International institute Dhanbad',
    visualType: 'tools',
    imageUrl: '/assets/aistudio/mobnet_329b81e6.webp',
    location: '109, 1st Floor, Urmila Tower, Bank More, Dhanbad'
  },
  {
    id: 'gallery-4',
    topicNumber: 4,
    title: 'CHIP-LEVEL MOBILE BOARD REPAIR',
    category: 'hardware',
    description: 'Micro-soldering logic board tracks, power rails, and microscopic jumper wire connections.',
    badge: 'Chip-Level',
    altText: 'CHIP-LEVEL MOBILE BOARD REPAIR at MOBNET International Practical Laboratory Training',
    visualType: 'microscope',
    imageUrl: '/assets/aistudio/mobnet_fb02db06.webp',
    location: '109, 1st Floor, Urmila Tower, Bank More, Dhanbad'
  },
  {
    id: 'gallery-5',
    topicNumber: 5,
    title: 'Hands-on Device Repair',
    category: 'training',
    description: 'Practical device disassembly, combo display replacement, and battery diagnostics on handsets.',
    badge: 'Practical Training',
    altText: 'Student repairing mobile phone touchscreen and display assembly on workbench',
    visualType: 'hero-lab',
    imageUrl: '/assets/aistudio/IMG_20261024_134251_5fa89ba3.jpg',
    location: 'Hands-on Repair Station, Bank More, Dhanbad'
  },
  {
    id: 'gallery-6',
    topicNumber: 6,
    title: 'Students at Their Repair Benches',
    category: 'training',
    description: 'Individual training workstations with dedicated microscopes and soldering tools for each student.',
    badge: 'Classroom Lab',
    altText: 'Students practicing motherboard troubleshooting at individual laboratory benches',
    visualType: 'hero-lab',
    imageUrl: '/assets/aistudio/IMG_20261024_134243_1a464b0d.jpg',
    location: 'Classroom Training Lab, Bank More, Dhanbad'
  },
  {
    id: 'gallery-7',
    topicNumber: 7,
    title: 'Microscope-Assisted Board Repair',
    category: 'hardware',
    description: 'High-magnification trinocular optical inspection for delicate 0.02mm micro-jumpers and IC alignment.',
    badge: 'Optical Bench',
    altText: 'Trinocular stereo microscope focused on micro-IC chip on smartphone circuit board',
    visualType: 'microscope',
    imageUrl: '/assets/aistudio/IMG_20261024_134237_ccc0e82f.jpg',
    location: 'Trinocular Microscope Bench, Dhanbad'
  },
  {
    id: 'gallery-8',
    topicNumber: 8,
    title: 'BGA Chips on a Mobile Board',
    category: 'hardware',
    description: 'Precision BGA IC stencil alignment, solder paste application, and heat profile reballing.',
    badge: 'BGA Reballing',
    altText: 'BGA Chips on a Mobile Board at MOBNET International Practical Laboratory Training',
    visualType: 'reballing',
    imageUrl: '/assets/aistudio/mobnet_3fc99a5f.webp',
    location: '109, 1st Floor, Urmila Tower, Bank More, Dhanbad'
  },
  {
    id: 'gallery-9',
    topicNumber: 9,
    title: 'Circuit Testing with a Multimeter',
    category: 'training',
    description: 'Measuring diode values, cold testing, and hot live voltage tracing to detect open or short lines.',
    badge: 'Diagnostics',
    altText: 'Digital multimeter probes checking diode reading on smartphone motherboard test points',
    visualType: 'tools',
    imageUrl: '/assets/aistudio/IMG_20261024_134215_de481772.jpg',
    location: 'Circuit Testing Station, Bank More, Dhanbad'
  }
];
