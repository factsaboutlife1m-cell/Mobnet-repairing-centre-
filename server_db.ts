import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.resolve(DATA_DIR, 'mobnet_store.json');

// Interface definitions
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'Super Admin' | 'Admin';
  salt: string;
  passwordHash: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AdminSession {
  token: string;
  adminId: string;
  createdAt: number;
  expiresAt: number;
  ip: string;
}

export interface AdmissionRecord {
  id: string; // e.g. MOBNET-ADM-2026-1234
  fullName: string;
  fatherName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  dateOfBirth: string;
  gender: string;
  qualification: string;
  selectedCourse: string;
  preferredBatch: string;
  hostelRequired: boolean;
  address: string;
  city: string;
  state: string;
  pincode: string;
  appliedAt: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Admitted' | 'Closed';
  notes: Array<{ id: string; author: string; text: string; createdAt: string }>;
  ip: string;
}

export interface InquiryRecord {
  id: string; // e.g. MOBNET-INQ-2026-1234
  name: string;
  phone: string;
  email?: string;
  message: string;
  receivedAt: string;
  isRead: boolean;
  notes: Array<{ id: string; author: string; text: string; createdAt: string }>;
  ip: string;
}

export interface CourseRecord {
  id: string;
  slug: string;
  title: string;
  category: 'hardware' | 'software' | 'chip-level' | 'master';
  duration: string;
  hasConfirmedDuration: boolean;
  practicalRatio: string;
  level: string;
  shortDescription: string;
  fullOverview: string;
  highlights: string[];
  modules: string[];
  toolsCovered: string[];
  skillsLearned: string[];
  practicalApproach: string;
  careerOpportunities: string[];
  faqs: Array<{ question: string; answer: string }>;
  visualType: 'hero-lab' | 'microscope' | 'software' | 'tools' | 'iphone' | 'reballing';
  isPublished: boolean;
  order: number;
}

export interface GalleryRecord {
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
  isPublished: boolean;
  order: number;
}

export interface TeamMemberRecord {
  id: string;
  name: string;
  role: string;
  initials: string;
  experience?: string;
  accentColor: string;
  order: number;
}

export interface SiteContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroTaglineHindi: string;
  aboutMission: string;
  whyChoosePoints: Array<{ title: string; description: string }>;
  admissionCtaHeading: string;
  admissionCtaText: string;
  footerNotice: string;
}

export interface InstituteSettings {
  instituteName: string;
  divisionInfo: string;
  regNumber: string;
  address: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  officeHours: string;
  googleMapsUrl: string;
  siteTitle: string;
  metaDescription: string;
}

export interface DatabaseSchema {
  admins: AdminUser[];
  sessions: AdminSession[];
  admissions: AdmissionRecord[];
  inquiries: InquiryRecord[];
  courses: CourseRecord[];
  gallery: GalleryRecord[];
  team: TeamMemberRecord[];
  content: SiteContent;
  settings: InstituteSettings;
}

// Password hashing utilities using crypto.scryptSync
export function hashPassword(password: string, salt?: string): { salt: string; hash: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, generatedSalt, 64);
  return {
    salt: generatedSalt,
    hash: derivedKey.toString('hex')
  };
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const derivedKey = crypto.scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(derivedKey.toString('hex'), 'hex');
  const hashBuffer = Buffer.from(hash, 'hex');
  if (keyBuffer.length !== hashBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(keyBuffer, hashBuffer);
}

// Seed default data
function getInitialData(): DatabaseSchema {
  const defaultAdminHash = hashPassword('Mobnet@Admin2026!');

  return {
    admins: [
      {
        id: 'admin-primary',
        email: 'admin@mobnetinternational.com',
        name: 'MOBNET Administrator',
        role: 'Super Admin',
        salt: defaultAdminHash.salt,
        passwordHash: defaultAdminHash.hash,
        createdAt: new Date().toISOString()
      }
    ],
    sessions: [],
    admissions: [],
    inquiries: [],
    courses: [
      {
        id: 'advance-mobile-hardware-software',
        slug: 'advance-mobile-hardware-software',
        title: 'Advance Mobile Hardware & Software Course (Basic to Advance)',
        category: 'master',
        duration: '2 Months',
        hasConfirmedDuration: true,
        practicalRatio: '85% Practical Lab / 15% Theory',
        level: 'Basic to Advance Master',
        shortDescription: 'Learn schematic diagrams, chip-level repair, IC reballing, eMMC/eMCP repairing, 4G/5G network troubleshooting and boot-related problems.',
        fullOverview: 'The flagship Advance Mobile Hardware & Software Course at MOBNET International is structured for beginners, intermediate repairers, and shop owners who wish to master modern smartphone technology. Starting with foundational electronics and multimeter diagnostics, the curriculum advances into microscopic circuit tracing with Borneo Schematics, BGA IC removal and reballing, power-rail short clearance, and complete Android/iOS software flashing.',
        highlights: [
          'Basic to advanced multi-layer motherboard tracing',
          'SMD component testing, soldering, and micro-jumpers',
          'Borneo Schematics & ZXW bitmap schematic reading',
          'Complete software flashing, EDL 9008, and FRP unlocking',
          'Free demo classes before admission',
          'Lifetime backup support (online and offline)'
        ],
        modules: [
          'Basic Electronics: Resistors, Capacitors, Coils, Diodes & Transistors',
          'Multimeter Diagnostics (Cold testing, Hot voltage testing & Diode value check)',
          'DC Power Supply current tracking and short circuit identification',
          'SMD Hot Air Rework station profiling and BGA IC reballing',
          'Power IC (PMIC), Charging IC, Audio IC & Backlight circuit fixing',
          'Double-decker CPU & RAM separation and reballing techniques',
          'eMMC / eMCP storage chip programming and dead boot recovery',
          'Android & iOS flashing, unlocking, FRP bypass, and baseband troubleshooting'
        ],
        toolsCovered: [
          'Stereo Trinocular Microscope',
          'Auto-Range Digital Multimeter',
          'Regulated DC Power Supply (30V / 5A)',
          'SMD Hot Air Rework Station',
          'C210 Micro-soldering Station',
          'Borneo Schematics / ZXW Software Dongle',
          'EDL 9008 Deep Flash Cables & Probes'
        ],
        skillsLearned: [
          'Reading and tracing smartphone circuit schematics and line impedance',
          'Diagnosing dead phones via DC power supply boot current draw (0-20mA, 50-100mA, 200mA)',
          'Removing and reballing microscopic BGA chips without overheating the logic board',
          '0.02mm insulated copper wire micro-jumpering under the microscope',
          'Flashing official firmware using Fastboot, EDL 9008, and recovery modes',
          'Unlocking Google FRP, screen passcodes, and restoring corrupt baseband'
        ],
        practicalApproach: 'Every student receives an individual bench equipped with a trinocular microscope and rework tools. You practice on live faulty Android and iPhone motherboards, diagnosing real hardware faults, locating shorted capacitors, and repairing broken tracks.',
        careerOpportunities: [
          'Establish your own independent mobile repair & service centre',
          'Senior chip-level hardware technician at multi-brand service centers',
          'Motherboard repair partner for regional smartphone retail shops'
        ],
        faqs: [
          {
            question: 'What is the confirmed duration of this course?',
            answer: 'The Advance Mobile Hardware & Software Course has a confirmed duration of 2 months.'
          },
          {
            question: 'Do I need prior electronics experience to enroll?',
            answer: 'No. The curriculum is built from basic electronics up to advance chip-level repair. Beginners are guided step-by-step.'
          },
          {
            question: 'Are demo classes available before enrollment?',
            answer: 'Yes, MOBNET International provides free demo classes so you can experience our lab equipment and teaching style.'
          },
          {
            question: 'What kind of support is provided after the course?',
            answer: 'All enrolled students receive lifetime online and offline backup support from our faculty whenever they encounter difficult faults in their shops.'
          },
          {
            question: 'How can I enquire about the fee structure?',
            answer: 'Course fees and installment options are transparently shared during in-person campus counseling or directly via our admissions WhatsApp line (96616 11350) to match your batch choice.'
          }
        ],
        visualType: 'hero-lab',
        isPublished: true,
        order: 1
      },
      {
        id: 'basic-mobile-repairing',
        slug: 'basic-mobile-repairing',
        title: 'Basic Mobile Repairing Course',
        category: 'hardware',
        duration: 'Flexible Schedule',
        hasConfirmedDuration: false,
        practicalRatio: '80% Practical Hands-On / 20% Theory',
        level: 'Foundational',
        shortDescription: 'Learn mobile hardware fundamentals, repair tools, safe disassembly and common display, charging, battery and speaker faults.',
        fullOverview: 'The Basic Mobile Repairing Course provides an accessible entry point for students desiring essential mobile repair capabilities. You will learn proper tool safety, heat pad disassembly for various smartphone frames, precision soldering of charging ports (Type-C and Micro-USB), microphone replacements, and touchscreen combo testing.',
        highlights: [
          'Safe smartphone disassembly without damaging internal flex cables',
          'Charging sub-board, Type-C, and micro-USB port soldering',
          'Combo display, touch glass, and battery replacements',
          'Multimeter continuity testing and battery boost activation',
          'Free demo classes prior to admission'
        ],
        modules: [
          'Smartphone Architecture & Mechanical Frame Types',
          'Repair Tools: screwdrivers, suction cups, pry picks, heating mats',
          'Soldering Iron Usage: replacing mics, vibrators, and charging ports',
          'Display Replacement: OLED, AMOLED, and IPS LCD testing & installation',
          'Battery Health Checking, manual boosting, and connector repair',
          'Audio Sections: diagnosing earpiece, loudspeaker, and microphone issues'
        ],
        toolsCovered: [
          'Precision Screwdriver Kit (Torx, Pentalobe, Phillips, Tri-Point)',
          'Constant-Temperature Heating Plate',
          'Adjustable Temperature Soldering Station',
          'Digital Multimeter for continuity checks',
          'Battery Activation & Booster Board'
        ],
        skillsLearned: [
          'Disassembling and assembling popular Android brands safely',
          'Desoldering damaged charging ports and soldering clean new connectors',
          'Testing and installing combo screens with clean adhesive application',
          'Using digital multimeters for voltage and continuity checks',
          'Replacing damaged cameras, fingerprint sensors, and antenna flexes'
        ],
        practicalApproach: 'Direct hands-on bench practice opening handsets, replacing worn connectors, testing replacement screens, and using soldering irons safely.',
        careerOpportunities: [
          'Mobile retail service technician',
          'Smartphone screen and battery replacement specialist',
          'Entry-level repair technician at retail electronics stores'
        ],
        faqs: [
          {
            question: 'Is this course suitable for complete beginners?',
            answer: 'Yes, this course requires no prior technical experience and focuses on foundational assembly and common component repairs.'
          },
          {
            question: 'Can I upgrade to the Advance Course later?',
            answer: 'Yes, students completing the basic course can transition seamlessly into the Chip-Level or Advance programs.'
          },
          {
            question: 'Are demo sessions available?',
            answer: 'Yes, free demo sessions are available at our Bank More, Dhanbad lab before admission.'
          }
        ],
        visualType: 'tools',
        isPublished: true,
        order: 2
      },
      {
        id: 'mobile-chip-level-repairing',
        slug: 'mobile-chip-level-repairing',
        title: 'Mobile Chip-Level Repairing Course',
        category: 'chip-level',
        duration: 'Intensive Practical Program',
        hasConfirmedDuration: false,
        practicalRatio: '90% Practical Bench Work',
        level: 'Advanced Chip-Level',
        shortDescription: 'Study schematic reading, shorting and power-section fault finding, IC reballing and black-pasted IC repair.',
        fullOverview: 'The Mobile Chip-Level Repairing Course is designed for technicians who want to elevate their capabilities from simple module swaps to intricate motherboard surgery. You will master reading multi-layer schematics, finding secondary leakage lines using thermal detection, clearing full and half shorts, removing black-glued/underfill ICs, and precision BGA reballing.',
        highlights: [
          'Trinocular stereo microscope micro-soldering (0.02mm jumpers)',
          'BGA IC glue cleaning, stencil paste alignment, and reballing',
          'Full short, half short, and secondary voltage leakage detection',
          'Schematic bitmap reading with Borneo Schematics and ZXW',
          'Lifetime backup support (online and offline)'
        ],
        modules: [
          'Multilayer PCB layer tracing and line impedance measuring',
          'Power Sequence: VPH_PWR, PMIC output rails, Reset, and Clock',
          'Underfill black glue & white glue IC extraction techniques',
          'Double-decker CPU & RAM separation and reballing',
          'Thermal imaging and short killer voltage injection',
          'RF section, WTR transceiver, and Audio Codec fault diagnosis'
        ],
        toolsCovered: [
          'Trinocular Stereo Microscope with 0.5X CTV',
          'Digital Temperature-Controlled SMD Rework Station',
          'C210 Micro-soldering Station with ultra-fine tips',
          'BGA Reballing Stencils for Qualcomm, MTK, Exynos',
          'Thermal Short Detector Camera',
          'Borneo Schematics Dongle'
        ],
        skillsLearned: [
          'Diagnosing short circuits without damaging surrounding sensitive chips',
          'Safely softening and scraping tough epoxy/black glue from IC edges',
          'Reballing BGA micro-ICs with uniform solder ball height',
          'Jumpering damaged PCB copper pads under 45X optical magnification',
          'Tracing I2C, SPI, and SPMI bus voltage lines systematically'
        ],
        practicalApproach: 'Dedicated microscope bench time working on real dead motherboards, tracking power lines, and replacing complex BGA ICs.',
        careerOpportunities: [
          'Specialist chip-level logic board technician',
          'Subcontract repairer handling difficult board jobs for other retail shops',
          'High-tier technical repair specialist'
        ],
        faqs: [
          {
            question: 'What level of soldering skill is required?',
            answer: 'Familiarity with basic soldering is helpful, but our instructors train you from fundamental micro-soldering up to BGA reballing.'
          },
          {
            question: 'Do we practice on actual motherboards?',
            answer: 'Yes, 90% of class time is spent working directly on live smartphone logic boards under microscopes.'
          },
          {
            question: 'How do I enquire about batch dates and fees?',
            answer: 'Please contact the institute directly at 96616 11350 or via WhatsApp for upcoming batch schedules and fee details.'
          }
        ],
        visualType: 'microscope',
        isPublished: true,
        order: 3
      },
      {
        id: 'laptop-repairing',
        slug: 'laptop-repairing',
        title: 'Laptop Repairing Course',
        category: 'hardware',
        duration: 'Modular Practical Program',
        hasConfirmedDuration: false,
        practicalRatio: '80% Practical Laboratory',
        level: 'Basic to Advance',
        shortDescription: 'Learn laptop hardware fundamentals, motherboard fault finding and common display, keyboard and charging problems.',
        fullOverview: 'The Laptop Repairing Course trains you on modern laptop logic boards, common rail 19V short finding, 3.3V/5V standby power section diagnosis, BIOS flash chip reprogramming, display flex repair, keyboard swapping, and thermal cooling overhaul.',
        highlights: [
          'Laptop schematic and boardview reading',
          '19V DC jack to charging IC power rail tracing',
          'Standby controller (3.3V / 5V) section debugging',
          'BIOS chip reading, writing, and clean ME region programming',
          'Free demo classes available'
        ],
        modules: [
          'Laptop Motherboard Architecture & Major Component Identification',
          'Power Sequence from DC Jack through MOSFETs to PCH/CPU',
          'Testing MOSFETs, Gate voltages, and current sensing resistors',
          'Screen replacements: 30-pin, 40-pin eDP, OLED, and hinge repairs',
          'BIOS Flash Programming with CH341A / RT809F programmers',
          'Overheating issues: fan cleaning, heat pipe testing, thermal paste'
        ],
        toolsCovered: [
          'Variable Voltage DC Laptop Power Supply with universal jack tips',
          'CH341A / RT809F BIOS Programmer',
          'Digital Multimeter',
          'Hot Air SMD Station'
        ],
        skillsLearned: [
          'Tracing laptop motherboard schematics with boardview software',
          'Finding 19V shorted ceramic capacitors using DC power supplies',
          'Programming SPI flash BIOS chips and repairing corrupted firmware',
          'Diagnosing charging faults and replacing charging ICs',
          'Replacing broken laptop hinges, touchpads, and keyboards'
        ],
        practicalApproach: 'Hands-on practice on real laptop motherboards (Dell, HP, Lenovo, Acer, Asus), diagnosing no-power, no-display, and auto-shutdown issues.',
        careerOpportunities: [
          'Laptop service centre technician',
          'IT hardware maintenance support engineer',
          'Independent computer & laptop service business owner'
        ],
        faqs: [
          {
            question: 'Are brand-specific schematics covered?',
            answer: 'Yes, we teach schematic and boardview reading applicable across major brands including Dell, HP, Lenovo, and Asus.'
          },
          {
            question: 'Do we learn BIOS programming?',
            answer: 'Yes, you learn how to desolder, read, write, and verify BIOS chips using hardware programmers.'
          }
        ],
        visualType: 'tools',
        isPublished: true,
        order: 4
      },
      {
        id: 'computer-hardware-troubleshooting',
        slug: 'computer-hardware-troubleshooting',
        title: 'Computer Hardware & Troubleshooting Course',
        category: 'hardware',
        duration: 'Modular Practical Program',
        hasConfirmedDuration: false,
        practicalRatio: '75% Practical Lab / 25% Theory',
        level: 'Beginner to Intermediate',
        shortDescription: 'Learn desktop assembly, upgrading, diagnostics and troubleshooting common hardware faults.',
        fullOverview: 'The Computer Hardware & Troubleshooting Course covers desktop PC building from individual components, SMPS testing, motherboard socket diagnosis, RAM/SSD installations, BIOS configuring, Windows OS deployment, driver setup, and network troubleshooting.',
        highlights: [
          'Complete desktop PC assembly from bare cabinet to working system',
          'SMPS pinout voltage checking and power supply testing',
          'Diagnosing POST beep codes and blue screen (BSOD) hardware faults',
          'OS installation, driver setup, and basic data recovery',
          'Free demo classes before admission'
        ],
        modules: [
          'Cabinet layout, motherboard form factors (ATX, Micro-ATX)',
          'Processor socket installation (Intel LGA & AMD AM4/AM5)',
          'Storage configuration: NVMe M.2 SSD, SATA SSD, and HDD setups',
          'Troubleshooting blue screen (BSOD), no display, and auto shutdown',
          'Basic LAN networking, crimping RJ45 connectors, and router setup'
        ],
        toolsCovered: [
          'SMPS Power Supply Tester',
          'Motherboard Debug / POST Card',
          'Anti-Static Wrist Strap & Tool Mat',
          'Network Cable Tester & RJ45 Crimper'
        ],
        skillsLearned: [
          'Assembling custom desktop systems with proper cable management',
          'Testing SMPS power supplies for Power-Good and correct voltages',
          'Resolving RAM compatibility, CMOS battery, and BIOS boot order issues',
          'Installing Windows and essential hardware drivers cleanly',
          'Crimping Ethernet cables and setting up local network file sharing'
        ],
        practicalApproach: 'Physical disassembly and assembly of desktop PCs, testing individual components, diagnosing real hardware error codes.',
        careerOpportunities: [
          'Desktop support technician',
          'Hardware support executive in educational institutes and offices',
          'Computer sales and assembly technician'
        ],
        faqs: [
          {
            question: 'Is software installation included in this course?',
            answer: 'Yes, operating system formatting, driver installation, and basic networking are covered.'
          },
          {
            question: 'Can beginners join this course?',
            answer: 'Yes, it is designed for students with no prior computer assembly background.'
          }
        ],
        visualType: 'tools',
        isPublished: true,
        order: 5
      },
      {
        id: 'mobile-repairing-notes',
        slug: 'mobile-repairing-notes',
        title: 'Mobile Repairing Course Notes',
        category: 'master',
        duration: 'Reference Material',
        hasConfirmedDuration: false,
        practicalRatio: 'Comprehensive Technical Reference',
        level: 'All Skill Levels',
        shortDescription: 'Study notes covering mobile repairing topics, circuit fault flowcharts, diode value tables, and schematic reading cheat sheets.',
        fullOverview: 'The Mobile Repairing Course Notes offer an exhaustive collection of technical study material, reference charts, and fault-finding cheat sheets compiled by senior MOBNET faculty. Topics cover fundamental component behavior, diode reading reference tables, power IC boot sequence flowcharts, EDL 9008 test point maps, and short-circuit clearance procedures.',
        highlights: [
          'Step-by-step cold and hot testing voltage charts',
          'Power IC, charging IC, and backlight circuit fault flowcharts',
          'Borneo Schematics and ZXW reading reference cheat sheets',
          'Complete software flashing test point (EDL 9008) guide'
        ],
        modules: [
          'Section 1: Fundamental Electronics Reference & Component Diode Values',
          'Section 2: Mobile Power IC Boot Sequence Checklist & Voltage Rails',
          'Section 3: Short Circuit Removal Flowchart (Full Short vs Secondary Leakage)',
          'Section 4: Android & iOS Flashing Error Codes & Solution Reference Guide',
          'Section 5: Daily shop tool checklist & wholesale spare parts supplier guidance'
        ],
        toolsCovered: [
          'Printed / Digital Technical Reference Handbook',
          'Schematic Bitmap Quick Reference Sheets',
          'Handset Specific Test Point Maps'
        ],
        skillsLearned: [
          'Quickly cross-referencing expected diode readings across major models',
          'Following structured fault flowcharts instead of random part replacement',
          'Interpreting DC power supply current readings against standard patterns',
          'Locating EDL 9008 pinouts for emergency Qualcomm recovery'
        ],
        practicalApproach: 'Used as an indispensable bench companion alongside live practical training and daily customer repairs.',
        careerOpportunities: [
          'Bench reference companion for active mobile repairing technicians',
          'Study preparation for technical trade qualifications'
        ],
        faqs: [
          {
            question: 'Are the course notes updated for modern 4G/5G handsets?',
            answer: 'Yes, the notes include schematics, diode values, and test point references for modern Android and iPhone platforms.'
          },
          {
            question: 'How can I obtain the study notes?',
            answer: 'Contact the MOBNET International admissions counter at Urmila Tower, Dhanbad or enquire via WhatsApp (96616 11350).'
          }
        ],
        visualType: 'tools',
        isPublished: true,
        order: 6
      }
    ],
    gallery: [
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
        isPublished: true,
        order: 1
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
        isPublished: true,
        order: 2
      },
      {
        id: 'gallery-3',
        topicNumber: 3,
        title: 'Welcome Area',
        category: 'general',
        description: 'Student reception, course syllabus counseling desk, and admission verification counter.',
        badge: 'Administration',
        altText: 'Student reception and counseling desk at MOBNET International institute',
        visualType: 'software',
        isPublished: true,
        order: 3
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
        location: '109, 1st Floor, Urmila Tower, Bank More, Dhanbad',
        isPublished: true,
        order: 4
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
        isPublished: true,
        order: 5
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
        isPublished: true,
        order: 6
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
        isPublished: true,
        order: 7
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
        location: '109, 1st Floor, Urmila Tower, Bank More, Dhanbad',
        isPublished: true,
        order: 8
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
        isPublished: true,
        order: 9
      }
    ],
    team: [
      {
        id: 'team-1',
        name: 'Md Noshad Khan',
        role: 'Managing Director',
        initials: 'NK',
        experience: '18+ Years Industry & Training Leadership',
        accentColor: 'bg-[#292F91]',
        order: 1
      },
      {
        id: 'team-2',
        name: 'Md. Imamuddin (Imam)',
        role: 'Director',
        initials: 'MI',
        experience: '15+ Years Technical Operations',
        accentColor: 'bg-[#D9272E]',
        order: 2
      },
      {
        id: 'team-3',
        name: 'Manmat Kumar (Mahi)',
        role: 'Senior Faculty',
        initials: 'MK',
        experience: 'Master of Schematic Diagnostics & Borneo Bitmaps',
        accentColor: 'bg-[#292F91]',
        order: 3
      },
      {
        id: 'team-4',
        name: 'Rashid Khan',
        role: 'Senior Faculty',
        initials: 'RK',
        experience: 'Specialist in Micro-Soldering & BGA IC Reballing',
        accentColor: 'bg-[#1E2368]',
        order: 4
      }
    ],
    content: {
      heroHeadline: 'Master Chip-Level Mobile Hardware & Software Repairing',
      heroSubheadline: "Jharkhand's premier practical training institute in Bank More, Dhanbad. Master smartphone schematics, micro-soldering, IC reballing, and eMMC/UFS flashing on live boards.",
      heroTaglineHindi: 'मोबाइल रिपेयरिंग सीखें - अपना भविष्य बनाएं',
      aboutMission: 'Empowering students and technicians across Eastern India with genuine chip-level diagnostic skills, modern lab equipment, and lifetime practical backup support.',
      whyChoosePoints: [
        {
          title: 'Individual Workstations',
          description: 'Every student gets their own trinocular microscope and rework tools.'
        },
        {
          title: '100% Practical Training',
          description: 'Practice on real faulty Android and iPhone motherboards.'
        },
        {
          title: 'Lifetime Backup Support',
          description: 'Ongoing technical troubleshooting guidance even after course completion.'
        },
        {
          title: 'ISO 9001:2015 Certified',
          description: 'Recognized industry certification and government registered training center.'
        }
      ],
      admissionCtaHeading: 'Ready to Launch Your Mobile Repairing Career?',
      admissionCtaText: 'Join Dhanbad’s leading mobile repair training institute. Walk into our Bank More lab for a free demo session today.',
      footerNotice: 'MOBNET International is an ISO 9001:2015 certified mobile hardware & software training institute. A Division of SMTM Pvt. Ltd.'
    },
    settings: {
      instituteName: 'MOBNET International',
      divisionInfo: 'A Division of SMTM Pvt. Ltd.',
      regNumber: 'ISO 9001:2015 & Govt. Reg. No. 013881*',
      address: '109, 1st Floor, Urmila Tower, Bank More, Dhanbad – 826001, Jharkhand',
      primaryPhone: '96616 11350',
      secondaryPhone: '70048 38409',
      whatsappNumber: '9661611350',
      email: 'contact@mobnetinternational.com',
      officeHours: 'Mon – Sat: 9:30 AM – 6:30 PM',
      googleMapsUrl: 'https://maps.google.com/?q=Urmila+Tower+Bank+More+Dhanbad+Jharkhand',
      siteTitle: 'MOBNET International | Mobile Repairing Institute Dhanbad',
      metaDescription: 'Learn mobile hardware, software, chip-level IC reballing and schematic tracing at MOBNET International Dhanbad. ISO 9001:2015 certified institute.'
    }
  };
}

// Persistent database singleton
class DatabaseManager {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure required fields exist in case of version bump
        const initial = getInitialData();
        return {
          admins: parsed.admins || initial.admins,
          sessions: parsed.sessions || [],
          admissions: parsed.admissions || [],
          inquiries: parsed.inquiries || [],
          courses: parsed.courses || initial.courses,
          gallery: parsed.gallery || initial.gallery,
          team: parsed.team || initial.team,
          content: parsed.content || initial.content,
          settings: parsed.settings || initial.settings,
        };
      }
    } catch (err) {
      console.error('Failed to parse database file, re-initializing store:', err);
    }

    const initial = getInitialData();
    this.saveDataDirect(initial);
    return initial;
  }

  private saveDataDirect(data: DatabaseSchema): void {
    try {
      const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  public save(): void {
    this.saveDataDirect(this.data);
  }

  public getData(): DatabaseSchema {
    return this.data;
  }

  // Admin and Session methods
  public findAdminByEmail(email: string): AdminUser | undefined {
    return this.data.admins.find((a) => a.email.toLowerCase() === email.toLowerCase().trim());
  }

  public findAdminById(id: string): AdminUser | undefined {
    return this.data.admins.find((a) => a.id === id);
  }

  public createSession(adminId: string, ip: string, rememberMe = false): string {
    // 7 days if rememberMe, else 24 hours
    const duration = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    const token = crypto.randomBytes(32).toString('hex');
    const session: AdminSession = {
      token,
      adminId,
      createdAt: Date.now(),
      expiresAt: Date.now() + duration,
      ip
    };
    // Purge expired sessions
    this.data.sessions = this.data.sessions.filter((s) => s.expiresAt > Date.now());
    this.data.sessions.push(session);
    this.save();
    return token;
  }

  public getSession(token: string): (AdminSession & { admin: AdminUser }) | null {
    const session = this.data.sessions.find((s) => s.token === token);
    if (!session || session.expiresAt < Date.now()) {
      if (session) {
        this.data.sessions = this.data.sessions.filter((s) => s.token !== token);
        this.save();
      }
      return null;
    }
    const admin = this.findAdminById(session.adminId);
    if (!admin) return null;
    return { ...session, admin };
  }

  public deleteSession(token: string): void {
    this.data.sessions = this.data.sessions.filter((s) => s.token !== token);
    this.save();
  }

  // Admissions methods
  public addAdmission(record: Omit<AdmissionRecord, 'status' | 'notes'>): AdmissionRecord {
    const fullRecord: AdmissionRecord = {
      ...record,
      status: 'New',
      notes: []
    };
    this.data.admissions.unshift(fullRecord);
    this.save();
    return fullRecord;
  }

  public updateAdmissionStatus(id: string, status: AdmissionRecord['status']): AdmissionRecord | null {
    const item = this.data.admissions.find((a) => a.id === id);
    if (!item) return null;
    item.status = status;
    this.save();
    return item;
  }

  public addAdmissionNote(id: string, author: string, text: string): AdmissionRecord | null {
    const item = this.data.admissions.find((a) => a.id === id);
    if (!item) return null;
    item.notes.push({
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      author,
      text: text.trim(),
      createdAt: new Date().toISOString()
    });
    this.save();
    return item;
  }

  public deleteAdmission(id: string): boolean {
    const prevLen = this.data.admissions.length;
    this.data.admissions = this.data.admissions.filter((a) => a.id !== id);
    if (this.data.admissions.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Inquiries methods
  public addInquiry(record: Omit<InquiryRecord, 'isRead' | 'notes'>): InquiryRecord {
    const fullRecord: InquiryRecord = {
      ...record,
      isRead: false,
      notes: []
    };
    this.data.inquiries.unshift(fullRecord);
    this.save();
    return fullRecord;
  }

  public markInquiryRead(id: string, isRead: boolean): InquiryRecord | null {
    const item = this.data.inquiries.find((i) => i.id === id);
    if (!item) return null;
    item.isRead = isRead;
    this.save();
    return item;
  }

  public addInquiryNote(id: string, author: string, text: string): InquiryRecord | null {
    const item = this.data.inquiries.find((i) => i.id === id);
    if (!item) return null;
    item.notes.push({
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      author,
      text: text.trim(),
      createdAt: new Date().toISOString()
    });
    this.save();
    return item;
  }

  public deleteInquiry(id: string): boolean {
    const prevLen = this.data.inquiries.length;
    this.data.inquiries = this.data.inquiries.filter((i) => i.id !== id);
    if (this.data.inquiries.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }
}

export const db = new DatabaseManager();
