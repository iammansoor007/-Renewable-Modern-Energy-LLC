import { useRef, useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import {
  Wrench, Home, Building2, Sun, CloudRain, Shield,
  TreePine, Droplets, Hammer, Square, ArrowRight,
  Layout, Building, CheckCircle, Phone, Zap,
} from "lucide-react";
import completeData from "../src/data/completeData.json";
import imgResidential from "@/assets/residental.jpg";
import imgCommercial from "@/assets/commericail.jpg";
import imgNewConstruction from "@/assets/newconstuction.jpg";
import imgRoofing from "@/assets/roofing.jpg";
import imgJanitorial from "@/assets/janotorial.jpg";
import imgDemo from "@/assets/demo.png";
import imgFraming from "@/assets/framing.png";
import imgDrywall from "@/assets/drywall.png";
import imgPainting from "@/assets/painting.png";
import imgFlooring from "@/assets/flooring.png";

const serviceImageMap: Record<string, string> = {
  "01": imgResidential,
  "02": imgCommercial,
  "03": imgNewConstruction,
  "04": imgRoofing,
  "05": imgJanitorial,
  "06": imgDemo,
  "07": imgFraming,
  "08": imgDrywall,
  "09": imgPainting,
  "10": imgFlooring,
};

const iconMap: Record<string, React.ElementType> = {
  Wrench, Home, Building2, Sun, CloudRain, Shield,
  TreePine, Droplets, Hammer, Square, Layout, Building,
  Search: Zap, CloudSun: Sun, Thermometer: Zap,
};

// ── Animated Number ───────────────────────────────────────────────
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let t0: number;
        const run = (ts: number) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 2000, 1);
          setDisplay(Math.floor(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(run);
          else setDisplay(value);
        };
        requestAnimationFrame(run);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
};

// ── Service Card ──────────────────────────────────────────────────
const ServiceCard = memo(({
  service, index, orphan = false,
}: { service: any; index: number; orphan?: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Wrench;
  const img = serviceImageMap[service.number];

  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative bg-white rounded-2xl overflow-hidden border border-border
        shadow-sm hover:shadow-2xl hover:shadow-primary/10
        transition-all duration-500 hover:-translate-y-1 flex flex-col cursor-pointer transform-gpu will-change-transform
        ${orphan ? "md:col-start-2" : ""}`}
    >
      {/* Red left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary
                      scale-y-0 group-hover:scale-y-100
                      transition-transform duration-500 origin-top z-10" />

      {/* Image */}
      <div className="relative h-48 overflow-hidden shrink-0 bg-gradient-to-br from-primary/5 to-primary/10">
        {img ? (
          <>
            <img src={img} alt={service.title} loading="eager"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform transform-gpu" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-20 h-20 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
            {service.tag}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="text-white/40 font-black text-4xl leading-none select-none">
            {service.number}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center
                          group-hover:bg-primary transition-colors duration-300 shrink-0">
            <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-lg font-black text-foreground group-hover:text-primary
                         transition-colors duration-300 leading-tight">
            {service.title}
          </h3>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {service.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-5 flex-1">
          {service.features?.slice(0, 4).map((f: string, i: number) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-primary shrink-0" />
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 text-sm font-black uppercase tracking-widest
                        text-primary group-hover:text-foreground transition-colors duration-300">
          <span>Get Free Estimate</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
        </div>
      </div>
    </motion.a>
  );
});

ServiceCard.displayName = "ServiceCard";

// ── Main Component ────────────────────────────────────────────────
const Services = () => {
  const { badge, headline, description, stats, services, cta } = completeData.services;

  return (
    <section className="relative bg-background overflow-hidden py-20 md:py-28">

      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* ══ HEADER — split, heading left / desc+stats right ════ */}
        <div className="mb-14 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* LEFT: Badge + Headline */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20
                              px-4 py-2 rounded-full mb-5">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-primary text-[11px] font-black uppercase tracking-[0.2em]">
                  {badge}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl xl:text-[3.25rem] font-black text-foreground
                             leading-[1.1] tracking-tight">
                {headline.prefix}{" "}
                <span className="text-primary">{headline.highlight}</span>{" "}
                <span>{headline.suffix}</span>
              </h2>
            </motion.div>

            {/* RIGHT: Description + Stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {description[0]}
              </p>

              {/* Stat cards — 3 equal bordered boxes with red top bar */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat: any) => (
                  <div
                    key={stat.label}
                    className="relative bg-white border border-border rounded-xl p-4
                               overflow-hidden hover:border-primary/40 hover:shadow-md
                               transition-all duration-300"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary rounded-t-xl" />
                    <div className="text-2xl md:text-3xl font-black text-primary leading-none mb-1 pt-1">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[9px] md:text-[10px] font-bold text-muted-foreground
                                    uppercase tracking-widest leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Separator line */}
          <div className="mt-12 h-px bg-gradient-to-r from-primary/30 via-border to-transparent" />
        </div>

        {/* ══ SERVICES GRID ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          {services.map((service: any, index: number) => {
            const isOrphan = services.length % 3 === 1 && index === services.length - 1;
            return (
              <ServiceCard key={service.number} service={service} index={index} orphan={isOrphan} />
            );
          })}
        </div>

        {/* ══ PREMIUM GRADIENT CTA ═══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 45%, #dc2626 100%)",
            boxShadow: "0 25px 60px rgba(185,28,28,0.30)"
          }}
        >
          {/* Technical Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '45px 45px'
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-14 md:px-16 md:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

              {/* Left text */}
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2.5 mb-6 border border-white/10
                                bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-white/90 text-[10px] font-black uppercase tracking-[0.25em]">
                    Free Consultation Available
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl xl:text-5xl font-black text-white
                               leading-[1.05] tracking-tight mb-5">
                  {cta.title}
                </h3>

                <p className="text-white/80 text-base md:text-lg leading-relaxed mb-7">
                  {cta.description}
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  {["Licensed & Insured", "Veteran Owned", "Free Estimates"].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary/50
                                      flex items-center justify-center shrink-0">
                        <CheckCircle className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-white/90 text-xs font-semibold">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right buttons */}
              <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[240px] shrink-0">

                {/* Primary Button */}
                <motion.a
                  href={cta.buttonLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.3)] bg-background text-primary hover:bg-muted"
                >
                  {cta.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                {/* Secondary Button */}
                <motion.a
                  href="tel:+1234567890"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all duration-300 backdrop-blur-sm bg-transparent text-white border-2 border-white/30 hover:bg-background/10"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Integrated Elegant Transition Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Services;
