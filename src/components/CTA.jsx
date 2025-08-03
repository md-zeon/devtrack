import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight, FiStar } from "react-icons/fi";

export default function CTA() {
	return (
		<section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
			<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
				<div className="flex justify-center mb-6">
					<div className="flex items-center space-x-1">
						{[...Array(5)].map((_, i) => (
							<FiStar key={i} className="h-6 w-6 fill-current text-yellow-400" />
						))}
					</div>
				</div>
				
				<h2 className="text-3xl md:text-5xl font-bold mb-6">
					Ready to boost your productivity?
				</h2>
				
				<p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
					Join thousands of developers who are already using DevTrack to manage their projects more efficiently.
				</p>
				
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Link href="/signup">
						<Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl text-lg font-semibold flex items-center space-x-2 shadow-xl">
							<span>Start Free Trial</span>
							<FiArrowRight className="h-5 w-5" />
						</Button>
					</Link>
					
					<Link href="/contact">
						<Button variant="outline" size="lg" className="border-white/30 bg-transparent hover:bg-white/10 text-white px-8 py-3 rounded-xl text-lg font-semibold">
							Talk to Sales
						</Button>
					</Link>
				</div>
				
				<p className="text-sm text-blue-200 mt-6">
					No credit card required • Free 14-day trial • Cancel anytime
				</p>
			</div>
		</section>
	);
}
