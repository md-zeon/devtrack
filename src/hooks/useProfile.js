import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch user profile
export function useProfile() {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const response = await fetch("/api/user/profile");
			if (!response.ok) {
				throw new Error("Failed to fetch profile");
			}
			return response.json();
		},
	});
}

// Update profile mutation
export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (profileData) => {
			const response = await fetch("/api/user/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(profileData),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to update profile");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			toast.success("Profile updated successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
}
