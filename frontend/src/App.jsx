import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";
import "./polish.css";

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href="https://wa.me/919053791296?text=Hello%20Shivansh%20Logistics%2C%20I%20need%20a%20quote."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Shivansh Logistics on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true">
        <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.8A13 13 0 0016 29c7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.6-5.6-1.6l-.4-.2-4 1 1.1-3.9-.3-.4A10.6 10.6 0 1126.6 16 10.6 10.6 0 0116 26.6zm5.800-7.900c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.5c.1-.2.200-.3.300-.5.100-.2 0-.4 0-.5-.1-.2-.7-1.700-1-2.300-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.500s1.100 2.900 1.200 3.100c.2.200 2.100 3.300 5.200 4.500 2.900 1.200 2.900.8 3.500.7.600-.1 1.900-.8 2.200-1.500.3-.7.300-1.400.2-1.500-.1-.2-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
