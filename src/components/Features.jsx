import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
	{
		title: "Project Organization",
		description: "Organize all your development projects in one centralized dashboard with intuitive categorization.",
		icon: "📁"
	},
	{
		title: "Task Management", 
		description: "Create, assign, and track tasks with priority levels, due dates, and progress monitoring.",
		icon: "✅"
	},
	{
		title: "Progress Tracking",
		description: "Visualize your development progress with charts, statistics, and milestone tracking.",
		icon: "📊"
	},
	{
		title: "Time Tracking",
		description: "Monitor time spent on projects and tasks to improve productivity and project estimation.",
		icon: "⏱️"
	},
	{
		title: "Code Integration",
		description: "Connect with your repositories and track commits, branches, and development activity.",
		icon: "🔗"
	},
	{
		title: "Team Collaboration",
		description: "Share projects, assign tasks to team members, and collaborate effectively on development goals.",
		icon: "👥"
	}
];

export default function Features() {
	return (
		<section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
						Everything You Need to Track Your Projects
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						DevTrack provides all the tools you need to manage your development projects efficiently and boost your productivity.
					</p>
				</div>
				
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader className="text-center">
								<div className="text-4xl mb-4">{feature.icon}</div>
								<CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center text-gray-600 dark:text-gray-300">
									{feature.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
