import { Course } from '../types';

export const COURSES_DATA: Course[] = [
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
    visualType: 'hero-lab'
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
    visualType: 'tools'
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
    visualType: 'microscope'
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
    visualType: 'tools'
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
    visualType: 'tools'
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
    visualType: 'tools'
  }
];

// Helper to look up course by slug or ID
export const getCourseBySlug = (slug: string): Course | undefined => {
  const normalized = slug.toLowerCase().trim();
  return COURSES_DATA.find(
    (c) =>
      c.slug.toLowerCase() === normalized ||
      c.id.toLowerCase() === normalized ||
      (normalized === 'mobile-repairing-course-notes' && c.slug === 'mobile-repairing-notes') ||
      (normalized === 'mobile-repairing-notes' && c.id === 'mobile-repairing-course-notes')
  );
};
