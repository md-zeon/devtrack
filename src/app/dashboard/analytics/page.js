"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	FiTrendingUp,
	FiTrendingDown,
	FiBarChart2,
	FiPieChart,
	FiActivity,
	FiClock,
	FiTarget,
	FiUsers
} from "react-icons/fi";

// Mock analytics data
const metrics = [
	{
		title: "Productivity Score",
		value: "87%",
		change: "+12%",
		trend: "up",
		description: "vs last month"
	},
	{
		title: "Tasks Completed",
		value: "156",
		change: "+24",
		trend: "up",
		description: "this month"
	},
	{
		title: "Average Task Time",
		value: "2.4h",
		change: "-0.3h",
		trend: "down",
		description: "vs last month"
	},
	{
		title: "Project Velocity",
		value: "12.5",
		change: "+2.1",
		trend: "up",
		description: "tasks per week"
	}
];

const projectPerformance = [
	{
		name: "E-commerce Platform",
		completionRate: 92,
		tasksCompleted: 24,
		totalTasks: 26,
		timeSpent: "120h",
		efficiency: "High"
	},
	{
		name: "Mobile App Redesign",
		completionRate: 88,
		tasksCompleted: 18,
		totalTasks: 20,
		timeSpent: "85h",
		efficiency: "High"
	},
	{
		name: "Blog System",
		completionRate: 65,
		tasksCompleted: 13,
		totalTasks: 20,
		timeSpent: "45h",
		efficiency: "Medium"
	},
	{
		name: "API Documentation",
		completionRate: 40,
		tasksCompleted: 4,
		totalTasks: 10,
		timeSpent: "20h",
		efficiency: "Low"
	}
];

const timeDistribution = [
	{ category: "Development", percentage: 45, hours: "54h" },
	{ category: "Design", percentage: 25, hours: "30h" },
	{ category: "Testing", percentage: 15, hours: "18h" },
	{ category: "Meetings", percentage: 10, hours: "12h" },
	{ category: "Documentation", percentage: 5, hours: "6h" }
];

const getEfficiencyColor = (efficiency) => {
	switch (efficiency.toLowerCase()) {
		case 'high':
			return 'bg-green-100 text-green-800';
		case 'medium':
			return 'bg-yellow-100 text-yellow-800';
		case 'low':
			return 'bg-red-100 text-red-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};

export default function AnalyticsPage() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
					<p className="text-muted-foreground mt-2">
						Track your productivity and project performance over time.
					</p>
				</div>
				<div className="flex items-center space-x-2 mt-4 md:mt-0">
					<Select defaultValue="30d">
						<SelectTrigger className="w-[140px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7d">Last 7 days</SelectItem>
							<SelectItem value="30d">Last 30 days</SelectItem>
							<SelectItem value="90d">Last 90 days</SelectItem>
							<SelectItem value="1y">Last year</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline">
						Export Report
					</Button>
				</div>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{metrics.map((metric, index) => (
					<Card key={index} className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">{metric.title}</p>
								<p className="text-2xl font-bold">{metric.value}</p>
								<div className="flex items-center mt-1">
									{metric.trend === 'up' ? (
										<FiTrendingUp className="h-4 w-4 text-green-600 mr-1" />
									) : (
										<FiTrendingDown className="h-4 w-4 text-red-600 mr-1" />
									)}
									<span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
										{metric.change}
									</span>
									<span className="text-xs text-muted-foreground ml-1">{metric.description}</span>
								</div>
							</div>
							<div className="bg-blue-100 p-3 rounded-lg">
								<FiActivity className="h-6 w-6 text-blue-600" />
							</div>
						</div>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Project Performance */}
				<Card className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold">Project Performance</h2>
						<FiBarChart2 className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="space-y-4">
						{projectPerformance.map((project, index) => (
							<div key={index} className="p-4 border rounded-lg">
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-medium">{project.name}</h3>
									<Badge className={getEfficiencyColor(project.efficiency)}>
										{project.efficiency}
									</Badge>
								</div>
								<div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
									<span>{project.tasksCompleted}/{project.totalTasks} tasks completed</span>
									<span>{project.timeSpent} spent</span>
								</div>
								<div className="flex items-center justify-between text-xs mb-2">
									<span>Completion Rate</span>
									<span className="font-medium">{project.completionRate}%</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div 
										className="bg-blue-600 h-2 rounded-full" 
										style={{ width: `${project.completionRate}%` }}
									></div>
								</div>
							</div>
						))}
					</div>
				</Card>

				{/* Time Distribution */}
				<Card className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold">Time Distribution</h2>
						<FiPieChart className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="space-y-4">
						{timeDistribution.map((item, index) => (
							<div key={index} className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div 
										className="w-4 h-4 rounded"
										style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
									></div>
									<span className="text-sm font-medium">{item.category}</span>
								</div>
								<div className="flex items-center space-x-2 text-sm text-muted-foreground">
									<span>{item.hours}</span>
									<span>({item.percentage}%)</span>
								</div>
							</div>
						))}
					</div>
					
					{/* Chart Placeholder */}
					<div className="mt-6 text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
						<FiPieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
						<p className="text-muted-foreground">
							Pie chart will be implemented with a charting library like Chart.js or Recharts
						</p>
					</div>
				</Card>
			</div>

			{/* Weekly Activity */}
			<Card className="p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold">Weekly Activity</h2>
					<FiActivity className="h-5 w-5 text-muted-foreground" />
				</div>
				
				{/* Activity Chart Placeholder */}
				<div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-lg">
					<FiBarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
					<h3 className="text-lg font-medium mb-2">Activity Chart</h3>
					<p className="text-muted-foreground">
						Line/bar chart showing daily activity will be implemented with a charting library
					</p>
				</div>
			</Card>

			{/* Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="p-6 text-center">
					<FiTarget className="h-8 w-8 text-blue-600 mx-auto mb-3" />
					<h3 className="font-semibold mb-1">Goals Achieved</h3>
					<p className="text-2xl font-bold text-blue-600">8/10</p>
					<p className="text-sm text-muted-foreground">This month</p>
				</Card>
				
				<Card className="p-6 text-center">
					<FiClock className="h-8 w-8 text-green-600 mx-auto mb-3" />
					<h3 className="font-semibold mb-1">Avg. Daily Hours</h3>
					<p className="text-2xl font-bold text-green-600">6.2h</p>
					<p className="text-sm text-muted-foreground">Last 30 days</p>
				</Card>
				
				<Card className="p-6 text-center">
					<FiUsers className="h-8 w-8 text-purple-600 mx-auto mb-3" />
					<h3 className="font-semibold mb-1">Team Collaboration</h3>
					<p className="text-2xl font-bold text-purple-600">94%</p>
					<p className="text-sm text-muted-foreground">Response rate</p>
				</Card>
			</div>
		</div>
	);
}
