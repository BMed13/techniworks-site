import { useState, useRef, useEffect } from "react";
import {
  Zap, Shield, Phone, Mail, MapPin, Plus, Edit2, Trash2,
  Upload, X, Menu, Wifi, Flame, Layers, HardHat,
  Clock, Award, Users, CheckCircle, MessageCircle,
  Wrench, Settings, Activity, ArrowRight, Building2,
  ChevronRight, BarChart2, Check, Target
} from "lucide-react";

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  darkest: "#030C18",
  dark:    "#06101F",
  navy:    "#0A1628",
  mid:     "#112240",
  blue:    "#1A3A5C",
  accent:  "#1060B0",
  electric:"#2080D0",
  steel:   "#2A4060",
  silver:  "#6A7E95",
  silverL: "#A8B8C8",
  off:     "#E8ECF0",
  white:   "#FFFFFF",
  gold:    "#C8A832",
  green:   "#25D366",
};

const F = {
  display: "'Rajdhani', 'Trebuchet MS', 'Arial Narrow', sans-serif",
  body:    "'Barlow', 'Segoe UI', system-ui, sans-serif",
  mono:    "'JetBrains Mono', 'Courier New', monospace",
};

// ─────────────────────────────────────────────
// DEFAULT PRODUCT DATA
// ─────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    image: null,
    title: "Cable Tray Systems",
    description:
      "Heavy-duty perforated and solid cable trays for industrial cable management. Hot-dip galvanized finish for maximum corrosion resistance.",
    specs: [
      "Material: Hot-dip galvanized steel",
      "Load capacity: Up to 150 kg/m",
      "Width range: 50 mm – 600 mm",
      "Standard: IEC 61537",
    ],
    category: "Cable Management",
  },
  {
    id: 2,
    image: null,
    title: "Electrical Distribution Panels",
    description:
      "Complete LV/MV electrical distribution panels engineered for industrial and commercial applications with full IEC compliance.",
    specs: [
      "Voltage: Up to 36 kV",
      "IP Protection: IP65 / IP66",
      "Standard: IEC 61439",
      "Custom configurations available",
    ],
    category: "Electrical",
  },
  {
    id: 3,
    image: null,
    title: "Addressable Fire Detection",
    description:
      "Intelligent multi-sensor fire detection systems for early detection and rapid response across industrial and commercial facilities.",
    specs: [
      "Protocol: Addressable EN 54",
      "Coverage: Up to 2 000 points",
      "BMS integration ready",
      "Certification: EN 54-2 / EN 54-4",
    ],
    category: "Fire Safety",
  },
];

// ─────────────────────────────────────────────
// GLOBAL STYLE INJECTION
// ─────────────────────────────────────────────
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; padding: 0; background: ${C.dark}; }
      html { scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: ${C.dark}; }
      ::-webkit-scrollbar-thumb { background: ${C.accent}; border-radius: 3px; }
      input, textarea { color-scheme: dark; }
      a { transition: opacity 0.2s ease; }
      a:hover { opacity: 0.85; }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.5; }
      }
      .hero-child { animation: fadeUp 0.7s ease both; }
      .hero-child:nth-child(1) { animation-delay: 0.1s; }
      .hero-child:nth-child(2) { animation-delay: 0.25s; }
      .hero-child:nth-child(3) { animation-delay: 0.4s; }
      .hero-child:nth-child(4) { animation-delay: 0.55s; }
      .hero-child:nth-child(5) { animation-delay: 0.7s; }
      .service-card { transition: all 0.3s ease; }
      .service-card:hover {
        transform: translateY(-6px);
        border-color: ${C.electric}60 !important;
        background: linear-gradient(135deg, ${C.mid}, ${C.blue}60) !important;
        box-shadow: 0 24px 48px ${C.darkest}80;
      }
      .service-card:hover .svc-icon { color: ${C.electric}; }
      .product-card { transition: all 0.3s ease; }
      .product-card:hover {
        transform: translateY(-8px);
        border-color: ${C.electric}50 !important;
        box-shadow: 0 28px 56px ${C.darkest};
      }
      .stat-card { transition: transform 0.3s ease; }
      .stat-card:hover { transform: translateY(-4px); }
      .cta-btn-primary { transition: box-shadow 0.3s ease, transform 0.2s ease; }
      .cta-btn-primary:hover {
        box-shadow: 0 12px 40px ${C.accent}70 !important;
        transform: translateY(-2px);
      }
      .nav-link { transition: color 0.2s ease; }
      .nav-link:hover { color: ${C.white} !important; }
      .adv-icon-box { transition: all 0.3s ease; }
      .adv-row:hover .adv-icon-box {
        background: ${C.electric}20 !important;
        border-color: ${C.electric}50 !important;
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────
function Tag({ children, color = C.electric }) {
  return (
    <span style={{
      display: "inline-block",
      background: `${color}18`,
      border: `1px solid ${color}40`,
      color,
      fontSize: "10px",
      fontFamily: F.body,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "3px 10px",
      borderRadius: "2px",
      fontWeight: 600,
    }}>
      {children}
    </span>
  );
}

function SectionRule({ color = C.electric, align = "left" }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "14px 0 22px",
      justifyContent: align === "center" ? "center" : "flex-start",
    }}>
      <div style={{ width: "56px", height: "3px", background: `linear-gradient(90deg, ${color}, ${color}60)` }} />
      <div style={{ width: "10px", height: "3px", background: color, opacity: 0.35 }} />
      <div style={{ width: "5px",  height: "3px", background: color, opacity: 0.15 }} />
    </div>
  );
}

function GridBg({ opacity = 0.06 }) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <defs>
        <pattern id="g60" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0L0 0 0 60" fill="none" stroke={C.electric} strokeWidth="0.4" opacity={opacity} />
        </pattern>
        <pattern id="dot20" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="0.9" fill={C.silver} opacity={opacity * 0.7} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g60)" />
      <rect width="100%" height="100%" fill="url(#dot20)" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar({ onAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Services", "Products", "Projects", "About", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? `${C.navy}F0` : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.electric}20` : "none",
      transition: "all 0.4s ease",
      padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "74px",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
        <div style={{
          width: "42px", height: "42px",
          background: `linear-gradient(135deg, ${C.electric}, ${C.accent})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          clipPath: "polygon(14% 0%, 86% 0%, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0% 86%, 0% 14%)",
          flexShrink: 0,
        }}>
          <Zap size={20} color={C.white} />
        </div>
        <div>
          <div style={{ color: C.white, fontFamily: F.display, fontWeight: 700, fontSize: "19px", lineHeight: 1, letterSpacing: "0.06em" }}>
            TECHNIWORKS
          </div>
          <div style={{ color: C.silverL, fontSize: "8.5px", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 500 }}>
            DISTRIBUTION
          </div>
        </div>
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{
            color: C.silverL, textDecoration: "none",
            fontSize: "12px", letterSpacing: "0.09em", textTransform: "uppercase",
            fontFamily: F.body, fontWeight: 500,
          }}>{l}</a>
        ))}
        <button onClick={onAdmin} style={{
          background: "transparent", border: `1px solid ${C.steel}60`,
          color: C.silver, padding: "6px 14px", borderRadius: "2px",
          fontSize: "10px", letterSpacing: "0.1em", cursor: "pointer",
          textTransform: "uppercase", fontFamily: F.body,
        }}>Admin</button>
        <a href="mailto:techniworks31@gmail.com" className="cta-btn-primary" style={{
          background: `linear-gradient(135deg, ${C.accent}, ${C.electric})`,
          color: C.white, padding: "10px 24px", borderRadius: "3px",
          fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase",
          fontFamily: F.body, fontWeight: 600, textDecoration: "none",
          boxShadow: `0 6px 24px ${C.accent}40`,
          display: "inline-flex", alignItems: "center", gap: "7px",
        }}>
          <Mail size={14} /> Get a Quote
        </a>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh",
      background: `linear-gradient(155deg, ${C.darkest} 0%, ${C.navy} 35%, ${C.mid} 65%, ${C.blue}60 100%)`,
      display: "flex", alignItems: "center",
      overflow: "hidden",
    }}>
      <GridBg opacity={0.055} />

      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${C.electric}, ${C.accent}80, transparent)` }} />
      {/* Right accent */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, ${C.electric}80, transparent 55%)` }} />

      {/* Decorative right panel */}
      <div style={{
        position: "absolute", right: "7%", top: "13%", bottom: "13%", width: "38%",
        background: `linear-gradient(145deg, ${C.mid}50, ${C.blue}22)`,
        border: `1px solid ${C.electric}12`,
        borderRadius: "4px", overflow: "hidden",
      }}>
        <GridBg opacity={0.14} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -56%)" }}>
          <HardHat size={130} color={`${C.electric}15`} strokeWidth={0.4} />
        </div>
        {/* Status readout */}
        <div style={{ position: "absolute", bottom: "24px", left: "20px", right: "20px" }}>
          {[
            ["POWER SYSTEMS",      "ONLINE"],
            ["CABLE MANAGEMENT",   "ACTIVE"],
            ["FIRE DETECTION",     "ARMED"],
            ["TELECOM INFRA",      "READY"],
            ["HVAC SYSTEMS",       "RUNNING"],
          ].map(([label, status], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              padding: "5px 0", borderBottom: `1px solid ${C.electric}12`,
              fontFamily: F.mono, fontSize: "10px", color: C.silver,
              letterSpacing: "0.06em",
            }}>
              <span>
                <span style={{ color: C.electric, marginRight: "7px" }}>▶</span>
                {label}
              </span>
              <span style={{ color: `${C.electric}90` }}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", padding: "130px 80px 90px" }}>
        <div className="hero-child">
          <Tag>Since 2013 · Industrial Engineering Specialists</Tag>
        </div>

        <h1 className="hero-child" style={{
          fontFamily: F.display, fontWeight: 700,
          fontSize: "clamp(46px, 6.5vw, 84px)",
          lineHeight: 0.92, color: C.white,
          margin: "30px 0 0",
          letterSpacing: "-0.01em",
        }}>
          <span style={{ display: "block" }}>ENGINEERING</span>
          <span style={{ display: "block", color: C.electric }}>PRECISION</span>
          <span style={{ display: "block", fontSize: "56%", fontWeight: 500, color: C.silverL, letterSpacing: "0.32em", marginTop: "10px" }}>
            FOR INDUSTRY
          </span>
        </h1>

        <p className="hero-child" style={{
          color: C.silverL, fontFamily: F.body, fontSize: "15px",
          lineHeight: 1.75, maxWidth: "460px", margin: "32px 0 40px",
          fontWeight: 300,
        }}>
          A motivated engineering team delivering cable management systems, electrical installations, HVAC, fire detection and full industrial infrastructure — from technical study to commissioning.
        </p>

        <div className="hero-child" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="mailto:techniworks31@gmail.com" className="cta-btn-primary" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.electric})`,
            color: C.white, padding: "15px 30px", borderRadius: "3px",
            fontSize: "12.5px", letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: F.body, fontWeight: 600, textDecoration: "none",
            boxShadow: `0 8px 32px ${C.accent}50`,
            display: "inline-flex", alignItems: "center", gap: "8px",
          }}>
            <Mail size={16} /> Request Quotation
          </a>
          <a href="#contact" style={{
            background: "transparent", border: `1px solid ${C.silverL}45`,
            color: C.silverL, padding: "15px 30px", borderRadius: "3px",
            fontSize: "12.5px", letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: F.body, fontWeight: 500, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: "8px",
          }}>
            <Phone size={16} /> Contact Us
          </a>
          <a href="https://wa.me/213540078690" target="_blank" rel="noreferrer" style={{
            background: "#25D36618", border: `1px solid #25D36640`,
            color: C.green, padding: "15px 22px", borderRadius: "3px",
            fontSize: "12.5px", letterSpacing: "0.08em", textTransform: "uppercase",
            fontFamily: F.body, fontWeight: 500, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: "8px",
          }}>
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>

        {/* Stats */}
        <div className="hero-child" style={{
          display: "flex", gap: "44px", marginTop: "64px",
          paddingTop: "36px", borderTop: `1px solid ${C.electric}18`,
        }}>
          {[["10+", "Years Experience"], ["500+", "Projects Delivered"], ["100%", "Norm Compliance"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: F.display, fontSize: "36px", fontWeight: 700, color: C.electric, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: F.body, fontSize: "10.5px", color: C.silver, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ABOUT SECTION
// ─────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" style={{
      background: C.navy, padding: "108px 80px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: `linear-gradient(180deg, ${C.electric}, ${C.accent}80, transparent)` }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "90px", alignItems: "center" }}>
        {/* Left text */}
        <div>
          <Tag>About Techniworks</Tag>
          <SectionRule />
          <h2 style={{ fontFamily: F.display, fontSize: "52px", fontWeight: 700, color: C.white, lineHeight: 0.96, letterSpacing: "-0.01em", marginBottom: "26px" }}>
            MOTIVATED TEAM.<br />
            <span style={{ color: C.electric }}>PROVEN EXPERTISE.</span>
          </h2>
          <p style={{ color: C.silverL, fontFamily: F.body, fontSize: "14.5px", lineHeight: 1.8, marginBottom: "18px" }}>
            Since 2013, Techniworks Distribution has been delivering high-quality technical installations for industrial and building sectors across Algeria. Our experienced engineers combine deep technical knowledge with rigorous standards compliance.
          </p>
          <p style={{ color: C.silver, fontFamily: F.body, fontSize: "13.5px", lineHeight: 1.75 }}>
            From initial technical study and engineering plans through to complete installation, testing and commissioning — we handle every project phase with precision and accountability.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "34px", flexWrap: "wrap" }}>
            {["IEC Standards", "EN 54 Certified", "Algerian DTR Norms", "ISO Compliant"].map(cert => (
              <div key={cert} style={{
                border: `1px solid ${C.electric}28`, padding: "6px 14px", borderRadius: "2px",
                fontFamily: F.mono, fontSize: "10px", color: C.silverL, letterSpacing: "0.08em",
                display: "flex", alignItems: "center", gap: "7px",
              }}>
                <CheckCircle size={10} color={C.electric} />
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Right stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { icon: <Clock size={28} />,    value: "2013",  label: "Founded",    sub: "10+ years expertise" },
            { icon: <Award size={28} />,    value: "500+",  label: "Projects",   sub: "Delivered across Algeria" },
            { icon: <Users size={28} />,    value: "50+",   label: "Engineers",  sub: "Certified technical team" },
            { icon: <Building2 size={28} />,value: "100%",  label: "Compliance", sub: "All engineering norms" },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{
              background: `linear-gradient(135deg, ${C.mid}, ${C.blue}38)`,
              border: `1px solid ${C.electric}18`,
              borderRadius: "4px", padding: "30px 24px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ color: C.electric, marginBottom: "14px" }}>{s.icon}</div>
              <div style={{ fontFamily: F.display, fontSize: "40px", fontWeight: 700, color: C.white, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: F.body, fontSize: "11px", color: C.electric, fontWeight: 600, marginTop: "5px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</div>
              <div style={{ fontFamily: F.body, fontSize: "11px", color: C.silver, marginTop: "4px" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SERVICES SECTION
// ─────────────────────────────────────────────
const SERVICES = [
  { icon: <Layers size={30} />,   title: "Cable Management",      desc: "Complete cable tray systems, ladder racks and conduit infrastructure engineered for industrial environments." },
  { icon: <Zap size={30} />,      title: "Electrical Installations", desc: "Low and high current electrical installations — from distribution panels to full building wiring." },
  { icon: <Activity size={30} />, title: "HVAC & Technical",       desc: "Heating, ventilation and air conditioning systems for industrial, commercial and institutional facilities." },
  { icon: <Flame size={30} />,    title: "Fire Detection Systems", desc: "Addressable fire detection and alarm systems certified EN 54 with full BMS integration capability." },
  { icon: <Wifi size={30} />,     title: "Telecommunications",     desc: "Structured cabling, fiber optic networks, and complete telecom and data center infrastructure." },
  { icon: <BarChart2 size={30} />,title: "Technical Studies",      desc: "Complete engineering studies, technical plans, BOQ and specifications for all project types." },
  { icon: <Wrench size={30} />,   title: "Industrial Installations", desc: "Full industrial installation packages for factories, warehouses, production sites and industrial parks." },
];

function ServicesSection() {
  return (
    <section id="services" style={{
      background: C.dark, padding: "108px 80px",
      position: "relative", overflow: "hidden",
    }}>
      <GridBg opacity={0.04} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <Tag>Our Expertise</Tag>
          <SectionRule align="center" />
          <h2 style={{ fontFamily: F.display, fontSize: "56px", fontWeight: 700, color: C.white, letterSpacing: "-0.01em", lineHeight: 0.95 }}>
            TECHNICAL <span style={{ color: C.electric }}>SERVICES</span>
          </h2>
          <p style={{ color: C.silver, fontFamily: F.body, fontSize: "14px", maxWidth: "480px", margin: "18px auto 0", lineHeight: 1.75 }}>
            End-to-end industrial engineering solutions — from initial study to final commissioning.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "3px" }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card" style={{
              background: `${C.navy}80`,
              border: `1px solid ${C.steel}28`,
              borderRadius: "4px", padding: "38px 30px",
              cursor: "default",
              position: "relative", overflow: "hidden",
            }}>
              <div className="svc-icon" style={{ color: C.silver, marginBottom: "18px", transition: "color 0.3s" }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: F.mono, fontSize: "9.5px", color: C.steel, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>
                {String(i + 1).padStart(2, "0")} ─ SERVICE
              </div>
              <h3 style={{ fontFamily: F.display, fontSize: "21px", fontWeight: 600, color: C.white, marginBottom: "10px", letterSpacing: "0.02em", lineHeight: 1.1 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: F.body, fontSize: "13px", color: C.silver, lineHeight: 1.75 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────
function ProductCard({ product }) {
  return (
    <div className="product-card" style={{
      background: `linear-gradient(160deg, ${C.mid}, ${C.navy})`,
      border: `1px solid ${C.steel}40`,
      borderRadius: "4px", overflow: "hidden",
    }}>
      {/* Image area */}
      <div style={{
        height: "210px",
        background: `linear-gradient(135deg, ${C.blue}55, ${C.steel}38)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${C.electric}12`,
      }}>
        {product.image ? (
          <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <GridBg opacity={0.18} />
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <Layers size={52} color={`${C.electric}35`} strokeWidth={0.7} />
              <div style={{ fontFamily: F.mono, fontSize: "9px", color: C.steel, marginTop: "10px", letterSpacing: "0.12em" }}>
                {(product.category || "PRODUCT").toUpperCase()}
              </div>
            </div>
          </>
        )}
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <Tag color={C.electric}>{product.category || "Technical"}</Tag>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "26px" }}>
        <h3 style={{ fontFamily: F.display, fontSize: "22px", fontWeight: 600, color: C.white, marginBottom: "8px", letterSpacing: "0.02em" }}>
          {product.title}
        </h3>
        <p style={{ fontFamily: F.body, fontSize: "13px", color: C.silver, lineHeight: 1.7, marginBottom: "18px" }}>
          {product.description}
        </p>

        {product.specs?.length > 0 && (
          <div style={{ borderTop: `1px solid ${C.electric}12`, paddingTop: "16px", marginBottom: "22px" }}>
            <div style={{ fontFamily: F.mono, fontSize: "9.5px", color: C.electric, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>
              Technical Specifications
            </div>
            {product.specs.map((spec, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "3.5px 0" }}>
                <span style={{ color: C.electric, fontSize: "9px", marginTop: "4px", flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: F.body, fontSize: "12px", color: C.silverL }}>{spec}</span>
              </div>
            ))}
          </div>
        )}

        <a href="mailto:techniworks31@gmail.com" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          background: `linear-gradient(135deg, ${C.accent}, ${C.electric})`,
          color: C.white, padding: "11px 20px", borderRadius: "2px",
          fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase",
          fontFamily: F.body, fontWeight: 600, textDecoration: "none",
        }}>
          <Mail size={13} /> Request Information
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PRODUCTS SECTION
// ─────────────────────────────────────────────
function ProductsSection({ products }) {
  return (
    <section id="products" style={{
      background: `linear-gradient(180deg, ${C.dark}, ${C.navy})`,
      padding: "108px 80px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "64px" }}>
          <Tag>Product Catalog</Tag>
          <SectionRule />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontFamily: F.display, fontSize: "56px", fontWeight: 700, color: C.white, letterSpacing: "-0.01em", lineHeight: 0.95 }}>
              OUR <span style={{ color: C.electric }}>PRODUCTS</span>
            </h2>
            <p style={{ fontFamily: F.body, fontSize: "13px", color: C.silver, maxWidth: "300px", textAlign: "right", lineHeight: 1.7 }}>
              Industrial-grade components and systems engineered for performance and durability.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", color: C.silver, fontFamily: F.body, border: `1px dashed ${C.steel}`, borderRadius: "4px" }}>
            No products yet. Use the Admin panel to add your product catalog.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TECHNICAL ADVANTAGES
// ─────────────────────────────────────────────
const ADVANTAGES = [
  { icon: <Award size={30} />,       title: "Engineering Expertise",    desc: "Over a decade of hands-on industrial experience across all technical disciplines and sectors." },
  { icon: <CheckCircle size={30} />, title: "Standards Compliance",     desc: "Full adherence to IEC, EN 54, Algerian DTR norms and all relevant engineering standards." },
  { icon: <Target size={30} />,      title: "Optimized Installations",  desc: "Engineered layouts that minimize cable runs, reduce material costs and maximize system efficiency." },
  { icon: <Wrench size={30} />,      title: "Maintenance Accessible",   desc: "Every installation is designed with future maintenance, modifications and expansions in mind." },
  { icon: <Clock size={30} />,       title: "On-Time Execution",        desc: "Structured project management methodology ensuring timely execution and milestone delivery." },
  { icon: <BarChart2 size={30} />,   title: "Cost Optimization",        desc: "Competitive pricing through efficient engineering, bulk sourcing and optimized project planning." },
];

function AdvantagesSection() {
  return (
    <section id="advantages" style={{
      background: C.mid, padding: "108px 80px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${C.electric}, ${C.accent}, transparent)` }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <Tag>Why Choose Us</Tag>
          <SectionRule align="center" />
          <h2 style={{ fontFamily: F.display, fontSize: "56px", fontWeight: 700, color: C.white, letterSpacing: "-0.01em", lineHeight: 0.95 }}>
            TECHNICAL <span style={{ color: C.electric }}>ADVANTAGES</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {ADVANTAGES.map((adv, i) => (
            <div key={i} className="adv-row" style={{
              padding: "42px 34px",
              borderLeft:   i % 3 !== 0 ? `1px solid ${C.electric}14` : "none",
              borderTop:    i >= 3      ? `1px solid ${C.electric}14` : "none",
              position: "relative",
            }}>
              <div className="adv-icon-box" style={{
                width: "62px", height: "62px",
                background: `${C.electric}0E`,
                border: `1px solid ${C.electric}22`,
                borderRadius: "3px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.electric, marginBottom: "22px",
              }}>{adv.icon}</div>
              <h3 style={{ fontFamily: F.display, fontSize: "21px", fontWeight: 600, color: C.white, marginBottom: "10px" }}>
                {adv.title}
              </h3>
              <p style={{ fontFamily: F.body, fontSize: "13px", color: C.silver, lineHeight: 1.75 }}>
                {adv.desc}
              </p>
              <div style={{ position: "absolute", top: "20px", right: "22px", fontFamily: F.mono, fontSize: "11px", color: C.steel }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PROJECTS SECTION
// ─────────────────────────────────────────────
const PROJECTS = [
  { title: "Industrial Factory — Cable Management", location: "Oran Industrial Zone",  type: "Cable Trays + Electrical",         year: "2023" },
  { title: "Commercial Complex — Full Electrical",  location: "Oran City Center",      type: "LV Distribution + Fire Detection", year: "2022" },
  { title: "Warehouse — HVAC & Telecom",            location: "Bir El Djir, Oran",     type: "HVAC + Structured Cabling",        year: "2023" },
];

function ProjectsSection() {
  return (
    <section id="projects" style={{
      background: C.dark, padding: "108px 80px",
      position: "relative", overflow: "hidden",
    }}>
      <GridBg opacity={0.04} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <Tag>Portfolio</Tag>
            <SectionRule />
            <h2 style={{ fontFamily: F.display, fontSize: "56px", fontWeight: 700, color: C.white, letterSpacing: "-0.01em", lineHeight: 0.95 }}>
              RECENT <span style={{ color: C.electric }}>PROJECTS</span>
            </h2>
          </div>
          <p style={{ fontFamily: F.body, fontSize: "13px", color: C.silver, maxWidth: "260px", textAlign: "right", lineHeight: 1.75 }}>
            A selection of industrial and commercial installations delivered across Algeria.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{
              background: `linear-gradient(160deg, ${C.navy}, ${C.mid}88)`,
              border: `1px solid ${C.electric}14`,
              borderRadius: "4px", overflow: "hidden",
            }}>
              {/* Visual placeholder */}
              <div style={{
                height: "230px", position: "relative",
                background: `linear-gradient(145deg, ${C.blue}70, ${C.mid})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
              }}>
                <GridBg opacity={0.22} />
                <HardHat size={68} color={`${C.electric}22`} strokeWidth={0.45} />
                <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                  <Tag color={C.gold}>{p.year}</Tag>
                </div>
                {/* Bottom bar */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${C.electric}, ${C.accent}60, transparent)` }} />
              </div>
              <div style={{ padding: "26px" }}>
                <div style={{ fontFamily: F.mono, fontSize: "9.5px", color: C.electric, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "9px" }}>
                  {p.type}
                </div>
                <h3 style={{ fontFamily: F.display, fontSize: "18px", fontWeight: 600, color: C.white, marginBottom: "10px", lineHeight: 1.15 }}>
                  {p.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: C.silver, fontFamily: F.body, fontSize: "12px" }}>
                  <MapPin size={12} color={C.electric} /> {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.mid} 0%, ${C.blue} 55%, ${C.accent}35 100%)`,
      padding: "110px 80px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      <GridBg opacity={0.09} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${C.electric}0A 0%, transparent 68%)` }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.electric, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "26px" }}>
          ▶ Ready to Start Your Project?
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: "clamp(50px, 7vw, 72px)", fontWeight: 700, color: C.white, lineHeight: 0.92, letterSpacing: "-0.01em", marginBottom: "26px" }}>
          LET'S BUILD<br />
          <span style={{ color: C.electric }}>TOGETHER</span>
        </h2>
        <p style={{ fontFamily: F.body, fontSize: "15px", color: C.silverL, lineHeight: 1.75, marginBottom: "44px" }}>
          Contact our engineering team for a technical consultation, detailed project quotation, or to discuss your industrial infrastructure requirements.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:techniworks31@gmail.com" className="cta-btn-primary" style={{
            background: `linear-gradient(135deg, ${C.accent}, ${C.electric})`,
            color: C.white, padding: "16px 38px", borderRadius: "3px",
            fontSize: "12.5px", letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: F.body, fontWeight: 600, textDecoration: "none",
            boxShadow: `0 10px 36px ${C.accent}55`,
            display: "inline-flex", alignItems: "center", gap: "10px",
          }}>
            <Mail size={16} /> Request a Quotation
          </a>
          <a href="https://wa.me/213540078690" target="_blank" rel="noreferrer" style={{
            background: "#25D36614", border: `1px solid #25D36648`,
            color: C.green, padding: "16px 38px", borderRadius: "3px",
            fontSize: "12.5px", letterSpacing: "0.12em", textTransform: "uppercase",
            fontFamily: F.body, fontWeight: 600, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: "10px",
          }}>
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer({ onAdmin }) {
  return (
    <footer id="contact" style={{
      background: C.darkest, borderTop: `1px solid ${C.electric}14`,
      padding: "70px 80px 36px", fontFamily: F.body,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "60px", marginBottom: "60px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
              <div style={{
                width: "38px", height: "38px",
                background: `linear-gradient(135deg, ${C.electric}, ${C.accent})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                clipPath: "polygon(14% 0%, 86% 0%, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0% 86%, 0% 14%)",
                flexShrink: 0,
              }}>
                <Zap size={16} color={C.white} />
              </div>
              <div>
                <div style={{ color: C.white, fontFamily: F.display, fontWeight: 700, fontSize: "17px", lineHeight: 1, letterSpacing: "0.06em" }}>TECHNIWORKS</div>
                <div style={{ color: C.silver, fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase" }}>DISTRIBUTION</div>
              </div>
            </div>
            <p style={{ color: C.silver, fontSize: "13px", lineHeight: 1.75, maxWidth: "260px" }}>
              Industrial engineering specialists since 2013. Delivering precision technical installations across Algeria.
            </p>
            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${C.electric}10` }}>
              <div style={{ fontFamily: F.mono, fontSize: "9.5px", color: C.steel, letterSpacing: "0.12em", marginBottom: "8px" }}>CERTIFICATIONS</div>
              <div style={{ display: "flex", gap: "8px" }}>
                {["IEC", "EN54", "DTR"].map(c => (
                  <span key={c} style={{ border: `1px solid ${C.electric}22`, padding: "3px 10px", borderRadius: "2px", fontFamily: F.mono, fontSize: "9.5px", color: C.silverL }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ color: C.electric, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "18px" }}>Services</div>
            {["Cable Management", "Electrical Installs", "HVAC Systems", "Fire Detection", "Telecom Infra", "Technical Studies"].map(s => (
              <div key={s} style={{ color: C.silver, fontSize: "13px", padding: "4.5px 0", lineHeight: 1.4 }}>{s}</div>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ color: C.electric, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "18px" }}>Company</div>
            {["About Us", "Our Projects", "Product Catalog", "Technical Expertise"].map(s => (
              <div key={s} style={{ color: C.silver, fontSize: "13px", padding: "4.5px 0", lineHeight: 1.4 }}>{s}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: C.electric, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "18px" }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              <a href="mailto:techniworks31@gmail.com" style={{ display: "flex", gap: "9px", color: C.silverL, fontSize: "12.5px", textDecoration: "none", alignItems: "flex-start" }}>
                <Mail size={14} style={{ flexShrink: 0, marginTop: "1px", color: C.electric }} />
                techniworks31@gmail.com
              </a>
              <a href="tel:+213540078690" style={{ display: "flex", gap: "9px", color: C.silverL, fontSize: "12.5px", textDecoration: "none", alignItems: "center" }}>
                <Phone size={14} style={{ flexShrink: 0, color: C.electric }} />
                +213 540 078 690
              </a>
              <a href="https://wa.me/213540078690" target="_blank" rel="noreferrer" style={{ display: "flex", gap: "9px", color: C.green, fontSize: "12.5px", textDecoration: "none", alignItems: "center" }}>
                <MessageCircle size={14} style={{ flexShrink: 0 }} />
                WhatsApp
              </a>
              <div style={{ display: "flex", gap: "9px", color: C.silver, fontSize: "12.5px", alignItems: "flex-start" }}>
                <MapPin size={14} style={{ flexShrink: 0, marginTop: "1px", color: C.electric }} />
                Sidi Maarouf, Oran, Algeria
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${C.electric}10`, paddingTop: "26px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: C.steel, fontSize: "12px", fontFamily: F.body }}>
            © {new Date().getFullYear()} Techniworks Distribution. All rights reserved.
          </div>
          <button onClick={onAdmin} style={{
            background: "transparent", border: "none", color: C.steel,
            fontSize: "10px", cursor: "pointer", letterSpacing: "0.12em",
            fontFamily: F.mono, textTransform: "uppercase",
          }}>
            [ADMIN ACCESS]
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────
function HomePage({ products, onAdmin }) {
  return (
    <div style={{ background: C.dark, minHeight: "100vh" }}>
      <Navbar onAdmin={onAdmin} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection products={products} />
      <AdvantagesSection />
      <ProjectsSection />
      <CTASection />
      <Footer onAdmin={onAdmin} />
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN PAGE
// ─────────────────────────────────────────────
const EMPTY_FORM = { title: "", description: "", category: "", specs: "", image: null };

function AdminPage({ products, setProducts, onBack }) {
  const [editId, setEditId]       = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saved, setSaved]         = useState(false);
  const fileRef                   = useRef();

  const resetForm = () => { setForm(EMPTY_FORM); setEditId(null); };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const specsArr = form.specs.split("\n").map(s => s.trim()).filter(Boolean);
    if (editId !== null) {
      setProducts(prev => prev.map(p => p.id === editId ? { ...p, ...form, specs: specsArr } : p));
    } else {
      setProducts(prev => [...prev, { id: Date.now(), ...form, specs: specsArr }]);
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowForm(false); resetForm(); }, 1200);
  };

  const handleEdit = (p) => {
    setForm({ title: p.title, description: p.description, category: p.category || "", specs: (p.specs || []).join("\n"), image: p.image });
    setEditId(p.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const inputStyle = {
    width: "100%", background: C.mid, border: `1px solid ${C.electric}28`,
    borderRadius: "3px", padding: "11px 14px", color: C.white,
    fontFamily: F.body, fontSize: "14px", outline: "none",
  };

  return (
    <div style={{ background: C.dark, minHeight: "100vh", fontFamily: F.body }}>
      {/* Admin navbar */}
      <div style={{
        background: C.navy, borderBottom: `1px solid ${C.electric}20`,
        padding: "0 48px", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "34px", height: "34px",
            background: `linear-gradient(135deg, ${C.electric}, ${C.accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            clipPath: "polygon(14% 0%, 86% 0%, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0% 86%, 0% 14%)",
          }}>
            <Zap size={14} color={C.white} />
          </div>
          <span style={{ color: C.white, fontFamily: F.display, fontWeight: 700, fontSize: "17px", letterSpacing: "0.1em" }}>ADMIN DASHBOARD</span>
          <span style={{ fontFamily: F.mono, fontSize: "10px", color: `${C.electric}90`, letterSpacing: "0.1em" }}>/ Products</span>
        </div>
        <button onClick={onBack} style={{
          background: "transparent", border: `1px solid ${C.steel}60`,
          color: C.silverL, padding: "8px 22px", borderRadius: "3px",
          fontSize: "12px", cursor: "pointer", fontFamily: F.body,
          letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px",
        }}>
          ← Back to Website
        </button>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "44px 40px" }}>
        {/* KPI cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "36px" }}>
          {[
            { label: "Total Products",  value: products.length,                                                      icon: <Layers size={22} /> },
            { label: "With Images",     value: products.filter(p => p.image).length,                                 icon: <Upload size={22} /> },
            { label: "Categories",      value: [...new Set(products.map(p => p.category).filter(Boolean))].length,   icon: <Settings size={22} /> },
          ].map((s, i) => (
            <div key={i} style={{
              background: C.navy, border: `1px solid ${C.electric}16`,
              borderRadius: "4px", padding: "22px 26px",
              display: "flex", alignItems: "center", gap: "18px",
            }}>
              <div style={{ color: C.electric }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: F.display, fontSize: "32px", fontWeight: 700, color: C.white, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: F.body, fontSize: "12px", color: C.silver, marginTop: "3px" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add button */}
        {!showForm && (
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            style={{
              background: `linear-gradient(135deg, ${C.accent}, ${C.electric})`,
              color: C.white, border: "none", padding: "13px 30px", borderRadius: "3px",
              fontSize: "12.5px", letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: F.body, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px",
              boxShadow: `0 6px 26px ${C.accent}40`, marginBottom: "32px",
            }}
          >
            <Plus size={16} /> Add New Product
          </button>
        )}

        {/* Product form */}
        {showForm && (
          <div style={{
            background: C.navy, border: `1px solid ${C.electric}28`,
            borderRadius: "4px", padding: "36px",
            marginBottom: "36px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: F.display, fontSize: "26px", fontWeight: 600, color: C.white, letterSpacing: "0.05em" }}>
                {editId ? "✏  EDIT PRODUCT" : "+  ADD NEW PRODUCT"}
              </h2>
              <button onClick={() => { setShowForm(false); resetForm(); }} style={{ background: "transparent", border: "none", color: C.silver, cursor: "pointer" }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
              {/* Left */}
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: F.mono, fontSize: "10px", color: C.electric, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "9px" }}>Product Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Cable Tray System GS-200" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: F.mono, fontSize: "10px", color: C.electric, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "9px" }}>Category</label>
                  <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="e.g. Cable Management, Electrical..." style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: F.mono, fontSize: "10px", color: C.electric, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "9px" }}>Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={5} placeholder="Short technical description..." style={{ ...inputStyle, resize: "vertical" }} />
                </div>
              </div>

              {/* Right */}
              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: F.mono, fontSize: "10px", color: C.electric, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "9px" }}>
                    Technical Specifications <span style={{ color: C.steel }}>(one per line)</span>
                  </label>
                  <textarea
                    value={form.specs}
                    onChange={e => setForm(f => ({ ...f, specs: e.target.value }))}
                    rows={5}
                    placeholder={"Material: Galvanized steel\nLoad capacity: 150 kg/m\nWidth range: 50-600mm\nStandard: IEC 61537"}
                    style={{ ...inputStyle, fontFamily: F.mono, fontSize: "12.5px", resize: "vertical" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: F.mono, fontSize: "10px", color: C.electric, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "9px" }}>Product Image</label>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  <div onClick={() => fileRef.current.click()} style={{
                    border: `2px dashed ${C.electric}28`, borderRadius: "3px",
                    padding: "28px", textAlign: "center", cursor: "pointer",
                    background: C.mid, minHeight: "130px",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px",
                  }}>
                    {form.image ? (
                      <img src={form.image} alt="Preview" style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain" }} />
                    ) : (
                      <>
                        <Upload size={26} color={C.electric} />
                        <span style={{ color: C.silver, fontFamily: F.body, fontSize: "13px" }}>Click to upload product image</span>
                        <span style={{ color: C.steel, fontFamily: F.body, fontSize: "11px" }}>PNG, JPG, WebP supported</span>
                      </>
                    )}
                  </div>
                  {form.image && (
                    <button onClick={() => setForm(f => ({ ...f, image: null }))} style={{ marginTop: "8px", background: "transparent", border: "none", color: C.silver, fontSize: "12px", cursor: "pointer", fontFamily: F.body, display: "flex", alignItems: "center", gap: "5px" }}>
                      <X size={13} /> Remove image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Form actions */}
            <div style={{ display: "flex", gap: "12px", marginTop: "30px", paddingTop: "24px", borderTop: `1px solid ${C.electric}14` }}>
              <button onClick={handleSave} style={{
                background: saved ? `${C.green}20` : `linear-gradient(135deg, ${C.accent}, ${C.electric})`,
                border: saved ? `1px solid ${C.green}40` : "none",
                color: saved ? C.green : C.white,
                padding: "12px 34px", borderRadius: "3px",
                fontSize: "12.5px", letterSpacing: "0.1em", textTransform: "uppercase",
                fontFamily: F.body, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: "8px", transition: "all 0.3s",
              }}>
                {saved ? <><Check size={16} /> Saved!</> : <><Check size={16} /> {editId ? "Update Product" : "Save Product"}</>}
              </button>
              <button onClick={() => { setShowForm(false); resetForm(); }} style={{
                background: "transparent", border: `1px solid ${C.steel}60`,
                color: C.silver, padding: "12px 26px", borderRadius: "3px",
                fontSize: "12.5px", cursor: "pointer", fontFamily: F.body,
              }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products list */}
        <div>
          <div style={{ fontFamily: F.mono, fontSize: "10px", color: C.electric, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>
            Product Catalog — {products.length} items
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "70px", color: C.silver, fontFamily: F.body, border: `1px dashed ${C.steel}50`, borderRadius: "4px" }}>
              No products yet. Click "Add New Product" to start building your catalog.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {products.map(p => (
                <div key={p.id} style={{
                  background: C.navy, border: `1px solid ${C.electric}14`,
                  borderRadius: "4px", padding: "18px 22px",
                  display: "flex", alignItems: "center", gap: "20px",
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: "62px", height: "62px", flexShrink: 0,
                    background: C.mid, borderRadius: "3px", overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: `1px solid ${C.electric}14`,
                  }}>
                    {p.image
                      ? <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <Layers size={24} color={C.steel} />
                    }
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F.display, fontSize: "17px", fontWeight: 600, color: C.white }}>{p.title}</div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "5px", alignItems: "center", flexWrap: "wrap" }}>
                      {p.category && <Tag color={C.electric}>{p.category}</Tag>}
                      <span style={{ fontFamily: F.body, fontSize: "12px", color: C.silver }}>{p.specs?.length || 0} specifications</span>
                      {p.image && <span style={{ fontFamily: F.body, fontSize: "12px", color: `${C.green}80` }}>● Image</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <button onClick={() => handleEdit(p)} style={{
                      background: `${C.electric}14`, border: `1px solid ${C.electric}30`,
                      color: C.electric, padding: "8px 18px", borderRadius: "3px",
                      fontSize: "12px", cursor: "pointer", fontFamily: F.body,
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      <Edit2 size={13} /> Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} style={{
                      background: "#FF303010", border: `1px solid #FF303030`,
                      color: "#FF5555", padding: "8px 18px", borderRadius: "3px",
                      fontSize: "12px", cursor: "pointer", fontFamily: F.body,
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage]         = useState("home");
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);

  return (
    <>
      <GlobalStyle />
      {page === "admin"
        ? <AdminPage products={products} setProducts={setProducts} onBack={() => setPage("home")} />
        : <HomePage  products={products} onAdmin={() => setPage("admin")} />
      }
    </>
  );
}
