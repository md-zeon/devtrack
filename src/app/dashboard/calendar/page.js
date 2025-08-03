"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import {
	FiCalendar,
	FiClock,
	FiPlus,
	FiChevronLeft,
	FiChevronRight,
	FiLoader,
	FiTarget,
	FiFlag
} from "react-icons/fi";

const getEventTypeColor = (type) => {
	switch (type) {
		case 'project-deadline':
			return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
		case 'task-deadline':
			return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
		case 'project-start':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
		case 'overdue':
			return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
		default:
			return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
	}
};

const getEventIcon = (type) => {
	switch (type) {
		case 'project-deadline':
		case 'project-start':
			return FiTarget;
		case 'task-deadline':
			return FiFlag;
		case 'overdue':
			return FiClock;
		default:
			return FiCalendar;
	}
};

export default function CalendarPage() {
	const { data: projects = [], isLoading: projectsLoading } = useProjects();
	const { data: tasks = [], isLoading: tasksLoading } = useTasks();
	const [currentDate, setCurrentDate] = useState(new Date());
	
	const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

	// Generate events from projects and tasks
	const events = useMemo(() => {
		const calendarEvents = [];
		const today = new Date();
		
		// Add project deadlines and start dates
		projects.forEach(project => {
			if (project.endDate) {
				const endDate = new Date(project.endDate);
				const isOverdue = endDate < today && project.status !== 'completed';
				calendarEvents.push({
					id: `project-end-${project._id}`,
					title: `${project.name} - Deadline`,
					project: project.name,
					date: endDate.toISOString().split('T')[0],
					time: "End of Day",
					type: isOverdue ? 'overdue' : 'project-deadline',
					priority: project.priority,
					status: project.status
				});
			}
			
			if (project.startDate) {
				const startDate = new Date(project.startDate);
				calendarEvents.push({
					id: `project-start-${project._id}`,
					title: `${project.name} - Start Date`,
					project: project.name,
					date: startDate.toISOString().split('T')[0],
					time: "Start of Day",
					type: 'project-start',
					priority: project.priority,
					status: project.status
				});
			}
		});

		// Add task deadlines
		tasks.forEach(task => {
			if (task.dueDate && !task.completed) {
				const dueDate = new Date(task.dueDate);
				const isOverdue = dueDate < today;
				const projectName = projects.find(p => p._id === task.projectId)?.name || 'Unknown Project';
				
				calendarEvents.push({
					id: `task-${task._id}`,
					title: task.title,
					project: projectName,
					date: dueDate.toISOString().split('T')[0],
					time: "Due",
					type: isOverdue ? 'overdue' : 'task-deadline',
					priority: task.priority,
					status: task.status
				});
			}
		});

		// Sort events by date
		return calendarEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
	}, [projects, tasks]);

	// Get today's events
	const todayEvents = useMemo(() => {
		const today = new Date().toISOString().split('T')[0];
		return events.filter(event => event.date === today);
	}, [events]);

	// Get upcoming events (next 7 days)
	const upcomingEvents = useMemo(() => {
		const today = new Date();
		const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
		return events.filter(event => {
			const eventDate = new Date(event.date);
			return eventDate >= today && eventDate <= nextWeek;
		}).slice(0, 5); // Limit to 5 events
	}, [events]);

	const handleNewEvent = () => {
		console.log("Create new event");
	};

	const isLoading = projectsLoading || tasksLoading;

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
						<p className="text-muted-foreground mt-2">
							Schedule and track your project milestones and deadlines.
						</p>
					</div>
				</div>
				<div className="flex items-center justify-center h-40">
					<FiLoader className="h-8 w-8 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
					<p className="text-muted-foreground mt-2">
						Schedule and track your project milestones and deadlines.
					</p>
				</div>
				<Button onClick={handleNewEvent} className="mt-4 md:mt-0">
					<FiPlus className="h-4 w-4 mr-2" />
					New Event
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Calendar Widget */}
				<div className="lg:col-span-2">
					<Card className="p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-semibold">{currentMonth}</h2>
							<div className="flex items-center space-x-2">
								<Button variant="outline" size="sm">
									<FiChevronLeft className="h-4 w-4" />
								</Button>
								<Button variant="outline" size="sm">
									Today
								</Button>
								<Button variant="outline" size="sm">
									<FiChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>

						{/* Calendar Grid Placeholder */}
						<div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-lg">
							<FiCalendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-medium mb-2">Calendar Component</h3>
							<p className="text-muted-foreground">
								Full calendar component will be implemented with a calendar library like react-big-calendar or @fullcalendar
							</p>
						</div>
					</Card>
				</div>

				{/* Upcoming Events */}
				<div className="space-y-6">
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
						<div className="space-y-4">
							{upcomingEvents.length > 0 ? upcomingEvents.map((event) => {
								const EventIcon = getEventIcon(event.type);
								return (
									<div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
										<div className="flex items-start justify-between mb-2">
											<div className="flex items-start space-x-2">
												<EventIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
												<h3 className="font-medium text-sm">{event.title}</h3>
											</div>
											<Badge className={getEventTypeColor(event.type)}>
												{event.type.replace('-', ' ')}
											</Badge>
										</div>
										<p className="text-xs text-muted-foreground mb-2 ml-6">{event.project}</p>
										<div className="flex items-center text-xs text-muted-foreground ml-6">
											<FiCalendar className="h-3 w-3 mr-1" />
											<span className="mr-3">{new Date(event.date).toLocaleDateString()}</span>
											<FiClock className="h-3 w-3 mr-1" />
											<span>{event.time}</span>
											{event.priority && (
												<>
													<span className="mx-2">•</span>
													<span className="capitalize">{event.priority} priority</span>
												</>
											)}
										</div>
									</div>
								);
							}) : (
								<div className="text-center py-8">
									<FiCalendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
									<p className="text-sm text-muted-foreground">No upcoming events</p>
									<p className="text-xs text-muted-foreground mt-1">
										Events will appear when you set deadlines for projects and tasks
									</p>
								</div>
							)}
						</div>
					</Card>

					{/* Today's Schedule */}
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
						<div className="space-y-3">
							{todayEvents.length > 0 ? todayEvents.map((event) => {
								const EventIcon = getEventIcon(event.type);
								return (
									<div key={event.id} className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
										<div className="flex items-start space-x-2 mb-2">
											<EventIcon className="h-4 w-4 mt-0.5 text-blue-600" />
											<div className="flex-1">
												<h3 className="font-medium text-sm">{event.title}</h3>
												<p className="text-xs text-muted-foreground">{event.project}</p>
											</div>
											<Badge className={getEventTypeColor(event.type)}>
												{event.type.replace('-', ' ')}
											</Badge>
										</div>
									</div>
								);
							}) : (
								<div className="text-center py-4">
									<p className="text-sm text-muted-foreground mb-3">
										No events scheduled for today
									</p>
									<Button variant="outline" size="sm" className="w-full" onClick={handleNewEvent}>
										<FiPlus className="h-4 w-4 mr-2" />
										Add Event
									</Button>
								</div>
							)}
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
