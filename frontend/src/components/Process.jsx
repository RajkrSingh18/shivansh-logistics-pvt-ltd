import { useEffect, useRef, useState } from "react";
import "./process.css";

const Svg = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const steps = [
  {
    title: "Share your requirement",
    text: "Tell us what you need to move, from where to where, and by when.",
    icon: (
      <Svg>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4h6v3H9zM8.500 12h7M8.500 16h5" />
      </Svg>
    ),
  },
  {
    title: "We plan the movement",
    text: "Our team suggests the right vehicle, route and handling for your cargo.",
    icon: (
      <Svg>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6" />
      </Svg>
    ),
  },
  {
    title: "Dispatch and tracking",
    text: "Your consignment is loaded and dispatched, and we keep you informed on the way.",
    icon: (
      <Svg>
        <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" />
        <circle cx="7" cy="17.500" r="2" />
        <circle cx="17" cy="17.500" r="2" />
      </Svg>
    ),
  },
  {
    title: "Delivery and follow-up",
    text: "Cargo reaches the destination safely, and we stay available for your next need.",
    icon: (
      <Svg>
        <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
        <path d="M8.500 12.500l2.500 2.500 4.500-5" />
      </Svg>
    ),
  },
];

function Truck() {
  return (
    <svg className="pr-truck-svg" viewBox="0 0 120 52" aria-hidden="true">
      <ellipse cx="60" cy="50" rx="56" ry="2.500" fill="#000" opacity=".22" />
      <g className="pr-body">
        <rect x="2" y="4" width="78" height="34" rx="2" fill="#2437c9" />
        <path
          d="M12 5V37M22 5V37M32 5V37M42 5V37M52 5V37M62 5V37M72 5V37"
          stroke="#0d1650"
          strokeWidth="1"
          opacity=".45"
        />
        <path d="M2 4H26L2 20Z" fill="#f5a623" />
        <rect x="10" y="27" width="62" height="5" fill="#f5a623" />
        <circle cx="44" cy="15" r="6" fill="none" stroke="#fff" strokeWidth="1.400" />
        <text x="44" y="18" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="Manrope, sans-serif">SL</text>
        <rect x="2" y="38" width="112" height="5" fill="#10131b" />
        <path d="M82 12H100Q105 12 108 18L118 32V38H82Z" fill="#2c47e0" />
        <path d="M88 16H100L108 28H88Z" fill="#bcd8f2" />
        <circle cx="96" cy="19" r="2.600" fill="#e0aa84" />
        <path d="M92.500 18.500A3.500 3.500 0 0 1 99.500 18.500Z" fill="#10263f" />
        <rect x="113" y="30" width="5" height="4" rx="1" fill="#fff3c2" />
        {[20, 36, 100].map((cx) => (
          <g className="pr-wheel" key={cx}>
            <circle cx={cx} cy="43" r="8" fill="#0b0d11" />
            <circle cx={cx} cy="43" r="4" fill="#aab4c0" />
            <path d={`M${cx} 39.500V46.500M${cx - 3.500} 43H${cx + 3.500}`} stroke="#5d6775" strokeWidth="1.200" />
          </g>
        ))}
      </g>
    </svg>
  );
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export default function Process() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--p", "1");
      setSeen(true);
      setReached(steps.length);
      return undefined;
    }

    let frame = 0;
    let stopTimer = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.75 - r.top) / (r.height * 0.6), 0, 1);
      el.style.setProperty("--p", p.toFixed(4));

      if (r.top < vh * 0.85) setSeen(true);

      let n = 0;
      steps.forEach((_, i) => {
        if (p >= i / (steps.length - 1) - 0.02 && r.top < vh * 0.7) n = i + 1;
      });
      setReached(n);

      el.classList.add("is-moving");
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => el.classList.remove("is-moving"), 160);
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
    <section
      className={`section pr ${seen ? "in" : ""}`}
      id="process"
      ref={ref}
    >
      <div className="container">
        <div className="section-heading pr-head">
          <div>
            <span className="eyebrow">How it works</span>
            <h2>
              From enquiry to delivery,
              <br />
              <span>in four clear steps.</span>
            </h2>
          </div>
          <p>A simple process so you always know what happens next with your cargo.</p>
        </div>

        <div className="pr-journey">
          {/* Desktop road with the moving truck */}
          <div className="pr-road" aria-hidden="true">
            <span className="pr-line" />
            <span className="pr-fill" />
            {steps.map((s, i) => (
              <span
                key={s.title}
                className={`pr-dot ${i < reached ? "is-on" : ""}`}
                style={{ left: `${12.5 + i * 25}%` }}
              />
            ))}
            <div className="pr-truck">
              <Truck />
            </div>
          </div>

          {/* Mobile vertical progress line */}
          <span className="pr-vline" aria-hidden="true">
            <span className="pr-vfill" />
          </span>

          <ol className="pr-list">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`pr-card ${i < reached ? "is-on" : ""}`}
                style={{ "--i": i }}
              >
                <div className="pr-card-top">
                  <span className="pr-num">{i + 1}</span>
                  <span className="pr-ico">{s.icon}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="pr-cta">
          <p>
            <strong>Ready to move your cargo?</strong>
            <span>Share your requirement and our team will get back to you.</span>
          </p>
          <div className="pr-cta-actions">
            <a href="#contact" className="button button-primary">
              Get a quote <span>↗</span>
            </a>
            <a
              href="https://wa.me/919053791296?text=Hello%20Shivansh%20Logistics%2C%20I%20need%20a%20quote."
              className="pr-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
