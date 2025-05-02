import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Update Lead
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // Extract ID from URL
  const { name, email, subject, message } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: { name, email, subject, message },
  });

  return NextResponse.json(updated);
}

// Delete Lead
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // Extract ID from URL

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
