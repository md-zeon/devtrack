"use client";

import { FaRocket, FaCogs, FaBolt, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
	{
		icon: FaRocket,
		title: "Blazing Fast",
		description: "Optimized performance lets you focus on coding, not waiting.",
	},
	{
		icon: FaCogs,
		title: "Highly Customizable",
		description: "Tailor your workflow and dashboard exactly how you like it.",
	},
	{
		icon: FaBolt,
		title: "Instant Updates",
		description: "Real-time notifications and sync keep you always in control.",
	},
	{
		icon: FaUsers,
		title: "Collaborate Seamlessly",
		description: "Built-in team features to share, assign, and track tasks effortlessly.",
	},
];

export default function WhyChooseUs() {
	return (
		<section className='py-20 px-4 bg-gray-50 dark:bg-gray-900'>
			<div className='max-w-6xl mx-auto text-center mb-16'>
				<h2 className='text-4xl font-bold mb-4 text-gray-900 dark:text-white'>Why Developers Choose DevTrack</h2>
				<p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
					The features and support designed to boost your productivity and workflow.
				</p>
			</div>

			<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
				{benefits.map(({ icon: Icon, title, description }, idx) => (
					<motion.div
						key={title}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
						viewport={{ once: true }}
						className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-transform hover:-translate-y-1 cursor-default'
					>
						<Icon className='text-blue-600 dark:text-blue-400 w-12 h-12 mb-5' />
						<h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-white'>{title}</h3>
						<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>{description}</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}
