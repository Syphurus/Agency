import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { name, role, text } = body;

  // Convert 'id' to a number
  const id = parseInt(params.id, 10);

  const updated = await prisma.review.update({
    where: { id },
    data: { name, role, text },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  // Convert 'id' to a number
  const id = parseInt(params.id, 10);

  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
