const steps = [
	{
		step: "01",
		title: "Sign Up & Setup",
		description: "Create your account and set up your developer profile in minutes. Connect your favorite tools and repositories.",
		icon: "🚀"
	},
	{
		step: "02", 
		title: "Create Projects",
		description: "Add your development projects with descriptions, technologies, and goals. Organize them by priority and status.",
		icon: "📋"
	},
	{
		step: "03",
		title: "Track Tasks",
		description: "Break down projects into manageable tasks. Set deadlines, priorities, and track your progress in real-time.",
		icon: "✏️"
	},
	{
		step: "04",
		title: "Monitor Progress",
		description: "View detailed analytics, time tracking, and progress reports to optimize your development workflow.",
		icon: "📈"
	}
];

export default function HowItWorks() {
	return (
		<section className="py-20 px-4 bg-white dark:bg-gray-800">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
						How DevTrack Works
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Get started with DevTrack in four simple steps and transform how you manage your development projects.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((step, index) => (
						<div key={index} className="text-center group">
							<div className="relative mb-6">
								<div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
									{step.icon}
								</div>
								<div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
									{step.step}
								</div>
								{index < steps.length - 1 && (
									<div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-300 dark:bg-gray-600 -translate-x-10"></div>
								)}
							</div>
							<h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
								{step.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
								{step.description}
							</p>
						</div>
					))}
				</div>

				<div className="text-center mt-16">
					<div className="inline-flex items-center px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
						<span className="text-blue-600 dark:text-blue-400 font-medium">
							Ready to boost your productivity? Get started today!
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
