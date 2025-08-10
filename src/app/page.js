import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Community from "@/components/Community";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Features />
				<HowItWorks />
				<Testimonials />
				<WhyChooseUs />
				<FAQ />
				<Community />
			</main>
			<Footer />
		</>
	);
}
