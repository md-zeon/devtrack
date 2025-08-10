import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

// GET /api/tasks - Get all tasks for the authenticated user
export async function GET(request) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const projectId = searchParams.get("projectId");
		const status = searchParams.get("status");
		const completed = searchParams.get("completed");

		const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
		
		// Build query
		let query = { userId: new ObjectId(session.user.id) };
		
		if (projectId && ObjectId.isValid(projectId)) {
			query.projectId = new ObjectId(projectId);
		}
		
		if (status) {
			query.status = status;
		}
		
		if (completed !== null && completed !== undefined) {
			query.completed = completed === "true";
		}

		const tasks = await tasksCollection
			.find(query)
			.sort({ updatedAt: -1 })
			.toArray();

		// Populate project information
		const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
		for (let task of tasks) {
			if (task.projectId) {
				const project = await projectsCollection.findOne({ _id: task.projectId });
				task.project = project ? project.name : "Unknown Project";
			}
		}

		return NextResponse.json(tasks);

	} catch (error) {
		console.error("Error fetching tasks:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// POST /api/tasks - Create a new task
export async function POST(request) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const data = await request.json();
		
		// Validate required fields
		const errors = validateTask(data);
		if (errors.length > 0) {
			return NextResponse.json({ error: errors[0] }, { status: 400 });
		}

		// Verify project exists and belongs to user
		if (data.projectId) {
			const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
			const project = await projectsCollection.findOne({
				_id: new ObjectId(data.projectId),
				userId: new ObjectId(session.user.id)
			});

			if (!project) {
				return NextResponse.json({ error: "Project not found" }, { status: 404 });
			}
		}

		const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
		
		const task = {
			...defaultTask,
			...data,
			userId: new ObjectId(session.user.id),
			projectId: data.projectId ? new ObjectId(data.projectId) : null,
			assigneeId: data.assigneeId ? new ObjectId(data.assigneeId) : new ObjectId(session.user.id),
			dueDate: data.dueDate ? new Date(data.dueDate) : null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const result = await tasksCollection.insertOne(task);
		
		return NextResponse.json({
			_id: result.insertedId,
			...task
		}, { status: 201 });

	} catch (error) {
		console.error("Error creating task:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
