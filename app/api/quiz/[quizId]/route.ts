import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { quizId: string } }
) {
	try {
		const quiz = await prisma.quiz.findUnique({
			where: { id: Number(params.quizId) },
			include: {
				questions: {
					include: {
						options: true,
						debits: true,
						credits: true,
						attachments: true
					},
				},
			},
		});

		const course = await prisma.course.findUnique({
			where: { id: quiz?.courseId },
		});

	
		return NextResponse.json({quiz, course});
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
