// app/api/demo-env/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Danger: don’t leave this live in production!
  return NextResponse.json({
    db: process.env.DATABASE_URL?.slice(0, 60) + "…",
  });
}
