import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse query parameters
    const url = new URL(req.url);
    const levelIdsParam = url.searchParams.get("levelIds");

    if (!levelIdsParam) {
      return new NextResponse("Missing levelIds query parameter", { status: 400 });
    }

    const levelIds = levelIdsParam.split(",").map((id) => id.trim());

    // Fetch subjects for the given levelIds
    const subjects = await prisma.subject.findMany({
      where: {
        levelId: {
          in: levelIds,
        },
      },
      include: {
        level: true,
      },
    });

    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json({ error: "An error occurred while fetching subjects" }, { status: 500 });
  }
}
