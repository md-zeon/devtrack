import Link from "next/link";
import SignupForm from "./components/SignupForm";

export default function Signup() {
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
							<span className='text-white font-bold text-lg'>D</span>
						</div>
						<span className='text-2xl font-bold text-gray-900'>DevTrack</span>
					</Link>
					<h2 className='text-3xl font-bold text-gray-900'>Create your account</h2>
					<p className='mt-2 text-gray-600'>Join thousands of developers tracking their projects</p>
				</div>

				{/* Signup Form */}
				<SignupForm />
				{/* Login link */}
				<div className='text-center'>
					<p className='text-gray-600'>
						Already have an account?{" "}
						<Link
							href='/login'
							className='font-medium text-blue-600 hover:text-blue-500'
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
