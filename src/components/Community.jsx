"use client";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Community() {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className='py-20 bg-gray-50 dark:bg-gray-900'
		>
			<div className='max-w-6xl mx-auto px-6 text-center'>
				<div className='flex justify-center mb-6'>
					<FaUsers className='text-blue-600 dark:text-blue-400 w-10 h-10' />
				</div>
				<h2 className='text-4xl font-bold mb-4 text-foreground'>Join Our Community</h2>
				<p className='mb-8 max-w-3xl mx-auto text-muted-foreground'>
					Connect with developers, share your projects, and grow your network.
				</p>
				<Button
					size='lg'
					className='mx-auto'
				>
					<Link
						href='https://github.com/md-zeon/devtrack'
						target='_blank'
						rel='noopener noreferrer'
					>
						Visit Community
					</Link>
				</Button>
			</div>
		</motion.section>
	);
}
