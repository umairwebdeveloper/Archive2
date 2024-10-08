import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const formData = await req.formData();
		const title = formData.get("title");
		const questionData = formData.get("question");
		const question = JSON.parse(questionData as string);

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
				debitAmount: question.debitCredit?.debit.toString(),
				creditAmount: question.debitCredit?.credit.toString(),
				options: {
					create: question.options,
				},
				debits: {
					create: question.debits,
				},
				credits: {
					create: question.credits,
				},
			},
		});
		const files = formData.getAll("files") as File[];
		const fileUrls: string[] = [];

		for (const file of files) {
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const blobResult = await put(file.name, buffer, {
				access: "public",
			});
			fileUrls.push(blobResult.url);
			await prisma.questionAttachment.create({
				data: {
					fileUrl: blobResult.url,
					fileName: file.name,
					questionId: createdQuestion.id,
				},
			});
		}

		return NextResponse.json(
			{
				message: "Question and files uploaded successfully",
				fileUrls,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log("[ADD QUESTION]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
