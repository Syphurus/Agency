import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    // Trying to fetch reviews to check the DB connection
    const reviews = await prisma.review.findMany();
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Database connection error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching reviews: " + error.message });
  }
}
