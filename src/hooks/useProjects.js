import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch all projects
export function useProjects() {
	return useQuery({
		queryKey: ["projects"],
		queryFn: async () => {
			const response = await fetch("/api/projects");
			if (!response.ok) {
				throw new Error("Failed to fetch projects");
			}
			return response.json();
		},
	});
}

// Fetch single project
export function useProject(id) {
	return useQuery({
		queryKey: ["projects", id],
		queryFn: async () => {
			const response = await fetch(`/api/projects/${id}`);
			if (!response.ok) {
				throw new Error("Failed to fetch project");
			}
			return response.json();
		},
		enabled: !!id,
	});
}

// Create project mutation
export function useCreateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (projectData) => {
			const response = await fetch("/api/projects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(projectData),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to create project");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Project created successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}

// Update project mutation
export function useUpdateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...projectData }) => {
			const response = await fetch(`/api/projects/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(projectData),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to update project");
			}

			return response.json();
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			queryClient.invalidateQueries({ queryKey: ["projects", data._id] });
			toast.success("Project updated successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}

// Delete project mutation
export function useDeleteProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id) => {
			const response = await fetch(`/api/projects/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to delete project");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Project deleted successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}
