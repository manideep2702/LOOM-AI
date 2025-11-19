import React from "react";
import { Button } from "./button";
import { Icons } from "./icons";
import { AnimatedLogo } from "./animated-logo";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const FooterLinkItem = ({ label, href, external }: FooterLink) => (
  <a
    href={href}
    className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
  >
    {label}
  </a>
);

function Footer() {
  const year = new Date().getFullYear();

  const pageLinks: FooterLink[] = [
    { label: "Docs", href: "/docs" },
    { label: "Features", href: "/#features" },
    { label: "Examples", href: "/#showcase" },
    { label: "Pricing", href: "/#pricing" },
    {
      label: "Blog",
      href: "https://blog.loom.ai",
      external: true,
    },
  ];

  const socialLinks: FooterLink[] = [
    {
      label: "GitHub",
      href: "https://github.com/loom-ai",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/loom-ai",
      external: true,
    },
    {
      label: "X",
      href: "https://x.com/loomdotai",
      external: true,
    },
  ];

  const legalLinks: FooterLink[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="py-16 px-4 md:px-6 bg-background relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <a href="/" className="inline-block">
              <AnimatedLogo />
            </a>

            <p className="text-zinc-400 mt-4 text-sm leading-relaxed">
              Built by{" "}
              <a
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                href="https://www.instagram.com/manideep_pasumarthi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @manideeptech
              </a>
              . Crafting calm, high-signal tooling for ambitious creators.
            </p>
            <div className="mt-4">
              <Button variant="secondary" asChild>
                <a
                  href="https://x.com/compose/tweet?text=I%27m%20building%20with%20%23LoomAI%20%E2%80%93%20signal%20over%20noise.%20cc%20%40ManideepTech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share your thoughts
                  <Icons.twitter className="ml-2 w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-zinc-500 mt-5">
              © {year} Loom.ai. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300 mb-4">
                Pages
              </h3>
              <ul className="space-y-2">
                {pageLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem {...link} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300 mb-4">
                Socials
              </h3>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem {...link} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300 mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem {...link} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-10 items-center justify-center">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-black bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-900 select-none tracking-tight">
            LOOM.AI
          </h1>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
