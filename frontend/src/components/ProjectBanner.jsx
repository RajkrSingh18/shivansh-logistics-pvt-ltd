import { useEffect, useRef, useState } from "react";
import "./projectBanner.css";

const ROUTE =
  "M0 230C150 230 210 90 360 120S560 260 720 190S950 40 1120 80";

const nodes = [
  [0, 230],
  [360, 120],
  [720, 190],
  [1120, 80],
];

function Words({ text, start }) {
  return text.split(" ").map((w, i) => (
    <span key={i}>
      <span className="pb-w">
        <span style={{ "--i": start + i }}>{w}</span>
      </span>{" "}
    </span>
  ));
}

export default function ProjectBanner() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window))
  );
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  /* Reveal once when scrolled into view */
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  /* Mouse spotlight */
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;
    let frame = 0;
    const move = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section className={`project-banner pb ${seen ? "in" : ""}`} ref={ref}>
      <div className="pb-spot" aria-hidden="true" />

      {/* Big outline text drifting slowly */}
      <div className="pb-ghost" aria-hidden="true">
        <div className="pb-ghost-track">
          <span>Moving forward · Moving forward · Moving forward · </span>
          <span>Moving forward · Moving forward · Moving forward · </span>
        </div>
      </div>

      {/* Route journey */}
      <svg
        className="pb-route"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="pbGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={ROUTE} className="pb-path" />

        {nodes.slice(0, 3).map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="14" className="pb-node-ring" style={{ "--rd": `${i * 0.6}s` }} />
            <circle cx={x} cy={y} r="5" className="pb-node" filter="url(#pbGlow)" />
          </g>
        ))}

        {/* destination pin */}
        <g transform="translate(1120 80)" className="pb-pin">
          <circle r="18" className="pb-pin-halo" />
          <path d="M0 8C-10-6 -12-10 -12-16A12 12 0 0 1 12-16C12-10 10-6 0 8Z" fill="#f5a623" />
          <circle cy="-16" r="4.5" fill="#10263f" />
        </g>

        {!reduced &&
          [0, -4.5].map((begin) => (
            <circle key={begin} r="5" fill="#fff" filter="url(#pbGlow)">
              <animateMotion dur="9s" begin={`${begin}s`} repeatCount="indefinite" path={ROUTE} />
            </circle>
          ))}
      </svg>

      <div className="container project-banner-inner pb-inner">
        <div className="pb-copy">
          <span className="eyebrow hero-eyebrow pb-eyebrow">
            Built around your requirements
          </span>

          <h2 className="pb-title">
            <span className="pb-line">
              <Words text="Every project has a journey." start={0} />
            </span>
            <span className="pb-line pb-grad">
              <Words text="Let us help move it forward." start={5} />
            </span>
          </h2>
        </div>

        <div className="pb-actions">
          <a href="#contact" className="button button-primary pb-cta">
            Talk to our team <span>↗</span>
          </a>
          <a href="tel:+919053791296" className="pb-call">
            <small>Or call us</small>
            <strong>+91 90537 91296</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
