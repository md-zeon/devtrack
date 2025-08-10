import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Link from "next/link";
import ContactForm from "./components/ContactForm";

export const metadata = {
	title: "Contact DevTrack",
	description:
		"Get in touch with the DevTrack team. We'd love to hear your feedback, questions, or suggestions about our project management platform.",
	openGraph: {
		title: "Contact DevTrack - Get in Touch",
		description: "Have questions about DevTrack? Contact our team for support, feedback, or partnership opportunities.",
		type: "website",
	},
	twitter: {
		title: "Contact DevTrack - Get in Touch",
		description: "Get in touch with the DevTrack team for support, feedback, or partnership opportunities.",
	},
};

export default function Contact() {
	return (
		<>
			<Navbar />
			<main className='pt-16'>
				{/* Hero Section */}
				<section className='py-20 bg-gradient-to-br from-blue-50 to-indigo-100'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>Contact Us</h1>
						<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
							Have questions, feedback, or need support? We&apos;d love to hear from you. Get in touch and we&apos;ll respond as soon as possible.
						</p>
					</div>
				</section>

				{/* Contact Section */}
				<section className='py-20'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
							{/* Contact Form */}
							<ContactForm />

							{/* Contact Information */}
							<div>
								<h2 className='text-3xl font-bold text-gray-900 mb-6'>Get in touch</h2>
								<div className='space-y-6'>
									<div className='flex items-start space-x-4'>
										<div className='bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0'>
											<FiMail className='h-6 w-6 text-blue-600' />
										</div>
										<div>
											<h3 className='text-lg font-semibold text-gray-900 mb-1'>Email</h3>
											<p className='text-gray-600'>zeon.cse@gmail.com</p>
											<p className='text-sm text-gray-500'>We&apos;ll respond within 24 hours</p>
										</div>
									</div>

									<div className='flex items-start space-x-4'>
										<div className='bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0'>
											<FiPhone className='h-6 w-6 text-green-600' />
										</div>
										<div>
											<h3 className='text-lg font-semibold text-gray-900 mb-1'>Support</h3>
											<p className='text-gray-600'>Available 24/7</p>
											<p className='text-sm text-gray-500'>Get help with technical issues</p>
										</div>
									</div>

									<div className='flex items-start space-x-4'>
										<div className='bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0'>
											<FiMapPin className='h-6 w-6 text-purple-600' />
										</div>
										<div>
											<h3 className='text-lg font-semibold text-gray-900 mb-1'>Location</h3>
											<p className='text-gray-600'>Remote Team</p>
											<p className='text-sm text-gray-500'>Working globally to serve you better</p>
										</div>
									</div>
								</div>

								{/* FAQ Link */}
								<div className='mt-8 p-6 bg-gray-50 rounded-lg'>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>Quick Questions?</h3>
									<p className='text-gray-600 mb-4'>Check our FAQ section for instant answers to common questions.</p>
									<Button>
										<Link href='/#faq'>View FAQ</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
