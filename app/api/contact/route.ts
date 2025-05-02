import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Save in both ContactForm and Lead for admin review
    const [cf, lead] = await Promise.all([
      prisma.contactForm.create({ data: { name, email, subject, message } }),
      prisma.lead.create({
        data: { name, email, subject, message, source: "contact" },
      }),
    ]);

    console.log("Contact saved:", cf, lead);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in contact:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
