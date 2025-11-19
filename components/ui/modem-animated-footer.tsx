
import React from "react";
import {
  NotepadTextDashed,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const ModemFooter = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToHash = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.substring(1); // "#features"

      if (location.pathname === '/') {
        navigate(href, { replace: location.hash === hash });
        const didScroll = scrollToHash(hash);
        if (!didScroll && window.location.hash !== hash) {
          window.location.hash = hash;
        }
        return;
      }

      navigate(href);
      return;
    }

    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t border-white/5 bg-background mt-20 relative z-40">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10 z-30 pointer-events-auto">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-3xl font-bold tracking-tight">
                    {brandName}
                  </span>
                </div>
                <p className="text-zinc-500 font-medium text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 leading-relaxed">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-6 gap-4 relative z-[100] pointer-events-auto">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-5 h-5 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-zinc-500 max-w-full px-4 relative z-[100] pointer-events-auto">
                  {navLinks.map((link, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleNavigation(link.href)}
                      className="hover:text-indigo-400 duration-300 hover:font-semibold transition-colors cursor-pointer bg-transparent border-none p-0 relative"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0 relative z-[100] pointer-events-auto">
            <p className="text-xs text-zinc-600 text-center md:text-left">
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && (
              <nav className="flex gap-4">
                <a
                  href={creatorUrl || "#"}
                  target="_blank"
                  className="text-xs text-zinc-600 hover:text-white transition-colors duration-300"
                >
                  Crafted by {creatorName}
                </a>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text */}
        <div
          className="bg-gradient-to-b from-white/10 via-white/5 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-black tracking-tighter pointer-events-none select-none text-center px-4 z-0"
          style={{
            fontSize: 'clamp(5rem, 18vw, 14rem)',
            maxWidth: '100vw',
            whiteSpace: 'nowrap'
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo */}
        <div className="absolute hover:border-indigo-500/50 duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] bottom-24 md:bottom-20 backdrop-blur-md rounded-3xl bg-black/40 left-1/2 border border-white/10 flex items-center justify-center p-3 -translate-x-1/2 z-10 shadow-2xl pointer-events-none">
          <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group pointer-events-auto">
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {brandIcon || (
              <NotepadTextDashed className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-white/80 drop-shadow-lg relative z-10" />
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent w-full left-1/2 -translate-x-1/2 pointer-events-none"></div>

        {/* Bottom shadow */}
        <div className="bg-gradient-to-t from-black via-black/90 to-transparent absolute bottom-0 w-full h-32 pointer-events-none z-10"></div>
      </footer>
    </section>
  );
};
