import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch all tasks with optional filters
export function useTasks(filters = {}) {
	const searchParams = new URLSearchParams();
	
	if (filters.projectId) searchParams.set("projectId", filters.projectId);
	if (filters.status) searchParams.set("status", filters.status);
	if (filters.completed !== undefined) searchParams.set("completed", filters.completed);

	const queryString = searchParams.toString();

	return useQuery({
		queryKey: ["tasks", filters],
		queryFn: async () => {
			const response = await fetch(`/api/tasks${queryString ? `?${queryString}` : ""}`);
			if (!response.ok) {
				throw new Error("Failed to fetch tasks");
			}
			return response.json();
		},
	});
}

// Fetch single task
export function useTask(id) {
	return useQuery({
		queryKey: ["tasks", id],
		queryFn: async () => {
			const response = await fetch(`/api/tasks/${id}`);
			if (!response.ok) {
				throw new Error("Failed to fetch task");
			}
			return response.json();
		},
		enabled: !!id,
	});
}

// Create task mutation
export function useCreateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (taskData) => {
			const response = await fetch("/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(taskData),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to create task");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			queryClient.invalidateQueries({ queryKey: ["projects"] }); // Update project stats
			toast.success("Task created successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}

// Update task mutation
export function useUpdateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, ...taskData }) => {
			const response = await fetch(`/api/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(taskData),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to update task");
			}

			return response.json();
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			queryClient.invalidateQueries({ queryKey: ["tasks", data._id] });
			queryClient.invalidateQueries({ queryKey: ["projects"] }); // Update project stats
			toast.success("Task updated successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}

// Delete task mutation
export function useDeleteTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id) => {
			const response = await fetch(`/api/tasks/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to delete task");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			queryClient.invalidateQueries({ queryKey: ["projects"] }); // Update project stats
			toast.success("Task deleted successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}

// Toggle task completion
export function useToggleTaskCompletion() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, completed }) => {
			const response = await fetch(`/api/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ completed }),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to update task");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			queryClient.invalidateQueries({ queryKey: ["projects"] }); // Update project stats
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}
