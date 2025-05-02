import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { password } = data;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Respond with a success indicator for successful login
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Bad Request", error: error.message },
        { status: 400 }
      );
    } else {
      // In case the error is not an instance of Error, provide a generic message
      return NextResponse.json(
        { message: "Bad Request", error: "An unknown error occurred." },
        { status: 400 }
      );
    }
  }
}
