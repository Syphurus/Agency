// app/api/demo-env/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // WARNING: Do not leave this in production—it's purely for debugging!
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL,
  });
}
