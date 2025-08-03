import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

// GET /api/tasks/[id] - Get a specific task
export async function GET(request, { params }) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = params;
		
		if (!ObjectId.isValid(id)) {
			return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
		}

		const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
		
		const task = await tasksCollection.findOne({
			_id: new ObjectId(id),
			userId: new ObjectId(session.user.id)
		});

		if (!task) {
			return NextResponse.json({ error: "Task not found" }, { status: 404 });
		}

		// Populate project information
		if (task.projectId) {
			const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
			const project = await projectsCollection.findOne({ _id: task.projectId });
			task.project = project ? project.name : "Unknown Project";
		}

		return NextResponse.json(task);

	} catch (error) {
		console.error("Error fetching task:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// PUT /api/tasks/[id] - Update a task
export async function PUT(request, { params }) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = params;
		
		if (!ObjectId.isValid(id)) {
			return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
		}

		const data = await request.json();
		
		// Validate request body
		if (!data || Object.keys(data).length === 0) {
			return NextResponse.json({ error: "No data provided" }, { status: 400 });
		}
		
		// Validate fields if provided
		if (data.status && !['todo', 'in progress', 'review', 'completed'].includes(data.status)) {
			return NextResponse.json({ error: "Invalid status" }, { status: 400 });
		}
		
		if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
			return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
		}

		await client.connect();
		const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
		
		const updateData = {
			...data,
			updatedAt: new Date(),
		};

		// Handle completion
		if (data.completed !== undefined) {
			updateData.completed = data.completed;
			updateData.status = data.completed ? 'completed' : 'todo';
			if (data.completed) {
				updateData.completedAt = new Date();
			} else {
				// Remove completedAt field when uncompleting
				updateData.completedAt = null;
			}
		}

		// Convert dates
		if (data.dueDate) {
			updateData.dueDate = new Date(data.dueDate);
		}

		// Convert ObjectIds
		if (data.projectId) {
			updateData.projectId = new ObjectId(data.projectId);
		}
		if (data.assigneeId) {
			updateData.assigneeId = new ObjectId(data.assigneeId);
		}

		const result = await tasksCollection.updateOne(
			{ 
				_id: new ObjectId(id),
				userId: new ObjectId(session.user.id)
			},
			{ $set: updateData }
		);

		if (result.matchedCount === 0) {
			return NextResponse.json({ error: "Task not found" }, { status: 404 });
		}

		// Return updated task
		const updatedTask = await tasksCollection.findOne({
			_id: new ObjectId(id),
			userId: new ObjectId(session.user.id)
		});

		return NextResponse.json(updatedTask);

	} catch (error) {
		console.error("Error updating task:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(request, { params }) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = params;
		
		if (!ObjectId.isValid(id)) {
			return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
		}

		const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
		
		const result = await tasksCollection.deleteOne({
			_id: new ObjectId(id),
			userId: new ObjectId(session.user.id)
		});

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: "Task not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Task deleted successfully" });

	} catch (error) {
		console.error("Error deleting task:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
