import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function Home() {
	return (
		<main>
      {/* <Navbar /> */}
			<Hero />
			<Features />
			<HowItWorks />
			{/* <Screenshots /> */}
			<Testimonials />
			{/* <FAQ /> */}
			{/* <CTA /> */}
			{/* <Footer /> */}
		</main>
	);
}
