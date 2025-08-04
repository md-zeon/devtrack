"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	FiSave,
	FiTrash2,
	FiShield,
	FiBell,
	FiMoon,
	FiGlobe,
	FiDownload,
	FiUpload,
	FiAlertTriangle
} from "react-icons/fi";
import { toast } from "sonner";

export default function SettingsPage() {
	const [settings, setSettings] = useState({
		// Notifications
		emailNotifications: true,
		pushNotifications: true,
		taskReminders: true,
		projectUpdates: true,
		weeklyDigest: false,
		
		// Appearance
		theme: "system",
		language: "en",
		dateFormat: "MM/DD/YYYY",
		timeFormat: "12h",
		
		// Privacy
		profileVisibility: "public",
		showEmail: false,
		showActivity: true,
		
		// Productivity
		defaultTaskDuration: "2h",
		workingHours: "9-17",
		timezone: "America/New_York",
		autoSave: true,
		
		// Security
		twoFactorEnabled: false,
		sessionTimeout: "24h"
	});

	const handleSettingChange = (key, value) => {
		setSettings(prev => ({ ...prev, [key]: value }));
	};

	const handleSaveSettings = () => {
		// TODO: Implement settings save API call
		toast.success("Settings saved successfully!");
		console.log("Settings saved:", settings);
	};

	const handleExportData = () => {
		// TODO: Implement data export
		toast.success("Data export started. You'll receive an email when ready.");
	};

	const handleImportData = () => {
		// TODO: Implement data import
		toast.info("Data import feature coming soon!");
	};

	const handleDeleteAccount = () => {
		// TODO: Implement account deletion with confirmation
		toast.error("Account deletion requires confirmation. Feature coming soon.");
	};

	const handleEnable2FA = () => {
		// TODO: Implement 2FA setup
		toast.info("Two-factor authentication setup coming soon!");
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
					<p className="text-muted-foreground mt-2">
						Manage your account settings and preferences.
					</p>
				</div>
				<Button onClick={handleSaveSettings}>
					<FiSave className="h-4 w-4 mr-2" />
					Save Changes
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Notifications */}
				<Card className="p-6">
					<div className="flex items-center space-x-2 mb-4">
						<FiBell className="h-5 w-5" />
						<h2 className="text-xl font-semibold">Notifications</h2>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<Label>Email notifications</Label>
								<p className="text-sm text-muted-foreground">Receive notifications via email</p>
							</div>
							<Checkbox
								checked={settings.emailNotifications}
								onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<Label>Push notifications</Label>
								<p className="text-sm text-muted-foreground">Receive push notifications</p>
							</div>
							<Checkbox
								checked={settings.pushNotifications}
								onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<Label>Task reminders</Label>
								<p className="text-sm text-muted-foreground">Get reminded about upcoming tasks</p>
							</div>
							<Checkbox
								checked={settings.taskReminders}
								onCheckedChange={(checked) => handleSettingChange('taskReminders', checked)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<Label>Project updates</Label>
								<p className="text-sm text-muted-foreground">Notifications for project changes</p>
							</div>
							<Checkbox
								checked={settings.projectUpdates}
								onCheckedChange={(checked) => handleSettingChange('projectUpdates', checked)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<Label>Weekly digest</Label>
								<p className="text-sm text-muted-foreground">Weekly summary of your activity</p>
							</div>
							<Checkbox
								checked={settings.weeklyDigest}
								onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
							/>
						</div>
					</div>
				</Card>

				{/* Appearance */}
				<Card className="p-6">
					<div className="flex items-center space-x-2 mb-4">
						<FiMoon className="h-5 w-5" />
						<h2 className="text-xl font-semibold">Appearance</h2>
					</div>
					<div className="space-y-4">
						<div>
							<Label>Theme</Label>
							<Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="system">System</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Language</Label>
							<Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="en">English</SelectItem>
									<SelectItem value="bn">Bengali</SelectItem>
									<SelectItem value="es">Spanish</SelectItem>
									<SelectItem value="fr">French</SelectItem>
									<SelectItem value="de">German</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Date format</Label>
							<Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange('dateFormat', value)}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
									<SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
									<SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Time format</Label>
							<Select value={settings.timeFormat} onValueChange={(value) => handleSettingChange('timeFormat', value)}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="12h">12-hour</SelectItem>
									<SelectItem value="24h">24-hour</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</Card>

				{/* Privacy */}
				<Card className="p-6">
					<div className="flex items-center space-x-2 mb-4">
						<FiShield className="h-5 w-5" />
						<h2 className="text-xl font-semibold">Privacy</h2>
					</div>
					<div className="space-y-4">
						<div>
							<Label>Profile visibility</Label>
							<Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="public">Public</SelectItem>
									<SelectItem value="private">Private</SelectItem>
									<SelectItem value="team">Team only</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<Label>Show email address</Label>
								<p className="text-sm text-muted-foreground">Display email on your profile</p>
							</div>
							<Checkbox
								checked={settings.showEmail}
								onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<Label>Show activity</Label>
								<p className="text-sm text-muted-foreground">Display recent activity on profile</p>
							</div>
							<Checkbox
								checked={settings.showActivity}
								onCheckedChange={(checked) => handleSettingChange('showActivity', checked)}
							/>
						</div>
					</div>
				</Card>

				{/* Productivity */}
				<Card className="p-6">
					<div className="flex items-center space-x-2 mb-4">
						<FiGlobe className="h-5 w-5" />
						<h2 className="text-xl font-semibold">Productivity</h2>
					</div>
					<div className="space-y-4">
						<div>
							<Label>Default task duration</Label>
							<Select value={settings.defaultTaskDuration} onValueChange={(value) => handleSettingChange('defaultTaskDuration', value)}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="30m">30 minutes</SelectItem>
									<SelectItem value="1h">1 hour</SelectItem>
									<SelectItem value="2h">2 hours</SelectItem>
									<SelectItem value="4h">4 hours</SelectItem>
									<SelectItem value="1d">1 day</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Working hours</Label>
							<Input
								value={settings.workingHours}
								onChange={(e) => handleSettingChange('workingHours', e.target.value)}
								placeholder="9-17"
								className="mt-1"
							/>
						</div>
						<div>
							<Label>Timezone</Label>
							<Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="America/New_York">Eastern Time</SelectItem>
									<SelectItem value="America/Chicago">Central Time</SelectItem>
									<SelectItem value="America/Denver">Mountain Time</SelectItem>
									<SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
									<SelectItem value="Europe/London">London</SelectItem>
									<SelectItem value="Europe/Paris">Paris</SelectItem>
									<SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<Label>Auto-save</Label>
								<p className="text-sm text-muted-foreground">Automatically save changes</p>
							</div>
							<Checkbox
								checked={settings.autoSave}
								onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
							/>
						</div>
					</div>
				</Card>
			</div>

			{/* Security Section */}
			<Card className="p-6">
				<div className="flex items-center space-x-2 mb-4">
					<FiShield className="h-5 w-5" />
					<h2 className="text-xl font-semibold">Security</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<Label>Two-factor authentication</Label>
								<p className="text-sm text-muted-foreground">Add an extra layer of security</p>
							</div>
							<Button 
								variant={settings.twoFactorEnabled ? "destructive" : "default"}
								onClick={handleEnable2FA}
							>
								{settings.twoFactorEnabled ? "Disable" : "Enable"}
							</Button>
						</div>
						<div>
							<Label>Session timeout</Label>
							<Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange('sessionTimeout', value)}>
								<SelectTrigger className="mt-1">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="1h">1 hour</SelectItem>
									<SelectItem value="8h">8 hours</SelectItem>
									<SelectItem value="24h">24 hours</SelectItem>
									<SelectItem value="7d">7 days</SelectItem>
									<SelectItem value="30d">30 days</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</Card>

			{/* Data Management */}
			<Card className="p-6">
				<h2 className="text-xl font-semibold mb-4">Data Management</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Button variant="outline" onClick={handleExportData}>
						<FiDownload className="h-4 w-4 mr-2" />
						Export Data
					</Button>
					<Button variant="outline" onClick={handleImportData}>
						<FiUpload className="h-4 w-4 mr-2" />
						Import Data
					</Button>
					<Button variant="destructive" onClick={handleDeleteAccount}>
						<FiTrash2 className="h-4 w-4 mr-2" />
						Delete Account
					</Button>
				</div>
			</Card>

			{/* Danger Zone */}
			<Card className="p-6 border-red-200">
				<div className="flex items-center space-x-2 mb-4">
					<FiAlertTriangle className="h-5 w-5 text-red-600" />
					<h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
				</div>
				<p className="text-sm text-muted-foreground mb-4">
					These actions are irreversible. Please be careful.
				</p>
				<div className="space-y-2">
					<Button variant="destructive" onClick={handleDeleteAccount}>
						<FiTrash2 className="h-4 w-4 mr-2" />
						Delete Account Permanently
					</Button>
				</div>
			</Card>
		</div>
	);
}
