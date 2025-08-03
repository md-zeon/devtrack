import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "DevTrack - Track Your Developer Projects",
	description: "Organize and manage your personal dev projects and tasks with ease.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
