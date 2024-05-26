import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
	req: Request,
	{ params }: { params: { quizId: string } }
) {
	try {
		const { userId } = auth();
		const { questionId, answer } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const existingAnswer = await prisma.answer.findFirst({
			where: {
				userId: userId,
				questionId: questionId,
				quizId: parseInt(params.quizId),
			},
		});

		// Create the question and its options
		let createdQuestion;

		if (existingAnswer) {
			createdQuestion = await prisma.answer.update({
				where: {
					id: existingAnswer.id,
				},
				data: { answer: answer },
			});
		} else {
			createdQuestion = await prisma.answer.create({
				data: {
					quizId: parseInt(params.quizId),
					userId,
					questionId,
					answer,
				},
			});
		}

		return NextResponse.json(createdQuestion);
	} catch (error) {
		console.log("[ADD QUESTION]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
