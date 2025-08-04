"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FiHome, FiFolder, FiCheckSquare, FiCalendar, FiBarChart2, FiSettings, FiUser, FiCode } from "react-icons/fi";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";

const getMenuItems = (projectCount, taskCount) => [
	{
		title: "Overview",
		href: "/dashboard",
		icon: FiHome,
	},
	{
		title: "Projects",
		href: "/dashboard/projects",
		icon: FiFolder,
		badge: projectCount > 0 ? projectCount.toString() : null,
	},
	{
		title: "Tasks",
		href: "/dashboard/tasks",
		icon: FiCheckSquare,
		badge: taskCount > 0 ? taskCount.toString() : null,
	},
	{
		title: "Calendar",
		href: "/dashboard/calendar",
		icon: FiCalendar,
	},
	{
		title: "Analytics",
		href: "/dashboard/analytics",
		icon: FiBarChart2,
	},
];

const settingsItems = [
	{
		title: "Profile",
		href: "/dashboard/profile",
		icon: FiUser,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: FiSettings,
	},
];

export function DashboardSidebar() {
	const pathname = usePathname();
	const { data: session } = useSession();
	const { data: projects = [], isLoading: projectsLoading } = useProjects();
	const { data: tasks = [], isLoading: tasksLoading } = useTasks();

	// Calculate active counts
	const activeProjects = projects.filter((p) => p.status === "active" || p.status === "planning").length;
	const activeTasks = tasks.filter((t) => !t.completed && t.status !== "completed").length;

	const menuItems = getMenuItems(
		projectsLoading ? 0 : activeProjects || projects.length,
		tasksLoading ? 0 : activeTasks || tasks.length,
	);

	const getInitials = (name) => {
		return (
			name
				?.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase() || "U"
		);
	};

	return (
		<Sidebar className='w-64 border-r'>
			<SidebarHeader className='p-6'>
				<Link href="/">
					<div className='flex items-center space-x-2'>
						<div className='bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center'>
							<FiCode className='h-5 w-5 text-white' />
						</div>
						<span className='text-xl font-bold'>DevTrack</span>
					</div>
				</Link>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.href}
									>
										<Link
											href={item.href}
											className='flex items-center justify-between'
										>
											<div className='flex items-center space-x-3'>
												<item.icon className='h-4 w-4' />
												<span>{item.title}</span>
											</div>
											{item.badge && (
												<Badge
													variant='secondary'
													className='text-xs'
												>
													{item.badge}
												</Badge>
											)}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Account</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{settingsItems.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.href}
									>
										<Link
											href={item.href}
											className='flex items-center space-x-3'
										>
											<item.icon className='h-4 w-4' />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className='p-4'>
				<div className='flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800'>
					<Avatar className='h-8 w-8'>
						<AvatarImage
							src={session?.user?.image}
							alt='User'
						/>
						<AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
					</Avatar>
					<div className='flex-1 min-w-0'>
						<p className='text-sm font-medium truncate'>{session?.user?.name}</p>
						<p className='text-xs text-muted-foreground truncate'>{session?.user?.email}</p>
					</div>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
