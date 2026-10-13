import { useEffect, useLayoutEffect, useRef, useState } from "react";
import heroVideo from "../assets/logistics-hero.mp4";
import "./hero.css";

const rotating = ["cargo", "projects", "industry", "business"];

/* ---------- Decorative route network (no real cities, design only) ---------- */
const nodes = {
  A: [215, 36],
  B: [118, 118],
  C: [292, 140],
  D: [52, 232],
  E: [200, 222],
  F: [344, 262],
  G: [132, 330],
  H: [262, 352],
  I: [196, 414],
};

const links = [
  ["A", "B", -18], ["A", "C", 16], ["B", "C", -22], ["B", "D", 14],
  ["B", "E", -12], ["C", "E", 18], ["C", "F", -14], ["D", "G", 16],
  ["E", "G", -14], ["E", "H", 12], ["F", "H", 18], ["G", "I", -12],
  ["H", "I", 14], ["D", "E", -26],
];

function curve([ax, ay], [bx, by], bend) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M${ax} ${ay}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${bx} ${by}`;
}

const routes = links.map(([a, b, bend]) => curve(nodes[a], nodes[b], bend));

const pulses = [
  { r: 0, dur: 4.2, begin: 0 },
  { r: 2, dur: 5.0, begin: -1.5 },
  { r: 4, dur: 3.6, begin: -2.2 },
  { r: 6, dur: 4.8, begin: -0.8 },
  { r: 8, dur: 5.5, begin: -3.1 },
  { r: 10, dur: 4.0, begin: -1.1 },
  { r: 12, dur: 4.6, begin: -2.7 },
  { r: 13, dur: 3.8, begin: -0.4 },
];

function Network({ animate }) {
  return (
    <svg className="hx-net-svg" viewBox="0 0 400 450" aria-hidden="true">
      <defs>
        <filter id="hxGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hxHalo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f5a623" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f5a623" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="225" rx="200" ry="220" fill="url(#hxHalo)" />

      {routes.map((d, i) => (
        <path key={i} d={d} className="hx-route" />
      ))}

      {Object.values(nodes).map(([x, y], i) => (
        <g key={i}>
          {animate && (
            <circle
              className="hx-ring"
              cx={x}
              cy={y}
              r="5"
              style={{ "--rd": `${(i * 0.37).toFixed(2)}s` }}
            />
          )}
          <circle cx={x} cy={y} r="3.4" className="hx-node" filter="url(#hxGlow)" />
        </g>
      ))}

      {animate &&
        pulses.map((p, i) => (
          <circle key={i} r="3" fill="#fff" filter="url(#hxGlow)">
            <animateMotion
              dur={`${p.dur}s`}
              begin={`${p.begin}s`}
              repeatCount="indefinite"
              path={routes[p.r]}
            />
          </circle>
        ))}
    </svg>
  );
}

/* ---------- Small helpers ---------- */
function Reveal({ text, start }) {
  return text.split(" ").map((w, i) => (
    <span key={i}>
      <span className="hx-w">
        <span style={{ "--i": start + i }}>{w}</span>
      </span>{" "}
    </span>
  ));
}

const Ico = ({ children }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const strip = [
  {
    label: "Road Transportation",
    icon: (
      <Ico>
        <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" />
        <circle cx="7" cy="17.5" r="2" />
        <circle cx="17" cy="17.5" r="2" />
      </Ico>
    ),
  },
  {
    label: "Warehousing",
    icon: (
      <Ico>
        <path d="M3 10l9-6 9 6v10H3z" />
        <path d="M8 20v-7h8v7M8 16.5h8" />
      </Ico>
    ),
  },
  {
    label: "Project Logistics",
    icon: (
      <Ico>
        <path d="M3 20h18M6 20V9l6-5 6 5v11" />
        <path d="M10 20v-5h4v5" />
      </Ico>
    ),
  },
  {
    label: "Government Projects",
    icon: (
      <Ico>
        <path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" />
      </Ico>
    ),
  },
];

const streaks = [
  { y: "18%", t: "7s", w: "0s" },
  { y: "31%", t: "9s", w: "-3s" },
  { y: "47%", t: "6s", w: "-1s" },
  { y: "62%", t: "8s", w: "-5s" },
  { y: "76%", t: "10s", w: "-2s" },
];

export default function Hero() {
  const ref = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  /* Wait for the header intro (if it is playing) before starting the entrance */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--d", document.querySelector(".intro") ? "2.5s" : "0s");
  }, []);

  /* Rotating word */
  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotating.length), 2400);
    return () => clearInterval(id);
  }, [reduced]);

  /* Mouse spotlight + parallax */
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;
    let frame = 0;
    const move = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        el.style.setProperty("--px", (x - 0.5).toFixed(3));
        el.style.setProperty("--py", (y - 0.5).toFixed(3));
      });
    };
    el.addEventListener("pointermove", move);
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section className="hx" id="home" ref={ref}>
      <video
        className="hx-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hx-shade" />
      <div className="hx-spot" />

      {!reduced && (
        <div className="hx-streaks" aria-hidden="true">
          {streaks.map((s, i) => (
            <i key={i} style={{ "--y": s.y, "--t": s.t, "--w": s.w }} />
          ))}
        </div>
      )}

      <div className="hx-net" aria-hidden="true">
        <Network animate={!reduced} />
      </div>

      <div className="hx-main">
        <div className="container">
          <div className="hx-copy">
            <span className="hx-pill">
              <i className="hx-pill-dot" />
              Shivansh Logistics Private Limited
            </span>

            <h1 className="hx-title">
              <span className="hx-line">
                <Reveal text="Driven by Trust." start={0} />
              </span>
              <span className="hx-line hx-grad">
                <Reveal text="Powered by Excellence." start={3} />
              </span>
            </h1>

            <p className="hx-rotator">
              Moving your{" "}
              <span className="hx-word-wrap">
                <span className="hx-word" key={wordIndex}>
                  {rotating[wordIndex]}
                </span>
              </span>
              .
            </p>

            <p className="hx-desc">
              Road transportation, warehousing and project logistics for
              businesses, infrastructure and industry.
            </p>

            <div className="hx-actions">
              <a href="#contact" className="button button-primary hx-cta">
                Get a Quote <span>↗</span>
              </a>
              <a href="tel:+919053791296" className="button button-outline">
                Call +91 90537 91296
              </a>
            </div>

            <p className="hx-note">Delivering Trust · Connecting India · Empowering Growth</p>
          </div>
        </div>
      </div>

      <div className="hx-strip">
        <div className="container hx-strip-grid">
          {strip.map((s) => (
            <a href="#services" className="hx-card" key={s.label}>
              <span className="hx-card-icon">{s.icon}</span>
              <span>{s.label}</span>
              <span className="hx-card-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
