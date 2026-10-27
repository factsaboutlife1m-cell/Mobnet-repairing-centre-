import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { Phone, MapPin, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1F5E] text-white border-t-4 border-[#292F91]">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Institute Description */}
          <div className="space-y-4">
            <BrandLogo variant="dark" />
            <p className="text-sm text-slate-300 leading-relaxed">
              MOBNET International is a premier mobile phone hardware and software repairing training institute. We specialize in practical chip-level micro-soldering, schematic circuit tracing, and advanced smartphone diagnostics.
            </p>
            <div className="pt-2">
              <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-white/5 p-3 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  ISO 9001:2015 Certified &amp; Government Registration No. 013881 (Subject to verification).
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading mb-4 pb-2 border-b border-white/10">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9272E]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9272E]" />
                  <span>About MOBNET</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9272E]" />
                  <span>Courses &amp; Syllabus</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9272E]" />
                  <span>Practical Lab Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9272E]" />
                  <span>Apply for Admission</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9272E]" />
                  <span>Contact Institute</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Course Modules */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading mb-4 pb-2 border-b border-white/10">
              Training Focus
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9272E]" />
                <span>Trinocular Micro-soldering (0.02mm)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9272E]" />
                <span>Borneo Schematics &amp; ZXW Tracing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9272E]" />
                <span>BGA Reballing (CPU / Power IC / EMMC)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9272E]" />
                <span>EDL 9008 Flashing &amp; FRP Unlocking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9272E]" />
                <span>Easy JTAG Plus &amp; UFI Box ISP</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9272E]" />
                <span>iPhone Sandwich Logic Board Repair</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact & Address */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading mb-4 pb-2 border-b border-white/10">
              Campus Location
            </h4>
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9272E] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  109, 1st Floor, Urmila Tower, Bank More, Dhanbad – 826001, Jharkhand.
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-slate-400">Direct Helpline:</div>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:9661611350"
                    className="flex items-center gap-2 text-sm text-white font-medium hover:text-emerald-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+91 96616 11350</span>
                  </a>
                  <a
                    href="tel:7004838409"
                    className="flex items-center gap-2 text-sm text-white font-medium hover:text-emerald-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+91 70048 38409</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/919661611350?text=Hello%20MOBNET%20International,%20I%20would%20like%20to%20enquire%20about%20admission%20and%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Notice Strip */}
      <div className="border-t border-white/10 bg-[#12164A] text-xs text-slate-400 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="space-y-0.5">
            <p className="text-white font-medium">
              &copy; 2026 MOBNET International. All rights reserved.
            </p>
            <p className="text-slate-400 text-[11px]">
              A Division of SMTM Pvt. Ltd.
            </p>
          </div>

          <div className="text-slate-400 text-[11px]">
            <span>109, 1st Floor, Urmila Tower, Bank More, Dhanbad – 826001, Jharkhand</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
