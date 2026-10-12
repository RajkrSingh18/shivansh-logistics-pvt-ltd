export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark">SL</span><span className="brand-copy"><strong>SHIVANSH</strong><small>LOGISTICS</small></span></a><p>Transportation and logistics support for business and project cargo.</p></div>
        <div><h3>Quick links</h3><nav className="footer-links" aria-label="Footer navigation"><a href="#about">About us</a><a href="#services">Services</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></div>
        <div><h3>Contact</h3><nav className="footer-links"><a href="tel:+919053791296">+91 90537 91296</a><a href="mailto:info@shivanshlogistics.com">info@shivanshlogistics.com</a></nav></div>
      </div>
      <div className="footer-bottom"><div className="container footer-bottom-inner"><span>© {new Date().getFullYear()} Shivansh Logistics. All rights reserved.</span><a href="#home">Back to top ↑</a></div></div>
    </footer>
  );
}
