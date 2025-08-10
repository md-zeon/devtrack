import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

// GET /api/projects - Get all projects for the authenticated user
export async function GET(request) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
		
		const projects = await projectsCollection
			.find({ userId: new ObjectId(session.user.id) })
			.sort({ updatedAt: -1 })
			.toArray();

		// Calculate statistics for each project
		for (let project of projects) {
			const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
			const tasks = await tasksCollection.find({ projectId: project._id }).toArray();
			
			project.totalTasks = tasks.length;
			project.completedTasks = tasks.filter(task => task.completed).length;
			project.progress = project.totalTasks > 0 ? Math.round((project.completedTasks / project.totalTasks) * 100) : 0;
			project.timeSpent = tasks.reduce((total, task) => total + (task.timeSpent || 0), 0);
		}

		return NextResponse.json(projects);

	} catch (error) {
		console.error("Error fetching projects:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// POST /api/projects - Create a new project
export async function POST(request) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const data = await request.json();
		
		// Validate required fields
		const errors = validateProject(data);
		if (errors.length > 0) {
			return NextResponse.json({ error: errors[0] }, { status: 400 });
		}

		const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
		
		const project = {
			...defaultProject,
			...data,
			userId: new ObjectId(session.user.id),
			teamMembers: data.teamMembers ? data.teamMembers.map(id => new ObjectId(id)) : [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const result = await projectsCollection.insertOne(project);
		
		return NextResponse.json({
			_id: result.insertedId,
			...project
		}, { status: 201 });

	} catch (error) {
		console.error("Error creating project:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
