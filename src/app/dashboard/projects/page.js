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
import { useProjects, useDeleteProject } from "@/hooks/useProjects";
import CreateProjectModal from "@/components/modals/CreateProjectModal";
import EditProjectModal from "@/components/modals/EditProjectModal";
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
	FiCheckSquare,
	FiLoader,
	FiEye,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const getStatusColor = (status) => {
	switch (status?.toLowerCase()) {
		case "in progress":
			return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
		case "review":
			return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
		case "planning":
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
		case "completed":
			return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
		default:
			return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
	}
};

const getPriorityColor = (priority) => {
	switch (priority?.toLowerCase()) {
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

export default function ProjectsPage() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [editingProjectId, setEditingProjectId] = useState(null);
	const [projectToDelete, setProjectToDelete] = useState(null);

	const { data: projects, isLoading, error } = useProjects();
	const deleteProject = useDeleteProject();

	const filteredProjects =
		projects?.filter((project) => {
			const matchesSearch =
				project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				project.description?.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = filterStatus === "all" || project.status.toLowerCase() === filterStatus.toLowerCase();
			return matchesSearch && matchesStatus;
		}) || [];

	const handleEditProject = (projectId) => {
		setEditingProjectId(projectId);
	};

	if (isLoading) {
		return (
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
						<p className='text-muted-foreground mt-2'>Manage and track all your development projects in one place.</p>
					</div>
				</div>
				<div className='flex items-center justify-center h-40'>
					<FiLoader className='h-8 w-8 animate-spin text-muted-foreground' />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
						<p className='text-muted-foreground mt-2'>Manage and track all your development projects in one place.</p>
					</div>
				</div>
				<Card className='p-6'>
					<div className='text-center'>
						<p className='text-red-600'>Error loading projects: {error.message}</p>
						<Button
							onClick={() => window.location.reload()}
							className='mt-4'
						>
							Retry
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Projects</h1>
					<p className='text-muted-foreground mt-2'>Manage and track all your development projects in one place.</p>
				</div>
				<CreateProjectModal />
			</div>

			{/* Search and Filters */}
			<div className='flex flex-col md:flex-row gap-4'>
				<div className='relative flex-1'>
					<FiSearch className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Search projects...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='pl-9'
					/>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							<FiFilter className='h-4 w-4 mr-2' />
							Filter: {filterStatus === "all" ? "All" : filterStatus}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilterStatus("planning")}>Planning</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilterStatus("in progress")}>In Progress</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilterStatus("review")}>Review</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilterStatus("completed")}>Completed</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Projects Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredProjects.map((project) => (
					<Card
						key={project._id}
						className='p-6 hover:shadow-lg transition-shadow'
					>
						<div className='flex items-start justify-between mb-4'>
							<div className='flex items-center space-x-2'>
								<div className='bg-blue-100 p-2 rounded-lg'>
									<FiFolder className='h-5 w-5 text-blue-600' />
								</div>
								<h3 className='font-semibold text-lg truncate'>{project.name}</h3>
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
									<DropdownMenuItem onClick={() => router.push(`/dashboard/projects/${project._id}`)}>
										<FiEye className='h-4 w-4 mr-2' />
										View
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => handleEditProject(project._id)}>
										<FiEdit3 className='h-4 w-4 mr-2' />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setProjectToDelete(project._id)}
										className='text-red-600'
									>
										<FiTrash2 className='h-4 w-4 mr-2' />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						{project.description && (
							<p className='text-sm text-muted-foreground mb-4 line-clamp-2'>{project.description}</p>
						)}

						<div className='flex items-center justify-between mb-4'>
							<Badge className={getStatusColor(project.status)}>{project.status}</Badge>
							<Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
						</div>

						{/* Progress */}
						<div className='mb-4'>
							<div className='flex items-center justify-between text-sm mb-2'>
								<span className='text-muted-foreground'>Progress</span>
								<span className='font-medium'>{project.progress || 0}%</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2'>
								<div
									className='bg-blue-600 h-2 rounded-full transition-all'
									style={{ width: `${project.progress || 0}%` }}
								></div>
							</div>
						</div>

						{/* Project Info */}
						<div className='space-y-2 text-sm text-muted-foreground'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center'>
									<FiCheckSquare className='h-4 w-4 mr-1' />
									<span>
										{project.completedTasks || 0}/{project.totalTasks || 0} tasks
									</span>
								</div>
								{project.timeSpent && (
									<div className='flex items-center'>
										<FiClock className='h-4 w-4 mr-1' />
										<span>{Math.round((project.timeSpent || 0) / 60)}h</span>
									</div>
								)}
							</div>
							{project.dueDate && (
								<div className='flex items-center'>
									<FiCalendar className='h-4 w-4 mr-1' />
									<span>{new Date(project.dueDate).toLocaleDateString()}</span>
								</div>
							)}
						</div>

						{/* Technologies */}
						{project.technologies && project.technologies.length > 0 && (
							<div className='mt-4'>
								<div className='flex flex-wrap gap-1'>
									{project.technologies.slice(0, 3).map((tech, index) => (
										<Badge
											key={index}
											variant='outline'
											className='text-xs'
										>
											{tech}
										</Badge>
									))}
									{project.technologies.length > 3 && (
										<Badge
											variant='outline'
											className='text-xs'
										>
											+{project.technologies.length - 3}
										</Badge>
									)}
								</div>
							</div>
						)}
					</Card>
				))}
			</div>

			{filteredProjects.length === 0 && (
				<div className='text-center py-12'>
					<FiFolder className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
					<h3 className='text-lg font-medium mb-2'>No projects found</h3>
					<p className='text-muted-foreground mb-4'>
						{searchTerm ? "Try adjusting your search terms" : "Get started by creating your first project"}
					</p>
					{!searchTerm && <CreateProjectModal />}
				</div>
			)}

			{/* Edit Project Modal */}
			{editingProjectId && (
				<EditProjectModal
					projectId={editingProjectId}
					open={!!editingProjectId}
					onOpenChange={(open) => !open && setEditingProjectId(null)}
				/>
			)}
			{/* Alert DIalog */}
			<AlertDialog
				open={!!projectToDelete}
				onOpenChange={(open) => !open && setProjectToDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the project and all of its associated tasks.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setProjectToDelete(null)}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								deleteProject.mutate(projectToDelete);
								setProjectToDelete(null);
							}}
							className='bg-red-600 hover:bg-red-700'
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
