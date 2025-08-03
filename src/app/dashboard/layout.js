"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return; // Still loading

		if (!session) {
			router.push("/login");
			return;
		}
	}, [session, status, router]);

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	if (!session) {
		return null; // Will redirect to login
	}

	return (
		<SidebarProvider>
			<div className="min-h-screen flex w-full bg-background">
				<DashboardSidebar />
				<div className="flex-1 flex flex-col overflow-hidden">
					<DashboardHeader />
					<main className="flex-1 overflow-y-auto p-6">
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
