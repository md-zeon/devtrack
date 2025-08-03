"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
	FiBell,
	FiSettings,
	FiUser,
	FiLogOut,
	FiSun,
	FiMoon,
	FiPlus
} from "react-icons/fi";

export function DashboardHeader() {
	const [notifications] = useState([
		{ id: 1, title: "Task completed", time: "2 min ago" },
		{ id: 2, title: "New project assigned", time: "1 hour ago" },
		{ id: 3, title: "Deadline reminder", time: "3 hours ago" },
	]);

	const handleLogout = () => {
		// TODO: Implement logout with NextAuth
		console.log("Logout clicked");
	};

	const handleNewProject = () => {
		// TODO: Open new project modal
		console.log("New project clicked");
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-14 items-center justify-between px-6">
				<div className="flex items-center space-x-4">
					<SidebarTrigger />
					<div className="hidden md:block">
						<h1 className="text-lg font-semibold">Dashboard</h1>
					</div>
				</div>

				<div className="flex items-center space-x-4">
					{/* New Project Button */}
					<Button onClick={handleNewProject} size="sm" className="hidden md:flex">
						<FiPlus className="h-4 w-4 mr-2" />
						New Project
					</Button>

					{/* Notifications */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="relative">
								<FiBell className="h-4 w-4" />
								{notifications.length > 0 && (
									<Badge 
										variant="destructive" 
										className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
									>
										{notifications.length}
									</Badge>
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-80">
							<DropdownMenuLabel>Notifications</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{notifications.map((notification) => (
								<DropdownMenuItem key={notification.id} className="flex flex-col items-start">
									<div className="font-medium">{notification.title}</div>
									<div className="text-xs text-muted-foreground">{notification.time}</div>
								</DropdownMenuItem>
							))}
							{notifications.length === 0 && (
								<DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Theme Toggle */}
					<Button variant="ghost" size="sm">
						<FiSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<FiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>

					{/* User Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage src="/placeholder-avatar.jpg" alt="User" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">John Doe</p>
									<p className="text-xs leading-none text-muted-foreground">
										john@example.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<FiUser className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<FiSettings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								<FiLogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
