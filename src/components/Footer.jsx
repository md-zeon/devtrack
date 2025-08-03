import Link from "next/link";
import { FiCode, FiTwitter, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Logo & Description */}
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center space-x-2 mb-4">
							<FiCode className="h-8 w-8 text-blue-400" />
							<span className="text-2xl font-bold">DevTrack</span>
						</div>
						<p className="text-gray-300 mb-6 max-w-md">
							The ultimate project management tool for developers. Track tasks, manage deadlines, and boost productivity.
						</p>
						<div className="flex space-x-4">
							<Link href="#" className="text-gray-400 hover:text-white transition-colors">
								<FiTwitter className="h-6 w-6" />
							</Link>
							<Link href="#" className="text-gray-400 hover:text-white transition-colors">
								<FiGithub className="h-6 w-6" />
							</Link>
							<Link href="#" className="text-gray-400 hover:text-white transition-colors">
								<FiLinkedin className="h-6 w-6" />
							</Link>
							<Link href="#" className="text-gray-400 hover:text-white transition-colors">
								<FiMail className="h-6 w-6" />
							</Link>
						</div>
					</div>

					{/* Product Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Product</h3>
						<ul className="space-y-2 text-gray-300">
							<li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
							<li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
							<li><Link href="#integrations" className="hover:text-white transition-colors">Integrations</Link></li>
							<li><Link href="#api" className="hover:text-white transition-colors">API</Link></li>
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Company</h3>
						<ul className="space-y-2 text-gray-300">
							<li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
							<li><Link href="#blog" className="hover:text-white transition-colors">Blog</Link></li>
							<li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
							<li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-400 text-sm">
						© 2025 DevTrack. All rights reserved.
					</p>
					<div className="flex space-x-6 mt-4 md:mt-0">
						<Link href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
							Privacy Policy
						</Link>
						<Link href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
