"use client"
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
	{
		question: "What is DevTrack and how does it help developers?",
		answer: "DevTrack is a comprehensive project management tool designed specifically for developers. It helps you organize your coding projects, track tasks, monitor progress, and improve productivity with features like time tracking, code integration, and team collaboration."
	},
	{
		question: "Is DevTrack free to use?",
		answer: "Yes! DevTrack offers a generous free tier that includes core project management features. We also have premium plans with advanced features like unlimited projects, team collaboration, and detailed analytics for growing teams and businesses."
	},
	{
		question: "Can I integrate DevTrack with my existing tools?",
		answer: "Absolutely! DevTrack integrates with popular development tools including GitHub, GitLab, Bitbucket, Jira, Slack, and more. Our API also allows custom integrations to fit your workflow perfectly."
	},
	{
		question: "How secure is my project data?",
		answer: "Security is our top priority. We use enterprise-grade encryption, secure cloud storage, regular backups, and comply with industry standards like SOC 2. Your code and project data are always protected and never shared with third parties."
	},
	{
		question: "Can I use DevTrack for team collaboration?",
		answer: "Yes! DevTrack supports team collaboration with features like project sharing, task assignment, real-time updates, team dashboards, and role-based permissions. Perfect for both small teams and larger development organizations."
	},
	{
		question: "What kind of analytics and reporting does DevTrack provide?",
		answer: "DevTrack offers comprehensive analytics including productivity metrics, time tracking reports, project progress charts, team performance insights, and custom reports. Visualize your development patterns and optimize your workflow."
	},
	{
		question: "How do I get started with DevTrack?",
		answer: "Getting started is simple! Sign up for a free account, create your first project, and start adding tasks. Our onboarding guide will walk you through all the features, and you can upgrade to premium features anytime as your needs grow."
	},
	{
		question: "What support options are available?",
		answer: "We offer multiple support channels including email support, comprehensive documentation, video tutorials, and a community forum. Premium users get priority support and access to live chat assistance."
	}
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="py-20 px-4 bg-white dark:bg-gray-800">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
						Frequently Asked Questions
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Everything you need to know about DevTrack. Can't find what you're looking for? Contact our support team.
					</p>
				</div>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
							<button
								onClick={() => toggleFAQ(index)}
								className="w-full px-6 py-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-between"
							>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
									{faq.question}
								</h3>
								<div className="text-blue-600 dark:text-blue-400 flex-shrink-0">
									{openIndex === index ? <FaMinus /> : <FaPlus />}
								</div>
							</button>
							{openIndex === index && (
								<div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
									<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
										{faq.answer}
									</p>
								</div>
							)}
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Still have questions?
					</p>
					<a 
						href="#contact" 
						className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Contact Support
					</a>
				</div>
			</div>
		</section>
	);
}
