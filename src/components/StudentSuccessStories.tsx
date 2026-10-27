import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  Award,
  TrendingUp,
  MapPin,
  Building2,
  Pause,
  Play,
  Briefcase
} from 'lucide-react';

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  businessName: string;
  location: string;
  courseCompleted: string;
  batchYear: string;
  metric: {
    label: string;
    value: string;
  };
  quote: string;
  keySpecialty: string;
  rating: number;
  avatarBg: string;
  initials: string;
}

export const STUDENT_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    name: 'Rakesh Kumar Verma',
    role: 'Founder & Head Technician',
    businessName: 'Verma Mobile Solutions',
    location: 'Bokaro Steel City, Jharkhand',
    courseCompleted: 'Advance Smartphone Hardware & Chip-Level Repair',
    batchYear: '2023',
    metric: {
      label: 'Monthly Earnings',
      value: '₹65,000+ / mo',
    },
    quote:
      'Before joining MOBNET, I was only replacing screens and charge ports. In the 2-month practical course, Sir taught us Borneo schematic tracing and hot-air profiling for double-decker CPUs. Within six months, I expanded into a full motherboard repair lab. The lifetime instructor backup support gave me the courage to accept complex dead phones.',
    keySpecialty: 'Double-Decker CPU & Micro-Soldering',
    rating: 5,
    avatarBg: 'bg-blue-600',
    initials: 'RV',
  },
  {
    id: 'story-2',
    name: 'Md. Tariq Anwar',
    role: 'Senior Chip-Level Technician',
    businessName: 'Multi-Brand Authorized Service Partner',
    location: 'Bank More, Dhanbad',
    courseCompleted: 'Smartphone Software, Flashing & EMMC/UFS Repair',
    batchYear: '2024',
    metric: {
      label: 'Career Outcome',
      value: 'Hired in 2 Weeks',
    },
    quote:
      'The hands-on lab sessions with genuine flashing boxes and test points gave me real confidence. While most places just show slides, here we worked directly on dead boot Qualcomm devices. During my job interview at the service hub, they tested me on an EDL 9008 repair on the spot, and I solved it in 15 minutes flat.',
    keySpecialty: 'EDL Flashing & UFS Dead Boot Fix',
    rating: 5,
    avatarBg: 'bg-emerald-600',
    initials: 'TA',
  },
  {
    id: 'story-3',
    name: 'Amit Kumar Singh',
    role: 'Owner & Micro-Soldering Specialist',
    businessName: 'SmartFix Micro Lab',
    location: 'Kanke Road, Ranchi',
    courseCompleted: 'Master Mobile Repairing & OCA Laminating',
    batchYear: '2023',
    metric: {
      label: 'Monthly Turnover',
      value: '₹85,000+ / mo',
    },
    quote:
      'MOBNET taught me that hardware repair is precision craftsmanship. Learning to jump 0.02mm insulated jumper wires under the trinocular microscope completely elevated my work. Today, technicians from surrounding towns send their cracked AMOLED displays and shorted motherboards to my lab for repair.',
    keySpecialty: 'Curved Screen OCA & 0.02mm Jumpering',
    rating: 5,
    avatarBg: 'bg-indigo-600',
    initials: 'AS',
  },
  {
    id: 'story-4',
    name: 'Pooja Kumari',
    role: 'Hardware Diagnostic Technician',
    businessName: 'TechCare Service Center',
    location: 'Hirapur, Dhanbad',
    courseCompleted: 'Comprehensive Smartphone Hardware & Software',
    batchYear: '2024',
    metric: {
      label: 'Diagnosis Accuracy',
      value: '98% First Attempt',
    },
    quote:
      'As a female technician entering mobile hardware, I was looking for a supportive, professional lab. MOBNET instructors were exceptionally patient, teaching me DC power supply milliamp analysis and multimeter diode mode testing. I now diagnose and repair 8 to 10 logic boards every day with complete self-reliance.',
    keySpecialty: 'Short Circuit & DC Supply Analysis',
    rating: 5,
    avatarBg: 'bg-rose-600',
    initials: 'PK',
  },
  {
    id: 'story-5',
    name: 'Suraj Soren',
    role: 'Proprietor & Master Technician',
    businessName: 'Soren Digital & Mobile Care',
    location: 'Govindpur, Dhanbad',
    courseCompleted: 'Advance Smartphone Hardware & Chip-Level Repair',
    batchYear: '2022',
    metric: {
      label: 'Business Growth',
      value: '2 Junior Staff Hired',
    },
    quote:
      'I came to MOBNET with zero electronics background. Step by step, the instructors demystified motherboard power sequences — from VPH_PWR lines to buck coil outputs. Three years later, I run my own workshop with two junior technicians trained under me. MOBNET laid the foundation for my entire family livelihood.',
    keySpecialty: 'Power IC (PMIC) & Coil Diagnostics',
    rating: 5,
    avatarBg: 'bg-amber-600',
    initials: 'SS',
  },
  {
    id: 'story-6',
    name: 'Vikash Gupta',
    role: 'Lead Logic Board Specialist',
    businessName: 'Gupta Telecom & Motherboard Care',
    location: 'Asansol, West Bengal',
    courseCompleted: 'iPhone & Android Advanced Board Repair',
    batchYear: '2024',
    metric: {
      label: 'Specialty Rate',
      value: '15+ B2B Board Jobs/Wk',
    },
    quote:
      'Most local repair shops turn away iPhones and premium flagship phones with motherboard issues. At MOBNET, we practiced on real donor boards, learning sandwich board separation, baseband repair, and reballing. Now, local repairmen outsource their difficult logic board jobs directly to me.',
    keySpecialty: 'Sandwich Board & Baseband Repair',
    rating: 5,
    avatarBg: 'bg-cyan-700',
    initials: 'VG',
  },
];

export const StudentSuccessStories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive itemsPerPage calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(1);
      } else if (width < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, STUDENT_STORIES.length - itemsPerPage);

  // Keep currentIndex in bounds if screen resized
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isPaused, handleNext]);

  // Touch Swipe Handlers for mobile responsiveness
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current;
      const minSwipeDistance = 45;
      if (diff > minSwipeDistance) {
        handleNext();
      } else if (diff < -minSwipeDistance) {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
    setIsPaused(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Total pages calculation for dot indicators
  const totalSteps = maxIndex + 1;

  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-[#E5E7EB] overflow-hidden"
      aria-label="Student Success Stories"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Proven Career Outcomes
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#292F91] tracking-tight leading-tight font-heading">
              Student Success Stories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Real MOBNET graduates who launched their own repair shops or secured skilled technician careers across Jharkhand, Bihar, and West Bengal.
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {/* Step Counter */}
            <div className="text-xs font-mono font-medium text-[#6B7280] bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 tabular-nums">
              <span className="font-bold text-[#292F91]">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-slate-400">/</span>
              <span>{String(totalSteps).padStart(2, '0')}</span>
            </div>

            {/* Play / Pause Autoplay Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#292F91] hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#292F91] min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isAutoPlaying ? 'Pause carousel auto-play' : 'Start carousel auto-play'}
              title={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:text-[#292F91] transition-colors focus-visible:outline-2 focus-visible:outline-[#292F91] shadow-xs min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              aria-label="Previous success story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-lg border border-[#292F91] text-white bg-[#292F91] hover:bg-[#1f2473] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#292F91] shadow-xs min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              aria-label="Next success story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {STUDENT_STORIES.map((story) => (
              <div
                key={story.id}
                className="shrink-0 px-2.5 sm:px-3"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="h-full bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between p-6 sm:p-7 relative group">
                  {/* Subtle top accent bar */}
                  <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#292F91] via-[#292F91]/80 to-[#D9272E] rounded-b" />

                  {/* Top: Avatar, Name, Verified Badge, Rating */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4 pt-1">
                      <div className="flex items-center gap-3">
                        {/* Avatar with initials fallback */}
                        <div
                          className={`w-12 h-12 rounded-xl ${story.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 tracking-wider`}
                          aria-hidden="true"
                        >
                          {story.initials}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-heading font-extrabold text-[#292F91] text-base leading-snug">
                              {story.name}
                            </h3>
                            <span
                              className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60"
                              title="Verified MOBNET Graduate"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span>Verified</span>
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                            <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{story.role}</span>
                          </p>
                        </div>
                      </div>

                      {/* 5-Star Rating */}
                      <div className="flex items-center gap-0.5 shrink-0" aria-label={`${story.rating} out of 5 stars`}>
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Unboxed Metadata (Zero-Pill Discipline) */}
                    <div className="text-xs text-[#6B7280] pb-3 border-b border-slate-100 flex items-center flex-wrap gap-x-2 gap-y-1">
                      <span className="font-medium text-slate-800 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-[#292F91]" />
                        {story.businessName}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D9272E]" />
                        {story.location}
                      </span>
                    </div>

                    {/* Milestone Highlight Block */}
                    <div className="mt-4 p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-700 shrink-0">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {story.metric.label}
                          </p>
                          <p className="text-sm font-extrabold text-slate-900 font-heading tabular-nums">
                            {story.metric.value}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-[#292F91] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          Batch {story.batchYear}
                        </span>
                      </div>
                    </div>

                    {/* Quote Text */}
                    <div className="relative mt-4">
                      <Quote className="w-6 h-6 text-slate-200 absolute -top-1 -left-1 -z-0 select-none pointer-events-none" />
                      <p className="relative z-10 text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: Course Completed & Key Specialty */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="text-slate-500 text-[11px] shrink-0 font-medium">Completed:</span>
                      <span className="text-slate-800 font-semibold text-[11px] truncate text-right" title={story.courseCompleted}>
                        {story.courseCompleted}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#292F91] bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/70">
                      <Award className="w-3.5 h-3.5 text-[#D9272E] shrink-0" />
                      <span className="font-semibold truncate">
                        Key Skill: <span className="font-normal text-slate-700">{story.keySpecialty}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full focus-visible:outline-2 focus-visible:outline-[#292F91] ${
                  isActive
                    ? 'w-8 h-2.5 bg-[#292F91]'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? 'true' : 'false'}
              />
            );
          })}
        </div>

        {/* Bottom Achievement Stats Strip */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <div className="text-2xl sm:text-3xl font-black text-[#292F91] font-heading tabular-nums">
                2,500+
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                Trained Technicians
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <div className="text-2xl sm:text-3xl font-black text-[#D9272E] font-heading tabular-nums">
                85%+
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                Own Repair Center / Employed
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <div className="text-2xl sm:text-3xl font-black text-[#292F91] font-heading tabular-nums">
                100%
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                Hands-On Practical Lab Time
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">
                Lifetime
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                Technical Backup Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
