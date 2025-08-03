"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
	FiEdit3,
	FiSave,
	FiCamera,
	FiUser,
	FiMail,
	FiMapPin,
	FiCalendar,
	FiGithub,
	FiLinkedin,
	FiTwitter,
	FiGlobe,
	FiAward,
	FiTrendingUp
} from "react-icons/fi";
import { toast } from "sonner";

export default function ProfilePage() {
	const [isEditing, setIsEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		name: "John Doe",
		email: "john@example.com",
		title: "Full Stack Developer",
		bio: "Passionate developer with 5+ years of experience building web applications. Love working with modern technologies and solving complex problems.",
		location: "San Francisco, CA",
		website: "https://johndoe.dev",
		github: "johndoe",
		linkedin: "johndoe",
		twitter: "johndoe",
		joinDate: "January 2023",
		avatar: "/placeholder-avatar.jpg"
	});

	const stats = [
		{
			label: "Projects Completed",
			value: "24",
			icon: FiAward,
			color: "text-green-600"
		},
		{
			label: "Total Tasks",
			value: "187",
			icon: FiTrendingUp,
			color: "text-blue-600"
		},
		{
			label: "Hours Logged",
			value: "1,240",
			icon: FiCalendar,
			color: "text-purple-600"
		},
		{
			label: "Success Rate",
			value: "94%",
			icon: FiTrendingUp,
			color: "text-orange-600"
		}
	];

	const skills = [
		"JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
		"Python", "PostgreSQL", "MongoDB", "Docker", "AWS",
		"TailwindCSS", "Git", "REST APIs", "GraphQL"
	];

	const recentActivity = [
		{
			action: "Completed project",
			target: "E-commerce Platform",
			date: "2 days ago"
		},
		{
			action: "Created task",
			target: "API Documentation",
			date: "1 week ago"
		},
		{
			action: "Updated profile",
			target: "Added new skills",
			date: "2 weeks ago"
		},
		{
			action: "Joined team",
			target: "Mobile App Redesign",
			date: "1 month ago"
		}
	];

	const handleInputChange = (field, value) => {
		setProfileData(prev => ({ ...prev, [field]: value }));
	};

	const handleSave = () => {
		// TODO: Implement profile update API call
		setIsEditing(false);
		toast.success("Profile updated successfully!");
		console.log("Profile updated:", profileData);
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

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Profile</h1>
					<p className="text-muted-foreground mt-2">
						Manage your personal information and preferences.
					</p>
				</div>
				<div className="flex items-center space-x-2 mt-4 md:mt-0">
					{isEditing ? (
						<>
							<Button variant="outline" onClick={handleCancel}>
								Cancel
							</Button>
							<Button onClick={handleSave}>
								<FiSave className="h-4 w-4 mr-2" />
								Save Changes
							</Button>
						</>
					) : (
						<Button onClick={() => setIsEditing(true)}>
							<FiEdit3 className="h-4 w-4 mr-2" />
							Edit Profile
						</Button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Profile Info */}
				<div className="lg:col-span-2 space-y-6">
					<Card className="p-6">
						<div className="flex items-start space-x-6 mb-6">
							<div className="relative">
								<Avatar className="h-24 w-24">
									<AvatarImage src={profileData.avatar} alt="Profile" />
									<AvatarFallback className="text-2xl">
										{profileData.name.split(' ').map(n => n[0]).join('')}
									</AvatarFallback>
								</Avatar>
								{isEditing && (
									<Button
										size="sm"
										className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
										onClick={handleAvatarChange}
									>
										<FiCamera className="h-4 w-4" />
									</Button>
								)}
							</div>
							<div className="flex-1 space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<Label htmlFor="name">Full Name</Label>
										{isEditing ? (
											<Input
												id="name"
												value={profileData.name}
												onChange={(e) => handleInputChange('name', e.target.value)}
												className="mt-1"
											/>
										) : (
											<p className="mt-1 font-medium">{profileData.name}</p>
										)}
									</div>
									<div>
										<Label htmlFor="email">Email</Label>
										{isEditing ? (
											<Input
												id="email"
												type="email"
												value={profileData.email}
												onChange={(e) => handleInputChange('email', e.target.value)}
												className="mt-1"
											/>
										) : (
											<p className="mt-1 text-muted-foreground">{profileData.email}</p>
										)}
									</div>
								</div>
								<div>
									<Label htmlFor="title">Job Title</Label>
									{isEditing ? (
										<Input
											id="title"
											value={profileData.title}
											onChange={(e) => handleInputChange('title', e.target.value)}
											className="mt-1"
										/>
									) : (
										<p className="mt-1 font-medium">{profileData.title}</p>
									)}
								</div>
							</div>
						</div>

						<Separator className="my-6" />

						<div className="space-y-4">
							<div>
								<Label htmlFor="bio">Bio</Label>
								{isEditing ? (
									<Textarea
										id="bio"
										value={profileData.bio}
										onChange={(e) => handleInputChange('bio', e.target.value)}
										className="mt-1"
										rows={3}
									/>
								) : (
									<p className="mt-1 text-muted-foreground">{profileData.bio}</p>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="location">Location</Label>
									{isEditing ? (
										<Input
											id="location"
											value={profileData.location}
											onChange={(e) => handleInputChange('location', e.target.value)}
											className="mt-1"
										/>
									) : (
										<div className="mt-1 flex items-center text-muted-foreground">
											<FiMapPin className="h-4 w-4 mr-1" />
											{profileData.location}
										</div>
									)}
								</div>
								<div>
									<Label htmlFor="website">Website</Label>
									{isEditing ? (
										<Input
											id="website"
											value={profileData.website}
											onChange={(e) => handleInputChange('website', e.target.value)}
											className="mt-1"
										/>
									) : (
										<div className="mt-1 flex items-center text-muted-foreground">
											<FiGlobe className="h-4 w-4 mr-1" />
											<a href={profileData.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
												{profileData.website}
											</a>
										</div>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<Label htmlFor="github">GitHub</Label>
									{isEditing ? (
										<Input
											id="github"
											value={profileData.github}
											onChange={(e) => handleInputChange('github', e.target.value)}
											className="mt-1"
											placeholder="username"
										/>
									) : (
										<div className="mt-1 flex items-center text-muted-foreground">
											<FiGithub className="h-4 w-4 mr-1" />
											@{profileData.github}
										</div>
									)}
								</div>
								<div>
									<Label htmlFor="linkedin">LinkedIn</Label>
									{isEditing ? (
										<Input
											id="linkedin"
											value={profileData.linkedin}
											onChange={(e) => handleInputChange('linkedin', e.target.value)}
											className="mt-1"
											placeholder="username"
										/>
									) : (
										<div className="mt-1 flex items-center text-muted-foreground">
											<FiLinkedin className="h-4 w-4 mr-1" />
											@{profileData.linkedin}
										</div>
									)}
								</div>
								<div>
									<Label htmlFor="twitter">Twitter</Label>
									{isEditing ? (
										<Input
											id="twitter"
											value={profileData.twitter}
											onChange={(e) => handleInputChange('twitter', e.target.value)}
											className="mt-1"
											placeholder="username"
										/>
									) : (
										<div className="mt-1 flex items-center text-muted-foreground">
											<FiTwitter className="h-4 w-4 mr-1" />
											@{profileData.twitter}
										</div>
									)}
								</div>
							</div>
						</div>
					</Card>

					{/* Skills */}
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-4">Skills & Technologies</h2>
						<div className="flex flex-wrap gap-2">
							{skills.map((skill, index) => (
								<Badge key={index} variant="secondary">
									{skill}
								</Badge>
							))}
						</div>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Stats */}
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-4">Statistics</h2>
						<div className="space-y-4">
							{stats.map((stat, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<stat.icon className={`h-5 w-5 ${stat.color}`} />
										<span className="text-sm text-muted-foreground">{stat.label}</span>
									</div>
									<span className="font-semibold">{stat.value}</span>
								</div>
							))}
						</div>
					</Card>

					{/* Account Info */}
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-4">Account Info</h2>
						<div className="space-y-3 text-sm">
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Member since</span>
								<span>{profileData.joinDate}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Account type</span>
								<Badge>Pro</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Status</span>
								<Badge className="bg-green-100 text-green-800">Active</Badge>
							</div>
						</div>
					</Card>

					{/* Recent Activity */}
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
						<div className="space-y-3">
							{recentActivity.map((activity, index) => (
								<div key={index} className="text-sm">
									<p>
										<span className="font-medium">{activity.action}</span>{" "}
										<span className="text-blue-600">{activity.target}</span>
									</p>
									<p className="text-xs text-muted-foreground">{activity.date}</p>
								</div>
							))}
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
