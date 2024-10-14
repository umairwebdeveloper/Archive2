import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const title = searchParams.get("title");

	try {
		const level = await prisma.level.findFirst({
			where: {
				title: {
					equals: title,
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
