import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiPlay, FiCheck } from "react-icons/fi";

export default function Hero() {
	return (
		<section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
			
			{/* Hero Content */}
			<div className="relative z-10 max-w-4xl mx-auto">
				<div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-sm mb-8">
					<FiCheck className="h-4 w-4 mr-2" />
					Trusted by 1000+ developers worldwide
				</div>
				
				<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
					DevTrack
				</h1>
				
				<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-300 leading-relaxed">
					The ultimate project management tool for developers. Track tasks, manage deadlines, and boost productivity with our intuitive dashboard.
				</p>
				
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
					<Link href="/dashboard">
						<Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold flex items-center space-x-2 shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300">
							<span>Get Started Free</span>
							<FiArrowRight className="h-5 w-5" />
						</Button>
					</Link>
					
					<Button variant="outline" size="lg" className="border-white/20 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl text-lg font-semibold flex items-center space-x-2 backdrop-blur-sm">
						<FiPlay className="h-5 w-5" />
						<span>Watch Demo</span>
					</Button>
				</div>
				
				{/* Feature Pills */}
				<div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
					<div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
						<FiCheck className="h-4 w-4 text-green-400" />
						<span>No Credit Card Required</span>
					</div>
					<div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
						<FiCheck className="h-4 w-4 text-green-400" />
						<span>Free Forever Plan</span>
					</div>
					<div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
						<FiCheck className="h-4 w-4 text-green-400" />
						<span>Setup in 2 Minutes</span>
					</div>
				</div>
			</div>
			
			{/* Floating Elements */}
			<div className="absolute top-20 left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
			<div className="absolute top-40 right-20 w-12 h-12 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
			<div className="absolute bottom-32 left-20 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
		</section>
	);
}
