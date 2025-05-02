import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Update Lead
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  const updated = await prisma.lead.update({
    where: { id: params.id },
    data: { name, email, subject, message },
  });

  return NextResponse.json(updated);
}

// Delete Lead
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  // Convert 'id' from string to number
  const id = params.id; // Keep 'id' as a string

  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
