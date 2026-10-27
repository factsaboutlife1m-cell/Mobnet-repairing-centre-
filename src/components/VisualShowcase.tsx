import React from 'react';

interface VisualSlotProps {
  type: 'hero-lab' | 'microscope' | 'software' | 'tools' | 'classroom' | 'schematic' | 'iphone' | 'reballing';
  className?: string;
  title?: string;
  badge?: string;
}

export const VisualShowcase: React.FC<VisualSlotProps> = ({
  type,
  className = '',
  title,
  badge,
}) => {
  if (type === 'hero-lab') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E2368] via-[#292F91] to-[#12164A] text-white p-6 md:p-8 shadow-xl flex flex-col justify-between border border-blue-900/40 ${className}`}
        style={{ minHeight: '380px' }}
      >
        {/* Technical Circuit Pattern Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="circuit-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
              <path d="M 20 0 L 20 18 M 22 20 L 40 20" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-grid)" />
        </svg>

        {/* Top Indicators Strip */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#D9272E]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-100">
              MOBNET Technical Practical Bench
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-black/30 text-emerald-300 border border-emerald-500/20">
            DC 4.20V · 0.12A
          </span>
        </div>

        {/* Central Workshop Graphical Diagram */}
        <div className="relative z-10 my-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Microscope & Board Station */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-[#D9272E]/20 border border-[#D9272E]/40 flex items-center justify-center shrink-0">
                {/* Microscope Vector */}
                <svg className="w-9 h-9 text-[#D9272E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18h8" />
                  <path d="M3 22h18" />
                  <path d="M14 22a7 7 0 1 0 0-14h-1" />
                  <path d="M9 14h2" />
                  <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
                  <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-heading">
                  Trinocular Micro-Soldering Station
                </h4>
                <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                  Individual training benches with 0.7X–4.5X zoom microscopes, C210 precision tips, and digital real-time motherboard inspection screens.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-blue-200">
                  <span className="px-2 py-0.5 rounded bg-white/10">0.02mm Jumpering</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">BGA Stencil Align</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Underfill IC Removal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostics Console Panel */}
          <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10 space-y-3">
            <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
              Diagnostic Hardware
            </div>
            <div className="space-y-1.5 text-xs text-white">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-blue-200">Rework Station:</span>
                <span className="font-mono text-amber-300">350°C · Air 60</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-blue-200">Schematic Mode:</span>
                <span className="font-mono text-emerald-300">Borneo Online</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-blue-200">Flashing Mode:</span>
                <span className="font-mono text-sky-300">EDL 9008 / DFU</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-blue-200">
          <span>Hands-on Live Motherboard Diagnostics</span>
          <span className="text-white font-medium">Bank More, Dhanbad Lab</span>
        </div>
      </div>
    );
  }

  // Card Level Illustrated Visuals
  const getIconAndColor = () => {
    switch (type) {
      case 'microscope':
      case 'reballing':
        return {
          bg: 'from-blue-900 to-[#292F91]',
          badgeText: badge || 'Micro-Soldering',
          icon: (
            <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M6 18h8" />
              <path d="M3 22h18" />
              <path d="M14 22a7 7 0 1 0 0-14h-1" />
              <path d="M9 14h2" />
              <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
              <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
            </svg>
          ),
          accentTag: '0.01mm Precision'
        };
      case 'software':
        return {
          bg: 'from-slate-900 to-[#1E2368]',
          badgeText: badge || 'Software & Flashing',
          icon: (
            <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
              <path d="m7 8 3 3-3 3" />
              <path d="M13 14h4" />
            </svg>
          ),
          accentTag: 'EDL · Fastboot · UMT'
        };
      case 'iphone':
        return {
          bg: 'from-indigo-950 to-[#292F91]',
          badgeText: badge || 'Apple Logic Board',
          icon: (
            <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
          ),
          accentTag: 'Layer Separation'
        };
      case 'tools':
      case 'schematic':
      default:
        return {
          bg: 'from-[#1A2060] to-[#292F91]',
          badgeText: badge || 'Practical Lab',
          icon: (
            <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          ),
          accentTag: 'Bench Diagnostic'
        };
    }
  };

  const style = getIconAndColor();

  return (
    <div
      className={`relative w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-gradient-to-br ${style.bg} text-white p-5 flex flex-col justify-between border border-blue-900/30 shadow-xs ${className}`}
    >
      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90 bg-white/10 px-2.5 py-1 rounded">
          {style.badgeText}
        </span>
        <span className="text-[10px] font-mono text-emerald-300 bg-black/40 px-2 py-0.5 rounded">
          {style.accentTag}
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-4 my-auto">
        <div className="p-3 rounded-lg bg-white/10 border border-white/20 shrink-0">
          {style.icon}
        </div>
        {title && (
          <div>
            <h5 className="font-heading font-bold text-sm text-white line-clamp-2">
              {title}
            </h5>
            <p className="text-xs text-blue-200 mt-1 line-clamp-2">
              MOBNET International Practical Laboratory Training
            </p>
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-200/90 pt-2 border-t border-white/10">
        <span>Verified Institute Equipment</span>
        <span className="text-white font-medium">Bank More, Dhanbad</span>
      </div>
    </div>
  );
};
