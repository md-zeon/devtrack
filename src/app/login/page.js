import Link from "next/link";
import LoginForm from "./components/LoginForm";
import { FaCode } from "react-icons/fa";

export default function Login() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				{/* Header */}
				<div className='text-center'>
					<Link
						href='/'
						className='inline-flex items-center space-x-2 mb-8'
					>
						<div className='bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center'>
							<span className='text-white font-bold text-lg'><FaCode /></span>
						</div>
						<span className='text-2xl font-bold text-gray-900'>DevTrack</span>
					</Link>
					<h2 className='text-3xl font-bold text-gray-900'>Welcome back</h2>
					<p className='mt-2 text-gray-600'>Sign in to your account to continue</p>
				</div>

				{/* Login Form */}
				<LoginForm />

				{/* Sign up link */}
				<div className='text-center'>
					<p className='text-gray-600'>
						Don&apos;t have an account?{" "}
						<Link
							href='/signup'
							className='font-medium text-blue-600 hover:text-blue-500'
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
