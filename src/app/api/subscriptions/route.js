import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to subscribe" },
        { status: 401 }
      );
    }
    
    const { plan, billingPeriod, amount } = await request.json();
    
    if (!plan || !billingPeriod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Connect to database
    const { db } = await dbConnect();
    
    // Create subscription record
    const subscription = {
      userId: session.user.id,
      plan,
      billingPeriod,
      amount: parseFloat(amount),
      status: "active",
      startDate: new Date(),
      endDate: calculateEndDate(billingPeriod),
      createdAt: new Date(),
    };
    
    await db.collection("subscriptions").insertOne(subscription);
    
    // Update user with subscription info
    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      { 
        $set: { 
          subscription: {
            plan,
            billingPeriod,
            status: "active",
            startDate: subscription.startDate,
            endDate: subscription.endDate,
          }
        } 
      }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: "Subscription created successfully",
      subscription
    });
    
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to view subscriptions" },
        { status: 401 }
      );
    }
    
    // Connect to database
    const { db } = await dbConnect();
    
    // Get user's active subscription
    const subscription = await db.collection("subscriptions").findOne({
      userId: session.user.id,
      status: "active",
    });
    
    // Get subscription history
    const history = await db.collection("subscriptions")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ 
      subscription,
      history
    });
    
  } catch (error) {
    console.error("Get subscription error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve subscription information" },
      { status: 500 }
    );
  }
}

// Helper function to calculate subscription end date
function calculateEndDate(billingPeriod) {
  const now = new Date();
  const endDate = new Date(now);
  
  if (billingPeriod === "monthly") {
    endDate.setMonth(now.getMonth() + 1);
  } else if (billingPeriod === "yearly") {
    endDate.setFullYear(now.getFullYear() + 1);
  }
  
  return endDate;
}