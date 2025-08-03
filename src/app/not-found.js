import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4 text-lg">Could not find the requested page.</p>
      <Link href="/" className="mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Go back home
      </Link>
    </div>
  )
}
