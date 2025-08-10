"use client";

import { motion } from "framer-motion";
import { FaRocket, FaClipboardList, FaEdit, FaChartBar } from "react-icons/fa";
import Link from "next/link";
import { Button } from "./ui/button";

const steps = [
	{
		step: "01",
		title: "Sign Up & Setup",
		description:
			"Create your account and set up your developer profile in minutes. Connect your favorite tools and repositories.",
		icon: FaRocket,
	},
	{
		step: "02",
		title: "Create Projects",
		description:
			"Add your development projects with descriptions, technologies, and goals. Organize them by priority and status.",
		icon: FaClipboardList,
	},
	{
		step: "03",
		title: "Track Tasks",
		description:
			"Break down projects into manageable tasks. Set deadlines, priorities, and track your progress in real-time.",
		icon: FaEdit,
	},
	{
		step: "04",
		title: "Monitor Progress",
		description: "View detailed analytics, time tracking, and progress reports to optimize your development workflow.",
		icon: FaChartBar,
	},
];

export default function HowItWorks() {
	return (
		<section className='py-20 px-4 bg-background relative'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl font-bold mb-4 text-foreground'>How DevTrack Works</h2>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
						Get started with DevTrack in four simple steps and transform how you manage your development projects.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative'>
					{/* Subtle connector line */}
					<div className='hidden lg:block absolute top-16 left-0 right-0 h-[2px] bg-border -z-10' />

					{steps.map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.15, duration: 0.5 }}
							viewport={{ once: true }}
							className='text-center group relative'
						>
							<div className='relative mb-6'>
								<motion.div
									whileHover={{ scale: 1.1, rotate: 2 }}
									className='w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-3xl mb-4 text-blue-600 border border-border shadow-sm'
								>
									<step.icon />
								</motion.div>
								<div className='absolute -top-2 -right-2 px-2 py-1 bg-blue-600 text-white rounded text-xs font-mono shadow-sm'>
									{`</${step.step}>`}
								</div>
							</div>
							<h3 className='text-lg font-semibold mb-3 text-foreground'>{step.title}</h3>
							<p className='text-muted-foreground leading-relaxed'>{step.description}</p>
						</motion.div>
					))}
				</div>

				{/* Strong CTA */}
				<div className='text-center mt-16'>
					<div className='inline-flex flex-col items-center'>
						<span className='text-muted-foreground mb-4 text-lg'>Ready to boost your productivity?</span>
						<Button size="lg">
							<Link href='/signup'>Sign Up Right Now</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
