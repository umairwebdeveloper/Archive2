import { NextResponse } from "next/server";
import { PrismaClient, Level } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const title = searchParams.get("title");

	try {
		const level: Level | null = await prisma.level.findFirst({
			where: {
				title: {
					equals: title ?? '', // Provide a default value to avoid potential null issues
					mode: "insensitive",
				},
			},
			include: { subjects: true },
		});

		if (level) {
			return NextResponse.json(level);
		} else {
			return NextResponse.json({ message: "Level not found" });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Error fetching level" },
			{ status: 500 }
		);
	}
}
