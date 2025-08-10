"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX, FiCode, FiUser, FiLogIn } from "react-icons/fi";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<FiCode className="h-8 w-8 text-blue-600" />
						<span className="text-xl font-bold text-gray-900">DevTrack</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
							Home
						</Link>
						<Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
							About
						</Link>
						<Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
							Contact
						</Link>
					</div>

					{/* Desktop Auth Buttons */}
					<div className="hidden md:flex items-center space-x-4">
						<Link href="/login">
							<Button variant="ghost" className="flex items-center space-x-2">
								<FiLogIn className="h-4 w-4" />
								<span>Login</span>
							</Button>
						</Link>
						<Link href="/signup">
							<Button className="flex items-center space-x-2">
								<FiUser className="h-4 w-4" />
								<span>Sign Up</span>
							</Button>
						</Link>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<Button variant="ghost" size="sm" onClick={toggleMenu}>
							{isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden bg-background border-t border-gray-200">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<Link
								href="/"
								className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
								onClick={toggleMenu}
							>
								Home
							</Link>
							<Link
								href="/about"
								className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
								onClick={toggleMenu}
							>
								About
							</Link>
							<Link
								href="/contact"
								className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
								onClick={toggleMenu}
							>
								Contact
							</Link>
							<div className="border-t border-gray-200 pt-4 pb-3">
								<div className="flex flex-col space-y-2 px-3">
									<Link href="/login" onClick={toggleMenu}>
										<Button variant="ghost" className="w-full justify-start">
											<FiLogIn className="h-4 w-4 mr-2" />
											Login
										</Button>
									</Link>
									<Link href="/signup" onClick={toggleMenu}>
										<Button className="w-full justify-start">
											<FiUser className="h-4 w-4 mr-2" />
											Sign Up
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
