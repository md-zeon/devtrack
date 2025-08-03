"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	FiFolder,
	FiCheckSquare,
	FiClock,
	FiTrendingUp,
	FiPlus,
	FiActivity,
	FiCalendar,
	FiMoreHorizontal,
} from "react-icons/fi";

// Mock data
const stats = [
	{
		title: "Total Projects",
		value: "12",
		change: "+2 this month",
		icon: FiFolder,
		color: "text-blue-600",
		bgColor: "bg-blue-100",
	},
	{
		title: "Active Tasks",
		value: "48",
		change: "+12 this week",
		icon: FiCheckSquare,
		color: "text-green-600",
		bgColor: "bg-green-100",
	},
	{
		title: "Hours Logged",
		value: "156",
		change: "+24 this week",
		icon: FiClock,
		color: "text-purple-600",
		bgColor: "bg-purple-100",
	},
	{
		title: "Completion Rate",
		value: "87%",
		change: "+5% vs last month",
		icon: FiTrendingUp,
		color: "text-orange-600",
		bgColor: "bg-orange-100",
	},
];

const recentProjects = [
	{
		id: 1,
		name: "E-commerce Platform",
		status: "In Progress",
		progress: 75,
		dueDate: "Dec 15, 2024",
		tasks: { completed: 12, total: 16 },
	},
	{
		id: 2,
		name: "Mobile App Redesign",
		status: "Review",
		progress: 90,
		dueDate: "Dec 10, 2024",
		tasks: { completed: 18, total: 20 },
	},
	{
		id: 3,
		name: "API Documentation",
		status: "Planning",
		progress: 25,
		dueDate: "Dec 20, 2024",
		tasks: { completed: 2, total: 8 },
	},
];

const recentActivity = [
	{
		id: 1,
		action: "Completed task",
		target: "Setup payment gateway",
		project: "E-commerce Platform",
		time: "2 hours ago",
	},
	{
		id: 2,
		action: "Created project",
		target: "Blog System",
		time: "1 day ago",
	},
	{
		id: 3,
		action: "Updated task",
		target: "User authentication",
		project: "Mobile App",
		time: "2 days ago",
	},
	{
		id: 4,
		action: "Completed milestone",
		target: "MVP Release",
		project: "E-commerce Platform",
		time: "3 days ago",
	},
];

const getStatusColor = (status) => {
	switch (status.toLowerCase()) {
		case "in progress":
			return "bg-blue-100 text-blue-800";
		case "review":
			return "bg-yellow-100 text-yellow-800";
		case "planning":
			return "bg-gray-100 text-gray-800";
		case "completed":
			return "bg-green-100 text-green-800";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

export default function Dashboard() {
	return (
		<div className='space-y-6'>
			{/* Welcome Section */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Welcome back, John! 👋</h1>
					<p className='text-muted-foreground mt-2'>Here&apos;s an overview of your projects and tasks.</p>
				</div>
				<div className='flex items-center space-x-2 mt-4 md:mt-0'>
					<Button>
						<FiPlus className='h-4 w-4 mr-2' />
						New Project
					</Button>
				</div>
			</div>

			{/* Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{stats.map((stat, index) => (
					<Card
						key={index}
						className='p-6'
					>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm text-muted-foreground'>{stat.title}</p>
								<p className='text-2xl font-bold'>{stat.value}</p>
								<p className='text-xs text-green-600 mt-1'>{stat.change}</p>
							</div>
							<div className={`p-3 rounded-lg ${stat.bgColor}`}>
								<stat.icon className={`h-6 w-6 ${stat.color}`} />
							</div>
						</div>
					</Card>
				))}
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Recent Projects */}
				<Card className='p-6'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-xl font-semibold'>Recent Projects</h2>
						<Button
							variant='ghost'
							size='sm'
						>
							View All
						</Button>
					</div>
					<div className='space-y-4'>
						{recentProjects.map((project) => (
							<div
								key={project.id}
								className='flex items-center justify-between p-4 border rounded-lg'
							>
								<div className='flex-1'>
									<div className='flex items-center justify-between mb-2'>
										<h3 className='font-medium'>{project.name}</h3>
										<Badge className={getStatusColor(project.status)}>{project.status}</Badge>
									</div>
									<div className='flex items-center justify-between text-sm text-muted-foreground'>
										<span>
											{project.tasks.completed}/{project.tasks.total} tasks completed
										</span>
										<span className='flex items-center'>
											<FiCalendar className='h-3 w-3 mr-1' />
											{project.dueDate}
										</span>
									</div>
									<div className='mt-3'>
										<div className='flex items-center justify-between text-xs mb-1'>
											<span>Progress</span>
											<span>{project.progress}%</span>
										</div>
										<div className='w-full bg-gray-200 rounded-full h-2'>
											<div
												className='bg-blue-600 h-2 rounded-full'
												style={{ width: `${project.progress}%` }}
											></div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</Card>

				{/* Recent Activity */}
				<Card className='p-6'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-xl font-semibold'>Recent Activity</h2>
						<Button
							variant='ghost'
							size='sm'
						>
							<FiActivity className='h-4 w-4' />
						</Button>
					</div>
					<div className='space-y-4'>
						{recentActivity.map((activity) => (
							<div
								key={activity.id}
								className='flex items-start space-x-3'
							>
								<div className='bg-blue-100 p-2 rounded-full'>
									<FiActivity className='h-3 w-3 text-blue-600' />
								</div>
								<div className='flex-1'>
									<p className='text-sm'>
										<span className='font-medium'>{activity.action}</span>{" "}
										<span className='text-blue-600'>{activity.target}</span>
										{activity.project && <span className='text-muted-foreground'> in {activity.project}</span>}
									</p>
									<p className='text-xs text-muted-foreground'>{activity.time}</p>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card className='p-6'>
				<h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<Button
						variant='outline'
						className='h-20 flex flex-col items-center justify-center'
					>
						<FiFolder className='h-6 w-6 mb-2' />
						<span>Create Project</span>
					</Button>
					<Button
						variant='outline'
						className='h-20 flex flex-col items-center justify-center'
					>
						<FiCheckSquare className='h-6 w-6 mb-2' />
						<span>Add Task</span>
					</Button>
					<Button
						variant='outline'
						className='h-20 flex flex-col items-center justify-center'
					>
						<FiCalendar className='h-6 w-6 mb-2' />
						<span>Schedule Meeting</span>
					</Button>
				</div>
			</Card>
		</div>
	);
}
