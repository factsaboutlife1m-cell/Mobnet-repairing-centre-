import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { COURSES_DATA } from '../data/coursesData';
import {
  ShieldCheck,
  Clock,
  Wrench,
  LifeBuoy,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  GraduationCap,
  Microscope,
  Cpu,
  Compass,
  Laptop,
  Users,
  Layers,
  Sparkles,
  Building,
  MapPin
} from 'lucide-react';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'MOBNET International | Build Skills. Shape Your Future.';
  }, []);

  const whyChooseFeatures = [
    {
      title: 'Practical Learning',
      icon: <Wrench className="w-6 h-6 text-[#292F91]" />,
      description:
        'Hands-on training directly on live motherboards and faulty handsets. Practice testing lines, identifying dead faults, and soldering components without relying purely on chalkboard theory.',
    },
    {
      title: 'Expert Guidance',
      icon: <GraduationCap className="w-6 h-6 text-[#D9272E]" />,
      description:
        'Learn from experienced hardware instructors who guide you step-by-step through Borneo Schematics, ZXW bitmaps, and systematic voltage injection troubleshooting.',
    },
    {
      title: 'Skill Development',
      icon: <Cpu className="w-6 h-6 text-[#292F91]" />,
      description:
        'From micro-soldering 0.02mm insulated jumper wires to BGA IC glue cleaning and precision reballing, build tactile skills needed for modern 4G and 5G smartphone logic boards.',
    },
    {
      title: 'Career Support',
      icon: <Compass className="w-6 h-6 text-[#D9272E]" />,
      description:
        'Clear practical guidance on setting up an independent service centre, sourcing wholesale spare parts, choosing necessary lab tools, and realistic service price calculations.',
    },
    {
      title: 'Modern Learning Environment',
      icon: <Microscope className="w-6 h-6 text-[#292F91]" />,
      description:
        'Well-equipped workstations featuring stereo trinocular microscopes, digital auto-range multimeters, DC regulated power supplies, and temperature-controlled SMD rework stations.',
    },
    {
      title: 'Student Support',
      icon: <LifeBuoy className="w-6 h-6 text-[#292F91]" />,
      description:
        'Free demo classes before admission to inspect our practical lab, followed by post-course online and offline backup support whenever you encounter difficult handset faults.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* SECTION 2 — HERO */}
      <section className="bg-gradient-to-b from-red-50/70 via-red-50/30 to-white border-b border-red-100/60 pt-10 pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#292F91] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span>Welcome to MOBNET</span>
              </div>

              {/* Headline */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292F91] tracking-tight leading-tight font-heading"
                style={{ textWrap: 'balance' }}
              >
                Build Skills. Shape Your Future.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#333333] leading-relaxed max-w-2xl">
                Learn mobile hardware and software repairing, from the basics to advanced chip-level work, with hands-on practice and expert guidance.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/admission"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] shadow-xs hover:shadow transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9272E]"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20would%20like%20to%20enquire%20about%20mobile%20repairing%20courses%20and%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#292F91] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>

              {/* Hindi Tagline */}
              <div className="pt-2">
                <p className="text-sm sm:text-base font-semibold text-[#292F91] bg-[#F5F7FB] px-4 py-3 rounded-lg border-l-4 border-[#D9272E] inline-block">
                  “कौशल बढ़ाएं! रोजगार पाएं! अपना भविष्य आज ही बनाएं!”
                </p>
              </div>
            </div>

            {/* Right Column: Genuine Campus Building Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-lg bg-slate-900 text-white group">
                <div
                  className="relative h-80 sm:h-96 w-full overflow-hidden bg-cover bg-center flex flex-col justify-between p-5"
                  style={{ backgroundImage: `url('/assets/aistudio/IMG_20261024_134321_21b92a37.jpg')` }}
                >
                  {/* High Legibility Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#292F91]/90 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                      <span>Campus Building</span>
                    </span>
                  </div>

                  {/* Bottom Heading Lockup */}
                  <div className="relative z-10">
                    <h3 className="font-heading font-extrabold text-white text-lg sm:text-xl drop-shadow-md">
                      Urmila Tower, Bank More
                    </h3>
                    <p className="text-xs text-slate-200 mt-1 leading-snug drop-shadow-sm">
                      109, 1st Floor &middot; MOBNET International Training Institute
                    </p>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="bg-slate-950 px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#D9272E]" />
                    <span>Dhanbad Institute Campus</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Verified Location
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — TRUST STRIP */}
      <section className="bg-[#292F91] text-white py-6 border-b border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Block 1 */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-heading">ISO 9001:2015 Certified*</h4>
                <p className="text-xs text-blue-100 mt-0.5 leading-snug">
                  Quality management standard (*Subject to verification).
                </p>
              </div>
            </div>

            {/* Block 2 */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-heading">2-Month Flagship Course</h4>
                <p className="text-xs text-blue-100 mt-0.5 leading-snug">
                  Confirmed duration for comprehensive Advance Course.
                </p>
              </div>
            </div>

            {/* Block 3 */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                <Wrench className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-heading">Hands-On Practical Training</h4>
                <p className="text-xs text-blue-100 mt-0.5 leading-snug">
                  Individual microscopes, rework stations &amp; live boards.
                </p>
              </div>
            </div>

            {/* Block 4 */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                <LifeBuoy className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-heading">Lifetime Backup Support</h4>
                <p className="text-xs text-blue-100 mt-0.5 leading-snug">
                  Ongoing instructor guidance for complex client repairs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — ABOUT PREVIEW */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  About The Institute
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292F91] font-heading leading-tight">
                A Dhanbad institute built around real repair skills
              </h2>

              <p className="text-base text-[#333333] leading-relaxed">
                MOBNET International, a division of SMTM Pvt. Ltd., provides mobile hardware and software repair training from basic concepts to advanced chip-level work. Centrally located in Bank More, Dhanbad, we focus on genuine practical troubleshooting rather than theoretical lectures.
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-[#333333]">Basic-to-advanced curriculum</span>
                    <p className="text-xs text-[#6B7280]">Structured progressive modules from simple soldering to multi-layer BGA CPUs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-[#333333]">Practical lab sessions</span>
                    <p className="text-xs text-[#6B7280]">Daily dedicated bench time working with digital multimeters and rework tools.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-[#333333]">Free demo classes</span>
                    <p className="text-xs text-[#6B7280]">Experience our teaching methodology and lab environment before enrolling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-[#333333]">Online and offline backup support</span>
                    <p className="text-xs text-[#6B7280]">Consult instructors when solving challenging motherboard faults in your shop.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#292F91] hover:bg-[#1f2473] transition-colors shadow-xs"
                >
                  <span>Explore About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Illustration Stack */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="relative w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-cover bg-center text-white p-4 flex flex-col justify-between border border-blue-900/30 shadow-xs group"
                style={{ backgroundImage: `url('/assets/aistudio/IMG_20261024_134251_5fa89ba3.jpg')` }}
              >
                {/* High contrast gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/35 pointer-events-none" />

                {/* Top Badge Strip */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#292F91]/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs">
                    Lab Workstation
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/20">
                    Bank More, Dhanbad
                  </span>
                </div>

                {/* Center / Title */}
                <div className="relative z-10 my-auto">
                  <h4 className="font-heading font-extrabold text-sm text-white drop-shadow-md leading-snug">
                    MOBNET International Practical Laboratory Training
                  </h4>
                  <p className="text-[11px] text-slate-200 mt-1 drop-shadow-xs line-clamp-1">
                    Hands-on smartphone logic board repair
                  </p>
                </div>

                {/* Bottom Location & Facility Strip */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-200 pt-2 border-t border-white/20">
                  <span className="text-white font-medium flex items-center gap-1 text-[11px] truncate">
                    <MapPin className="w-3 h-3 text-[#D9272E] shrink-0" />
                    <span>Urmila Tower, Bank More, Dhanbad</span>
                  </span>
                  <span className="text-slate-300 text-[10px] shrink-0">Campus Lab</span>
                </div>
              </div>

              <div
                className="relative w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-cover bg-center text-white p-4 flex flex-col justify-between border border-blue-900/30 shadow-xs group"
                style={{ backgroundImage: `url('/assets/aistudio/mobnet_14f681f3.webp')` }}
              >
                {/* High contrast gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/35 pointer-events-none" />

                {/* Top Badge Strip */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#292F91]/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs">
                    DC Current Diagnostics
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/20">
                    Training Lab
                  </span>
                </div>

                {/* Center / Title */}
                <div className="relative z-10 my-auto">
                  <h4 className="font-heading font-extrabold text-sm text-white drop-shadow-md leading-snug">
                    DC Current Diagnostics
                  </h4>
                  <p className="text-[11px] text-slate-200 mt-1 drop-shadow-xs line-clamp-1">
                    MOBNET International Practical Laboratory Training
                  </p>
                </div>

                {/* Bottom Location & Facility Strip */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-200 pt-2 border-t border-white/20">
                  <span className="text-white font-medium flex items-center gap-1 text-[11px] truncate">
                    <MapPin className="w-3 h-3 text-[#D9272E] shrink-0" />
                    <span>Urmila Tower, Bank More, Dhanbad</span>
                  </span>
                  <span className="text-slate-300 text-[10px] shrink-0">Campus Lab</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — COURSES (Exact 6 Specified Cards) */}
      <section className="py-16 lg:py-20 bg-[#292F91] text-white border-t border-blue-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                Technical Programs
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              Our Vocational Training Courses
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100/90">
              From mobile hardware and chip-level diagnostics to laptop and PC repairing. Confirmed durations shown where applicable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES_DATA.map((course, index) => (
              <CourseCard key={course.id} course={course} featured={index === 0} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-blue-200 mb-4">
              * Official fee structures and installment options are shared directly during your counseling visit or via WhatsApp to match your preferred batch.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#292F91] bg-white hover:bg-blue-50 transition-colors shadow-xs"
            >
              <span>View Detailed Syllabus &amp; Modules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHY CHOOSE MOBNET (Six Icon Cards) */}
      <section className="py-16 lg:py-20 bg-[#292F91] text-white border-t border-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                The MOBNET Advantage
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              Why Choose MOBNET International
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Real-device practice, schematic reading, IC repair, and post-course support focused on practical skill building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseFeatures.map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-[#333333] p-6 rounded-xl border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#292F91] font-heading">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — LAB SHOWCASE (Learn by Doing) */}
      <section className="py-16 lg:py-20 bg-[#F5F7FB] border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  Practical Training Facility
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
                Learn by Doing
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Authentic training environments: repair benches, microscope-assisted logic board diagnostics, and SMD rework stations.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#292F91] hover:bg-[#1f2473] transition-colors shrink-0"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Workbench 1 */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs flex flex-col justify-between">
              <div
                className="relative w-full h-52 sm:h-56 overflow-hidden bg-cover bg-center text-white p-4 flex flex-col justify-between border-b border-[#E5E7EB] group"
                style={{ backgroundImage: `url('/assets/aistudio/IMG_20261024_134215_de481772.jpg')` }}
              >
                {/* High contrast gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/35 pointer-events-none" />

                {/* Top Badge Strip */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#292F91]/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs">
                    MICRO-SOLDERING BENCH
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/20">
                    Bank More, Dhanbad
                  </span>
                </div>

                {/* Center / Heading */}
                <div className="relative z-10 my-auto">
                  <h5 className="font-heading font-extrabold text-sm sm:text-base text-white drop-shadow-md leading-snug">
                    MOBNET International Practical Laboratory Training
                  </h5>
                  <p className="text-[11px] text-slate-200 mt-1 drop-shadow-xs line-clamp-1">
                    Microscope-Assisted Board Repair
                  </p>
                </div>

                {/* Bottom Location & Campus Strip */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-200 pt-2 border-t border-white/20">
                  <span className="text-white font-medium flex items-center gap-1 text-[11px] truncate">
                    <MapPin className="w-3 h-3 text-[#D9272E] shrink-0" />
                    <span>Urmila Tower, Bank More, Dhanbad</span>
                  </span>
                  <span className="text-slate-300 text-[10px] shrink-0">Campus Lab</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-bold text-[#292F91] font-heading">
                  Microscope-Assisted Board Repair
                </h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                  Individual student stations with trinocular microscopes, C210 precision tips, and live circuit tracing boards.
                </p>
              </div>
            </div>

            {/* Workbench 2 */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs flex flex-col justify-between">
              <div
                className="relative w-full h-52 sm:h-56 overflow-hidden bg-cover bg-center text-white p-4 flex flex-col justify-between border-b border-[#E5E7EB] group"
                style={{ backgroundImage: `url('/assets/aistudio/IMG_20261024_134237_ccc0e82f.jpg')` }}
              >
                {/* High contrast gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/35 pointer-events-none" />

                {/* Top Badge Strip */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#292F91]/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs">
                    HARDWARE LAB
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/20">
                    Bank More, Dhanbad
                  </span>
                </div>

                {/* Center / Heading */}
                <div className="relative z-10 my-auto">
                  <h5 className="font-heading font-extrabold text-sm sm:text-base text-white drop-shadow-md leading-snug">
                    MOBNET International Practical Laboratory Training
                  </h5>
                  <p className="text-[11px] text-slate-200 mt-1 drop-shadow-xs line-clamp-1">
                    Rework Stations &amp; Testing Equipment
                  </p>
                </div>

                {/* Bottom Location & Campus Strip */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-200 pt-2 border-t border-white/20">
                  <span className="text-white font-medium flex items-center gap-1 text-[11px] truncate">
                    <MapPin className="w-3 h-3 text-[#D9272E] shrink-0" />
                    <span>Urmila Tower, Bank More, Dhanbad</span>
                  </span>
                  <span className="text-slate-300 text-[10px] shrink-0">Campus Lab</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-bold text-[#292F91] font-heading">
                  Rework Stations &amp; Testing Equipment
                </h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                  Controlled hot air guns, DC power supplies with milliamp tracking, and short killer diagnostics for dead phones.
                </p>
              </div>
            </div>

            {/* Workbench 3 */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs flex flex-col justify-between">
              <div
                className="relative w-full h-52 sm:h-56 overflow-hidden bg-cover bg-center text-white p-4 flex flex-col justify-between border-b border-[#E5E7EB] group"
                style={{ backgroundImage: `url('/assets/aistudio/IMG_20261024_134243_1a464b0d.jpg')` }}
              >
                {/* High contrast gradient scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/35 pointer-events-none" />

                {/* Top Badge Strip */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#292F91]/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs">
                    Software Flashing &amp; Unlocking Desk
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/20">
                    Bank More, Dhanbad
                  </span>
                </div>

                {/* Center / Heading */}
                <div className="relative z-10 my-auto">
                  <h5 className="font-heading font-extrabold text-sm sm:text-base text-white drop-shadow-md leading-snug">
                    MOBNET International Practical Laboratory Training
                  </h5>
                  <p className="text-[11px] text-slate-200 mt-1 drop-shadow-xs line-clamp-1">
                    Live software diagnostic &amp; flashing workstations
                  </p>
                </div>

                {/* Bottom Location & Campus Strip */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-200 pt-2 border-t border-white/20">
                  <span className="text-white font-medium flex items-center gap-1 text-[11px] truncate">
                    <MapPin className="w-3 h-3 text-[#D9272E] shrink-0" />
                    <span>Urmila Tower, Bank More, Dhanbad</span>
                  </span>
                  <span className="text-slate-300 text-[10px] shrink-0">Campus Lab</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-bold text-[#292F91] font-heading">
                  Software Flashing &amp; Unlocking Desk
                </h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                  Dedicated computer workstations for EDL 9008 flashing, FRP account removal, and firmware restoration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — ADMISSION CTA */}
      <section className="py-16 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#292F91] rounded-2xl text-white p-8 sm:p-12 shadow-md relative overflow-hidden">
            {/* Background subtle circuit grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Admissions Open in Dhanbad</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
                Ready to Start Your Journey?
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Develop real repair skills with hands-on practice in mobile hardware, software, and chip-level troubleshooting. Attend a free demo class at our Bank More campus or apply online.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/admission"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20am%20ready%20to%20start%20my%20course%20and%20want%20to%20apply%20for%20admission."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#292F91] bg-white hover:bg-slate-100 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
