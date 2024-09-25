import { auth } from "@clerk/nextjs";
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

// delete question answers
export async function POST(req: Request) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
    
		await prisma.answer.deleteMany({
			where: {
				userId: userId,
			},
		});

		return NextResponse.json({
			success: true,
			message: "All answers have been reset successfully",
		});
	} catch (error) {
		console.log("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
