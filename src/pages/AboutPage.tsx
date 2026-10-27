import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualShowcase } from '../components/VisualShowcase';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Eye,
  Target,
  Wrench,
  GraduationCap,
  Cpu,
  Compass,
  Microscope,
  LifeBuoy,
  Layers,
  FileCheck,
  MapPin
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About MOBNET | Mobile Hardware & Software Training Institute';
  }, []);

  const trainingSteps = [
    {
      number: '01',
      title: 'Foundations',
      description: 'Mobile components, hardware fundamentals and schematic diagrams.',
      detail: 'Resistors, capacitors, coils, diodes, cold and hot testing methods using digital multimeters, and reading circuit traces.'
    },
    {
      number: '02',
      title: 'Hands-On Practice',
      description: 'Real-device repair and practical bench work.',
      detail: 'Individual workstations to disassemble, solder sub-boards, charging ports, audio connectors, and combo displays.'
    },
    {
      number: '03',
      title: 'Advanced IC Work',
      description: 'IC reballing, double-decker ICs and advanced board-level repair.',
      detail: 'Micro-soldering under trinocular microscopes, thermal imaging for short clearance, and underfill BGA IC replacement.'
    },
    {
      number: '04',
      title: 'Software & Network',
      description: 'Boot problems, dead-mobile recovery and 4G/5G troubleshooting.',
      detail: 'EDL 9008 flashing, Fastboot/DFU recovery, FRP unlocking, and Baseband/RF transceiver circuit debugging.'
    },
    {
      number: '05',
      title: 'Certificate & Support',
      description: 'Course completion certificate and post-course support.',
      detail: 'Official institute course completion certificate with ongoing online and offline technical assistance for tricky client repairs.'
    }
  ];

  const teamMembers = [
    {
      name: 'Md Noshad Khan',
      role: 'Managing Director',
      initials: 'NK',
      accentColor: 'bg-[#292F91]',
    },
    {
      name: 'Md. Imamuddin (Imam)',
      role: 'Director',
      initials: 'MI',
      accentColor: 'bg-[#D9272E]',
    },
    {
      name: 'Manmat Kumar (Mahi)',
      role: 'Senior Faculty',
      initials: 'MK',
      accentColor: 'bg-[#292F91]',
    },
    {
      name: 'Rashid Khan',
      role: 'Senior Faculty',
      initials: 'RK',
      accentColor: 'bg-[#1E2368]',
    },
  ];

  const whyChooseItems = [
    {
      title: 'Practical Learning',
      icon: <Wrench className="w-5 h-5 text-[#292F91]" />,
      description: 'Hands-on practice on live phone motherboards and genuine diagnostic bench equipment.',
    },
    {
      title: 'Expert Guidance',
      icon: <GraduationCap className="w-5 h-5 text-[#D9272E]" />,
      description: 'Experienced faculty teaching real-world schematic tracing and micro-soldering methods.',
    },
    {
      title: 'Skill Development',
      icon: <Cpu className="w-5 h-5 text-[#292F91]" />,
      description: 'Step-by-step progress from fundamental circuits to micro-BGA reballing and CPU work.',
    },
    {
      title: 'Career Support',
      icon: <Compass className="w-5 h-5 text-[#D9272E]" />,
      description: 'Practical business orientation on shop setup, tool procurement, and spare parts sourcing.',
    },
    {
      title: 'Modern Learning Environment',
      icon: <Microscope className="w-5 h-5 text-[#292F91]" />,
      description: 'Dedicated workstations with trinocular microscopes, hot air rework stations, and DC meters.',
    },
    {
      title: 'Student Support',
      icon: <LifeBuoy className="w-5 h-5 text-[#292F91]" />,
      description: 'Free demo classes prior to admission and continued online/offline troubleshooting assistance.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* SECTION 1 — PAGE HERO */}
      <div className="bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <Breadcrumb items={[{ label: 'About' }]} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#292F91] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span>Institute Profile</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292F91] tracking-tight font-heading">
                About MOBNET
              </h1>

              <p className="text-base sm:text-lg text-[#333333] leading-relaxed max-w-2xl font-medium">
                A Dhanbad-based institute building job-ready mobile hardware and software technicians.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-md bg-slate-900 text-white group">
                <div
                  className="relative h-72 sm:h-80 w-full overflow-hidden bg-cover bg-center flex flex-col justify-between p-5"
                  style={{ backgroundImage: `url('/assets/aistudio/IMG_20261024_134243_1a464b0d.jpg')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#292F91]/90 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                      <span>Training Lab</span>
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black/60 text-white backdrop-blur-xs border border-white/20">
                      Bank More, Dhanbad
                    </span>
                  </div>

                  {/* Bottom Heading Lockup */}
                  <div className="relative z-10">
                    <h3 className="font-heading font-extrabold text-white text-base sm:text-lg drop-shadow-md">
                      MOBNET International Practical Laboratory
                    </h3>
                    <p className="text-xs text-slate-200 mt-1 leading-snug drop-shadow-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D9272E] shrink-0" />
                      <span>109, 1st Floor, Urmila Tower &middot; Hardware &amp; Software Workstations</span>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 px-4 py-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="text-slate-300">Live Repair Workbenches</span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Genuine Training Facility
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 — INSTITUTE INTRODUCTION */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                About MOBNET International
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292F91] font-heading leading-tight">
              Skills That Open Doors in the Mobile Industry
            </h2>

            <div className="text-base sm:text-lg text-[#333333] leading-relaxed space-y-4">
              <p>
                MOBNET International, a division of SMTM Pvt. Ltd., is a mobile repairing institute located at Urmila Tower, Bank More, Dhanbad. Training covers mobile hardware fundamentals through advanced chip-level repair.
              </p>
              <p className="text-sm sm:text-base text-[#6B7280]">
                We offer a flagship two-month Advance Mobile Hardware &amp; Software Course designed to take candidates from basic multimeter testing to intricate logic board repair. To ensure students can experience our lab atmosphere and instructional style first-hand, we provide free demo classes before enrollment. Every admitted student benefits from lifetime backup support, available both online and offline, ensuring continued guidance when tackling difficult smartphone faults in real-world repair shops.
              </p>
            </div>

            {/* Registration & ISO Verification Strip */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F5F7FB] border border-[#E5E7EB] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#292F91] block text-sm font-semibold">
                    ISO 9001:2015 Certified
                  </strong>
                  <span className="text-[#6B7280]">
                    Quality management certification for technical vocational training standard (*Subject to verification).
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F7FB] border border-[#E5E7EB] flex items-start gap-3">
                <Award className="w-5 h-5 text-[#292F91] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-[#292F91] block text-sm font-semibold">
                    Government Registration No. 013881
                  </strong>
                  <span className="text-[#6B7280]">
                    Officially registered educational business entity under SMTM Pvt. Ltd. (*Subject to verification).
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — VISION AND MISSION (Two Balanced Cards) */}
      <section className="py-14 lg:py-18 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#292F91]">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  Our Vision
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#292F91] font-heading">
                  “To be a trusted centre for mobile technology training, developing skilled technicians and confident entrepreneurs.”
                </h3>
              </div>
              <p className="text-xs text-[#6B7280] pt-4 border-t border-[#E5E7EB]">
                Fostering technical self-reliance and entrepreneurship throughout Dhanbad and Eastern India.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#D9272E]">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#D9272E]">
                  Our Mission
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#333333] font-heading">
                  “To provide practical, job-oriented mobile hardware and software training from basic to advanced levels, supported by experienced faculty, real tools and continued learning support.”
                </h3>
              </div>
              <p className="text-xs text-[#6B7280] pt-4 border-t border-[#E5E7EB]">
                Delivering disciplined hands-on learning with zero compromise on workbench competence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR TRAINING APPROACH (Five-Step Timeline) */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Methodology
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292F91] font-heading tracking-tight">
              Our Training Approach
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
              A disciplined, step-by-step progression designed to build solid confidence on complex mobile circuitry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {trainingSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#F5F7FB] p-6 rounded-xl border border-[#E5E7EB] relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-[#D9272E] mb-2">
                    STEP {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-[#292F91] font-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-[#333333] mb-3 leading-snug">
                    {step.description}
                  </p>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — OUR TEAM (Four Staff Profile Cards) */}
      <section className="py-16 lg:py-20 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Institute Leadership &amp; Faculty
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292F91] font-heading tracking-tight">
              Our Team
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
              Dedicated leadership and senior training faculty guiding technical instruction at MOBNET International.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E5E7EB] p-6 text-center shadow-xs space-y-4 hover:border-slate-300 transition-colors"
              >
                {/* Clean initials-based profile placeholder without invented photos */}
                <div className="w-20 h-20 mx-auto rounded-full bg-[#292F91] text-white flex items-center justify-center font-bold text-xl font-heading shadow-xs">
                  {member.initials}
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#333333] font-heading">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D9272E] mt-1 uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] text-[11px] text-[#6B7280]">
                  MOBNET International &middot; Dhanbad
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHY MOBNET */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Core Advantages
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292F91] font-heading tracking-tight">
              Why MOBNET
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
              Real-world laboratory competence, clear instruction, and reliable post-course guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F5F7FB] p-6 rounded-xl border border-[#E5E7EB] space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#292F91] font-heading">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — LABORATORY */}
      <section className="py-16 lg:py-20 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                  Infrastructure
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
                Laboratory &amp; Equipment
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Equipped with individual repair benches, microscopes, SMD rework stations and diagnostic software dongles.
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
            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs">
              <VisualShowcase
                type="microscope"
                title="Microscope Workstations"
                badge="Micro-Soldering"
              />
              <div className="p-4">
                <h4 className="text-sm font-bold text-[#292F91] font-heading">
                  Trinocular Microscopes
                </h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  High-magnification stereo lenses for precision micro-soldering and trace repair.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs">
              <VisualShowcase
                type="tools"
                title="Testing & Diagnostic Tools"
                badge="Hardware Lab"
              />
              <div className="p-4">
                <h4 className="text-sm font-bold text-[#292F91] font-heading">
                  DC Power Supplies &amp; Rework
                </h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  Regulated DC power supplies to locate circuit shorts and digital hot-air guns.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs">
              <VisualShowcase
                type="software"
                title="Software Flashing Workstation"
                badge="Software Desk"
              />
              <div className="p-4">
                <h4 className="text-sm font-bold text-[#292F91] font-heading">
                  Official Software Suites
                </h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  Dongles and diagnostic tools for EDL 9008 flashing, Fastboot and FRP unlocking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#292F91] rounded-2xl text-white p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Begin Your Training</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
                Start Your Journey With MOBNET
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Join our upcoming batch at Urmila Tower, Bank More, Dhanbad. Experience our lab in person or register online to begin your hands-on mobile repair training.
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
                  href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20would%20like%20to%20know%20more%20about%20your%20training%20batches%20and%20admission."
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
