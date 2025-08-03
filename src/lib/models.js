// Database schema definitions and utility functions

export const UserSchema = {
	_id: "ObjectId",
	name: "string",
	email: "string (unique)",
	password: "string (hashed)", // Only for credentials provider
	image: "string (optional)",
	provider: "string", // google, github, credentials
	createdAt: "Date",
	updatedAt: "Date",
	// Profile fields
	title: "string (optional)",
	bio: "string (optional)", 
	location: "string (optional)",
	website: "string (optional)",
	github: "string (optional)",
	linkedin: "string (optional)",
	twitter: "string (optional)",
	skills: "array of strings (optional)",
	timezone: "string (optional)",
	preferences: "object (optional)"
};

export const ProjectSchema = {
	_id: "ObjectId",
	name: "string",
	description: "string",
	status: "string", // planning, in progress, review, completed, paused
	priority: "string", // low, medium, high
	userId: "ObjectId", // Reference to user
	teamMembers: "array of ObjectIds", // References to users
	technologies: "array of strings",
	dueDate: "Date (optional)",
	createdAt: "Date",
	updatedAt: "Date",
	completedAt: "Date (optional)",
	// Calculated fields (computed from tasks)
	progress: "number", // 0-100
	totalTasks: "number",
	completedTasks: "number",
	timeSpent: "number", // in minutes
	estimatedTime: "number" // in minutes
};

export const TaskSchema = {
	_id: "ObjectId",
	title: "string",
	description: "string",
	status: "string", // todo, in progress, review, completed
	priority: "string", // low, medium, high
	projectId: "ObjectId", // Reference to project
	userId: "ObjectId", // Reference to user (creator)
	assigneeId: "ObjectId", // Reference to user (assigned to)
	tags: "array of strings",
	dueDate: "Date (optional)",
	createdAt: "Date",
	updatedAt: "Date",
	completedAt: "Date (optional)",
	estimatedTime: "number", // in minutes
	timeSpent: "number", // in minutes
	completed: "boolean"
};

export const TimeLogSchema = {
	_id: "ObjectId",
	userId: "ObjectId",
	projectId: "ObjectId",
	taskId: "ObjectId (optional)",
	duration: "number", // in minutes
	description: "string (optional)",
	date: "Date",
	createdAt: "Date"
};

// Utility functions for data validation
export const validateProject = (data) => {
	const errors = [];
	
	if (!data.name || data.name.trim().length === 0) {
		errors.push("Project name is required");
	}
	
	if (!data.description || data.description.trim().length === 0) {
		errors.push("Project description is required");
	}
	
	if (!['planning', 'in progress', 'review', 'completed', 'paused'].includes(data.status)) {
		errors.push("Invalid status");
	}
	
	if (!['low', 'medium', 'high'].includes(data.priority)) {
		errors.push("Invalid priority");
	}
	
	return errors;
};

export const validateTask = (data) => {
	const errors = [];
	
	if (!data.title || data.title.trim().length === 0) {
		errors.push("Task title is required");
	}
	
	if (!data.projectId) {
		errors.push("Project ID is required");
	}
	
	if (!['todo', 'in progress', 'review', 'completed'].includes(data.status)) {
		errors.push("Invalid status");
	}
	
	if (!['low', 'medium', 'high'].includes(data.priority)) {
		errors.push("Invalid priority");
	}
	
	return errors;
};

// Default values
export const defaultProject = {
	status: 'planning',
	priority: 'medium',
	technologies: [],
	teamMembers: [],
	progress: 0,
	totalTasks: 0,
	completedTasks: 0,
	timeSpent: 0,
	estimatedTime: 0
};

export const defaultTask = {
	status: 'todo',
	priority: 'medium',
	tags: [],
	completed: false,
	timeSpent: 0,
	estimatedTime: 120 // 2 hours default
};
