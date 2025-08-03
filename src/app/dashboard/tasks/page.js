"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTasks, useDeleteTask, useToggleTaskCompletion } from "@/hooks/useTasks";
import CreateTaskModal from "@/components/modals/CreateTaskModal";
import EditTaskModal from "@/components/modals/EditTaskModal";
import {
	FiPlus,
	FiSearch,
	FiFilter,
	FiMoreVertical,
	FiEdit3,
	FiTrash2,
	FiCalendar,
	FiFlag,
	FiClock,
	FiCheckSquare,
	FiLoader
} from "react-icons/fi";

const getStatusColor = (status) => {
	switch (status?.toLowerCase()) {
		case 'in progress':
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
		default:
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
	}
};

export default function TasksPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [showCompleted, setShowCompleted] = useState(true);
	const [editingTaskId, setEditingTaskId] = useState(null);

	const { data: tasks, isLoading, error } = useTasks();
	const deleteTask = useDeleteTask();
	const toggleTaskCompletion = useToggleTaskCompletion();

	const filteredTasks = tasks?.filter(task => {
		const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			task.project?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = filterStatus === "all" || 
			task.status.toLowerCase() === filterStatus.toLowerCase();
		const showTask = showCompleted || !task.completed;
		return matchesSearch && matchesStatus && showTask;
	}) || [];

	const handleCreateTask = () => {
		// This is now handled by the CreateTaskModal component
	};

	const handleEditTask = (taskId) => {
		setEditingTaskId(taskId);
	};

	const handleDeleteTask = (taskId) => {
		if (confirm("Are you sure you want to delete this task?")) {
			deleteTask.mutate(taskId);
		}
	};

	const handleToggleComplete = (taskId, currentStatus) => {
		toggleTaskCompletion.mutate({
			id: taskId,
			completed: !currentStatus
		});
	};

	const getStatusIcon = (status) => {
		switch (status?.toLowerCase()) {
			case 'completed':
				return '✓';
			case 'in progress':
				return '⏳';
			case 'review':
				return '👀';
			default:
				return '📋';
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
						<p className="text-muted-foreground mt-2">
							Manage and track all your development tasks across projects.
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center h-40">
					<FiLoader className="h-8 w-8 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="space-y-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
						<p className="text-muted-foreground mt-2">
							Manage and track all your development tasks across projects.
						</p>
					</div>
				</div>
				<Card className="p-6">
					<div className="text-center">
						<p className="text-red-600">Error loading tasks: {error.message}</p>
						<Button onClick={() => window.location.reload()} className="mt-4">
							Retry
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
					<p className="text-muted-foreground mt-2">
						Manage and track all your development tasks across projects.
					</p>
				</div>
				<CreateTaskModal />
			</div>

			{/* Search and Filters */}
			<div className="flex flex-col md:flex-row gap-4">
				<div className="relative flex-1">
					<FiSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search tasks..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-9"
					/>
				</div>
				<div className="flex gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								<FiFilter className="h-4 w-4 mr-2" />
								Filter: {filterStatus === "all" ? "All" : filterStatus}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => setFilterStatus("all")}>
								All Status
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("todo")}>
								Todo
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("in progress")}>
								In Progress
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("review")}>
								Review
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("completed")}>
								Completed
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<div className="flex items-center space-x-2">
						<Checkbox 
							id="show-completed"
							checked={showCompleted}
							onCheckedChange={setShowCompleted}
						/>
						<label htmlFor="show-completed" className="text-sm">
							Show completed
						</label>
					</div>
				</div>
			</div>

			{/* Tasks List */}
			<div className="space-y-4">
				{filteredTasks.map((task) => (
					<Card key={task._id} className={`p-6 hover:shadow-lg transition-all ${task.completed ? 'opacity-60' : ''}`}>
						<div className="flex items-start justify-between">
							<div className="flex items-start space-x-4 flex-1">
								<Checkbox 
									checked={task.completed}
									onCheckedChange={() => handleToggleComplete(task._id, task.completed)}
									className="mt-1"
								/>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-2">
										<h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
											{task.title}
										</h3>
										<span className="text-lg">{getStatusIcon(task.status)}</span>
									</div>
									{task.description && (
										<p className="text-sm text-muted-foreground mb-3 line-clamp-2">
											{task.description}
										</p>
									)}
									
									<div className="flex flex-wrap items-center gap-2 mb-3">
										<Badge className={getStatusColor(task.status)}>
											{task.status}
										</Badge>
										<Badge className={getPriorityColor(task.priority)}>
											<FiFlag className="h-3 w-3 mr-1" />
											{task.priority}
										</Badge>
										{task.project && (
											<Badge variant="outline">
												{task.project}
											</Badge>
										)}
									</div>

									<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
										{task.dueDate && (
											<div className="flex items-center">
												<FiCalendar className="h-4 w-4 mr-1" />
												<span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
											</div>
										)}
										{(task.timeSpent || task.estimatedTime) && (
											<div className="flex items-center">
												<FiClock className="h-4 w-4 mr-1" />
												<span>
													{Math.round((task.timeSpent || 0) / 60)}h
													{task.estimatedTime && ` / ${Math.round(task.estimatedTime / 60)}h`}
												</span>
											</div>
										)}
										<div className="flex items-center">
											<span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
										</div>
									</div>

									{task.tags && task.tags.length > 0 && (
										<div className="flex flex-wrap gap-1 mt-3">
											{task.tags.map((tag, index) => (
												<Badge key={index} variant="outline" className="text-xs">
													#{tag}
												</Badge>
											))}
										</div>
									)}
								</div>
							</div>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="sm">
										<FiMoreVertical className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => handleEditTask(task._id)}>
										<FiEdit3 className="h-4 w-4 mr-2" />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem 
										onClick={() => handleDeleteTask(task._id)}
										className="text-red-600"
									>
										<FiTrash2 className="h-4 w-4 mr-2" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</Card>
				))}
			</div>

			{filteredTasks.length === 0 && (
				<div className="text-center py-12">
					<FiCheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
					<h3 className="text-lg font-medium mb-2">No tasks found</h3>
					<p className="text-muted-foreground mb-4">
						{searchTerm ? "Try adjusting your search terms" : "Get started by creating your first task"}
					</p>
					{!searchTerm && <CreateTaskModal />}
				</div>
			)}
			
			{/* Edit Task Modal */}
			{editingTaskId && (
				<EditTaskModal 
					taskId={editingTaskId}
					open={!!editingTaskId}
					onOpenChange={(open) => !open && setEditingTaskId(null)}
				/>
			)}
		</div>
	);
}
