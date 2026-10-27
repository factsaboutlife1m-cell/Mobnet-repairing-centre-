import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualShowcase } from '../components/VisualShowcase';
import { COURSES_DATA } from '../data/coursesData';
import {
  Clock,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Wrench,
  GraduationCap,
  Sparkles,
  LifeBuoy,
  Cpu,
  Layers,
  PhoneCall,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Courses Built for a Repair Career | MOBNET International';
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Flagship Course Highlights
  const flagshipCurriculumPoints = [
    { title: 'Schematic Diagram Classes', desc: 'Read circuit bitmaps, trace diode values, and analyze component lines with Borneo Schematics & ZXW.' },
    { title: 'eMMC & eMCP Repairing', desc: 'ISP pinout direct soldering, partition health analysis, and dead boot restoration.' },
    { title: 'Touch, Graphic & CPU-Level Repair', desc: 'Fix backlight circuits, display driver ICs, touch screen controllers, and processor lines.' },
    { title: 'Double-Decker IC Work', desc: 'Upper RAM and lower CPU separation, temperature profiling, pad cleaning, and reballing.' },
    { title: 'IC Reballing & Black-Pasted IC Work', desc: 'Safe glue softening, razor extraction, and micro-stencil ball formation without damaging pads.' },
    { title: '4G and 5G Network Classes', desc: 'RF section diagnostics: WTR transceiver, power amplifier (PA), antenna switch, and baseband signals.' },
    { title: 'Boot Sequence & Dead-Mobile Troubleshooting', desc: 'Diagnose current consumption patterns on DC power supply to pinpoint dead handset causes.' },
    { title: 'Mobile Shorting Diagnosis', desc: 'Detect full shorts, half shorts, and secondary voltage leaks using thermal detection & short killer.' },
    { title: 'Mobile Accessories and Parts', desc: 'Practical knowledge of spare parts grades (OEM vs copy), connectors, batteries, and wholesale sourcing.' }
  ];

  const learningBenefits = [
    {
      title: 'Practical Lab Experience',
      icon: <Wrench className="w-6 h-6 text-[#292F91]" />,
      desc: 'Individual student workstations outfitted with stereoscopic trinocular microscopes, digital multimeters, regulated DC power supplies, and SMD rework stations.'
    },
    {
      title: 'Expert Guidance',
      icon: <GraduationCap className="w-6 h-6 text-[#D9272E]" />,
      desc: 'Direct instruction from seasoned hardware and software trainers with years of commercial logic board troubleshooting experience.'
    },
    {
      title: 'Free Demo Classes',
      icon: <Sparkles className="w-6 h-6 text-[#292F91]" />,
      desc: 'Attend a live demonstration session before registration to experience our practical teaching methodology and inspect our Dhanbad campus.'
    },
    {
      title: 'Lifetime Backup Support',
      icon: <LifeBuoy className="w-6 h-6 text-[#D9272E]" />,
      desc: 'Ongoing online and offline technical consultation when you encounter challenging handset faults in your independent service shop after completing the course.'
    }
  ];

  const faqs = [
    {
      question: 'What is the flagship course duration?',
      answer: 'The flagship Advance Mobile Hardware & Software Course (Basic to Advance) has a confirmed duration of 2 months.'
    },
    {
      question: 'Can beginners apply?',
      answer: 'Yes. Our curriculum is structured from the ground up, beginning with fundamental electronic components, safe tool handling, and basic soldering before advancing to chip-level repairs.'
    },
    {
      question: 'Are demo classes available?',
      answer: 'Yes, MOBNET International provides free demo classes so prospective candidates can evaluate the practical lab sessions and teaching style prior to formal enrollment.'
    },
    {
      question: 'How can I find out the fees?',
      answer: 'In accordance with verified institute policy, fee structures and installment options are transparently provided during campus counseling visits or directly by contacting the admissions desk via phone or WhatsApp. This ensures the fees accurately align with your chosen batch timing and optional hostel assistance.'
    },
    {
      question: 'How do I contact the institute?',
      answer: 'You can contact MOBNET International directly by phone at 96616 11350 or 70048 38409, message our admissions desk on WhatsApp, or visit our campus in person at 109, 1st Floor, Urmila Tower, Bank More, Dhanbad – 826001, Jharkhand.'
    }
  ];

  // Visual type mapper for courses
  const getVisualType = (id: string): 'hero-lab' | 'microscope' | 'software' | 'tools' => {
    if (id === 'advance-mobile-hardware-software') return 'microscope';
    if (id === 'mobile-chip-level-repairing') return 'microscope';
    if (id === 'laptop-repairing') return 'tools';
    if (id === 'computer-hardware-troubleshooting') return 'tools';
    if (id === 'mobile-repairing-course-notes') return 'tools';
    return 'software';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* SECTION 1 — HERO */}
      <div className="bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <Breadcrumb items={[{ label: 'Courses' }]} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#292F91] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span>Vocational Training Catalog</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292F91] tracking-tight font-heading">
              Courses Built for a Repair Career
            </h1>

            <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-medium">
              Explore practical training programmes designed to build mobile, laptop and computer repair skills.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2 — COURSE GRID (Six Responsive Course Cards) */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Available Offerings
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
              Comprehensive Course Programs
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Select a program to view details or apply directly with your chosen course preselected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES_DATA.map((course) => {
              const isFlagship = course.id === 'advance-mobile-hardware-software';
              const hasConfirmedDuration = isFlagship;

              return (
                <div
                  key={course.id}
                  className={`bg-white rounded-xl border flex flex-col justify-between overflow-hidden transition-all duration-200 ${
                    isFlagship
                      ? 'border-[#292F91] shadow-md ring-1 ring-[#292F91]/20'
                      : 'border-[#E5E7EB] hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div>
                    {/* Technical Visual Illustration Container */}
                    <div className="relative">
                      <VisualShowcase
                        type={getVisualType(course.id)}
                        title={course.title}
                        badge={course.category.toUpperCase()}
                        className="h-44 sm:h-48"
                      />
                    </div>

                    <div className="p-6 space-y-3">
                      {/* Unboxed Metadata (Zero-Pill Compliance) */}
                      <div className="flex items-center justify-between text-xs text-[#6B7280] pb-2 border-b border-[#E5E7EB]">
                        <span className="font-semibold uppercase tracking-wider text-[#292F91]">
                          {course.category}
                        </span>
                        {hasConfirmedDuration ? (
                          <span className="flex items-center gap-1 font-semibold text-[#D9272E]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Duration: 2 Months</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">Practical Module</span>
                        )}
                      </div>

                      {/* Course Title */}
                      <h3 className="text-lg font-bold text-[#292F91] font-heading leading-snug">
                        {course.title}
                      </h3>

                      {/* Course Description */}
                      <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                        {course.id === 'advance-mobile-hardware-software'
                          ? 'Learn schematic diagrams, chip-level repair, IC reballing, eMMC/eMCP repairing, 4G/5G network troubleshooting and boot-related problems.'
                          : course.id === 'basic-mobile-repairing'
                          ? 'Learn mobile hardware fundamentals, repair tools, safe disassembly and common display, charging, battery and speaker faults.'
                          : course.id === 'mobile-chip-level-repairing'
                          ? 'Study schematic reading, shorting and power-section fault finding, IC reballing and black-pasted IC repair.'
                          : course.id === 'laptop-repairing'
                          ? 'Learn laptop hardware fundamentals, motherboard fault finding and common display, keyboard and charging problems.'
                          : course.id === 'computer-hardware-troubleshooting'
                          ? 'Learn desktop assembly, upgrading, diagnostics and troubleshooting common hardware faults.'
                          : 'Study notes covering mobile repairing topics.'}
                      </p>

                      {/* Highlights */}
                      {isFlagship && (
                        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-[#292F91] space-y-1">
                          <div className="font-bold">Key Course Highlights:</div>
                          <div className="flex items-center gap-1.5 text-[#333333]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Free demo classes prior to admission</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#333333]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Lifetime backup support (online and offline)</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="p-5 bg-[#F5F7FB] border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                    <a
                      href={`https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20please%20share%20details%20for%20${encodeURIComponent(
                        course.title
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Ask via WhatsApp</span>
                    </a>

                    <Link
                      to={`/admission?course=${course.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — FLAGSHIP COURSE DETAILS */}
      <section className="py-16 lg:py-20 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#292F91]/20 shadow-md p-6 sm:p-10 lg:p-12 space-y-10">
            {/* Header Lockup */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#D9272E]">
                  <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
                  <span>Flagship 2-Month Training Program</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
                  Advance Mobile Hardware &amp; Software Course
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Basic to Advance syllabus designed for aspiring professionals and shop owners.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/admission?course=advance-mobile-hardware-software"
                  className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
                >
                  Apply for Flagship Course
                </Link>
                <a
                  href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20want%20details%20on%20the%20flagship%202-month%20Advance%20Mobile%20Hardware%20and%20Software%20Course."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg text-xs font-semibold text-[#292F91] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>

            {/* In-depth 9 Technical Curriculum Blocks */}
            <div>
              <h3 className="text-base font-bold text-[#292F91] uppercase tracking-wider font-heading mb-6">
                Key Technical Modules Included in the 2-Month Program:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {flagshipCurriculumPoints.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-[#F5F7FB] border border-[#E5E7EB] space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9272E]" />
                      <h4 className="text-sm font-bold text-[#292F91] font-heading">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — LEARNING BENEFITS */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Student Experience
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292F91] font-heading tracking-tight">
              Learning Benefits at MOBNET
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
              Built to provide true vocational confidence and long-term troubleshooting capability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-[#F5F7FB] p-6 rounded-xl border border-[#E5E7EB] space-y-3"
              >
                <div className="w-12 h-12 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shadow-xs">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-bold text-[#292F91] font-heading">
                  {benefit.title}
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FAQ */}
      <section className="py-16 lg:py-20 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Got Questions?
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292F91] font-heading">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              Clear, transparent answers grounded strictly in verified institute policies.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#292F91] font-heading hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#D9272E] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#333333] leading-relaxed border-t border-[#E5E7EB]/50 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#292F91]">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#D9272E]" />
              <span>Need more details on batch schedules or hostel facilities?</span>
            </div>
            <a
              href="tel:9661611350"
              className="font-bold underline hover:text-[#D9272E] shrink-0"
            >
              Call Admissions: 96616 11350
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#292F91] rounded-2xl text-white p-8 sm:p-12 shadow-md relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Enroll for Upcoming Batch</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
                Choose Your Course and Take the First Step
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Apply online to reserve your seat in the next practical batch at our Bank More, Dhanbad campus.
              </p>

              <div className="pt-4 flex justify-center">
                <Link
                  to="/admission"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
