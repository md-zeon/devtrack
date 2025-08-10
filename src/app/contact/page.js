"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import Link from "next/link";

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Implement contact form submission
		console.log("Contact form submitted:", formData);
		alert("Thank you for your message! We'll get back to you soon.");
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<>
			<Navbar />
			<main className="pt-16">
				{/* Hero Section */}
				<section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
							Contact Us
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Have questions, feedback, or need support? We'd love to hear from you. Get in touch and we'll respond as soon as possible.
						</p>
					</div>
				</section>

				{/* Contact Section */}
				<section className="py-20">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
							{/* Contact Form */}
							<div>
								<h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>
								<Card className="p-6">
									<form onSubmit={handleSubmit} className="space-y-6">
										<div className="space-y-2">
											<Label htmlFor="name">Name</Label>
											<Input
												id="name"
												name="name"
												type="text"
												value={formData.name}
												onChange={handleChange}
												placeholder="Your full name"
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="your.email@example.com"
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="subject">Subject</Label>
											<Input
												id="subject"
												name="subject"
												type="text"
												value={formData.subject}
												onChange={handleChange}
												placeholder="What's this about?"
												required
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="message">Message</Label>
											<Textarea
												id="message"
												name="message"
												value={formData.message}
												onChange={handleChange}
												placeholder="Tell us more about your inquiry..."
												rows={5}
												required
											/>
										</div>

										<Button type="submit" className="w-full flex items-center justify-center space-x-2">
											<FiSend className="h-4 w-4" />
											<span>Send Message</span>
										</Button>
									</form>
								</Card>
							</div>

							{/* Contact Information */}
							<div>
								<h2 className="text-3xl font-bold text-gray-900 mb-6">Get in touch</h2>
								<div className="space-y-6">
									<div className="flex items-start space-x-4">
										<div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
											<FiMail className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
											<p className="text-gray-600">zeon.cse@gmail.com</p>
											<p className="text-sm text-gray-500">We'll respond within 24 hours</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
											<FiPhone className="h-6 w-6 text-green-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 mb-1">Support</h3>
											<p className="text-gray-600">Available 24/7</p>
											<p className="text-sm text-gray-500">Get help with technical issues</p>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
											<FiMapPin className="h-6 w-6 text-purple-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
											<p className="text-gray-600">Remote Team</p>
											<p className="text-sm text-gray-500">Working globally to serve you better</p>
										</div>
									</div>
								</div>

								{/* FAQ Link */}
								<div className="mt-8 p-6 bg-gray-50 rounded-lg">
									<h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Questions?</h3>
									<p className="text-gray-600 mb-4">
										Check our FAQ section for instant answers to common questions.
									</p>
									<Button>
										<Link href="/#faq">View FAQ</Link>
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
