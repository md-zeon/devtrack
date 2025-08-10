import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiCode, FiUsers, FiTarget, FiHeart } from "react-icons/fi";

export const metadata = {
	title: "About DevTrack",
	description: "Learn about DevTrack's mission to streamline project management for developers and development teams worldwide. Discover our vision for the future of development workflow.",
	openGraph: {
		title: "About DevTrack - Our Mission & Vision",
		description: "Discover how DevTrack is revolutionizing project management for developers with modern tools and intuitive workflows.",
		type: "website",
	},
	twitter: {
		title: "About DevTrack - Our Mission & Vision",
		description: "Learn about DevTrack's mission to help developers worldwide organize their projects and boost productivity.",
	},
};

export default function About() {
	return (
		<>
			<Navbar />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
							About DevTrack
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							We&apos;re on a mission to help developers organize their projects, track tasks, and boost productivity with clean, intuitive tools.
						</p>
					</div>
				</section>

				{/* Mission Section */}
				<section className="py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Our Mission
							</h2>
							<p className="text-lg text-gray-600 max-w-2xl mx-auto">
								To simplify project management for developers and help them focus on what they do best - building amazing software.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							<div className="text-center">
								<div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
									<FiCode className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">Developer-First</h3>
								<p className="text-gray-600">Built by developers, for developers. We understand your workflow.</p>
							</div>

							<div className="text-center">
								<div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
									<FiTarget className="h-8 w-8 text-green-600" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
								<p className="text-gray-600">Focus on what matters most with clear goals and priorities.</p>
							</div>

							<div className="text-center">
								<div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
									<FiUsers className="h-8 w-8 text-purple-600" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">Team-Friendly</h3>
								<p className="text-gray-600">Collaborate seamlessly with your team on any project.</p>
							</div>

							<div className="text-center">
								<div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
									<FiHeart className="h-8 w-8 text-red-600" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">Made with Love</h3>
								<p className="text-gray-600">Crafted with care and attention to every detail.</p>
							</div>
						</div>
					</div>
				</section>

				{/* Story Section */}
				<section className="py-20 bg-gray-50">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Our Story
							</h2>
						</div>

						<div className="prose prose-lg mx-auto text-gray-600">
							<p>
								DevTrack was born out of frustration with complex project management tools that seemed designed for everything except development work. As developers ourselves, we found existing solutions either too bloated with unnecessary features or too simple to handle the complexity of modern software projects.
							</p>
							<p>
								We wanted something different - a tool that understood the developer mindset, respected our workflows, and made project management feel natural rather than burdensome. That&apos;s how DevTrack came to life.
							</p>
							<p>
								Today, DevTrack helps thousands of developers worldwide stay organized, meet deadlines, and ship better software. We&apos;re constantly improving based on feedback from our community of users who, like us, believe that great tools make great developers even better.
							</p>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								By the Numbers
							</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
							<div>
								<div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
								<div className="text-gray-600">Active Developers</div>
							</div>
							<div>
								<div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
								<div className="text-gray-600">Projects Managed</div>
							</div>
							<div>
								<div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
								<div className="text-gray-600">Tasks Completed</div>
							</div>
							<div>
								<div className="text-4xl font-bold text-red-600 mb-2">99.9%</div>
								<div className="text-gray-600">Uptime</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
