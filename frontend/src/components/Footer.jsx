import "./footer.css";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Our Projects", href: "#projects" },
  { label: "Contact Us", href: "#contact" },
];

const services = [
  "Road Transportation",
  "Warehousing",
  "Project Logistics",
  "Government Projects",
];

/* Deterministic pseudo-random so the skyline never changes between renders */
function rng(seed) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const BASE = 186; // road top edge
const TILE = 1440; // one repeating strip (for seamless scrolling)

function makeSkyline(seed, minH, maxH, minW, maxW) {
  const r = rng(seed);
  const out = [];
  let x = 4;
  while (x < TILE - maxW - 10) {
    const w = minW + Math.floor(r() * (maxW - minW));
    const h = minH + Math.floor(r() * (maxH - minH));
    const top = BASE - h;
    const lights = [];
    for (let wy = top + 10; wy < BASE - 12; wy += 11) {
      for (let wx = x + 6; wx < x + w - 8; wx += 8) {
        if (r() > 0.72) lights.push([wx, wy]);
      }
    }
    out.push({ x, w, h, lights, antenna: r() > 0.65 });
    x += w + 3 + Math.floor(r() * 12);
  }
  return out;
}

const farCity = makeSkyline(7, 55, 135, 30, 62);
const nearCity = makeSkyline(21, 28, 86, 34, 66);

const trees = (() => {
  const r = rng(99);
  const list = [];
  for (let x = 30; x < TILE - 60; x += 80 + Math.floor(r() * 100)) {
    list.push({ x, s: 0.8 + r() * 0.55 });
  }
  return list;
})();

function Buildings({ list, fill, lit }) {
  return (
    <g>
      {list.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={BASE - b.h} width={b.w} height={b.h} fill={fill} />
          {b.antenna && (
            <path
              d={`M${b.x + b.w / 2} ${BASE - b.h}V${BASE - b.h - 12}`}
              stroke="#0a2236"
              strokeWidth="1.2"
            />
          )}
          {lit &&
            b.lights.map(([wx, wy], k) => (
              <rect key={k} x={wx} y={wy} width="3" height="4.500" className="lit" />
            ))}
        </g>
      ))}
    </g>
  );
}

function Trees() {
  return (
    <g>
      {trees.map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${BASE + 2}) scale(${t.s})`}>
          <rect x="-1.500" y="-24" width="3" height="24" fill="#0a1a14" />
          <circle cx="0" cy="-34" r="12" fill="#0e2a1f" />
          <circle cx="-7" cy="-28" r="8" fill="#0c2419" />
          <circle cx="7" cy="-29" r="8.500" fill="#0f2d21" />
        </g>
      ))}
    </g>
  );
}

function StreetLights() {
  return (
    <g>
      {[110, 590, 1070].map((x) => (
        <g key={x}>
          <ellipse cx={x + 22} cy={BASE + 8} rx="52" ry="7" fill="url(#lampPool)" />
          <path
            d={`M${x} ${BASE + 3}V${BASE - 74}Q${x} ${BASE - 84} ${x + 14} ${BASE - 84}H${x + 26}`}
            fill="none"
            stroke="#0b1824"
            strokeWidth="2.500"
            strokeLinecap="round"
          />
          <rect x={x + 22} y={BASE - 85} width="12" height="4" rx="1.500" fill="#fff2c4" />
          <ellipse cx={x + 28} cy={BASE - 78} rx="18" ry="14" fill="url(#lampGlow)" />
        </g>
      ))}
    </g>
  );
}

function Clouds() {
  return (
    <g fill="#ffffff">
      <ellipse cx="160" cy="58" rx="60" ry="7" />
      <ellipse cx="600" cy="40" rx="80" ry="6" />
      <ellipse cx="1010" cy="70" rx="55" ry="6" />
      <ellipse cx="1300" cy="46" rx="70" ry="7" />
    </g>
  );
}

/* Draws the same strip twice side by side so the loop has no visible jump */
function Tiled({ children, className }) {
  return (
    <g className={className}>
      {children}
      <g transform={`translate(${TILE} 0)`}>{children}</g>
    </g>
  );
}

function Wheel({ cx }) {
  return (
    <g>
      <path d={`M${cx - 18} -10A18 18 0 0 1 ${cx + 18} -10Z`} fill="#07090d" />
      <g className="sf-wheel">
        <circle cx={cx} cy="-10" r="14" fill="#0b0d11" stroke="#1b1f27" strokeWidth="1.500" />
        <circle cx={cx} cy="-10" r="10" fill="none" stroke="#14171d" strokeWidth="2" strokeDasharray="2 2.500" />
        <circle cx={cx} cy="-10" r="7.500" fill="url(#rim)" />
        {[0, 72, 144, 216, 288].map((a) => (
          <circle
            key={a}
            cx={cx + 4.500 * Math.cos((a * Math.PI) / 180)}
            cy={-10 + 4.500 * Math.sin((a * Math.PI) / 180)}
            r="1"
            fill="#4b5563"
          />
        ))}
        <circle cx={cx} cy="-10" r="2.200" fill="#6b7482" />
      </g>
    </g>
  );
}

function Scene() {
  return (
    <div className="sf-scene" aria-hidden="true">
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b3b5e" />
            <stop offset="0.55" stopColor="#2a6e98" />
            <stop offset="1" stopColor="#8fb7c9" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="0.72" cy="1" r="0.55">
            <stop offset="0" stopColor="#ffc27a" stopOpacity="0.65" />
            <stop offset="1" stopColor="#ffc27a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bldFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5d86a3" />
            <stop offset="1" stopColor="#86a9bd" />
          </linearGradient>
          <linearGradient id="bldNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14354f" />
            <stop offset="1" stopColor="#1f4a68" />
          </linearGradient>
          <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b4049" />
            <stop offset="1" stopColor="#15181d" />
          </linearGradient>
          <linearGradient id="cont" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3550c8" />
            <stop offset="0.45" stopColor="#233ba5" />
            <stop offset="1" stopColor="#15246b" />
          </linearGradient>
          <linearGradient id="cab" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a56d6" />
            <stop offset="1" stopColor="#1a2b82" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9fc4e6" />
            <stop offset="1" stopColor="#3d5f80" />
          </linearGradient>
          <linearGradient id="tank" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9d0d8" />
            <stop offset="1" stopColor="#6c7581" />
          </linearGradient>
          <radialGradient id="rim">
            <stop offset="0" stopColor="#e5e9ee" />
            <stop offset="1" stopColor="#7d8794" />
          </radialGradient>
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff3cc" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fff3cc" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="lampGlow">
            <stop offset="0" stopColor="#fff2c4" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff2c4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lampPool">
            <stop offset="0" stopColor="#fff2c4" stopOpacity="0.28" />
            <stop offset="1" stopColor="#fff2c4" stopOpacity="0" />
          </radialGradient>
          <filter id="blurX" x="-5%" y="-50%" width="110%" height="200%">
            <feGaussianBlur stdDeviation="2.800 0" />
          </filter>
          <filter id="softFar" x="-2%" y="-2%" width="104%" height="104%">
            <feGaussianBlur stdDeviation="0.700" />
          </filter>
          <filter id="shadowBlur" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="smokeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.500" />
          </filter>
          <clipPath id="cabWin">
            <path d="M60-65H80L93-45H60Z" />
          </clipPath>
        </defs>

        {/* Sky */}
        <rect width="1440" height="220" fill="url(#sky)" />
        <rect width="1440" height="220" fill="url(#sunGlow)" />

        {/* Clouds (slowest) */}
        <g opacity=".18" filter="url(#softFar)">
          <Tiled className="sf-scroll sf-scroll-clouds">
            <Clouds />
          </Tiled>
        </g>

        {/* Airplane, tiny and far away */}
        <g className="sf-plane">
          <g transform="scale(0.55)">
            <path d="M0 0L40-5Q54-5 60 0Q54 5 40 5Z" />
            <path d="M20-3L8-27H17L36-4Z" />
            <path d="M20 3L6 22H15L34 4Z" />
            <path d="M3-1L-6-15H1L12-2Z" />
          </g>
          <circle className="sf-blink" cx="10" cy="-8" r="1.600" fill="#ff4b4b" />
        </g>

        {/* Far skyline (hazy) */}
        <g filter="url(#softFar)" opacity=".9">
          <Tiled className="sf-scroll sf-scroll-far">
            <Buildings list={farCity} fill="url(#bldFar)" lit={false} />
          </Tiled>
        </g>

        {/* Near skyline with lit windows */}
        <Tiled className="sf-scroll sf-scroll-near">
          <Buildings list={nearCity} fill="url(#bldNear)" lit />
        </Tiled>

        {/* Ground haze at the base of the buildings */}
        <rect y={BASE - 26} width="1440" height="28" fill="#8fb7c9" opacity=".12" />

        {/* Trees and street lights (roadside, fastest) */}
        <Tiled className="sf-scroll sf-scroll-road">
          <Trees />
          <StreetLights />
        </Tiled>

        {/* Road */}
        <rect y={BASE} width="1440" height="34" fill="url(#asphalt)" />
        <rect y={BASE} width="1440" height="3" fill="#6b727c" opacity=".7" />
        <path d={`M0 ${BASE + 5}H1440`} stroke="#e7e2d2" strokeWidth="1.500" opacity=".55" />
        <g filter="url(#blurX)">
          <path
            className="sf-dashes"
            d={`M-120 ${BASE + 21}H1560`}
            stroke="#f2efe3"
            strokeWidth="3"
            strokeDasharray="58 52"
            opacity=".85"
          />
        </g>
        <path d={`M0 ${BASE + 33}H1440`} stroke="#e7e2d2" strokeWidth="1.500" opacity=".35" />

        {/* Truck: fixed in the centre */}
        <g transform="translate(720 196) scale(1.05)">
          <ellipse cx="0" cy="4" rx="124" ry="5" fill="#000" opacity=".55" filter="url(#shadowBlur)" />

          <g className="sf-truck-body">
            {/* headlight beam */}
            <polygon points="108,-27 380,-4 380,-54" fill="url(#beam)" />

            {/* exhaust stack and smoke */}
            <rect x="44" y="-86" width="4" height="40" rx="1.500" fill="#2a2f38" />
            <rect x="43" y="-90" width="6" height="5" rx="1" fill="#454c57" />
            <g filter="url(#smokeBlur)">
              <circle className="sf-smoke" cx="46" cy="-92" r="4" fill="#cfd6dd" style={{ animationDelay: "0s" }} />
              <circle className="sf-smoke" cx="46" cy="-92" r="4" fill="#cfd6dd" style={{ animationDelay: "-1.200s" }} />
              <circle className="sf-smoke" cx="46" cy="-92" r="4" fill="#cfd6dd" style={{ animationDelay: "-2.400s" }} />
            </g>

            {/* container */}
            <rect x="-112" y="-96" width="152" height="74" rx="2" fill="url(#cont)" />
            <path
              d="M-103-94V-24M-92-94V-24M-81-94V-24M-70-94V-24M-59-94V-24M-48-94V-24M-37-94V-24M-26-94V-24M-15-94V-24M-4-94V-24M7-94V-24M18-94V-24M29-94V-24"
              stroke="#0d1650"
              strokeWidth="1.200"
              opacity=".5"
            />
            <path
              d="M-102.500-94V-24M-91.500-94V-24M-80.500-94V-24M-69.500-94V-24M-58.500-94V-24M-47.500-94V-24M-36.500-94V-24M-25.500-94V-24M-14.500-94V-24M-3.500-94V-24M7.500-94V-24M18.500-94V-24M29.500-94V-24"
              stroke="#ffffff"
              strokeWidth="0.700"
              opacity=".13"
            />
            <rect x="-112" y="-96" width="152" height="3" fill="#7d93ff" opacity=".35" />
            <rect x="-112" y="-26" width="152" height="4" fill="#0b1240" opacity=".7" />
            <rect x="-113" y="-96" width="3" height="74" fill="#0b1240" opacity=".7" />

            {/* branding */}
            <rect x="-96" y="-58" width="96" height="3" fill="#f5a623" />
            <circle cx="-48" cy="-78" r="9" fill="none" stroke="#fff" strokeWidth="1.800" opacity=".95" />
            <text x="-48" y="-75" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Manrope, sans-serif">SL</text>
            <text x="-48" y="-45" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Manrope, sans-serif" letterSpacing="0.600">SHIVANSH LOGISTICS</text>
            <path d="M-112-96H-80L-112-72Z" fill="#f5a623" opacity=".95" />

            {/* chassis, tank, mudflaps */}
            <rect x="-112" y="-22" width="222" height="9" fill="#10131b" />
            <rect x="-22" y="-21" width="34" height="11" rx="4" fill="url(#tank)" />
            <rect x="-96" y="-12" width="3" height="12" fill="#0a0c10" />
            <rect x="-30" y="-12" width="3" height="12" fill="#0a0c10" />

            {/* cab */}
            <path d="M42-74H80Q89-74 95-61L109-38V-22H42Z" fill="url(#cab)" />
            <path d="M42-74H80Q89-74 95-61" fill="none" stroke="#8da2ff" strokeWidth="1" opacity=".5" />
            <path d="M96-36L109-36" stroke="#0e1a5a" strokeWidth="1" />
            <path d="M58-40V-24" stroke="#0e1a5a" strokeWidth="1" opacity=".7" />
            <rect x="62" y="-37" width="8" height="2.200" rx="1" fill="#cfd6e4" />

            {/* window + driver */}
            <path d="M60-65H80L93-45H60Z" fill="url(#glass)" />
            <g clipPath="url(#cabWin)">
              {/* seat back and shoulders */}
              <path d="M56-44Q60-52 70-52Q80-52 86-44Z" fill="#c8641c" />
              {/* neck and head */}
              <rect x="68.500" y="-56" width="4" height="5" fill="#d9a07a" />
              <circle cx="70.500" cy="-59" r="5.200" fill="#e0aa84" />
              {/* cap */}
              <path d="M65-60A5.600 5.600 0 0 1 76-60Z" fill="#10263f" />
              <rect x="73" y="-61" width="6" height="1.800" rx="0.900" fill="#10263f" />
              {/* arm to steering wheel */}
              <path d="M77-48L85-45" stroke="#c8641c" strokeWidth="3.200" strokeLinecap="round" />
              <circle cx="86" cy="-45" r="1.600" fill="#e0aa84" />
              {/* steering wheel */}
              <path d="M84-50L88-42" stroke="#0b0d11" strokeWidth="1.800" strokeLinecap="round" />
              {/* window shade */}
              <rect x="58" y="-66" width="40" height="6" fill="#000" opacity=".25" />
            </g>
            <path d="M62-65L70-65L58-45L58-52Z" fill="#fff" opacity=".18" />
            <path d="M60-65H80L93-45H60Z" fill="none" stroke="#0e1a5a" strokeWidth="1.200" />

            {/* side mirror */}
            <path d="M58-58L50-58" stroke="#0b0d11" strokeWidth="1.200" />
            <rect x="46" y="-65" width="5" height="12" rx="1.500" fill="#12151c" />

            {/* headlight, grille, bumper */}
            <rect x="101" y="-33" width="9" height="7" rx="2" fill="#fff6d6" />
            <circle cx="108" cy="-29.500" r="7" fill="url(#lampGlow)" />
            <rect x="103" y="-25" width="6" height="3" fill="#0b0d11" />
            <rect x="99" y="-20" width="16" height="6" rx="2" fill="#0b0d11" />

            {/* wheel arches + wheels */}
            <Wheel cx={-74} />
            <Wheel cx={-48} />
            <Wheel cx={64} />
          </g>
        </g>

        {/* Soft vignette to blend into footer */}
        <rect width="1440" height="30" fill="#0b3b5e" opacity=".35" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container sf-main">
        <div className="sf-about">
          <a href="#home" className="sf-brand" aria-label="Shivansh Logistics home">
            <span className="sf-mark">SL</span>
            <span className="sf-brand-text">
              <strong>Shivansh</strong>
              <small>Logistics Private Limited</small>
            </span>
          </a>
          <p>
            Reliable transportation and logistics solutions designed to support
            businesses, infrastructure and industrial operations.
          </p>
          <a className="sf-email" href="mailto:info@shivanshlogistic.in">
            info@shivanshlogistic.in
          </a>
        </div>

        <nav className="sf-col" aria-label="Footer quick links">
          <h3>Quick Links</h3>
          {quickLinks.map((l) => (
            <a href={l.href} key={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="sf-col">
          <h3>Our Services</h3>
          {services.map((s) => (
            <a href="#services" key={s}>{s}</a>
          ))}
        </div>

        <div className="sf-col sf-contact">
          <h3>Get in Touch</h3>
          <p>Discuss your transportation requirements with our team.</p>
          <a className="sf-phone" href="tel:+919053791296">+91 90537 91296</a>
          <a href="mailto:info@shivanshlogistic.in">Send an email</a>
          <a href="#contact" className="sf-quote">Request a quote</a>
        </div>
      </div>

      <Scene />

      <div className="sf-bottom">
        <div className="container sf-bottom-inner">
          <p>© {new Date().getFullYear()} Shivansh Logistics Private Limited. All rights reserved.</p>
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
