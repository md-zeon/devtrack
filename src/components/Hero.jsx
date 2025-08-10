"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function Hero() {
	return (
		<section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-background text-foreground overflow-hidden">
			{/* Floating Glow Effects */}
			<div className="absolute top-20 left-10 w-16 h-16 bg-blue-500/30 rounded-full blur-2xl animate-pulse" />
			<div className="absolute top-40 right-20 w-12 h-12 bg-purple-600/30 rounded-full blur-2xl animate-pulse delay-1000" />
			<div className="absolute bottom-32 left-20 w-20 h-20 bg-green-500/30 rounded-full blur-2xl animate-pulse delay-500" />

			{/* Content */}
			<div className="relative z-10 max-w-4xl mx-auto">
				<div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm mb-8">
					<FiCheck className="h-4 w-4 mr-2" />
					Trusted by 1000+ developers worldwide
				</div>

				<h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
					DevTrack
				</h1>

				<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-muted-foreground">
					The productivity dashboard built for developers. Organize tasks, ship faster, and never miss a deadline again.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
					<Link href="/dashboard">
						<Button size="lg" className="px-8 py-4 rounded-xl font-semibold">
							Get Started Free <FiArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</Link>
				</div>

				{/* Features */}
				<div className="flex flex-wrap justify-center gap-4 text-sm">
					<Badge variant="secondary" className="px-4 py-2 flex items-center gap-2">
						<FiCheck className="h-4 w-4 text-green-400" />
						No Credit Card Required
					</Badge>
					<Badge variant="secondary" className="px-4 py-2 flex items-center gap-2">
						<FiCheck className="h-4 w-4 text-green-400" />
						Free Forever Plan
					</Badge>
					<Badge variant="secondary" className="px-4 py-2 flex items-center gap-2">
						<FiCheck className="h-4 w-4 text-green-400" />
						Setup in 2 Minutes
					</Badge>
				</div>
			</div>
		</section>
	);
}
