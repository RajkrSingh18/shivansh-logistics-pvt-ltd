import { useEffect, useRef, useState } from "react";
import "./about.css";

const Svg = ({ children, size = 24 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
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

const icons = {
  route: (
    <Svg>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6" />
    </Svg>
  ),
  shield: (
    <Svg>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  ),
  box: (
    <Svg>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
      <path d="M3 7l9 4 9-4M12 11v10" />
    </Svg>
  ),
  target: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </Svg>
  ),
  factory: (
    <Svg>
      <path d="M3 20V9l6 4V9l6 4V5h3v15z" />
      <path d="M7 20v-3M12 20v-3" />
    </Svg>
  ),
  chat: (
    <Svg>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9.500h8M8 12.500h5" />
    </Svg>
  ),
  phone: (
    <Svg size={20}>
      <path d="M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </Svg>
  ),
};

/* Adds the "in" class once the element scrolls into view */
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window))
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);

  return [ref, seen];
}

/* ---------------- Trust strip ---------------- */
const trust = [
  { icon: icons.route, title: "Business-focused logistics", text: "Planned around your cargo and timeline" },
  { icon: icons.shield, title: "Safety-conscious operations", text: "Careful handling at every step" },
  { icon: icons.box, title: "Transport & storage solutions", text: "Road freight and warehousing in one place" },
];

export function TrustStrip() {
  const [ref, seen] = useInView(0.3);
  return (
    <section className={`ts ${seen ? "in" : ""}`} ref={ref}>
      <div className="container ts-grid">
        {trust.map((t, i) => (
          <div className="ts-item rv" style={{ "--d": `${i * 0.12}s` }} key={t.title}>
            <span className="ts-icon">{t.icon}</span>
            <div>
              <strong>{t.title}</strong>
              <span>{t.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
const points = [
  { icon: icons.target, title: "Solutions tailored to your requirements", text: "We plan around your cargo, route and schedule." },
  { icon: icons.factory, title: "Support for industrial logistics needs", text: "Transport and storage for industry and infrastructure." },
  { icon: icons.chat, title: "Business-focused service coordination", text: "One team, clear communication, no confusion." },
];

export default function About() {
  const [ref, seen] = useInView(0.15);
  const photoRef = useRef(null);

  const onMove = (e) => {
    const el = photoRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--ry", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    const el = photoRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0");
    el.style.setProperty("--ry", "0");
  };

  return (
    <section className={`section ab ${seen ? "in" : ""}`} id="about" ref={ref}>
      <div className="container ab-grid">
        {/* ---------- Visual ---------- */}
        <div
          className="ab-visual rv"
          style={{ "--d": "0s" }}
          ref={photoRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <div className="ab-frame" aria-hidden="true" />

          <div className="ab-photo">
            <img
              src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1000&q=85"
              alt="Commercial cargo transportation and logistics"
              loading="lazy"
            />
            <div className="ab-photo-shade" />
          </div>

          <div className="ab-inset">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80"
              alt="Warehouse storage"
              loading="lazy"
            />
          </div>

          <div className="ab-badge" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="ab-badge-ring">
              <defs>
                <path id="abCircle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
              </defs>
              <text>
                <textPath href="#abCircle" startOffset="0">
                  Business-focused · Safety-conscious · Coordinated ·
                </textPath>
              </text>
            </svg>
            <span className="ab-badge-core">SL</span>
          </div>

          <div className="ab-caption">
            <span className="ab-caption-mark">SL</span>
            <div>
              <strong>Shivansh Logistics</strong>
              <small>Moving your business forward</small>
            </div>
          </div>
        </div>

        {/* ---------- Content ---------- */}
        <div className="ab-content">
          <span className="eyebrow rv" style={{ "--d": "0.1s" }}>About our company</span>

          <h2 className="rv" style={{ "--d": "0.2s" }}>
            Logistics that keeps
            <br />
            <span>your business moving.</span>
          </h2>

          <p className="ab-lead rv" style={{ "--d": "0.3s" }}>
            Shivansh Logistics Private Limited provides transportation,
            warehousing and project logistics solutions for business and
            infrastructure needs.
          </p>

          <p className="ab-text rv" style={{ "--d": "0.38s" }}>
            Our focus is on understanding each customer's requirements and
            coordinating logistics services with attention to safety,
            communication and operational efficiency.
          </p>

          <ul className="ab-points">
            {points.map((p, i) => (
              <li className="ab-point rv" style={{ "--d": `${0.46 + i * 0.1}s` }} key={p.title}>
                <span className="ab-point-icon">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="ab-actions rv" style={{ "--d": "0.8s" }}>
            <a href="#contact" className="button button-primary">
              Discuss Your Requirements <span>↗</span>
            </a>
            <a href="tel:+919053791296" className="ab-call">
              <span className="ab-call-icon">{icons.phone}</span>
              <span>
                <small>Call us</small>
                <strong>+91 90537 91296</strong>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
