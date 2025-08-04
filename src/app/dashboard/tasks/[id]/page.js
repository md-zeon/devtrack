"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useTask, useToggleTaskCompletion } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";
import EditTaskModal from "@/components/modals/EditTaskModal";
import { 
	ArrowLeft, 
	Edit3, 
	Calendar, 
	Clock, 
	Target, 
	Flag,
	CheckSquare,
	User,
	Loader
} from "lucide-react";
import {
	FiFlag,
	FiCalendar,
	FiClock,
	FiTarget,
	FiUser,
	FiCheckSquare,
	FiLoader,
	FiFolder
} from "react-icons/fi";

const getStatusColor = (status) => {
	switch (status?.toLowerCase()) {
		case 'in-progress':
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
		case 'review':
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
		case 'todo':
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
		case 'completed':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
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

const getStatusIcon = (status) => {
	switch (status?.toLowerCase()) {
		case 'completed':
			return '✓';
		case 'in-progress':
			return '⏳';
		case 'review':
			return '👀';
		default:
			return '📋';
	}
};

export default function TaskDetailPage() {
	const router = useRouter();
	const { id } = useParams();
	const { data: task, isLoading, error } = useTask(id);
	const { data: projects = [] } = useProjects();
	const toggleTaskCompletion = useToggleTaskCompletion();
	const [editModalOpen, setEditModalOpen] = useState(false);

	const project = task?.projectId ? projects.find(p => p._id === task.projectId) : null;

	const handleToggleComplete = () => {
		if (toggleTaskCompletion.isPending) return;
		
		toggleTaskCompletion.mutate({
			id: task._id,
			completed: !task.completed
		});
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Button variant="ghost" onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</Button>
					<h1 className="text-3xl font-bold tracking-tight">Task Details</h1>
				</div>
				<div className="flex items-center justify-center h-40">
					<FiLoader className="h-8 w-8 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (error || !task) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Button variant="ghost" onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</Button>
					<h1 className="text-3xl font-bold tracking-tight">Task Details</h1>
				</div>
				<Card className="p-6">
					<div className="text-center">
						<p className="text-red-600">
							{error ? `Error loading task: ${error.message}` : "Task not found"}
						</p>
						<Button onClick={() => router.push('/dashboard/tasks')} className="mt-4">
							Go to Tasks
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
	const timeSpentHours = Math.round((task.timeSpent || 0) / 60);
	const estimatedHours = Math.round((task.estimatedTime || 0) / 60);

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
						<h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
						<p className="text-muted-foreground mt-1">
							Created on {new Date(task.createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>
				<Button onClick={() => setEditModalOpen(true)}>
					<Edit3 className="w-4 h-4 mr-2" />
					Edit Task
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Task Overview */}
					<Card className="p-6">
						<div className="flex items-start space-x-4 mb-6">
							<Checkbox 
								checked={task.completed}
								onCheckedChange={handleToggleComplete}
								disabled={toggleTaskCompletion.isPending}
								className="mt-1"
							/>
							<div className="flex-1">
								<div className="flex items-center gap-3 mb-3">
									<h2 className={`text-2xl font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
										{task.title}
									</h2>
									<span className="text-2xl">{getStatusIcon(task.status)}</span>
								</div>
								
								<div className="flex flex-wrap items-center gap-2 mb-4">
									<Badge className={getStatusColor(task.status)}>
										{task.status}
									</Badge>
									<Badge className={getPriorityColor(task.priority)}>
										<FiFlag className="h-3 w-3 mr-1" />
										{task.priority} Priority
									</Badge>
									{project && (
										<Badge variant="outline" className="cursor-pointer" onClick={() => router.push(`/dashboard/projects/${project._id}`)}>
											<FiFolder className="h-3 w-3 mr-1" />
											{project.name}
										</Badge>
									)}
									{isOverdue && (
										<Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
											Overdue
										</Badge>
									)}
								</div>

								{task.description && (
									<div className="mb-6">
										<h3 className="font-medium mb-2">Description</h3>
										<p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
											{task.description}
										</p>
									</div>
								)}

								{/* Task Details Grid */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
									{task.dueDate && (
										<div className="flex items-center space-x-2">
											<FiCalendar className="h-4 w-4 text-muted-foreground" />
											<span className="text-muted-foreground">Due Date:</span>
											<span className={isOverdue ? 'text-red-600 font-medium' : ''}>
												{new Date(task.dueDate).toLocaleDateString()}
											</span>
										</div>
									)}
									
									{(task.timeSpent || task.estimatedTime) && (
										<div className="flex items-center space-x-2">
											<FiClock className="h-4 w-4 text-muted-foreground" />
											<span className="text-muted-foreground">Time:</span>
											<span>
												{timeSpentHours}h spent
												{estimatedHours > 0 && ` / ${estimatedHours}h estimated`}
											</span>
										</div>
									)}

									<div className="flex items-center space-x-2">
										<FiTarget className="h-4 w-4 text-muted-foreground" />
										<span className="text-muted-foreground">Status:</span>
										<span className="capitalize">{task.status.replace('-', ' ')}</span>
									</div>

									<div className="flex items-center space-x-2">
										<FiFlag className="h-4 w-4 text-muted-foreground" />
										<span className="text-muted-foreground">Priority:</span>
										<span className="capitalize">{task.priority}</span>
									</div>
								</div>

								{/* Tags */}
								{task.tags && task.tags.length > 0 && (
									<div className="mt-6">
										<h4 className="font-medium mb-2">Tags</h4>
										<div className="flex flex-wrap gap-2">
											{task.tags.map((tag, index) => (
												<Badge key={index} variant="outline" className="text-xs">
													#{tag}
												</Badge>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					</Card>

					{/* Progress Section */}
					{(task.timeSpent || task.estimatedTime) && (
						<Card className="p-6">
							<h3 className="font-semibold mb-4">Time Progress</h3>
							{task.estimatedTime && task.estimatedTime > 0 ? (
								<div>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm text-muted-foreground">Time Progress</span>
										<span className="text-sm font-medium">
											{Math.round((task.timeSpent || 0) / task.estimatedTime * 100)}%
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-3">
										<div 
											className={`h-3 rounded-full transition-all duration-300 ${
												(task.timeSpent || 0) > task.estimatedTime ? 'bg-red-500' : 'bg-blue-600'
											}`}
											style={{ 
												width: `${Math.min(((task.timeSpent || 0) / task.estimatedTime * 100), 100)}%` 
											}}
										></div>
									</div>
									<div className="flex justify-between text-xs text-muted-foreground mt-1">
										<span>{timeSpentHours}h spent</span>
										<span>{estimatedHours}h estimated</span>
									</div>
								</div>
							) : (
								<div className="text-center py-4">
									<FiClock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
									<p className="text-sm text-muted-foreground">
										{timeSpentHours > 0 
											? `${timeSpentHours} hours logged`
											: "No time logged yet"
										}
									</p>
								</div>
							)}
						</Card>
					)}
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Quick Actions */}
					<Card className="p-6">
						<h3 className="font-semibold mb-4">Quick Actions</h3>
						<div className="space-y-3">
							<Button 
								variant="outline" 
								className="w-full justify-start"
								onClick={handleToggleComplete}
								disabled={toggleTaskCompletion.isPending}
							>
								<CheckSquare className="h-4 w-4 mr-2" />
								{task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
							</Button>
							<Button 
								variant="outline" 
								className="w-full justify-start"
								onClick={() => setEditModalOpen(true)}
							>
								<Edit3 className="h-4 w-4 mr-2" />
								Edit Task
							</Button>
							{project && (
								<Button 
									variant="outline" 
									className="w-full justify-start"
									onClick={() => router.push(`/dashboard/projects/${project._id}`)}
								>
									<FiFolder className="h-4 w-4 mr-2" />
									View Project
								</Button>
							)}
						</div>
					</Card>

					{/* Task Info */}
					<Card className="p-6">
						<h3 className="font-semibold mb-4">Task Information</h3>
						<div className="space-y-3 text-sm">
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Created</span>
								<span>{new Date(task.createdAt).toLocaleDateString()}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Last Updated</span>
								<span>{new Date(task.updatedAt || task.createdAt).toLocaleDateString()}</span>
							</div>
							{task.completed && task.completedAt && (
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Completed</span>
									<span>{new Date(task.completedAt).toLocaleDateString()}</span>
								</div>
							)}
							<Separator />
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Status</span>
								<Badge className={getStatusColor(task.status)} variant="outline">
									{task.status}
								</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Priority</span>
								<Badge className={getPriorityColor(task.priority)} variant="outline">
									{task.priority}
								</Badge>
							</div>
						</div>
					</Card>

					{/* Project Info */}
					{project && (
						<Card className="p-6">
							<h3 className="font-semibold mb-4">Project</h3>
							<div 
								className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
								onClick={() => router.push(`/dashboard/projects/${project._id}`)}
							>
								<div className="flex items-center space-x-2 mb-2">
									<FiFolder className="h-4 w-4 text-blue-600" />
									<span className="font-medium">{project.name}</span>
								</div>
								<p className="text-xs text-muted-foreground">
									{project.description || 'No description'}
								</p>
								<div className="flex items-center gap-2 mt-2">
									<Badge variant="outline" className="text-xs">
										{project.status}
									</Badge>
									<Badge variant="outline" className="text-xs">
										{project.priority} Priority
									</Badge>
								</div>
							</div>
						</Card>
					)}
				</div>
			</div>

			{/* Edit Modal */}
			{editModalOpen && (
				<EditTaskModal 
					taskId={id}
					open={editModalOpen}
					onOpenChange={setEditModalOpen}
				/>
			)}
		</div>
	);
}
