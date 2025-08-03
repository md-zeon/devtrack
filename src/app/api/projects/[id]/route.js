import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";
import { validateProject } from "@/lib/models";

const client = new MongoClient(process.env.MONGODB_URI);

// GET /api/projects/[id] - Get a specific project
export async function GET(request, { params }) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = params;
		
		if (!ObjectId.isValid(id)) {
			return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
		}

		const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
		
		const project = await projectsCollection.findOne({
			_id: new ObjectId(id),
			userId: new ObjectId(session.user.id)
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Get project statistics
		const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
		const tasks = await tasksCollection.find({ projectId: project._id }).toArray();
		
		project.totalTasks = tasks.length;
		project.completedTasks = tasks.filter(task => task.completed).length;
		project.progress = project.totalTasks > 0 ? Math.round((project.completedTasks / project.totalTasks) * 100) : 0;
		project.timeSpent = tasks.reduce((total, task) => total + (task.timeSpent || 0), 0);

		return NextResponse.json(project);

	} catch (error) {
		console.error("Error fetching project:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// PUT /api/projects/[id] - Update a project
export async function PUT(request, { params }) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = params;
		
		if (!ObjectId.isValid(id)) {
			return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
		}

		const data = await request.json();
		
		// Validate fields if provided
		if (data.status && !['planning', 'in progress', 'review', 'completed', 'paused'].includes(data.status)) {
			return NextResponse.json({ error: "Invalid status" }, { status: 400 });
		}
		
		if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
			return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
		}

		const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
		
		const updateData = {
			...data,
			updatedAt: new Date(),
		};

		// Convert team member IDs to ObjectIds if provided
		if (data.teamMembers) {
			updateData.teamMembers = data.teamMembers.map(id => new ObjectId(id));
		}

		const result = await projectsCollection.updateOne(
			{ 
				_id: new ObjectId(id),
				userId: new ObjectId(session.user.id)
			},
			{ $set: updateData }
		);

		if (result.matchedCount === 0) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Return updated project
		const updatedProject = await projectsCollection.findOne({
			_id: new ObjectId(id),
			userId: new ObjectId(session.user.id)
		});

		return NextResponse.json(updatedProject);

	} catch (error) {
		console.error("Error updating project:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(request, { params }) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = params;
		
		if (!ObjectId.isValid(id)) {
			return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
		}

		const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
		const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
		
		// Check if project exists and belongs to user
		const project = await projectsCollection.findOne({
			_id: new ObjectId(id),
			userId: new ObjectId(session.user.id)
		});

		if (!project) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Delete all tasks associated with the project
		await tasksCollection.deleteMany({ projectId: new ObjectId(id) });
		
		// Delete the project
		await projectsCollection.deleteOne({ _id: new ObjectId(id) });

		return NextResponse.json({ message: "Project deleted successfully" });

	} catch (error) {
		console.error("Error deleting project:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
