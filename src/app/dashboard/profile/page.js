"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useSession } from "next-auth/react";
import {
	FiEdit3,
	FiSave,
	FiCamera,
	FiUser,
	FiMapPin,
	FiCalendar,
	FiGithub,
	FiLinkedin,
	FiTwitter,
	FiGlobe,
	FiAward,
	FiTrendingUp,
} from "react-icons/fi";
import { toast } from "sonner";

export default function ProfilePage() {
	const { data: session } = useSession();
	const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
	const { data: projects = [] } = useProjects();
	const { data: tasks = [] } = useTasks();
	const updateProfileMutation = useUpdateProfile();

	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		name: "",
		email: "",
		title: "",
		bio: "",
		location: "",
		website: "",
		github: "",
		linkedin: "",
		twitter: "",
		joinDate: "",
		avatar: "",
	});

	// Update profileData when profile is loaded
	useEffect(() => {
		if (profile) {
			setProfileData({
				name: profile.name || session?.user?.name || "",
				email: profile.email || session?.user?.email || "",
				title: profile.title || "",
				bio: profile.bio || "",
				location: profile.location || "",
				website: profile.website || "",
				github: profile.github || "",
				linkedin: profile.linkedin || "",
				twitter: profile.twitter || "",
				joinDate: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "",
				avatar: profile.avatar || session?.user?.image || "",
			});
		} else if (session?.user) {
			// Use session data as fallback
			setProfileData((prev) => ({
				...prev,
				name: session.user.name || "",
				email: session.user.email || "",
				avatar: session.user.image || "",
			}));
		}
	}, [profile, session]);

	// Calculate real stats
	const completedProjects = projects.filter((p) => p.status === "completed").length;
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter((t) => t.completed || t.status === "completed").length;
	const totalHours = Math.round(tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0) / 60);
	const successRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

	const stats = [
		{
			label: "Projects Completed",
			value: completedProjects.toString(),
			icon: FiAward,
			color: "text-green-600",
		},
		{
			label: "Total Tasks",
			value: totalTasks.toString(),
			icon: FiTrendingUp,
			color: "text-blue-600",
		},
		{
			label: "Hours Logged",
			value: totalHours.toString(),
			icon: FiCalendar,
			color: "text-purple-600",
		},
		{
			label: "Success Rate",
			value: `${successRate}%`,
			icon: FiTrendingUp,
			color: "text-orange-600",
		},
	];

	const skills = [
		"JavaScript",
		"TypeScript",
		"React",
		"Next.js",
		"Node.js",
		"Git",
		"REST APIs",
		"TailwindCSS",
		"MongoDB",
		"Vercel",
		"C++",
		"DSA",
	];

	// Generate recent activity from projects and tasks
	const recentActivity = [];

	// Add recent project completions
	const recentCompletedProjects = projects
		.filter((p) => p.status === "completed")
		.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
		.slice(0, 2);

	recentCompletedProjects.forEach((project) => {
		recentActivity.push({
			action: "Completed project",
			target: project.name,
			date: new Date(project.updatedAt || project.createdAt).toLocaleDateString(),
		});
	});

	// Add recent task completions
	const recentCompletedTasks = tasks
		.filter((t) => t.completed || t.status === "completed")
		.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
		.slice(0, 2);

	recentCompletedTasks.forEach((task) => {
		recentActivity.push({
			action: "Completed task",
			target: task.title,
			date: new Date(task.updatedAt || task.createdAt).toLocaleDateString(),
		});
	});

	// Sort by most recent
	recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));

	// Limit to 4 items
	const limitedActivity = recentActivity.slice(0, 4);

	const handleInputChange = (field, value) => {
		setProfileData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			await updateProfileMutation.mutateAsync(profileData);
			setIsEditing(false);
			toast.success("Profile updated successfully!");
		} catch (error) {
			toast.error("Failed to update profile");
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		// TODO: Reset to original data
		toast.info("Changes cancelled");
	};

	const handleAvatarChange = () => {
		// TODO: Implement avatar upload
		toast.info("Avatar upload coming soon!");
	};

	if (profileLoading) {
		return (
			<div className='space-y-6'>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
						<p className='text-muted-foreground mt-2'>Manage your personal information and preferences.</p>
					</div>
				</div>
				<div className='flex items-center justify-center h-40'>
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-4"></div>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
					<p className='text-muted-foreground mt-2'>Manage your personal information and preferences.</p>
				</div>
				<div className='flex items-center space-x-2 mt-4 md:mt-0'>
					{isEditing ? (
						<>
							<Button
								variant='outline'
								onClick={handleCancel}
							>
								Cancel
							</Button>
							<Button
								onClick={handleSave}
								disabled={updateProfileMutation.isPending}
							>
								<FiSave className='h-4 w-4 mr-2' />
								{updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
							</Button>
						</>
					) : (
						<Button onClick={() => setIsEditing(true)}>
							<FiEdit3 className='h-4 w-4 mr-2' />
							Edit Profile
						</Button>
					)}
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Profile Info */}
				<div className='lg:col-span-2 space-y-6'>
					<Card className='p-6'>
						<div className='flex items-start space-x-6 mb-6'>
							<div className='relative'>
								<Avatar className='h-24 w-24'>
									<AvatarImage
										src={profileData.avatar}
										alt='Profile'
									/>
									<AvatarFallback className='text-2xl'>
										{profileData.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								{isEditing && (
									<Button
										size='sm'
										className='absolute -bottom-2 -right-2 h-8 w-8 rounded-full'
										onClick={handleAvatarChange}
									>
										<FiCamera className='h-4 w-4' />
									</Button>
								)}
							</div>
							<div className='flex-1 space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div>
										<Label htmlFor='name'>Full Name</Label>
										{isEditing ? (
											<Input
												id='name'
												value={profileData.name}
												onChange={(e) => handleInputChange("name", e.target.value)}
												className='mt-1'
											/>
										) : (
											<p className='mt-1 font-medium'>{profileData.name}</p>
										)}
									</div>
									<div>
										<Label htmlFor='email'>Email</Label>
										{isEditing ? (
											<Input
												id='email'
												type='email'
												value={profileData.email}
												onChange={(e) => handleInputChange("email", e.target.value)}
												className='mt-1'
											/>
										) : (
											<p className='mt-1 text-muted-foreground'>{profileData.email}</p>
										)}
									</div>
								</div>
								<div>
									<Label htmlFor='title'>Job Title</Label>
									{isEditing ? (
										<Input
											id='title'
											value={profileData.title}
											onChange={(e) => handleInputChange("title", e.target.value)}
											className='mt-1'
										/>
									) : (
										<p className='mt-1 font-medium'>{profileData.title}</p>
									)}
								</div>
							</div>
						</div>

						<Separator className='my-6' />

						<div className='space-y-4'>
							<div>
								<Label htmlFor='bio'>Bio</Label>
								{isEditing ? (
									<Textarea
										id='bio'
										value={profileData.bio}
										onChange={(e) => handleInputChange("bio", e.target.value)}
										className='mt-1'
										rows={3}
									/>
								) : (
									<p className='mt-1 text-muted-foreground'>{profileData.bio}</p>
								)}
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<Label htmlFor='location'>Location</Label>
									{isEditing ? (
										<Input
											id='location'
											value={profileData.location}
											onChange={(e) => handleInputChange("location", e.target.value)}
											className='mt-1'
										/>
									) : (
										<div className='mt-1 flex items-center text-muted-foreground'>
											<FiMapPin className='h-4 w-4 mr-1' />
											{profileData.location}
										</div>
									)}
								</div>
								<div>
									<Label htmlFor='website'>Website</Label>
									{isEditing ? (
										<Input
											id='website'
											value={profileData.website}
											onChange={(e) => handleInputChange("website", e.target.value)}
											className='mt-1'
										/>
									) : (
										<div className='mt-1 flex items-center text-muted-foreground'>
											<FiGlobe className='h-4 w-4 mr-1' />
											<a
												href={profileData.website}
												target='_blank'
												rel='noopener noreferrer'
												className='hover:text-blue-600'
											>
												{profileData.website}
											</a>
										</div>
									)}
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div>
									<Label htmlFor='github'>GitHub</Label>
									{isEditing ? (
										<Input
											id='github'
											value={profileData.github}
											onChange={(e) => handleInputChange("github", e.target.value)}
											className='mt-1'
											placeholder='username'
										/>
									) : (
										<div className='mt-1 flex items-center text-muted-foreground'>
											<FiGithub className='h-4 w-4 mr-1' />@{profileData.github}
										</div>
									)}
								</div>
								<div>
									<Label htmlFor='linkedin'>LinkedIn</Label>
									{isEditing ? (
										<Input
											id='linkedin'
											value={profileData.linkedin}
											onChange={(e) => handleInputChange("linkedin", e.target.value)}
											className='mt-1'
											placeholder='username'
										/>
									) : (
										<div className='mt-1 flex items-center text-muted-foreground'>
											<FiLinkedin className='h-4 w-4 mr-1' />@{profileData.linkedin}
										</div>
									)}
								</div>
								<div>
									<Label htmlFor='twitter'>Twitter</Label>
									{isEditing ? (
										<Input
											id='twitter'
											value={profileData.twitter}
											onChange={(e) => handleInputChange("twitter", e.target.value)}
											className='mt-1'
											placeholder='username'
										/>
									) : (
										<div className='mt-1 flex items-center text-muted-foreground'>
											<FiTwitter className='h-4 w-4 mr-1' />@{profileData.twitter}
										</div>
									)}
								</div>
							</div>
						</div>
					</Card>

					{/* Skills */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>Skills & Technologies</h2>
						<div className='flex flex-wrap gap-2'>
							{skills.map((skill, index) => (
								<Badge
									key={index}
									variant='secondary'
								>
									{skill}
								</Badge>
							))}
						</div>
					</Card>
				</div>

				{/* Sidebar */}
				<div className='space-y-6'>
					{/* Stats */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>Statistics</h2>
						<div className='space-y-4'>
							{stats.map((stat, index) => (
								<div
									key={index}
									className='flex items-center justify-between'
								>
									<div className='flex items-center space-x-2'>
										<stat.icon className={`h-5 w-5 ${stat.color}`} />
										<span className='text-sm text-muted-foreground'>{stat.label}</span>
									</div>
									<span className='font-semibold'>{stat.value}</span>
								</div>
							))}
						</div>
					</Card>

					{/* Account Info */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>Account Info</h2>
						<div className='space-y-3 text-sm'>
							<div className='flex items-center justify-between'>
								<span className='text-muted-foreground'>Member since</span>
								<span>{profileData.joinDate}</span>
							</div>
							<div className='flex items-center justify-between'>
								<span className='text-muted-foreground'>Account type</span>
								<Badge>Pro</Badge>
							</div>
							<div className='flex items-center justify-between'>
								<span className='text-muted-foreground'>Status</span>
								<Badge className='bg-green-100 text-green-800'>Active</Badge>
							</div>
						</div>
					</Card>

					{/* Recent Activity */}
					<Card className='p-6'>
						<h2 className='text-xl font-semibold mb-4'>Recent Activity</h2>
						<div className='space-y-3'>
							{limitedActivity.length > 0 ? (
								limitedActivity.map((activity, index) => (
									<div
										key={index}
										className='text-sm'
									>
										<p>
											<span className='font-medium'>{activity.action}</span>{" "}
											<span className='text-blue-600'>{activity.target}</span>
										</p>
										<p className='text-xs text-muted-foreground'>{activity.date}</p>
									</div>
								))
							) : (
								<p className='text-sm text-muted-foreground'>No recent activity</p>
							)}
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
