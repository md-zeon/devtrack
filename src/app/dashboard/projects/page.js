"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
	FiUsers,
	FiClock,
	FiFolder,
	FiCheckSquare
} from "react-icons/fi";

// Mock data
const projects = [
	{
		id: 1,
		name: "E-commerce Platform",
		description: "Building a modern e-commerce solution with React and Node.js",
		status: "In Progress",
		priority: "High",
		progress: 75,
		dueDate: "Dec 15, 2024",
		createdDate: "Nov 1, 2024",
		tasks: { completed: 12, total: 16 },
		team: ["John Doe", "Jane Smith"],
		technologies: ["React", "Node.js", "MongoDB"],
		timeSpent: "120h"
	},
	{
		id: 2,
		name: "Mobile App Redesign",
		description: "Complete UI/UX overhaul of the existing mobile application",
		status: "Review",
		priority: "Medium",
		progress: 90,
		dueDate: "Dec 10, 2024",
		createdDate: "Oct 15, 2024",
		tasks: { completed: 18, total: 20 },
		team: ["John Doe", "Mike Johnson"],
		technologies: ["React Native", "Figma"],
		timeSpent: "85h"
	},
	{
		id: 3,
		name: "API Documentation",
		description: "Comprehensive API documentation for the new REST endpoints",
		status: "Planning",
		priority: "Low",
		progress: 25,
		dueDate: "Dec 20, 2024",
		createdDate: "Nov 10, 2024",
		tasks: { completed: 2, total: 8 },
		team: ["John Doe"],
		technologies: ["Swagger", "Markdown"],
		timeSpent: "15h"
	},
	{
		id: 4,
		name: "DevOps Pipeline",
		description: "Setting up CI/CD pipeline with automated testing and deployment",
		status: "Completed",
		priority: "High",
		progress: 100,
		dueDate: "Nov 30, 2024",
		createdDate: "Oct 1, 2024",
		tasks: { completed: 10, total: 10 },
		team: ["John Doe", "Sarah Wilson"],
		technologies: ["Docker", "GitHub Actions", "AWS"],
		timeSpent: "60h"
	},
	{
		id: 5,
		name: "Blog System",
		description: "Simple blog system with CMS functionality",
		status: "In Progress",
		priority: "Medium",
		progress: 40,
		dueDate: "Jan 5, 2025",
		createdDate: "Nov 20, 2024",
		tasks: { completed: 4, total: 10 },
		team: ["John Doe"],
		technologies: ["Next.js", "Prisma", "PostgreSQL"],
		timeSpent: "32h"
	},
	{
		id: 6,
		name: "Portfolio Website",
		description: "Personal portfolio website with modern design",
		status: "Planning",
		priority: "Low",
		progress: 10,
		dueDate: "Jan 15, 2025",
		createdDate: "Dec 1, 2024",
		tasks: { completed: 1, total: 12 },
		team: ["John Doe"],
		technologies: ["Astro", "TailwindCSS"],
		timeSpent: "5h"
	}
];

const getStatusColor = (status) => {
	switch (status.toLowerCase()) {
		case 'in progress':
			return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
		case 'review':
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
		case 'planning':
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
		case 'completed':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
		default:
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
	}
};

const getPriorityColor = (priority) => {
	switch (priority.toLowerCase()) {
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

export default function ProjectsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredProjects = projects.filter(project => {
		const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = filterStatus === "all" || 
			project.status.toLowerCase() === filterStatus.toLowerCase();
		return matchesSearch && matchesStatus;
	});

	const handleCreateProject = () => {
		// TODO: Open create project modal
		console.log("Create project clicked");
	};

	const handleEditProject = (projectId) => {
		// TODO: Open edit project modal
		console.log("Edit project:", projectId);
	};

	const handleDeleteProject = (projectId) => {
		// TODO: Implement delete project
		console.log("Delete project:", projectId);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Projects</h1>
					<p className="text-muted-foreground mt-2">
						Manage and track all your development projects in one place.
					</p>
				</div>
				<Button onClick={handleCreateProject} className="mt-4 md:mt-0">
					<FiPlus className="h-4 w-4 mr-2" />
					New Project
				</Button>
			</div>

			{/* Search and Filters */}
			<div className="flex flex-col md:flex-row gap-4">
				<div className="relative flex-1">
					<FiSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search projects..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-9"
					/>
				</div>
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
						<DropdownMenuItem onClick={() => setFilterStatus("planning")}>
							Planning
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
			</div>

			{/* Projects Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredProjects.map((project) => (
					<Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center space-x-2">
								<div className="bg-blue-100 p-2 rounded-lg">
									<FiFolder className="h-5 w-5 text-blue-600" />
								</div>
								<h3 className="font-semibold text-lg truncate">{project.name}</h3>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="sm">
										<FiMoreVertical className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => handleEditProject(project.id)}>
										<FiEdit3 className="h-4 w-4 mr-2" />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem 
										onClick={() => handleDeleteProject(project.id)}
										className="text-red-600"
									>
										<FiTrash2 className="h-4 w-4 mr-2" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
							{project.description}
						</p>

						<div className="flex items-center justify-between mb-4">
							<Badge className={getStatusColor(project.status)}>
								{project.status}
							</Badge>
							<Badge className={getPriorityColor(project.priority)}>
								{project.priority}
							</Badge>
						</div>

						{/* Progress */}
						<div className="mb-4">
							<div className="flex items-center justify-between text-sm mb-2">
								<span className="text-muted-foreground">Progress</span>
								<span className="font-medium">{project.progress}%</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div 
									className="bg-blue-600 h-2 rounded-full transition-all" 
									style={{ width: `${project.progress}%` }}
								></div>
							</div>
						</div>

						{/* Project Info */}
						<div className="space-y-2 text-sm text-muted-foreground">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<FiCheckSquare className="h-4 w-4 mr-1" />
									<span>{project.tasks.completed}/{project.tasks.total} tasks</span>
								</div>
								<div className="flex items-center">
									<FiClock className="h-4 w-4 mr-1" />
									<span>{project.timeSpent}</span>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<FiUsers className="h-4 w-4 mr-1" />
									<span>{project.team.length} member{project.team.length !== 1 ? 's' : ''}</span>
								</div>
								<div className="flex items-center">
									<FiCalendar className="h-4 w-4 mr-1" />
									<span>{project.dueDate}</span>
								</div>
							</div>
						</div>

						{/* Technologies */}
						<div className="mt-4">
							<div className="flex flex-wrap gap-1">
								{project.technologies.slice(0, 3).map((tech, index) => (
									<Badge key={index} variant="outline" className="text-xs">
										{tech}
									</Badge>
								))}
								{project.technologies.length > 3 && (
									<Badge variant="outline" className="text-xs">
										+{project.technologies.length - 3}
									</Badge>
								)}
							</div>
						</div>
					</Card>
				))}
			</div>

			{filteredProjects.length === 0 && (
				<div className="text-center py-12">
					<FiFolder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
					<h3 className="text-lg font-medium mb-2">No projects found</h3>
					<p className="text-muted-foreground mb-4">
						{searchTerm ? "Try adjusting your search terms" : "Get started by creating your first project"}
					</p>
					{!searchTerm && (
						<Button onClick={handleCreateProject}>
							<FiPlus className="h-4 w-4 mr-2" />
							Create Project
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
