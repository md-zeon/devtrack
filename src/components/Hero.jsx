import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section className='min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white'>
			<h1 className='text-5xl font-bold mb-4'>DevTrack</h1>
			<p className='text-xl max-w-xl mb-6'>
				Track your developer projects and tasks in one clean, productive dashboard.
			</p>
			<Link href='/dashboard'>
				<Button
					as='a'
					variant='default'
					className='cursor-pointer'
				>
					Get Started
				</Button>
			</Link>
		</section>
	);
}
