import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const { title, question } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// Create the question and its options
		const createdQuestion = await prisma.question.create({
			data: {
				quizId: Number(title),
				title: question.questionTitle,
				questionText: question.questionText,
				type: question.type,
				correctAnswer: question.correctAnswer,
				explanation: question.explanation,
				options: {
					create: question.options,
				},
			},
		});

		return NextResponse.json(createdQuestion);
	} catch (error) {
		console.log("[ADD QUESTION]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
