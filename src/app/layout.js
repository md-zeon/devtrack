import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/SessionProvider";
import { QueryProvider } from "@/components/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: {
		default: "DevTrack - Project Management for Developers",
		template: "%s | DevTrack",
	},
	description:
		"A modern project management and development tracking application built for developers and development teams. Track projects, manage tasks, and boost productivity.",
	metadataBase: new URL("https://www.devtrack.com"),
	keywords: ["project management", "development tracking", "task management", "developer tools", "productivity"],
	authors: [{ name: "Zeanur Rahaman Zeon" }],
	creator: "Zeanur Rahaman Zeon",
	publisher: "Zeanur Rahaman Zeon",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://devtrack.app",
		title: "DevTrack - Project Management for Developers",
		description: "Modern project management and development tracking application for developers and teams.",
		siteName: "DevTrack",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "DevTrack - Project Management for Developers",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "DevTrack - Project Management for Developers",
		description: "Modern project management and development tracking application for developers and teams.",
		images: ["/og-image.png"],
		creator: "@developerzeon",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${inter.className}`}>
				<SessionProvider>
					<QueryProvider>{children}</QueryProvider>
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
