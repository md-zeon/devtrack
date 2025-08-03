"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FiMail, FiLock, FiEye, FiEyeOff, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Implement NextAuth login
		console.log("Login attempt:", formData);
		alert("Login functionality will be implemented with NextAuth");
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleGoogleLogin = () => {
		// TODO: Implement Google OAuth with NextAuth
		alert("Google login will be implemented with NextAuth");
	};

	const handleGithubLogin = () => {
		// TODO: Implement GitHub OAuth with NextAuth
		alert("GitHub login will be implemented with NextAuth");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<Link href="/" className="inline-flex items-center space-x-2 mb-8">
						<div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-lg">D</span>
						</div>
						<span className="text-2xl font-bold text-gray-900">DevTrack</span>
					</Link>
					<h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
					<p className="mt-2 text-gray-600">Sign in to your account to continue</p>
				</div>

				{/* Login Form */}
				<Card className="p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
								Email address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<FiMail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter your email"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<FiLock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									required
									className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter your password"
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
									Forgot your password?
								</Link>
							</div>
						</div>

						<Button type="submit" className="w-full">
							Sign in
						</Button>
					</form>

					{/* Divider */}
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Or continue with</span>
							</div>
						</div>
					</div>

					{/* Social Login */}
					<div className="mt-6 space-y-3">
						<Button
							type="button"
							variant="outline"
							className="w-full flex items-center justify-center space-x-2"
							onClick={handleGoogleLogin}
						>
							<FcGoogle className="h-5 w-5" />
							<span>Continue with Google</span>
						</Button>

						<Button
							type="button"
							variant="outline"
							className="w-full flex items-center justify-center space-x-2"
							onClick={handleGithubLogin}
						>
							<FiGithub className="h-5 w-5" />
							<span>Continue with GitHub</span>
						</Button>
					</div>
				</Card>

				{/* Sign up link */}
				<div className="text-center">
					<p className="text-gray-600">
						Don't have an account?{" "}
						<Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
							Sign up for free
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
