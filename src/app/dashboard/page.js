"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useProfile } from "@/hooks/useProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
	FiFolder,
	FiCheckSquare,
	FiClock,
	FiTrendingUp,
	FiPlus,
	FiActivity,
	FiCalendar,
	FiLoader
} from "react-icons/fi";

const getStatusColor = (status) => {
	switch (status?.toLowerCase()) {
		case 'in progress':
			return 'bg-blue-100 text-blue-800';
		case 'review':
			return 'bg-yellow-100 text-yellow-800';
		case 'planning':
			return 'bg-gray-100 text-gray-800';
		case 'completed':
			return 'bg-green-100 text-green-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};

function LoadingCard() {
	return (
		<Card className="p-6">
			<div className="flex items-center justify-between">
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
					<div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
					<div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
				</div>
				<div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
			</div>
		</Card>
	);
}

export default function Dashboard() {
	const { data: session } = useSession();
	const router = useRouter();
	const { data: projects, isLoading: projectsLoading } = useProjects();
	const { data: tasks, isLoading: tasksLoading } = useTasks();

	// Calculate statistics from real data
	const stats = [
		{
			title: "Total Projects",
			value: projects?.length || 0,
			change: "+2 this month", // TODO: Calculate real change
			icon: FiFolder,
			color: "text-blue-600",
			bgColor: "bg-blue-100"
		},
		{
			title: "Active Tasks",
			value: tasks?.filter(task => !task.completed).length || 0,
			change: `+${tasks?.filter(task => {
				const createdDate = new Date(task.createdAt);
				const weekAgo = new Date();
				weekAgo.setDate(weekAgo.getDate() - 7);
				return createdDate > weekAgo;
			}).length || 0} this week`,
			icon: FiCheckSquare,
			color: "text-green-600",
			bgColor: "bg-green-100"
		},
		{
			title: "Hours Logged",
			value: Math.round((tasks?.reduce((total, task) => total + (task.timeSpent || 0), 0) || 0) / 60),
			change: "+24 this week", // TODO: Calculate real change
			icon: FiClock,
			color: "text-purple-600",
			bgColor: "bg-purple-100"
		},
		{
			title: "Completion Rate",
			value: tasks?.length > 0 ? `${Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100)}%` : "0%",
			change: "+5% vs last month", // TODO: Calculate real change
			icon: FiTrendingUp,
			color: "text-orange-600",
			bgColor: "bg-orange-100"
		}
	];

	// Get recent projects (limit to 3)
	const recentProjects = projects?.slice(0, 3) || [];

	// Get recent activity from tasks
	const recentActivity = tasks?.slice(0, 4).map(task => ({
		id: task._id,
		action: task.completed ? "Completed task" : "Updated task",
		target: task.title,
		project: task.project,
		time: new Date(task.updatedAt).toLocaleDateString()
	})) || [];

	const handleNewProject = () => {
		router.push("/dashboard/projects?new=true");
	};

	const handleNewTask = () => {
		router.push("/dashboard/tasks?new=true");
	};

	if (projectsLoading || tasksLoading) {
		return (
			<div className="space-y-6">
				{/* Welcome Section */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Welcome back, {session?.user?.name?.split(' ')[0]}!</h1>
						<p className="text-muted-foreground mt-2">
							Here&apos;s an overview of your projects and tasks.
						</p>
					</div>
				</div>

				{/* Loading Stats */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{[...Array(4)].map((_, i) => <LoadingCard key={i} />)}
				</div>

				{/* Loading Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card className="p-6">
						<div className="flex items-center justify-center h-40">
							<FiLoader className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					</Card>
					<Card className="p-6">
						<div className="flex items-center justify-center h-40">
							<FiLoader className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Welcome Section */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Welcome back, {session?.user?.name?.split(' ')[0]}!</h1>
					<p className="text-muted-foreground mt-2">
						Here&apos;s an overview of your projects and tasks.
					</p>
				</div>
				<div className="flex items-center space-x-2 mt-4 md:mt-0">
					<Button onClick={handleNewProject}>
						<FiPlus className="h-4 w-4 mr-2" />
						New Project
					</Button>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<Card key={index} className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">{stat.title}</p>
								<p className="text-2xl font-bold">{stat.value}</p>
								<p className="text-xs text-green-600 mt-1">{stat.change}</p>
							</div>
							<div className={`p-3 rounded-lg ${stat.bgColor}`}>
								<stat.icon className={`h-6 w-6 ${stat.color}`} />
							</div>
						</div>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Projects */}
				<Card className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold">Recent Projects</h2>
						<Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/projects")}>
							View All
						</Button>
					</div>
					<div className="space-y-4">
						{recentProjects.length > 0 ? (
							recentProjects.map((project) => (
								<div key={project._id} className="flex items-center justify-between p-4 border rounded-lg">
									<div className="flex-1">
										<div className="flex items-center justify-between mb-2">
											<h3 className="font-medium">{project.name}</h3>
											<Badge className={getStatusColor(project.status)}>
												{project.status}
											</Badge>
										</div>
										<div className="flex items-center justify-between text-sm text-muted-foreground">
											<span>
												{project.completedTasks}/{project.totalTasks} tasks completed
											</span>
											<span className="flex items-center">
												<FiCalendar className="h-3 w-3 mr-1" />
												{project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "No deadline"}
											</span>
										</div>
										<div className="mt-3">
											<div className="flex items-center justify-between text-xs mb-1">
												<span>Progress</span>
												<span>{project.progress}%</span>
											</div>
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div 
													className="bg-blue-600 h-2 rounded-full" 
													style={{ width: `${project.progress}%` }}
												></div>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-8">
								<FiFolder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
								<p className="text-muted-foreground">No projects yet</p>
								<Button onClick={handleNewProject} className="mt-2">
									<FiPlus className="h-4 w-4 mr-2" />
									Create Your First Project
								</Button>
							</div>
						)}
					</div>
				</Card>

				{/* Recent Activity */}
				<Card className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold">Recent Activity</h2>
						<Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/tasks")}>
							<FiActivity className="h-4 w-4" />
						</Button>
					</div>
					<div className="space-y-4">
						{recentActivity.length > 0 ? (
							recentActivity.map((activity) => (
								<div key={activity.id} className="flex items-start space-x-3">
									<div className="bg-blue-100 p-2 rounded-full">
										<FiActivity className="h-3 w-3 text-blue-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm">
											<span className="font-medium">{activity.action}</span>{" "}
											<span className="text-blue-600">{activity.target}</span>
											{activity.project && (
												<span className="text-muted-foreground"> in {activity.project}</span>
											)}
										</p>
										<p className="text-xs text-muted-foreground">{activity.time}</p>
									</div>
								</div>
							))
						) : (
							<div className="text-center py-8">
								<FiActivity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
								<p className="text-muted-foreground">No recent activity</p>
							</div>
						)}
					</div>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card className="p-6">
				<h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={handleNewProject}>
						<FiFolder className="h-6 w-6 mb-2" />
						<span>Create Project</span>
					</Button>
					<Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={handleNewTask}>
						<FiCheckSquare className="h-6 w-6 mb-2" />
						<span>Add Task</span>
					</Button>
					<Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => router.push("/dashboard/calendar")}>
						<FiCalendar className="h-6 w-6 mb-2" />
						<span>View Calendar</span>
					</Button>
				</div>
			</Card>
		</div>
	);
}
