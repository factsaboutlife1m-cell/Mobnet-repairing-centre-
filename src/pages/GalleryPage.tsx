import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisualShowcase } from '../components/VisualShowcase';
import { GALLERY_ITEMS, GalleryPhoto } from '../data/galleryData';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  MessageCircle,
  ArrowRight,
  Video,
  Clapperboard,
  Info,
  Calendar,
  MapPin
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Life at MOBNET | Lab, Equipment & Practical Training Gallery';
  }, []);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter tabs per prompt
  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'campus', label: 'Campus' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'training', label: 'Training' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  // Lightbox keyboard navigation & escape handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  // Touch swipe support for mobile
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext(); // Swiped left -> next
    } else if (diff < -50) {
      handlePrev(); // Swiped right -> prev
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const currentPhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-white min-h-screen">
      {/* SECTION 1 — PAGE HERO */}
      <div className="bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <Breadcrumb items={[{ label: 'Gallery' }]} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#292F91] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span>Campus &amp; Practical Bench</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#292F91] tracking-tight font-heading">
              Life at MOBNET
            </h1>

            <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-medium">
              Step inside our lab, watch our students at work and see the hardware they practise on.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2 & 3 — GALLERY FILTERS & RESPONSIVE IMAGE GRID */}
      <section className="py-12 lg:py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.id);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-[#292F91] text-white shadow-xs'
                    : 'bg-[#F5F7FB] text-[#6B7280] hover:text-[#292F91] border border-[#E5E7EB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Genuine asset notice per prompt */}
          <div className="mb-6 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-[#292F91] flex items-center gap-2 max-w-2xl mx-auto text-center sm:text-left justify-center">
            <Info className="w-4 h-4 shrink-0 text-[#292F91]" />
            <span>
              All modules depict verified training equipment and repair topics taught at our Urmila Tower, Dhanbad campus.
            </span>
          </div>

          {/* Responsive Image Grid (Desktop 3-4 cols, Tablet 2 cols, Mobile 1-2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group cursor-pointer bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                {/* Visual Frame */}
                <div className="relative overflow-hidden h-52 sm:h-56 bg-slate-900">
                  {photo.imageUrl ? (
                    <div
                      className="relative w-full h-full overflow-hidden bg-cover bg-center text-white p-3.5 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url('${photo.imageUrl}')` }}
                    >
                      {/* High contrast gradient scrim for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35 pointer-events-none" />

                      {/* Top Badge Strip */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#292F91]/95 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
                          {photo.badge}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs border border-white/20">
                          Topic {photo.topicNumber} of 9
                        </span>
                      </div>

                      {/* Center / Heading */}
                      <div className="relative z-10 my-auto">
                        <h4 className="font-heading font-extrabold text-xs sm:text-sm text-white drop-shadow-md leading-snug">
                          {photo.title}
                        </h4>
                        <p className="text-[10px] text-slate-200 mt-0.5 drop-shadow-xs line-clamp-1">
                          MOBNET International Practical Laboratory Training
                        </p>
                      </div>

                      {/* Bottom Location & Campus Strip */}
                      <div className="relative z-10 flex items-center justify-between text-[10px] text-blue-200 pt-1.5 border-t border-white/20">
                        <span className="text-white font-medium flex items-center gap-1 text-[10px] truncate">
                          <MapPin className="w-2.5 h-2.5 text-[#D9272E] shrink-0" />
                          <span>{photo.location || '109, 1st Floor, Urmila Tower, Bank More, Dhanbad'}</span>
                        </span>
                        <span className="text-slate-300 text-[9px] shrink-0">Campus Lab</span>
                      </div>
                    </div>
                  ) : (
                    <VisualShowcase
                      type={photo.visualType}
                      title={photo.title}
                      badge={photo.badge}
                      className="h-full transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  )}

                  {/* Hover Inspect Affordance */}
                  <div className="absolute inset-0 bg-[#292F91]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white z-20">
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/50 text-xs font-semibold backdrop-blur-xs">
                      <ZoomIn className="w-4 h-4" />
                      <span>Inspect Details</span>
                    </div>
                  </div>
                </div>

                {/* Caption / Description */}
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="font-semibold text-[#292F91] uppercase tracking-wider">
                      {photo.badge}
                    </span>
                    <span className="text-[11px] font-mono">Topic {photo.topicNumber} of 9</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#333333] font-heading group-hover:text-[#292F91] transition-colors">
                    {photo.title}
                  </h3>

                  <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>

                  <div className="pt-2 mt-1 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span className="flex items-center gap-1 truncate text-slate-600">
                      <MapPin className="w-3 h-3 text-[#D9272E] shrink-0" />
                      <span>{photo.location || '109, 1st Floor, Urmila Tower, Bank More, Dhanbad'}</span>
                    </span>
                    <span className="text-[10px] text-[#292F91] font-semibold">Practical Lab</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX (With Prev/Next, Close, Keyboard, and Touch Swipe Support) */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.title}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9272E]">
                  {currentPhoto.badge}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#292F91] font-heading">
                  {currentPhoto.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#6B7280] font-mono hidden sm:inline">
                  {lightboxIndex! + 1} / {filteredItems.length}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#292F91]"
                  aria-label="Close Lightbox (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Stage */}
            <div className="relative bg-slate-950 p-2 sm:p-4 flex items-center justify-center min-h-[280px] sm:min-h-[360px] max-h-[70vh] overflow-hidden">
              {currentPhoto.imageUrl ? (
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.altText}
                  className="w-full max-h-[65vh] object-contain rounded-lg"
                />
              ) : (
                <VisualShowcase
                  type={currentPhoto.visualType}
                  title={currentPhoto.title}
                  badge={currentPhoto.badge}
                  className="w-full h-64 sm:h-80"
                />
              )}

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Previous item (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Next item (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Caption / Information */}
            <div className="p-5 sm:p-6 bg-white space-y-3">
              <p className="text-sm text-[#333333] leading-relaxed">
                {currentPhoto.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D9272E]" />
                  <span>109, 1st Floor, Urmila Tower, Bank More, Dhanbad</span>
                </div>
                <span className="text-[#292F91] font-semibold">MOBNET Practical Training Lab</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4 — VIDEO GALLERY (Videos Coming Soon per instructions) */}
      <section className="py-16 lg:py-20 bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9272E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#292F91]">
                Demonstrations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292F91] font-heading tracking-tight">
              Watch MOBNET in Action
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B7280]">
              Real classes, real repairs — see how we teach mobile hardware and software.
            </p>
          </div>

          {/* Clean "Videos Coming Soon" Container */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 text-center shadow-xs space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#292F91] flex items-center justify-center border border-blue-100">
              <Clapperboard className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#292F91] font-heading">
              Videos coming soon
            </h3>

            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-md mx-auto">
              Our instructors are recording new practical lab walk-throughs showcasing microscope micro-soldering, thermal camera short detection, and Borneo schematic analysis.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20can%20you%20please%20share%20a%20short%20video%20clip%20or%20walkthrough%20of%20your%20practical%20training%20lab?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Request Lab Video on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — ADMISSION CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#292F91] rounded-2xl text-white p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Join the Practical Batch</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
                Want to Be Part of This?
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Join the Advance Mobile Hardware &amp; Software Course and start practising on real devices.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/admission?course=advance-mobile-hardware-software"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#D9272E] hover:bg-[#b81f25] transition-colors shadow-xs"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20saw%20your%20lab%20gallery%20and%20want%20to%20enquire%20about%20joining%20the%20Advance%20Course."
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
