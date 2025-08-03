"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	FiCalendar,
	FiClock,
	FiPlus,
	FiChevronLeft,
	FiChevronRight
} from "react-icons/fi";

// Mock data for calendar events
const events = [
	{
		id: 1,
		title: "Project Review Meeting",
		project: "E-commerce Platform",
		date: "2024-12-08",
		time: "10:00 AM",
		type: "meeting"
	},
	{
		id: 2,
		title: "Task Deadline: API Documentation",
		project: "API Documentation",
		date: "2024-12-10",
		time: "5:00 PM",
		type: "deadline"
	},
	{
		id: 3,
		title: "Sprint Planning",
		project: "Mobile App Redesign",
		date: "2024-12-12",
		time: "2:00 PM",
		type: "meeting"
	},
	{
		id: 4,
		title: "Code Review Session",
		project: "Blog System",
		date: "2024-12-15",
		time: "11:00 AM",
		type: "review"
	}
];

const getEventTypeColor = (type) => {
	switch (type) {
		case 'meeting':
			return 'bg-blue-100 text-blue-800';
		case 'deadline':
			return 'bg-red-100 text-red-800';
		case 'review':
			return 'bg-green-100 text-green-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};

export default function CalendarPage() {
	const currentDate = new Date();
	const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

	const handleNewEvent = () => {
		console.log("Create new event");
	};

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
							{events.map((event) => (
								<div key={event.id} className="p-3 border rounded-lg">
									<div className="flex items-start justify-between mb-2">
										<h3 className="font-medium text-sm">{event.title}</h3>
										<Badge className={getEventTypeColor(event.type)}>
											{event.type}
										</Badge>
									</div>
									<p className="text-xs text-muted-foreground mb-2">{event.project}</p>
									<div className="flex items-center text-xs text-muted-foreground">
										<FiCalendar className="h-3 w-3 mr-1" />
										<span className="mr-3">{event.date}</span>
										<FiClock className="h-3 w-3 mr-1" />
										<span>{event.time}</span>
									</div>
								</div>
							))}
						</div>
					</Card>

					{/* Today's Schedule */}
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
						<div className="space-y-3">
							<div className="text-sm text-muted-foreground">
								No events scheduled for today
							</div>
							<Button variant="outline" size="sm" className="w-full">
								<FiPlus className="h-4 w-4 mr-2" />
								Add Event
							</Button>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
