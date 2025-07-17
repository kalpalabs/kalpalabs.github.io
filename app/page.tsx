
"use client";

import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter, GraduationCap } from "lucide-react";
import Link from "next/link";
import { theme } from "@/lib/theme";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function HomePage() {
  // Cal.com integration.
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("floatingButton", {
        calLink: "pshishodia/30min",
        config: {
          layout: "month_view",
          theme: "light",
        },
        buttonPosition: "bottom-right",
        buttonText: "Talk to us",
        buttonColor: theme.colors.button.primary,
        buttonTextColor: theme.colors.button.text,
      });
      cal(
        "ui",
        {
          theme: "auto",
          cssVarsPerTheme: {
            light: { "cal-brand": theme.colors.button.primary },
            dark: { "cal-brand": theme.colors.button.primary },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        }
      );
    })();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <main>
        <HeroSection />
        <TeamSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-8 flex items-center relative">
        <div className="max-w-2xl z-10">
          <h1 className="text-6xl md:text-7xl font-serif leading-tight mb-8" style={{ color: theme.colors.text }}>
            A New Era
            <br />
            of Voice Agents
          </h1>
          <p className="text-xl mb-12 leading-relaxed" style={{ color: theme.colors.text }}>
            Real-time Voice Agents with millions of voices.
          </p>
        </div>
        <DecorativeDots />
      </div>
    </section>
  );
}

function DecorativeDots() {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 right-16 md:right-24 opacity-30"
      style={{ pointerEvents: "none" }}
    >
      <div className="grid grid-cols-8 gap-3">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.decorative }} />
        ))}
      </div>
    </div>
  );
}

function TeamMember({
  name,
  image,
  alt,
  title,
  description,
  links,
}: {
  name: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  links: { href: string; icon: React.ReactNode }[];
}) {
  return (
    <div className="text-center">
      <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text }}>
        {name}
      </h3>
      <p className="text-sm mb-4" style={{ color: theme.colors.textMuted }}>
        {title}
      </p>
      <div className="flex justify-center space-x-3 mb-6">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="transition-colors hover:opacity-70"
            style={{ color: theme.colors.text }}
          >
            {link.icon}
          </Link>
        ))}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
        {description}
      </p>
    </div>
  );
}

// --- Team Section ---
function TeamSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif mb-4" style={{ color: theme.colors.text }}>
            Meet Our Team
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          <TeamMember
            name="Prashant Shishodia"
            image="/pshishodia.jpeg?height=128&width=128"
            alt="Prashant Shishodia"
            title="CEO & Co-Founder"
            description="Large Action Models & Serving Efficiency @ Google Assistant"
            links={[
              {
                href: "https://linkedin.com/in/pshishodia/",
                icon: <Linkedin className="h-4 w-4" />,
              },
              {
                href: "https://x.com/pshishodiaa",
                icon: <Twitter className="h-4 w-4" />,
              },
              {
                href: "https://scholar.google.com/citations?user=CKQd3XAAAAAJ",
                icon: <GraduationCap className="h-4 w-4" />,
              },
              {
                href: "mailto:prashant.cse.iitkgp@gmail.com",
                icon: <Mail className="h-4 w-4" />,
              },
            ]}
          />
          <TeamMember
            name="Ashish Agarwal"
            image="/ashish.jpg?height=128&width=128"
            alt="Ashish Agarwal"
            title="Co-Founder"
            description="AI-native features @ Quizizz, Ex-Sprinklr"
            links={[
              {
                href: "https://www.linkedin.com/in/ashish-2000",
                icon: <Linkedin className="h-4 w-4" />,
              },
              {
                href: "mailto:ashish01012000@gmail.com",
                icon: <Mail className="h-4 w-4" />,
              },
            ]}
          />
          <TeamMember
            name="Gautam Jha"
            image="/gautam.jpg?height=128&width=128"
            alt="Gautam Jha"
            title="Co-Founder"
            description="sub-microseconds low-latency sytems at HFTs."
            links={[
              {
                href: "https://www.linkedin.com/in/gautam-jha-790a7216a/",
                icon: <Linkedin className="h-4 w-4" />,
              },
              {
                href: "mailto:gauti.jha37@gmail.com",
                icon: <Mail className="h-4 w-4" />,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}