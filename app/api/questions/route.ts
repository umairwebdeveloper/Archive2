import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	try {
		const questions = await prisma.question.findMany({
			include: {
				options: true,
			},
		});
		return NextResponse.json(questions);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
