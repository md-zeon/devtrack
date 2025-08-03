"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	FiBarChart2,
	FiActivity,
	FiClock,
	FiTarget,
	FiUsers,
	FiTrendingUp,
	FiZap,
	FiCalendar
} from "react-icons/fi";



export default function AnalyticsPage() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
					<p className="text-muted-foreground mt-2">
						Advanced analytics and insights for your development workflow.
					</p>
				</div>
				<Badge variant="outline" className="text-yellow-600 border-yellow-600">
					<FiZap className="h-3 w-3 mr-1" />
					Coming Soon
				</Badge>
			</div>

			{/* Coming Soon Card */}
			<Card className="p-12">
				<div className="text-center space-y-6">
					<div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
						<FiBarChart2 className="h-12 w-12 text-white" />
					</div>
					
					<div className="space-y-3">
						<h2 className="text-3xl font-bold">Advanced Analytics</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							We're building powerful analytics to help you track productivity, analyze patterns, and optimize your workflow.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
						<div className="p-6 border rounded-lg">
							<FiTrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
							<h3 className="font-semibold mb-2">Performance Metrics</h3>
							<p className="text-sm text-muted-foreground">
								Track your productivity trends, completion rates, and time efficiency across projects.
							</p>
						</div>
						
						<div className="p-6 border rounded-lg">
							<FiTarget className="h-8 w-8 text-blue-600 mx-auto mb-3" />
							<h3 className="font-semibold mb-2">Goal Tracking</h3>
							<p className="text-sm text-muted-foreground">
								Set and monitor goals with visual progress indicators and achievement milestones.
							</p>
						</div>
						
						<div className="p-6 border rounded-lg">
							<FiCalendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
							<h3 className="font-semibold mb-2">Time Analysis</h3>
							<p className="text-sm text-muted-foreground">
								Detailed breakdowns of time spent across projects, tasks, and different work categories.
							</p>
						</div>
					</div>

					<div className="pt-6">
						<p className="text-lg font-medium text-muted-foreground mb-4">
							Expected Features:
						</p>
						<div className="flex flex-wrap justify-center gap-3">
							<Badge variant="secondary">📊 Interactive Charts</Badge>
							<Badge variant="secondary">⏱️ Time Tracking</Badge>
							<Badge variant="secondary">🎯 Goal Setting</Badge>
							<Badge variant="secondary">📈 Productivity Insights</Badge>
							<Badge variant="secondary">📅 Weekly/Monthly Reports</Badge>
							<Badge variant="secondary">🔍 Custom Filters</Badge>
							<Badge variant="secondary">📄 Export Reports</Badge>
							<Badge variant="secondary">🚀 Performance Optimization</Badge>
						</div>
					</div>

					<div className="pt-8">
						<div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
							<h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
								🚧 Under Development
							</h3>
							<p className="text-blue-700 dark:text-blue-300 text-sm">
								This feature is currently being developed and will be available in a future update. 
								We're working hard to bring you comprehensive analytics to boost your productivity!
							</p>
						</div>
					</div>
				</div>
			</Card>


		</div>
	);
}
