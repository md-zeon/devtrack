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
} from "react-icons/fi";

// Mock data
const tasks = [
	{
		id: 1,
		title: "Setup payment gateway integration",
		description: "Integrate Stripe payment system with checkout flow",
		status: "In Progress",
		priority: "High",
		project: "E-commerce Platform",
		dueDate: "Dec 12, 2024",
		createdDate: "Dec 5, 2024",
		completed: false,
		estimatedTime: "8h",
		timeSpent: "5h",
		assignee: "John Doe",
		tags: ["backend", "payment", "api"],
	},
	{
		id: 2,
		title: "Design user profile page",
		description: "Create responsive user profile page with edit functionality",
		status: "Review",
		priority: "Medium",
		project: "Mobile App Redesign",
		dueDate: "Dec 8, 2024",
		createdDate: "Dec 1, 2024",
		completed: false,
		estimatedTime: "6h",
		timeSpent: "6h",
		assignee: "Jane Smith",
		tags: ["design", "frontend", "ui"],
	},
	{
		id: 3,
		title: "Write API endpoint documentation",
		description: "Document all REST API endpoints with examples",
		status: "Todo",
		priority: "Low",
		project: "API Documentation",
		dueDate: "Dec 18, 2024",
		createdDate: "Dec 3, 2024",
		completed: false,
		estimatedTime: "4h",
		timeSpent: "1h",
		assignee: "John Doe",
		tags: ["documentation", "api"],
	},
	{
		id: 4,
		title: "Implement user authentication",
		description: "Add JWT-based authentication system",
		status: "Completed",
		priority: "High",
		project: "E-commerce Platform",
		dueDate: "Nov 30, 2024",
		createdDate: "Nov 25, 2024",
		completed: true,
		estimatedTime: "12h",
		timeSpent: "10h",
		assignee: "John Doe",
		tags: ["backend", "auth", "security"],
	},
	{
		id: 5,
		title: "Create responsive navigation menu",
		description: "Build mobile-first navigation with hamburger menu",
		status: "In Progress",
		priority: "Medium",
		project: "Blog System",
		dueDate: "Dec 15, 2024",
		createdDate: "Dec 2, 2024",
		completed: false,
		estimatedTime: "3h",
		timeSpent: "2h",
		assignee: "Mike Johnson",
		tags: ["frontend", "responsive", "ui"],
	},
	{
		id: 6,
		title: "Setup database schema",
		description: "Design and implement PostgreSQL database schema",
		status: "Todo",
		priority: "High",
		project: "Blog System",
		dueDate: "Dec 10, 2024",
		createdDate: "Dec 6, 2024",
		completed: false,
		estimatedTime: "5h",
		timeSpent: "0h",
		assignee: "John Doe",
		tags: ["database", "backend", "schema"],
	},
	{
		id: 7,
		title: "Optimize image loading",
		description: "Implement lazy loading and image optimization",
		status: "Review",
		priority: "Low",
		project: "Portfolio Website",
		dueDate: "Dec 20, 2024",
		createdDate: "Dec 4, 2024",
		completed: false,
		estimatedTime: "2h",
		timeSpent: "2h",
		assignee: "John Doe",
		tags: ["performance", "frontend", "optimization"],
	},
	{
		id: 8,
		title: "Write unit tests",
		description: "Add comprehensive unit tests for core functions",
		status: "Todo",
		priority: "Medium",
		project: "E-commerce Platform",
		dueDate: "Dec 22, 2024",
		createdDate: "Dec 7, 2024",
		completed: false,
		estimatedTime: "6h",
		timeSpent: "0h",
		assignee: "Sarah Wilson",
		tags: ["testing", "backend", "quality"],
	},
];

const getStatusColor = (status) => {
	switch (status.toLowerCase()) {
		case "in progress":
			return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
		case "review":
			return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
		case "todo":
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
		case "completed":
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	}
};

const getPriorityColor = (priority) => {
	switch (priority.toLowerCase()) {
		case "high":
			return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
		case "medium":
			return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
		case "low":
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	}
};

export default function TasksPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [showCompleted, setShowCompleted] = useState(true);

	const filteredTasks = tasks.filter((task) => {
		const matchesSearch =
			task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			task.project.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = filterStatus === "all" || task.status.toLowerCase() === filterStatus.toLowerCase();
		const showTask = showCompleted || !task.completed;
		return matchesSearch && matchesStatus && showTask;
	});

	const handleCreateTask = () => {
		// TODO: Open create task modal
		console.log("Create task clicked");
	};

	const handleEditTask = (taskId) => {
		// TODO: Open edit task modal
		console.log("Edit task:", taskId);
	};

	const handleDeleteTask = (taskId) => {
		// TODO: Implement delete task
		console.log("Delete task:", taskId);
	};

	const handleToggleComplete = (taskId) => {
		// TODO: Toggle task completion
		console.log("Toggle task completion:", taskId);
	};

	const getStatusIcon = (status) => {
		switch (status.toLowerCase()) {
			case "completed":
				return "✓";
			case "in progress":
				return "⏳";
			case "review":
				return "👀";
			default:
				return "📋";
		}
	};

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Tasks</h1>
					<p className='text-muted-foreground mt-2'>Manage and track all your development tasks across projects.</p>
				</div>
				<Button
					onClick={handleCreateTask}
					className='mt-4 md:mt-0'
				>
					<FiPlus className='h-4 w-4 mr-2' />
					New Task
				</Button>
			</div>

			{/* Search and Filters */}
			<div className='flex flex-col md:flex-row gap-4'>
				<div className='relative flex-1'>
					<FiSearch className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Search tasks...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='pl-9'
					/>
				</div>
				<div className='flex gap-2'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>
								<FiFilter className='h-4 w-4 mr-2' />
								Filter: {filterStatus === "all" ? "All" : filterStatus}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("todo")}>Todo</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("in progress")}>In Progress</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("review")}>Review</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setFilterStatus("completed")}>Completed</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='show-completed'
							checked={showCompleted}
							onCheckedChange={setShowCompleted}
						/>
						<label
							htmlFor='show-completed'
							className='text-sm'
						>
							Show completed
						</label>
					</div>
				</div>
			</div>

			{/* Tasks List */}
			<div className='space-y-4'>
				{filteredTasks.map((task) => (
					<Card
						key={task.id}
						className={`p-6 hover:shadow-lg transition-all ${task.completed ? "opacity-60" : ""}`}
					>
						<div className='flex items-start justify-between'>
							<div className='flex items-start space-x-4 flex-1'>
								<Checkbox
									checked={task.completed}
									onCheckedChange={() => handleToggleComplete(task.id)}
									className='mt-1'
								/>
								<div className='flex-1 min-w-0'>
									<div className='flex items-center gap-2 mb-2'>
										<h3
											className={`font-semibold text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}
										>
											{task.title}
										</h3>
										<span className='text-lg'>{getStatusIcon(task.status)}</span>
									</div>
									<p className='text-sm text-muted-foreground mb-3 line-clamp-2'>{task.description}</p>

									<div className='flex flex-wrap items-center gap-2 mb-3'>
										<Badge className={getStatusColor(task.status)}>{task.status}</Badge>
										<Badge className={getPriorityColor(task.priority)}>
											<FiFlag className='h-3 w-3 mr-1' />
											{task.priority}
										</Badge>
										<Badge variant='outline'>{task.project}</Badge>
									</div>

									<div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
										<div className='flex items-center'>
											<FiCalendar className='h-4 w-4 mr-1' />
											<span>Due: {task.dueDate}</span>
										</div>
										<div className='flex items-center'>
											<FiClock className='h-4 w-4 mr-1' />
											<span>
												{task.timeSpent} / {task.estimatedTime}
											</span>
										</div>
										<div className='flex items-center'>
											<span>👤 {task.assignee}</span>
										</div>
									</div>

									{task.tags.length > 0 && (
										<div className='flex flex-wrap gap-1 mt-3'>
											{task.tags.map((tag, index) => (
												<Badge
													key={index}
													variant='outline'
													className='text-xs'
												>
													#{tag}
												</Badge>
											))}
										</div>
									)}
								</div>
							</div>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										size='sm'
									>
										<FiMoreVertical className='h-4 w-4' />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem onClick={() => handleEditTask(task.id)}>
										<FiEdit3 className='h-4 w-4 mr-2' />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleDeleteTask(task.id)}
										className='text-red-600'
									>
										<FiTrash2 className='h-4 w-4 mr-2' />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</Card>
				))}
			</div>

			{filteredTasks.length === 0 && (
				<div className='text-center py-12'>
					<FiCheckSquare className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
					<h3 className='text-lg font-medium mb-2'>No tasks found</h3>
					<p className='text-muted-foreground mb-4'>
						{searchTerm ? "Try adjusting your search terms" : "Get started by creating your first task"}
					</p>
					{!searchTerm && (
						<Button onClick={handleCreateTask}>
							<FiPlus className='h-4 w-4 mr-2' />
							Create Task
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
