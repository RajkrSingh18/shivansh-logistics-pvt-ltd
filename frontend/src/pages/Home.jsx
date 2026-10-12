import heroVideo from "../assets/logistics-hero.mp4";

const I = (d) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const icons = {
  truck: I(<><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" /><circle cx="7" cy="17.5" r="2" /><circle cx="17" cy="17.5" r="2" /></>),
  warehouse: I(<><path d="M3 10l9-6 9 6v10H3z" /><path d="M8 20v-7h8v7M8 16.5h8" /></>),
  project: I(<><path d="M3 20h18M6 20V9l6-5 6 5v11" /><path d="M10 20v-5h4v5" /></>),
  gov: I(<><path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" /></>),
};

const services = [
  { number: "01", icon: icons.truck, title: "Road Transportation", description: "Road freight solutions for business cargo and transportation requirements across routes.", tag: "Road freight" },
  { number: "02", icon: icons.warehouse, title: "Warehousing", description: "Organized storage solutions for industrial goods, equipment and business inventory.", tag: "Storage" },
  { number: "03", icon: icons.project, title: "Project Logistics", description: "Coordinated transport support for infrastructure, industrial and project cargo needs.", tag: "Project cargo" },
  { number: "04", icon: icons.gov, title: "Government Projects", description: "Transportation support for infrastructure and public-sector projects.", tag: "Infrastructure" },
];

const steps = [
  { title: "Share your requirement", text: "Tell us what you need to move, from where to where, and by when." },
  { title: "We plan the movement", text: "Our team suggests the right vehicle, route and handling for your cargo." },
  { title: "Dispatch and tracking", text: "Your consignment is loaded and dispatched, and we keep you informed on the way." },
  { title: "Delivery and follow-up", text: "Cargo reaches the destination safely, and we stay available for your next need." },
];

const projects = [
  { name: "NTPC Projects", category: "Industrial transportation", description: "Transportation support for pond ash and fly ash projects, subject to project scope.", image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85" },
  { name: "NHAI Projects", category: "Road infrastructure", description: "Logistics support for highway and infrastructure-related transportation work.", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=85" },
  { name: "Warehousing", category: "Storage and handling", description: "Storage solutions for industrial equipment and goods based on customer needs.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=85" },
];

export default function Home() {
  return (
    <main>
      <section className="hero hero-video" id="home">
        <video className="hero-video-media" autoPlay muted loop playsInline aria-hidden="true"><source src={heroVideo} type="video/mp4" /></video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-eyebrow">SHIVANSH LOGISTICS</span>
          <h1>Moving your business forward</h1>
          <p className="hero-description">Reliable transportation, warehousing and project logistics support for businesses across India.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact">Request a quote <span>↗</span></a><a className="button button-outline" href="#services">Explore services <span>↓</span></a></div>
          <p className="hero-note">Your cargo. Your schedule. Coordinated with care.</p>
        </div>
      </section>
      <section className="trust-strip" aria-label="Our approach">
        <div className="container trust-inner">
          <div><span className="trust-symbol">◆</span><span>Reliable freight coordination</span></div>
          <div><span className="trust-symbol">◇</span><span>Business-focused logistics</span></div>
          <div><span className="trust-symbol">✓</span><span>Support from dispatch to delivery</span></div>
        </div>
      </section>

      <section className="section section-about" id="about">
        <div className="container about-grid">
          <div className="about-visual">
            <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1000&q=85" alt="Freight containers ready for transport" loading="lazy" />
            <div className="about-image-caption"><span className="caption-mark">SL</span><div><strong>Shivansh Logistics</strong><small>Moving business forward</small></div></div>
          </div>
          <div className="about-content">
            <span className="eyebrow">ABOUT SHIVANSH LOGISTICS</span>
            <h2>Logistics that keeps <span>business moving</span></h2>
            <p>Shivansh Logistics provides transportation, warehousing and project logistics support for businesses and infrastructure work.</p>
            <p>We coordinate each movement around your cargo, schedule and destination, with clear communication throughout the process.</p>
            <div className="about-points">
              <div><span className="check-icon">✓</span><span>Practical transport planning for your requirements</span></div>
              <div><span className="check-icon">✓</span><span>Responsive coordination from dispatch through delivery</span></div>
              <div><span className="check-icon">✓</span><span>Flexible support for industrial and project cargo</span></div>
            </div>
            <a className="text-link" href="#contact">Talk to our team <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="section section-services" id="services">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">WHAT WE DO</span><h2>Logistics services for <span>every mile</span></h2></div><p>From road transport to project cargo, we help plan and coordinate the movement of your goods.</p></div>
          <div className="services-grid">{services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top"><span className="service-icon">{service.icon}</span><span className="service-number">{service.number}</span></div>
              <span className="service-tag">{service.tag}</span><h3>{service.title}</h3><p>{service.description}</p>
              <a className="service-link" href="#contact">Discuss this service <span>↗</span></a>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">HOW IT WORKS</span><h2>From request to <span>delivery</span></h2></div><p>A straightforward process keeps every shipment moving with clarity.</p></div>
          <div className="services-grid">{steps.map((step, index) => (
            <article className="service-card" key={step.title}><div className="service-card-top"><span className="service-number">0{index + 1}</span></div><h3>{step.title}</h3><p>{step.text}</p></article>
          ))}</div>
        </div>
      </section>

      <section className="project-banner"><div className="container project-banner-inner"><div><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let’s plan your next move.</h2></div><a className="button button-primary" href="#contact">Get in touch <span>↗</span></a></div></section>

      <section className="section section-projects" id="projects">
        <div className="container"><div className="section-heading"><div><span className="eyebrow">OUR EXPERIENCE</span><h2>Projects and <span>capabilities</span></h2></div><p>Explore the types of logistics requirements our team can support.</p></div>
          <div className="projects-grid">{projects.map((project) => (
            <article className="project-card" key={project.name}><div className="project-image"><img src={project.image} alt={project.name} loading="lazy" /><span className="project-image-arrow">↗</span></div><div className="project-info"><span className="service-tag">{project.category}</span><h3>{project.name}</h3><p>{project.description}</p><a className="text-link" href="#contact">Discuss a project <span>↗</span></a></div></article>
          ))}</div>
        </div>
      </section>

      <section className="section section-contact" id="contact"><div className="container contact-grid">
        <div className="contact-copy"><span className="eyebrow">GET IN TOUCH</span><h2>Tell us what you need to move.</h2><p>Share your route, cargo and timeline. Our team will get back to you to discuss the right logistics support.</p>
          <div className="contact-detail"><span className="contact-detail-icon">☎</span><div><small>CALL US</small><a href="tel:+919053791296">+91 90537 91296</a></div></div>
          <div className="contact-detail"><span className="contact-detail-icon">✉</span><div><small>EMAIL</small><a href="mailto:info@shivanshlogistics.com">info@shivanshlogistics.com</a></div></div>
        </div>
        <div className="contact-form"><span className="eyebrow">READY WHEN YOU ARE</span><h3>Let’s discuss your requirement</h3><p>Contact us directly and our team will help plan the next step.</p><a className="button button-primary form-submit" href="https://wa.me/919053791296?text=Hello%20Shivansh%20Logistics%2C%20I%20need%20a%20quote." target="_blank" rel="noopener noreferrer">Chat on WhatsApp <span>↗</span></a><p className="form-note">Please include your cargo type, pickup location and destination for a faster response.</p></div>
      </div></section>
    </main>
  );
}
