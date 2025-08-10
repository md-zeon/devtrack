import Link from "next/link";
import { FiTwitter, FiGithub, FiLinkedin, FiCode } from "react-icons/fi";

export default function Footer() {
	return (
		<footer className='bg-gray-900 text-gray-400'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
					{/* Logo & Description */}
					<div className='col-span-1 md:col-span-2'>
						<div className='flex items-center space-x-2 mb-4'>
							<FiCode className='h-8 w-8 text-blue-400' />
							<span className='text-2xl font-bold'>DevTrack</span>
						</div>
						<p className='text-gray-300 mb-6 max-w-md'>
							The ultimate project management tool for developers. Track tasks, manage deadlines, and boost
							productivity.
						</p>
					</div>
					{/* Links Section */}
					<div>
						<h3 className='text-white font-semibold mb-4'>Links</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/'
									className='hover:text-white transition-colors'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href='/dashboard'
									className='hover:text-white transition-colors'
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									className='hover:text-white transition-colors'
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='hover:text-white transition-colors'
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal Section */}
					<div>
						<h3 className='text-white font-semibold mb-4'>Legal</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/privacy'
									className='hover:text-white transition-colors'
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='hover:text-white transition-colors'
								>
									Terms
								</Link>
							</li>
						</ul>
					</div>

					{/* Social Section */}
					<div>
						<h3 className='text-white font-semibold mb-4'>Social</h3>
						<div className='flex space-x-4'>
							<Link
								href='https://github.com/md-zeon'
								className='hover:text-white transition-colors'
							>
								<FiGithub className='h-6 w-6' />
							</Link>
							<Link
								href='https://www.linkedin.com/in/zeanur-rahaman-zeon/'
								className='hover:text-white transition-colors'
							>
								<FiLinkedin className='h-6 w-6' />
							</Link>
							<Link
								href='https://x.com/developerzeon'
								className='hover:text-white transition-colors'
							>
								<FiTwitter className='h-6 w-6' />
							</Link>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className='border-t border-gray-800 mt-8 pt-8 text-center'>
					<p className='text-sm'>© 2025 DevTrack. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
