import Link from "next/link";
import { FiTwitter, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-400">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Links Section */}
					<div>
						<h3 className="text-white font-semibold mb-4">Links</h3>
						<ul className="space-y-2">
							<li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
							<li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
							<li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
							<li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
						</ul>
					</div>

					{/* Legal Section */}
					<div>
						<h3 className="text-white font-semibold mb-4">Legal</h3>
						<ul className="space-y-2">
							<li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
							<li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
						</ul>
					</div>

					{/* Social Section */}
					<div>
						<h3 className="text-white font-semibold mb-4">Social</h3>
						<div className="flex space-x-4">
							<Link href="https://github.com/md-zeon" className="hover:text-white transition-colors">
								<FiGithub className="h-6 w-6" />
							</Link>
							<Link href="#" className="hover:text-white transition-colors">
								<FiLinkedin className="h-6 w-6" />
							</Link>
							<Link href="#" className="hover:text-white transition-colors">
								<FiTwitter className="h-6 w-6" />
							</Link>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-gray-800 mt-8 pt-8 text-center">
					<p className="text-sm">
						© 2025 DevTrack. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
