import { useEffect, useRef, useState } from "react";
import logo from "../assets/Shivansh-logo.avif";
import "./header.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const tickerItems = [
  "Road Transportation",
  "Warehousing",
  "Project Logistics",
  "Government Projects",
  "Connecting India",
];

/* true = intro plays only once per browser session. false = plays on every page load. */
const PLAY_ONCE_PER_SESSION = true;

function MiniTruck({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 52" aria-hidden="true">
      <ellipse cx="60" cy="50" rx="56" ry="2.5" fill="#000" opacity=".25" />
      <g className="mt-body">
        <rect x="2" y="4" width="78" height="34" rx="2" fill="#2437c9" />
        <path
          d="M12 5V37M22 5V37M32 5V37M42 5V37M52 5V37M62 5V37M72 5V37"
          stroke="#0d1650"
          strokeWidth="1"
          opacity=".45"
        />
        <path d="M2 4H26L2 20Z" fill="#f5a623" />
        <rect x="10" y="27" width="62" height="5" fill="#f5a623" />
        <circle cx="44" cy="15" r="6" fill="none" stroke="#fff" strokeWidth="1.4" />
        <text x="44" y="18" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="Manrope, sans-serif">SL</text>
        <rect x="2" y="38" width="112" height="5" fill="#10131b" />
        <path d="M82 12H100Q105 12 108 18L118 32V38H82Z" fill="#2c47e0" />
        <path d="M88 16H100L108 28H88Z" fill="#bcd8f2" />
        <rect x="113" y="30" width="5" height="4" rx="1" fill="#fff3c2" />
        {[20, 36, 100].map((cx) => (
          <g className="mt-wheel" key={cx}>
            <circle cx={cx} cy="43" r="8" fill="#0b0d11" />
            <circle cx={cx} cy="43" r="4" fill="#aab4c0" />
            <path d={`M${cx} 39.5V46.5M${cx - 3.5} 43H${cx + 3.5}`} stroke="#5d6775" strokeWidth="1.2" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Intro() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (PLAY_ONCE_PER_SESSION) {
      try {
        if (sessionStorage.getItem("sl-intro-seen")) return false;
      } catch {
        /* storage blocked: just play the intro */
      }
    }
    return true;
  });

  useEffect(() => {
    if (!show) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setShow(false), 3000);
    try {
      sessionStorage.setItem("sl-intro-seen", "1");
    } catch {
      /* ignore */
    }
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="intro" onClick={() => setShow(false)} aria-hidden="true">
      <div className="intro-half intro-top" />
      <div className="intro-half intro-bottom" />

      <div className="intro-center">
        <span className="intro-mark">SL</span>
        <h2 className="intro-title">Shivansh Logistics</h2>
        <p className="intro-sub">Driven by Trust. Powered by Excellence.</p>
      </div>

      <div className="intro-road">
        <MiniTruck className="intro-truck" />
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let frame = 0;
    let stopTimer = 0;

    const update = () => {
      frame = 0;
      const el = headerRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      el.classList.add("is-moving");
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => el.classList.remove("is-moving"), 160);
      setScrolled(window.scrollY > 40);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <>
      <Intro />

      <header
        ref={headerRef}
        className={`site-header sh ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="topbar">
          <div className="container topbar-inner">
            <div className="sh-ticker" aria-label="Our services">
              <div className="sh-ticker-track">
                {[0, 1].map((copy) => (
                  <div className="sh-ticker-group" key={copy} aria-hidden={copy === 1}>
                    {tickerItems.map((item) => (
                      <span className="sh-ticker-item" key={item}>
                        <i className="sh-dot" />
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <a className="sh-topmail" href="mailto:info@shivanshlogistic.in">
              info@shivanshlogistic.in
            </a>
          </div>
        </div>

        {/* Scroll-progress road with the truck (sits behind the navbar) */}
        <div className="sh-road" aria-hidden="true">
          <span className="sh-road-fill" />
          <MiniTruck className="sh-truck" />
        </div>

        <div className="container navbar">
          <a
            href="#home"
            className="brand"
            onClick={closeMenu}
            aria-label="Shivansh Logistics home"
          >
            <img
              src={logo}
              alt="Shivansh Logistics"
              className="header-company-logo"
              style={{ width: "150px", height: "82px", objectFit: "contain" }}
            />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`nav-links ${menuOpen ? "nav-open" : ""}`}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}

            <a
              className="button button-primary nav-cta"
              href="#contact"
              onClick={closeMenu}
            >
              Get a Quote <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}