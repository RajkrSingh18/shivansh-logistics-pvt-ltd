import { useEffect, useRef, useState } from "react";
import "./projects.css";

const projects = [
  {
    name: "NTPC Projects",
    category: "Industrial transportation",
    description:
      "Transportation support for pond ash and fly ash projects, subject to project scope.",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "NHAI Projects",
    category: "Road infrastructure",
    description:
      "Logistics support for highway and infrastructure-related transportation work.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Warehousing",
    category: "Storage and handling",
    description:
      "Storage solutions for industrial equipment and goods based on customer needs.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
  },
];

/* Adds the "in" class once the section scrolls into view */
function useInView(threshold = 0.12) {
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

export default function Projects() {
  const [ref, seen] = useInView();

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      className={`section section-projects pj ${seen ? "in" : ""}`}
      id="projects"
      ref={ref}
    >
      <div className="container">
        <div className="section-heading pj-head pj-r" style={{ "--d": "0s" }}>
          <div>
            <span className="eyebrow">Our work</span>
            <h2>
              Projects & <span>capabilities.</span>
            </h2>
          </div>

          <p>
            Explore the logistics focus areas and the kind of project work we
            support, from industrial transport to storage.
          </p>
        </div>

        <div className="pj-grid">
          {projects.map((p, i) => (
            <a
              href="#contact"
              className={`pj-card pj-r ${i === 0 ? "pj-featured" : ""}`}
              style={{ "--d": `${0.12 + i * 0.12}s` }}
              key={p.name}
              onPointerMove={onMove}
              aria-label={`Enquire about ${p.name}`}
            >
              <img className="pj-img" src={p.image} alt="" loading="lazy" />
              <div className="pj-shade" />
              <div className="pj-glow" />

              <span className="pj-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </span>

              <div className="pj-content">
                <span className="pj-chip">{p.category}</span>
                <h3>{p.name}</h3>
                <div className="pj-desc">
                  <p>{p.description}</p>
                </div>
                <span className="pj-more">Enquire about this</span>
              </div>
            </a>
          ))}
        </div>

        <p className="pj-note pj-r" style={{ "--d": "0.5s" }}>
          Every project is planned around its own scope, route and schedule.
        </p>
      </div>
    </section>
  );
}
