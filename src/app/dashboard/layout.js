"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }) {
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
