import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Update review
export async function PUT(req: NextRequest) {
  try {
    const id = parseInt(req.nextUrl.pathname.split("/").pop() || "", 10);
    const { name, role, text } = await req.json();

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { name, role, text },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error updating review:", err);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// Delete review
export async function DELETE(req: NextRequest) {
  try {
    const id = parseInt(req.nextUrl.pathname.split("/").pop() || "", 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting review:", err);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
