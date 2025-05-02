import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", (err as Error).message);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, role, text } = await req.json();
    if (!name || !role || !text) {
      return NextResponse.json(
        { error: "Name, role, and text are required" },
        { status: 400 }
      );
    }

    const count = await prisma.review.count();
    console.log("Supabase review count is:", count);

    const review = await prisma.review.create({
      data: { name, role, text },
    });

    console.log("Created Review:", review);
    return NextResponse.json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
