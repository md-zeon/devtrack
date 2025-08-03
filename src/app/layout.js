import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/SessionProvider";
import { QueryProvider } from "@/components/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: {
		default: "DevTrack - Project Management for Developers",
		template: "%s | DevTrack"
	},
	description: "A modern project management and development tracking application built for developers and development teams. Track projects, manage tasks, and boost productivity.",
	keywords: ["project management", "development tracking", "task management", "developer tools", "productivity"],
	authors: [{ name: "DevTrack Team" }],
	creator: "DevTrack",
	publisher: "DevTrack",
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
				alt: "DevTrack - Project Management for Developers"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "DevTrack - Project Management for Developers",
		description: "Modern project management and development tracking application for developers and teams.",
		images: ["/og-image.png"],
		creator: "@devtrack"
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	manifest: "/manifest.json",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	verification: {
		google: "google-site-verification-code",
		yandex: "yandex-verification-code",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<SessionProvider>
					<QueryProvider>
						{children}
					</QueryProvider>
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
