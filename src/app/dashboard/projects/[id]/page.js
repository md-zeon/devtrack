"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProject } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import EditProjectModal from "@/components/modals/EditProjectModal";
import { 
	ArrowLeft, 
	Edit3, 
	Calendar, 
	Clock, 
	Target, 
	Users, 
	CheckSquare,
	TrendingUp,
	Loader
} from "lucide-react";
import {
	FiFolder,
	FiCalendar,
	FiClock,
	FiTarget,
	FiUsers,
	FiCheckSquare,
	FiLoader
} from "react-icons/fi";

const getStatusColor = (status) => {
	switch (status?.toLowerCase()) {
		case 'active':
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
		case 'planning':
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
		case 'completed':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
		case 'on-hold':
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
		default:
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
	}
};

const getPriorityColor = (priority) => {
	switch (priority?.toLowerCase()) {
		case 'high':
			return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
		case 'medium':
			return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
		case 'low':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
		case 'urgent':
			return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
		default:
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
	}
};

export default function ProjectDetailPage({ params }) {
	const router = useRouter();
	const { id } = params;
	const { data: project, isLoading, error } = useProject(id);
	const { data: allTasks = [] } = useTasks();
	const [editModalOpen, setEditModalOpen] = useState(false);

	// Filter tasks for this project
	const projectTasks = allTasks.filter(task => task.projectId === id);
	const completedTasks = projectTasks.filter(task => task.completed || task.status === 'completed');

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Button variant="ghost" onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</Button>
					<h1 className="text-3xl font-bold tracking-tight">Project Details</h1>
				</div>
				<div className="flex items-center justify-center h-40">
					<FiLoader className="h-8 w-8 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (error || !project) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Button variant="ghost" onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</Button>
					<h1 className="text-3xl font-bold tracking-tight">Project Details</h1>
				</div>
				<Card className="p-6">
					<div className="text-center">
						<p className="text-red-600">
							{error ? `Error loading project: ${error.message}` : "Project not found"}
						</p>
						<Button onClick={() => router.push('/dashboard/projects')} className="mt-4">
							Go to Projects
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	const progressPercentage = projectTasks.length > 0 
		? Math.round((completedTasks.length / projectTasks.length) * 100) 
		: 0;

	const totalTimeSpent = projectTasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-4">
					<Button variant="ghost" onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</Button>
					<div>
						<h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
						<p className="text-muted-foreground mt-1">
							Created on {new Date(project.createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>
				<Button onClick={() => setEditModalOpen(true)}>
					<Edit3 className="w-4 h-4 mr-2" />
					Edit Project
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Project Overview */}
					<Card className="p-6">
						<div className="flex items-start justify-between mb-6">
							<div className="flex items-center space-x-3">
								<div className="bg-blue-100 p-3 rounded-lg">
									<FiFolder className="h-6 w-6 text-blue-600" />
								</div>
								<div>
									<h2 className="text-2xl font-semibold">{project.name}</h2>
									<div className="flex items-center gap-2 mt-2">
										<Badge className={getStatusColor(project.status)}>
											{project.status}
										</Badge>
										<Badge className={getPriorityColor(project.priority)}>
											{project.priority} Priority
										</Badge>
									</div>
								</div>
							</div>
						</div>

						{project.description && (
							<div className="mb-6">
								<h3 className="font-medium mb-2">Description</h3>
								<p className="text-muted-foreground leading-relaxed">
									{project.description}
								</p>
							</div>
						)}

						{/* Progress Section */}
						<div className="mb-6">
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-medium">Progress</h3>
								<span className="text-sm font-medium">{progressPercentage}%</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-3">
								<div 
									className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
									style={{ width: `${progressPercentage}%` }}
								></div>
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{completedTasks.length} of {projectTasks.length} tasks completed
							</p>
						</div>

						{/* Project Dates */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{project.startDate && (
								<div className="flex items-center space-x-2 text-sm">
									<FiCalendar className="h-4 w-4 text-muted-foreground" />
									<span className="text-muted-foreground">Start Date:</span>
									<span>{new Date(project.startDate).toLocaleDateString()}</span>
								</div>
							)}
							{project.endDate && (
								<div className="flex items-center space-x-2 text-sm">
									<FiTarget className="h-4 w-4 text-muted-foreground" />
									<span className="text-muted-foreground">Due Date:</span>
									<span>{new Date(project.endDate).toLocaleDateString()}</span>
								</div>
							)}
						</div>
					</Card>

					{/* Project Tasks */}
					<Card className="p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-xl font-semibold">Tasks ({projectTasks.length})</h3>
							<Button 
								variant="outline" 
								size="sm"
								onClick={() => router.push('/dashboard/tasks')}
							>
								View All Tasks
							</Button>
						</div>
						
						{projectTasks.length > 0 ? (
							<div className="space-y-3">
								{projectTasks.slice(0, 5).map((task) => (
									<div 
										key={task._id} 
										className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
										onClick={() => router.push(`/dashboard/tasks/${task._id}`)}
									>
										<div className="flex items-center space-x-3">
											<div className={`w-3 h-3 rounded-full ${
												task.completed ? 'bg-green-500' : 'bg-gray-300'
											}`} />
											<div>
												<p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
													{task.title}
												</p>
												<p className="text-xs text-muted-foreground">
													{task.status} • {task.priority} priority
												</p>
											</div>
										</div>
										{task.dueDate && (
											<div className="text-xs text-muted-foreground">
												Due: {new Date(task.dueDate).toLocaleDateString()}
											</div>
										)}
									</div>
								))}
								{projectTasks.length > 5 && (
									<p className="text-sm text-muted-foreground text-center pt-2">
										And {projectTasks.length - 5} more tasks...
									</p>
								)}
							</div>
						) : (
							<div className="text-center py-8">
								<FiCheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
								<p className="text-muted-foreground">No tasks created yet</p>
								<Button 
									variant="outline" 
									size="sm" 
									className="mt-2"
									onClick={() => router.push('/dashboard/tasks')}
								>
									Create First Task
								</Button>
							</div>
						)}
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Quick Stats */}
					<Card className="p-6">
						<h3 className="font-semibold mb-4">Quick Stats</h3>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<FiCheckSquare className="h-4 w-4 text-green-600" />
									<span className="text-sm">Tasks Completed</span>
								</div>
								<span className="font-semibold">{completedTasks.length}</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<FiTarget className="h-4 w-4 text-blue-600" />
									<span className="text-sm">Total Tasks</span>
								</div>
								<span className="font-semibold">{projectTasks.length}</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<FiClock className="h-4 w-4 text-purple-600" />
									<span className="text-sm">Time Spent</span>
								</div>
								<span className="font-semibold">{Math.round(totalTimeSpent / 60)}h</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<TrendingUp className="h-4 w-4 text-orange-600" />
									<span className="text-sm">Success Rate</span>
								</div>
								<span className="font-semibold">{progressPercentage}%</span>
							</div>
						</div>
					</Card>

					{/* Project Timeline */}
					<Card className="p-6">
						<h3 className="font-semibold mb-4">Timeline</h3>
						<div className="space-y-3 text-sm">
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Created</span>
								<span>{new Date(project.createdAt).toLocaleDateString()}</span>
							</div>
							{project.startDate && (
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Started</span>
									<span>{new Date(project.startDate).toLocaleDateString()}</span>
								</div>
							)}
							{project.endDate && (
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Due Date</span>
									<span>{new Date(project.endDate).toLocaleDateString()}</span>
								</div>
							)}
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Last Updated</span>
								<span>{new Date(project.updatedAt || project.createdAt).toLocaleDateString()}</span>
							</div>
						</div>
					</Card>
				</div>
			</div>

			{/* Edit Modal */}
			{editModalOpen && (
				<EditProjectModal 
					projectId={id}
					open={editModalOpen}
					onOpenChange={setEditModalOpen}
				/>
			)}
		</div>
	);
}
