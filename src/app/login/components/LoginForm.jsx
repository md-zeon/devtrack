"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FiMail, FiLock, FiEye, FiEyeOff, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		
		try {
			const result = await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: false,
			});

			if (result?.error) {
				toast.error("Invalid email or password");
			} else {
				toast.success("Logged in successfully!");
				router.push("/dashboard");
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleGoogleLogin = () => {
		signIn("google", { callbackUrl: "/dashboard" });
	};

	const handleGithubLogin = () => {
		signIn("github", { callbackUrl: "/dashboard" });
	};
	return (
		<Card className='p-8'>
			{/* Login Form */}
			<form
				onSubmit={handleSubmit}
				className='space-y-6'
			>
				<div className='space-y-2'>
					<Label htmlFor='email'>Email address</Label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<FiMail className='h-5 w-5 text-gray-400' />
						</div>
						<Input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='Enter your email'
							className='pl-10'
							required
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='password'>Password</Label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<FiLock className='h-5 w-5 text-gray-400' />
						</div>
						<Input
							type={showPassword ? "text" : "password"}
							id='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							placeholder='Enter your password'
							className='pl-10 pr-10'
							required
						/>
						<button
							type='button'
							className='absolute inset-y-0 right-0 pr-3 flex items-center'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<FiEyeOff className='h-5 w-5 text-gray-400 hover:text-gray-600' />
							) : (
								<FiEye className='h-5 w-5 text-gray-400 hover:text-gray-600' />
							)}
						</button>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-2'>
						<Checkbox id='remember-me' />
						<Label
							htmlFor='remember-me'
							className='text-sm'
						>
							Remember me
						</Label>
					</div>

					<div className='text-sm'>
						<Link
							href='/forgot-password'
							className='font-medium text-blue-600 hover:text-blue-500'
						>
							Forgot your password?
						</Link>
					</div>
				</div>

				<Button
					type='submit'
					className='w-full'
					disabled={isLoading}
				>
					{isLoading ? "Signing in..." : "Sign in"}
				</Button>
			</form>

			{/* Divider */}
			<div className='mt-6'>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<Separator />
					</div>
					<div className='relative flex justify-center text-sm'>
						<span className='px-2 bg-white text-gray-500'>Or continue with</span>
					</div>
				</div>
			</div>

			{/* Social Login */}
			<div className='mt-6 space-y-3'>
				<Button
					type='button'
					variant='outline'
					className='w-full flex items-center justify-center space-x-2'
					onClick={handleGoogleLogin}
				>
					<FcGoogle className='h-5 w-5' />
					<span>Continue with Google</span>
				</Button>

				<Button
					type='button'
					variant='outline'
					className='w-full flex items-center justify-center space-x-2'
					onClick={handleGithubLogin}
				>
					<FiGithub className='h-5 w-5' />
					<span>Continue with GitHub</span>
				</Button>
			</div>
		</Card>
	);
};

export default LoginForm;
