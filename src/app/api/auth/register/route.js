import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(request) {
	try {
		const { name, email, password } = await request.json();

		// Validation
		if (!name || !email || !password) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		if (password.length < 8) {
			return NextResponse.json(
				{ error: "Password must be at least 8 characters long" },
				{ status: 400 }
			);
		}

		const usersCollection = client.db(process.env.DB_NAME).collection("users");

		// Check if user already exists
		const existingUser = await usersCollection.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists with this email" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create user
		const result = await usersCollection.insertOne({
			name,
			email,
			password: hashedPassword,
			image: null,
			provider: "credentials",
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json(
			{ 
				message: "User created successfully",
				userId: result.insertedId 
			},
			{ status: 201 }
		);

	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
