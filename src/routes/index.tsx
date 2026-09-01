import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Check, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-summit.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Women in STEM Africa Summit 2026 | Nairobi, Kenya",
      },
      {
        name: "description",
        content:
          "Join us at KICC, Nairobi on 3-4 September 2026. Discovering talent, driving innovation, shaping Africa's future.",
      },
      {
        property: "og:title",
        content: "Women in STEM Africa Summit 2026 | Nairobi, Kenya",
      },
      {
        property: "og:description",
        content:
          "Join us at KICC, Nairobi on 3-4 September 2026. Discovering talent, driving innovation, shaping Africa's future.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const EVENT_DATE = new Date("2026-09-03T08:00:00+03:00");

const passes = [
  {
    id: "student",
    name: "Student Pass",
    price: "KES 1,500",
    description: "Full-time students",
    features: [
      "Access for both days",
      "Access to Innovation Showcase & Expo",
      "Networking & Coffee Breaks",
    ],
    popular: false,
  },
  {
    id: "1-day",
    name: "1-Day Pass",
    price: "KES 3,000",
    description: "One day access",
    features: [
      "Access to all summit sessions for one day",
      "Access to Innovation Showcase & Expo",
      "Networking & Coffee Breaks",
    ],
    popular: false,
  },
  {
    id: "2-day",
    name: "2-Day Pass",
    price: "KES 5,500",
    description: "Both days access",
    features: [
      "Access to all summit sessions for both days",
      "Access to Innovation Showcase & Expo",
      "Networking & Coffee Breaks",
      "Networking Lunch (Day 2)",
    ],
    popular: true,
  },
  {
    id: "vip",
    name: "VIP Pass",
    price: "KES 20,000",
    description: "Premium experience",
    features: [
      "Reserved VIP Seating",
      "Access to VIP Lounge",
      "VIP Networking Dinner (3 Sep)",
      "All 2-Day Pass benefits",
    ],
    popular: false,
  },
];

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return timeLeft;
}

function calculateTimeLeft(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20 2C14.5 2 10 6.5 10 12C10 17.5 14.5 22 20 22C25.5 22 30 17.5 30 12C30 6.5 25.5 2 20 2Z"
          fill="url(#grad1)"
        />
        <path
          d="M8 14C4 18 4 24 8 28C12 32 18 32 22 28L20 22C18 24 14 24 12 22C10 20 10 16 12 14L8 14Z"
          fill="#00C853"
        />
        <path
          d="M32 14C36 18 36 24 32 28C28 32 22 32 18 28L20 22C22 24 26 24 28 22C30 20 30 16 28 14L32 14Z"
          fill="#00C853"
        />
        <defs>
          <linearGradient id="grad1" x1="10" y1="2" x2="30" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-wide text-foreground">WITIA</div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Women in Tech & Innovation Africa
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
          <a
            href="#experience"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Experience
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
          <Link to="/register">
            <Button size="sm" className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90">
              Reserve My Seat
            </Button>
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#experience"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Reserve My Seat
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const countdown = useCountdown(EVENT_DATE);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <img
        src={heroImage}
        alt="Women networking at the Women in STEM Africa Summit"
        className="absolute inset-0 h-full w-full object-cover"
        width={1200}
        height={1600}
      />
      <div className="hero-gradient absolute inset-0" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center md:py-32">
        <Badge
          variant="outline"
          className="mb-6 flex items-center gap-2 rounded-full border-white/20 bg-background/30 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm"
        >
          <Calendar className="h-4 w-4" />
          <span>3 - 4 SEPTEMBER 2026</span>
          <span className="mx-1 text-white/40">·</span>
          <MapPin className="h-4 w-4" />
          <span>KICC, NAIROBI, KENYA</span>
        </Badge>

        <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Women in STEM
          <br />
          Africa Summit 2026
        </h1>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-summit-gold gold-glow">
          Summit Theme 2026
        </p>

        <p className="mt-4 max-w-2xl text-balance text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl">
          Discovering Talent. Driving Innovation. Shaping Africa's Future.
        </p>

        <p className="mt-4 max-w-xl text-balance text-base text-muted-foreground">
          Positioning Africa's Creative and Technological Talent for the Global Innovation Economy.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link to="/register">
            <Button
              size="lg"
              className="h-14 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
            >
              Reserve My Seat
            </Button>
          </Link>
          <a href="#pricing">
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-lg font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-white/10 hover:text-foreground"
            >
              View Passes
            </Button>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-4 gap-4 sm:gap-8">
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hours" },
            { value: countdown.minutes, label: "Minutes" },
            { value: countdown.seconds, label: "Seconds" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-summit-gold">
            The Summit
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Where Africa's STEM Leaders Connect
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The Women in STEM Africa Summit brings together innovators, educators, entrepreneurs,
            policymakers, and students for two transformative days of learning, networking, and
            inspiration at the Kenyatta International Convention Centre in Nairobi.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              stat: "2,000+",
              label: "Attendees",
              desc: "From across Africa and the diaspora",
            },
            {
              stat: "50+",
              label: "Speakers",
              desc: "Industry leaders and researchers",
            },
            {
              stat: "30+",
              label: "Exhibitors",
              desc: "Innovation showcase and expo",
            },
            {
              stat: "2",
              label: "Days",
              desc: "Of keynotes, panels, and networking",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="card-glow rounded-2xl border border-white/10 bg-card/50 p-6 text-center backdrop-blur-sm"
            >
              <div className="text-3xl font-bold text-primary sm:text-4xl">{item.stat}</div>
              <div className="mt-2 font-semibold text-foreground">{item.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative border-y border-white/10 bg-secondary/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-summit-gold">
            Choose Your Experience
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Join us at KICC, Nairobi
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Limited seats available.</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Innovation Showcase",
              desc: "Explore cutting-edge projects and research from African women in STEM.",
            },
            {
              title: "Keynote Sessions",
              desc: "Hear from visionary leaders reshaping technology, science, and innovation.",
            },
            {
              title: "Networking",
              desc: "Build meaningful connections during curated coffee breaks and lounges.",
            },
            {
              title: "Career Expo",
              desc: "Meet recruiters, mentors, and organizations hiring women in STEM.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-summit-gold">
            Tickets
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Choose Your Pass
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Secure your spot. All passes include access to the Innovation Showcase & Expo.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className={`relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all ${
                pass.popular
                  ? "popular-glow border-primary bg-card"
                  : "card-glow border-white/10 bg-card/50 hover:border-white/20"
              }`}
            >
              {pass.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  MOST POPULAR
                </Badge>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground">{pass.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{pass.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">{pass.price}</span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {pass.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register" search={{ pass: pass.id }}>
                <Button
                  className={`w-full rounded-full ${
                    pass.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-white/20 bg-white/5 text-foreground hover:bg-white/10"
                  }`}
                >
                  Select {pass.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-summit-gold/10" />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Ready to Shape Africa's Future?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Seats are limited. Reserve your pass today and be part of the movement driving innovation
          across the continent.
        </p>
        <div className="mt-8">
          <Link to="/register">
            <Button
              size="lg"
              className="h-14 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
            >
              Reserve My Seat
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />
          <div className="text-center text-sm text-muted-foreground md:text-right">
            <p>© 2026 Women in Technology and Innovation Africa.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
