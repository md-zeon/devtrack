"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Link from "next/link";

const SignupForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}

		if (formData.password.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				toast.success("Account created successfully! Please sign in.");
				router.push("/login");
			} else {
				toast.error(data.error || "Registration failed");
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

	const handleGoogleSignup = () => {
		signIn("google", { callbackUrl: "/dashboard" });
	};

	const handleGithubSignup = () => {
		signIn("github", { callbackUrl: "/dashboard" });
	};
	return (
		<Card className='p-8'>
			{/* Signup Form */}
			<form
				onSubmit={handleSubmit}
				className='space-y-6'
			>
				<div className='space-y-2'>
					<Label htmlFor='name'>Full name</Label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<FiUser className='h-5 w-5 text-gray-400' />
						</div>
						<Input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Enter your full name'
							className='pl-10'
							required
						/>
					</div>
				</div>

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
							placeholder='Create a password (min. 8 characters)'
							className='pl-10 pr-10'
							minLength={8}
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

				<div className='space-y-2'>
					<Label htmlFor='confirmPassword'>Confirm password</Label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<FiLock className='h-5 w-5 text-gray-400' />
						</div>
						<Input
							type='password'
							id='confirmPassword'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder='Confirm your password'
							className='pl-10'
							required
						/>
					</div>
				</div>

				<div className='flex items-center space-x-2'>
					<Checkbox
						id='terms'
						required
					/>
					<Label
						htmlFor='terms'
						className='text-sm'
					>
						I agree to the{" "}
						<Link
							href='/terms'
							className='text-blue-600 hover:text-blue-500'
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							href='/privacy'
							className='text-blue-600 hover:text-blue-500'
						>
							Privacy Policy
						</Link>
					</Label>
				</div>

				<Button
					type='submit'
					className='w-full'
					disabled={isLoading}
				>
					{isLoading ? "Creating account..." : "Create account"}
				</Button>
			</form>

			{/* Divider */}
			<div className='mt-6'>
				<div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<Separator />
					</div>
					<div className='relative flex justify-center text-sm'>
						<span className='px-2 bg-white text-gray-500'>Or sign up with</span>
					</div>
				</div>
			</div>

			{/* Social Signup */}
			<div className='mt-6 space-y-3'>
				<Button
					type='button'
					variant='outline'
					className='w-full flex items-center justify-center space-x-2'
					onClick={handleGoogleSignup}
				>
					<FcGoogle className='h-5 w-5' />
					<span>Continue with Google</span>
				</Button>

				<Button
					type='button'
					variant='outline'
					className='w-full flex items-center justify-center space-x-2'
					onClick={handleGithubSignup}
				>
					<FiGithub className='h-5 w-5' />
					<span>Continue with GitHub</span>
				</Button>
			</div>
		</Card>
	);
};

export default SignupForm;
