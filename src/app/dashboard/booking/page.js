"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "sonner";
import { 
	Calendar, 
	Clock, 
	User, 
	Target,
	CheckCircle,
	AlertCircle
} from "lucide-react";
import {
	FiCalendar,
	FiClock,
	FiUser,
	FiTarget,
	FiCheckCircle,
	FiAlertCircle,
	FiLoader
} from "react-icons/fi";

export const metadata = {
	title: "Time Booking",
	description: "Book time slots for your projects and tasks to better manage your development schedule.",
};

export default function BookingPage() {
	const { data: projects = [], isLoading: projectsLoading } = useProjects();
	const { data: tasks = [] } = useTasks();
	const [bookingData, setBookingData] = useState({
		type: 'project', // 'project' or 'task'
		projectId: '',
		taskId: '',
		date: '',
		startTime: '',
		endTime: '',
		duration: '',
		description: '',
		priority: 'medium'
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [bookings, setBookings] = useState([
		// Mock existing bookings
		{
			id: 1,
			type: 'project',
			projectName: 'E-commerce Platform',
			date: '2024-12-20',
			startTime: '09:00',
			endTime: '12:00',
			duration: '3 hours',
			status: 'confirmed'
		},
		{
			id: 2,
			type: 'task',
			taskName: 'API Documentation Update',
			date: '2024-12-21',
			startTime: '14:00',
			endTime: '16:30',
			duration: '2.5 hours',
			status: 'pending'
		}
	]);

	const handleInputChange = (field, value) => {
		setBookingData(prev => ({ ...prev, [field]: value }));
		
		// Auto-calculate duration when start and end times are set
		if (field === 'startTime' || field === 'endTime') {
			const { startTime, endTime } = { ...bookingData, [field]: value };
			if (startTime && endTime) {
				const start = new Date(`2000-01-01T${startTime}:00`);
				const end = new Date(`2000-01-01T${endTime}:00`);
				const diffMs = end - start;
				const diffHours = diffMs / (1000 * 60 * 60);
				if (diffHours > 0) {
					setBookingData(prev => ({ ...prev, duration: `${diffHours} hours` }));
				}
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Validation
		if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
			toast.error("Please fill in all required fields");
			setIsSubmitting(false);
			return;
		}

		if (bookingData.type === 'project' && !bookingData.projectId) {
			toast.error("Please select a project");
			setIsSubmitting(false);
			return;
		}

		if (bookingData.type === 'task' && !bookingData.taskId) {
			toast.error("Please select a task");
			setIsSubmitting(false);
			return;
		}

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1500));
			
			// Create new booking
			const selectedProject = projects.find(p => p._id === bookingData.projectId);
			const selectedTask = tasks.find(t => t._id === bookingData.taskId);
			
			const newBooking = {
				id: bookings.length + 1,
				type: bookingData.type,
				projectName: selectedProject?.name,
				taskName: selectedTask?.title,
				date: bookingData.date,
				startTime: bookingData.startTime,
				endTime: bookingData.endTime,
				duration: bookingData.duration,
				description: bookingData.description,
				priority: bookingData.priority,
				status: 'confirmed'
			};

			setBookings(prev => [newBooking, ...prev]);
			
			// Reset form
			setBookingData({
				type: 'project',
				projectId: '',
				taskId: '',
				date: '',
				startTime: '',
				endTime: '',
				duration: '',
				description: '',
				priority: 'medium'
			});

			toast.success("Time slot booked successfully!");
		} catch (error) {
			toast.error("Failed to book time slot");
		} finally {
			setIsSubmitting(false);
		}
	};

	const filteredTasks = tasks.filter(task => 
		bookingData.projectId ? task.projectId === bookingData.projectId : true
	);

	const getStatusColor = (status) => {
		switch (status) {
			case 'confirmed':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
			case 'cancelled':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Time Booking</h1>
					<p className="text-muted-foreground mt-2">
						Schedule dedicated time slots for your projects and tasks to optimize your productivity.
					</p>
				</div>
				<Badge variant="outline" className="text-blue-600 border-blue-600">
					<FiClock className="h-3 w-3 mr-1" />
					Time Management
				</Badge>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Booking Form */}
				<Card className="p-6">
					<h2 className="text-xl font-semibold mb-6">Book Time Slot</h2>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Booking Type */}
						<div className="space-y-2">
							<Label>Booking Type</Label>
							<Select value={bookingData.type} onValueChange={(value) => handleInputChange('type', value)}>
								<SelectTrigger>
									<SelectValue placeholder="Select booking type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="project">Project Work</SelectItem>
									<SelectItem value="task">Specific Task</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Project Selection */}
						{bookingData.type === 'project' && (
							<div className="space-y-2">
								<Label>Project</Label>
								<Select value={bookingData.projectId} onValueChange={(value) => handleInputChange('projectId', value)}>
									<SelectTrigger>
										<SelectValue placeholder="Select a project" />
									</SelectTrigger>
									<SelectContent>
										{projects.map((project) => (
											<SelectItem key={project._id} value={project._id}>
												{project.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{/* Task Selection */}
						{bookingData.type === 'task' && (
							<div className="space-y-2">
								<Label>Task</Label>
								<Select value={bookingData.taskId} onValueChange={(value) => handleInputChange('taskId', value)}>
									<SelectTrigger>
										<SelectValue placeholder="Select a task" />
									</SelectTrigger>
									<SelectContent>
										{filteredTasks.map((task) => (
											<SelectItem key={task._id} value={task._id}>
												{task.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}

						{/* Date */}
						<div className="space-y-2">
							<Label htmlFor="date">Date</Label>
							<Input
								id="date"
								type="date"
								value={bookingData.date}
								onChange={(e) => handleInputChange('date', e.target.value)}
								min={new Date().toISOString().split('T')[0]}
								required
							/>
						</div>

						{/* Time Range */}
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="startTime">Start Time</Label>
								<Input
									id="startTime"
									type="time"
									value={bookingData.startTime}
									onChange={(e) => handleInputChange('startTime', e.target.value)}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="endTime">End Time</Label>
								<Input
									id="endTime"
									type="time"
									value={bookingData.endTime}
									onChange={(e) => handleInputChange('endTime', e.target.value)}
									required
								/>
							</div>
						</div>

						{/* Duration (Auto-calculated) */}
						{bookingData.duration && (
							<div className="space-y-2">
								<Label>Duration</Label>
								<div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border">
									<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
										{bookingData.duration}
									</span>
								</div>
							</div>
						)}

						{/* Priority */}
						<div className="space-y-2">
							<Label>Priority</Label>
							<Select value={bookingData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
								<SelectTrigger>
									<SelectValue placeholder="Select priority" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="low">Low</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="high">High</SelectItem>
									<SelectItem value="urgent">Urgent</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Description */}
						<div className="space-y-2">
							<Label htmlFor="description">Description (Optional)</Label>
							<Textarea
								id="description"
								placeholder="Add any notes or specific goals for this time slot..."
								value={bookingData.description}
								onChange={(e) => handleInputChange('description', e.target.value)}
								rows={3}
							/>
						</div>

						{/* Submit Button */}
						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<FiLoader className="w-4 h-4 mr-2 animate-spin" />
									Booking Time Slot...
								</>
							) : (
								<>
									<FiCalendar className="w-4 h-4 mr-2" />
									Book Time Slot
								</>
							)}
						</Button>
					</form>
				</Card>

				{/* Existing Bookings */}
				<Card className="p-6">
					<h2 className="text-xl font-semibold mb-6">Your Bookings</h2>
					
					{bookings.length > 0 ? (
						<div className="space-y-4">
							{bookings.map((booking) => (
								<div key={booking.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
									<div className="flex items-start justify-between mb-3">
										<div>
											<h3 className="font-medium">
												{booking.type === 'project' ? booking.projectName : booking.taskName}
											</h3>
											<p className="text-sm text-muted-foreground capitalize">
												{booking.type} work
											</p>
										</div>
										<Badge className={getStatusColor(booking.status)}>
											{booking.status}
										</Badge>
									</div>
									
									<div className="space-y-2 text-sm">
										<div className="flex items-center space-x-2">
											<FiCalendar className="h-4 w-4 text-muted-foreground" />
											<span>{new Date(booking.date).toLocaleDateString()}</span>
										</div>
										<div className="flex items-center space-x-2">
											<FiClock className="h-4 w-4 text-muted-foreground" />
											<span>{booking.startTime} - {booking.endTime}</span>
											<span className="text-muted-foreground">({booking.duration})</span>
										</div>
										{booking.description && (
											<p className="text-muted-foreground text-xs mt-2">
												{booking.description}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">
							<FiCalendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
							<p className="text-muted-foreground">No bookings yet</p>
							<p className="text-sm text-muted-foreground mt-1">
								Book your first time slot to get started
							</p>
						</div>
					)}
				</Card>
			</div>

			{/* Tips Section */}
			<Card className="p-6">
				<h3 className="font-semibold mb-4">💡 Time Booking Tips</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
					<div className="flex items-start space-x-2">
						<FiTarget className="h-4 w-4 text-blue-600 mt-0.5" />
						<div>
							<p className="font-medium">Set Realistic Goals</p>
							<p className="text-muted-foreground">Book time slots based on your actual capacity and energy levels.</p>
						</div>
					</div>
					<div className="flex items-start space-x-2">
						<FiClock className="h-4 w-4 text-green-600 mt-0.5" />
						<div>
							<p className="font-medium">Time Blocking</p>
							<p className="text-muted-foreground">Dedicate specific time blocks to avoid context switching.</p>
						</div>
					</div>
					<div className="flex items-start space-x-2">
						<FiAlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
						<div>
							<p className="font-medium">Buffer Time</p>
							<p className="text-muted-foreground">Add 15-30 minutes buffer between bookings for breaks.</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
