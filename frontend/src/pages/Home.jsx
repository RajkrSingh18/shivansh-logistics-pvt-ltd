import heroVideo from "../assets/logistics-hero.mp4";
import About, { TrustStrip } from "../components/About";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Process from "../components/Process";
import ProjectBanner from "../components/ProjectBanner";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const I = (d) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const icons = {
    truck: I(<><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" /><circle cx="7" cy="17.5" r="2" /><circle cx="17" cy="17.5" r="2" /></>),
    warehouse: I(<><path d="M3 10l9-6 9 6v10H3z" /><path d="M8 20v-7h8v7M8 16.5h8" /></>),
    project: I(<><path d="M3 20h18M6 20V9l6-5 6 5v11" /><path d="M10 20v-5h4v5" /></>),
    gov: I(<><path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" /></>),
    route: I(<><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6" /></>),
    shield: I(<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>),
    box: I(<><path d="M3 7l9-4 9 4v10l-9 4-9-4z" /><path d="M3 7l9 4 9-4M12 11v10" /></>),
};

const steps = [
    { title: "Share your requirement", text: "Tell us what you need to move, from where to where, and by when." },
    { title: "We plan the movement", text: "Our team suggests the right vehicle, route and handling for your cargo." },
    { title: "Dispatch and tracking", text: "Your consignment is loaded and dispatched, and we keep you informed on the way." },
    { title: "Delivery and follow-up", text: "Cargo reaches the destination safely, and we stay available for your next need." },
];

const services = [
    {
        number: "01",
        icon: icons.truck,
        title: "Road Transportation",
        description:
            "Road freight solutions for business cargo and transportation requirements across routes.",
        tag: "Road freight",
    },
    {
        number: "02",
        icon: icons.warehouse,
        title: "Warehousing",
        description:
            "Organized storage solutions for industrial goods, equipment and business inventory.",
        tag: "Storage",
    },
    {
        number: "03",
        icon: icons.project,
        title: "Project Logistics",
        description:
            "Coordinated transport support for infrastructure, industrial and project cargo needs.",
        tag: "Project cargo",
    },
    {
        number: "04",
        icon: icons.gov,
        title: "Government Projects",
        description:
            "Transportation support for infrastructure and public-sector projects.",
        tag: "Infrastructure",
    },
];

const projects = [
    {
        name: "NTPC Projects",
        category: "Industrial transportation",
        description:
            "Transportation support for pond ash and fly ash projects, subject to project scope.",
        image:
            "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "NHAI Projects",
        category: "Road infrastructure",
        description:
            "Logistics support for highway and infrastructure-related transportation work.",
        image:
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=85",
    },
    {
        name: "Warehousing",
        category: "Storage and handling",
        description:
            "Storage solutions for industrial equipment and goods based on customer needs.",
        image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=85",
    },
];

export default function Home() {
    return (
        <main>
            <Hero />

            <TrustStrip />
            
            <About />

           <Services />

            <Process />

           <ProjectBanner />

            <Projects />

            <Contact />
        </main>
    );
}

