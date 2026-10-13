import { useEffect, useRef, useState } from "react";
import "./services.css";

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

const items = [
  {
    id: "road",
    title: "Road Transportation",
    tag: "Road freight",
    description:
      "Road freight solutions for business cargo and transportation requirements across routes.",
    chips: ["Business cargo", "Route planning", "Dispatch coordination"],
    image:
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1000&q=80",
    icon: (
      <Svg>
        <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" />
        <circle cx="7" cy="17.5" r="2" />
        <circle cx="17" cy="17.5" r="2" />
      </Svg>
    ),
  },
  {
    id: "warehouse",
    title: "Warehousing",
    tag: "Storage",
    description:
      "Organized storage solutions for industrial goods, equipment and business inventory.",
    chips: ["Industrial goods", "Equipment storage", "Business inventory"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    icon: (
      <Svg>
        <path d="M3 10l9-6 9 6v10H3z" />
        <path d="M8 20v-7h8v7M8 16.5h8" />
      </Svg>
    ),
  },
  {
    id: "project",
    title: "Project Logistics",
    tag: "Project cargo",
    description:
      "Coordinated transport support for infrastructure, industrial and project cargo needs.",
    chips: ["Infrastructure cargo", "Industrial projects", "Coordinated movement"],
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80",
    icon: (
      <Svg>
        <path d="M3 20h18M6 20V9l6-5 6 5v11" />
        <path d="M10 20v-5h4v5" />
      </Svg>
    ),
  },
  {
    id: "gov",
    title: "Government Projects",
    tag: "Infrastructure",
    description:
      "Transportation support for infrastructure and public-sector projects.",
    chips: ["Infrastructure work", "Public-sector projects", "Transport support"],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80",
    icon: (
      <Svg>
        <path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" />
      </Svg>
    ),
  },
];

/* Adds the "in" class once the section scrolls into view */
function useInView(threshold = 0.15) {
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

export default function Services() {
  const [active, setActive] = useState(0);
  const [ref, seen] = useInView();

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className={`section sv ${seen ? "in" : ""}`} id="services" ref={ref}>
      <div className="container">
        <div className="sv-top">
          <div className="sv-r" style={{ "--d": "0s" }}>
            <span className="eyebrow">What we do</span>
            <h2 className="sv-title">
              Logistics solutions
              <br />
              <span>for real business needs.</span>
            </h2>
          </div>

          <p className="sv-r" style={{ "--d": "0.1s" }}>
            From road transportation to industrial storage, explore services
            designed around your operational requirements.
          </p>
        </div>

        <div className="sv-panels">
          {items.map((s, i) => {
            const isActive = active === i;
            return (
              <article
                key={s.id}
                className={`sv-panel sv-r ${isActive ? "is-active" : ""}`}
                style={{ "--d": `${0.15 + i * 0.1}s` }}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActive(i);
                }}
                onPointerMove={onMove}
              >
                <img className="sv-img" src={s.image} alt="" loading="lazy" />
                <div className="sv-dim" />
                <div className="sv-shade" />
                <div className="sv-glow" />

                <button
                  type="button"
                  className="sv-rail"
                  aria-expanded={isActive}
                  aria-controls={`sv-body-${s.id}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="sv-icon">{s.icon}</span>
                  <span className="sv-rail-title">{s.title}</span>
                </button>

                <div className="sv-body" id={`sv-body-${s.id}`} inert={!isActive}>
                  <span className="sv-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ul className="sv-chips">
                    {s.chips.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="button button-primary sv-cta">
                    Enquire now <span>↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="sv-help sv-r" style={{ "--d": "0.6s" }}>
          <p>
            <strong>Not sure which service fits?</strong>
            <span>Tell us what you need to move and we will suggest the right plan.</span>
          </p>
          <div className="sv-help-actions">
            <a href="#contact" className="button button-primary">
              Talk to our team <span>↗</span>
            </a>
            <a href="tel:+919053791296" className="button button-outline">
              Call +91 90537 91296
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
