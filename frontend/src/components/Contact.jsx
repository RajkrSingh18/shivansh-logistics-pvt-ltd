import { useEffect, useRef, useState } from "react";
import "./contact.css";

const PHONE_DISPLAY = "+91 90537 91296";
const WA_NUMBER = "919053791296";
const EMAIL = "info@shivanshlogistic.in";

const serviceOptions = [
  "Road Transportation",
  "Warehousing",
  "Project Logistics",
  "Government Project",
  "Other Requirement",
];

const nextSteps = [
  "We read your requirement",
  "We contact you to confirm the details",
  "We share the plan and the quote",
];

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
  phone: (
    <Svg>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </Svg>
  ),
  mail: (
    <Svg>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Svg>
  ),
  chat: (
    <Svg>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </Svg>
  ),
  check: (
    <Svg size={34}>
      <path d="M5 12l5 5 9-10" />
    </Svg>
  ),
};

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

const emptyForm = { name: "", phone: "", email: "", service: "", message: "" };

function buildMessage(d) {
  return [
    "Hello Shivansh Logistics, I would like to discuss a requirement.",
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.email ? `Email: ${d.email}` : null,
    `Service: ${d.service}`,
    "",
    "Requirement details:",
    d.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export default function Contact() {
  const [ref, seen] = useInView();
  const formRef = useRef(null);
  const [data, setData] = useState(emptyForm);
  const [sent, setSent] = useState(null); // null | "whatsapp" | "email"

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const send = (channel) => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;

    const text = buildMessage(data);

    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      const subject = `Enquiry: ${data.service} (${data.name})`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(text)}`;
    }
    setSent(channel);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send("whatsapp");
  };

  const reset = () => {
    setData(emptyForm);
    setSent(null);
  };

  return (
    <section
      className={`section section-contact ct ${seen ? "in" : ""}`}
      id="contact"
      ref={ref}
      onPointerMove={onMove}
    >
      <div className="ct-spot" aria-hidden="true" />

      <div className="container ct-grid">
        {/* ---------- Left: copy + contact cards ---------- */}
        <div className="ct-copy">
          <span className="eyebrow hero-eyebrow ct-r" style={{ "--d": "0s" }}>
            Let's work together
          </span>

          <h2 className="ct-title ct-r" style={{ "--d": "0.08s" }}>
            Have a shipment
            <br />
            <span>or project in mind?</span>
          </h2>

          <p className="ct-lead ct-r" style={{ "--d": "0.16s" }}>
            Tell us what you need to move. Our team can discuss your
            requirements and the next steps.
          </p>

          <div className="ct-cards">
            <a href="tel:+919053791296" className="ct-card ct-r" style={{ "--d": "0.24s" }}>
              <span className="ct-card-icon">{icons.phone}</span>
              <span className="ct-card-text">
                <small>Call our team</small>
                <strong>{PHONE_DISPLAY}</strong>
              </span>
            </a>

            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-card ct-r"
              style={{ "--d": "0.32s" }}
            >
              <span className="ct-card-icon ct-wa">{icons.chat}</span>
              <span className="ct-card-text">
                <small>Message on WhatsApp</small>
                <strong>{PHONE_DISPLAY}</strong>
              </span>
            </a>

            <a href={`mailto:${EMAIL}`} className="ct-card ct-r" style={{ "--d": "0.4s" }}>
              <span className="ct-card-icon">{icons.mail}</span>
              <span className="ct-card-text">
                <small>Email us</small>
                <strong>{EMAIL}</strong>
              </span>
            </a>
          </div>

          <div className="ct-next ct-r" style={{ "--d": "0.48s" }}>
            <h3>What happens next</h3>
            <ol>
              {nextSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* ---------- Right: form ---------- */}
        <div className="ct-formwrap ct-r" style={{ "--d": "0.2s" }}>
          {sent ? (
            <div className="ct-done" role="status">
              <span className="ct-done-icon">{icons.check}</span>
              <h3>
                {sent === "whatsapp"
                  ? "Your message is ready in WhatsApp"
                  : "Your message is ready in your mail app"}
              </h3>
              <p>
                {sent === "whatsapp"
                  ? "Press send in WhatsApp to share your requirement with our team."
                  : "Press send in your mail app to share your requirement with our team."}{" "}
                If nothing opened, you can call us on {PHONE_DISPLAY}.
              </p>
              <div className="ct-done-actions">
                <button type="button" className="button button-primary" onClick={() => send(sent)}>
                  Open again
                </button>
                <button type="button" className="ct-link" onClick={reset}>
                  Send another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form className="ct-form" ref={formRef} onSubmit={onSubmit} noValidate={false}>
              <span className="eyebrow">Get in touch</span>
              <h3>Tell us about your requirements.</h3>

              <div className="ct-row">
                <label>
                  Full name *
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label>
                  Phone number *
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={set("phone")}
                    placeholder="Your contact number"
                    autoComplete="tel"
                    pattern="[+]?[0-9 ()\-]{10,18}"
                    title="Enter a valid phone number with 10 to 18 digits"
                    required
                  />
                </label>
              </div>

              <label>
                Business email
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={set("email")}
                  placeholder="name@company.com"
                  autoComplete="email"
                />
              </label>

              <fieldset className="ct-chips">
                <legend>Service required *</legend>
                <div className="ct-chip-row">
                  {serviceOptions.map((s, i) => (
                    <label className="ct-chip" key={s}>
                      <input
                        type="radio"
                        name="service"
                        value={s}
                        checked={data.service === s}
                        onChange={set("service")}
                        required={i === 0}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label>
                Requirement details *
                <textarea
                  name="message"
                  rows="4"
                  value={data.message}
                  onChange={set("message")}
                  placeholder="Pickup, destination, cargo type and other details..."
                  required
                />
              </label>

              <div className="ct-submit">
                <button type="submit" className="button ct-btn-wa">
                  Send on WhatsApp <span>↗</span>
                </button>
                <button
                  type="button"
                  className="button ct-btn-mail"
                  onClick={() => send("email")}
                >
                  Send by email
                </button>
              </div>

              <p className="ct-note">
                Your enquiry opens in WhatsApp or your mail app with all the
                details filled in. Please press send there so our team receives
                it.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
