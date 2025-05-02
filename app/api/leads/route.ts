import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      where: { source: "contact" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(leads);
  } catch (err) {
    console.error("Error fetching leads:", err);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    const lead = await prisma.lead.create({
      data: { name, email, subject, message, source: "contact" },
    });
    console.log("Created Lead:", lead);
    return NextResponse.json(lead);
  } catch (err) {
    console.error("Error creating lead:", err);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
