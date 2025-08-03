import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

// GET /api/user/profile - Get user profile
export async function GET(request) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const usersCollection = client.db(process.env.DB_NAME).collection("users");
		
		const user = await usersCollection.findOne(
			{ _id: new ObjectId(session.user.id) },
			{ projection: { password: 0 } } // Exclude password
		);

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Get user statistics
		const projectsCollection = client.db(process.env.DB_NAME).collection("projects");
		const tasksCollection = client.db(process.env.DB_NAME).collection("tasks");
		
		const totalProjects = await projectsCollection.countDocuments({ userId: new ObjectId(session.user.id) });
		const totalTasks = await tasksCollection.countDocuments({ userId: new ObjectId(session.user.id) });
		const completedTasks = await tasksCollection.countDocuments({ 
			userId: new ObjectId(session.user.id), 
			completed: true 
		});
		
		// Calculate total time logged
		const tasks = await tasksCollection.find({ userId: new ObjectId(session.user.id) }).toArray();
		const totalTimeLogged = tasks.reduce((total, task) => total + (task.timeSpent || 0), 0);

		const stats = {
			totalProjects,
			totalTasks,
			completedTasks,
			totalTimeLogged,
			completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
		};

		return NextResponse.json({
			...user,
			stats
		});

	} catch (error) {
		console.error("Error fetching user profile:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

// PUT /api/user/profile - Update user profile
export async function PUT(request) {
	try {
		const session = await getServerSession(authOptions);
		
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const data = await request.json();
		
		// Remove sensitive fields that shouldn't be updated via this endpoint
		const { password, email, _id, createdAt, ...updateData } = data;
		
		updateData.updatedAt = new Date();

		const usersCollection = client.db(process.env.DB_NAME).collection("users");
		
		const result = await usersCollection.updateOne(
			{ _id: new ObjectId(session.user.id) },
			{ $set: updateData }
		);

		if (result.matchedCount === 0) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Return updated user profile (without password)
		const updatedUser = await usersCollection.findOne(
			{ _id: new ObjectId(session.user.id) },
			{ projection: { password: 0 } }
		);

		return NextResponse.json(updatedUser);

	} catch (error) {
		console.error("Error updating user profile:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
