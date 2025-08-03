import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

const testimonials = [
	{
		name: "Sarah Chen",
		role: "Full Stack Developer",
		company: "TechStart Inc.",
		content: "DevTrack completely transformed how I manage my side projects. The task tracking and time management features help me stay organized and productive.",
		rating: 5,
		avatar: "SC"
	},
	{
		name: "Mike Rodriguez",
		role: "Software Engineer", 
		company: "Innovation Labs",
		content: "As a freelance developer, DevTrack helps me keep all my client projects organized. The progress tracking gives my clients confidence in my work.",
		rating: 5,
		avatar: "MR"
	},
	{
		name: "Alex Thompson",
		role: "Frontend Developer",
		company: "Creative Solutions",
		content: "The clean interface and intuitive design make project management effortless. I can focus on coding instead of worrying about organization.",
		rating: 5,
		avatar: "AT"
	},
	{
		name: "Emily Davis",
		role: "DevOps Engineer",
		company: "CloudTech",
		content: "DevTrack's integration capabilities and team collaboration features have streamlined our development workflow significantly.",
		rating: 5,
		avatar: "ED"
	},
	{
		name: "David Park",
		role: "Mobile Developer",
		company: "AppCrafters",
		content: "The analytics and reporting features give me insights into my productivity patterns. It's helped me optimize my development process.",
		rating: 5,
		avatar: "DP"
	},
	{
		name: "Lisa Wong",
		role: "Backend Developer",
		company: "DataFlow",
		content: "Managing multiple projects used to be chaos. DevTrack brought order to my workflow and improved my delivery timelines.",
		rating: 5,
		avatar: "LW"
	}
];

export default function Testimonials() {
	return (
		<section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
						What Developers Say About DevTrack
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Join thousands of developers who have transformed their project management with DevTrack.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
							<CardContent className="p-6">
								<div className="flex items-center mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<FaStar key={i} className="text-yellow-400 w-5 h-5" />
									))}
								</div>
								
								<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
									"{testimonial.content}"
								</p>
								
								<div className="flex items-center">
									<div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
										{testimonial.avatar}
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-white">
											{testimonial.name}
										</h4>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{testimonial.role} at {testimonial.company}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mt-16">
					<p className="text-gray-600 dark:text-gray-300">
						Ready to join them? Start your free trial today.
					</p>
				</div>
			</div>
		</section>
	);
}
