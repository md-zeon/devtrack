import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Features />
				<HowItWorks />
				<Testimonials />
				<FAQ />
				<CTA />
			</main>
			<Footer />
		</>
	);
}
