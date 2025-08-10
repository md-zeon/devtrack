"use client"
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            subject: "",
            message: "",
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
                [e.target.name]: e.target.value,
            });
        };
    
	return (
		<div>
			{/* Contact Form */}
			<h2 className='text-3xl font-bold text-gray-900 mb-6'>Send us a message</h2>
			<Card className='p-6'>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
					<div className='space-y-2'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							name='name'
							type='text'
							value={formData.name}
							onChange={handleChange}
							placeholder='Your full name'
							required
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							name='email'
							type='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='your.email@example.com'
							required
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='subject'>Subject</Label>
						<Input
							id='subject'
							name='subject'
							type='text'
							value={formData.subject}
							onChange={handleChange}
							placeholder="What's this about?"
							required
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='message'>Message</Label>
						<Textarea
							id='message'
							name='message'
							value={formData.message}
							onChange={handleChange}
							placeholder='Tell us more about your inquiry...'
							rows={5}
							required
						/>
					</div>

					<Button
						type='submit'
						className='w-full flex items-center justify-center space-x-2'
					>
						<FiSend className='h-4 w-4' />
						<span>Send Message</span>
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default ContactForm;
