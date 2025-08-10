import Link from "next/link";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const faqs = [
	{
		question: "What is DevTrack and how does it help developers?",
		answer:
			"DevTrack is a comprehensive project management tool designed specifically for developers. It helps you organize your coding projects, track tasks, monitor progress, and improve productivity with features like time tracking, code integration, and team collaboration.",
	},
	{
		question: "Is DevTrack free to use?",
		answer:
			"Yes! DevTrack offers a generous free tier that includes core project management features. We also have premium plans with advanced features like unlimited projects, team collaboration, and detailed analytics for growing teams and businesses.",
	},
	{
		question: "Can I integrate DevTrack with my existing tools?",
		answer:
			"Absolutely! DevTrack integrates with popular development tools including GitHub, GitLab, Bitbucket, Jira, Slack, and more. Our API also allows custom integrations to fit your workflow perfectly.",
	},
	{
		question: "How secure is my project data?",
		answer:
			"Security is our top priority. We use enterprise-grade encryption, secure cloud storage, regular backups, and comply with industry standards like SOC 2. Your code and project data are always protected and never shared with third parties.",
	},
	{
		question: "Can I use DevTrack for team collaboration?",
		answer:
			"Yes! DevTrack supports team collaboration with features like project sharing, task assignment, real-time updates, team dashboards, and role-based permissions. Perfect for both small teams and larger development organizations.",
	},
	{
		question: "What kind of analytics and reporting does DevTrack provide?",
		answer:
			"DevTrack offers comprehensive analytics including productivity metrics, time tracking reports, project progress charts, team performance insights, and custom reports. Visualize your development patterns and optimize your workflow.",
	},
	{
		question: "How do I get started with DevTrack?",
		answer:
			"Getting started is simple! Sign up for a free account, create your first project, and start adding tasks. Our onboarding guide will walk you through all the features, and you can upgrade to premium features anytime as your needs grow.",
	},
	{
		question: "What support options are available?",
		answer:
			"We offer multiple support channels including email support, comprehensive documentation, video tutorials, and a community forum. Premium users get priority support and access to live chat assistance.",
	},
];

export default function FAQ() {
	return (
		<section
			id='faq'
			className='py-20 px-4 bg-background dark:bg-gray-800'
		>
			<div className='max-w-4xl mx-auto'>
				<div className='text-center mb-16'>
					<h2 className='text-4xl font-bold mb-4 text-gray-900 dark:text-white'>Frequently Asked Questions</h2>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
						Everything you need to know about DevTrack. Can't find what you're looking for? Contact our support team.
					</p>
				</div>

				<Accordion
					type='single'
					collapsible
					className='space-y-4'
				>
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
						>
							<AccordionTrigger>
								<div className='flex items-center justify-between w-full'>
									<span>{faq.question}</span>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>{faq.answer}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>

				<div className='text-center mt-12'>
					<p className='text-gray-600 dark:text-gray-300 mb-4'>Still have questions?</p>
					<Button
						size='lg'
						asChild
					>
						<Link href='/contact'>Contact Support</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
