import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const { title, course } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const quiz = await prisma.quiz.create({
			data: {
				title: title,
				courseId: course,
			}, // Replace 'your-user-id' with actual userId
		});

		return NextResponse.json(quiz);
	} catch (error) {
		console.log("[SAVE QUIZ]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}


export async function GET(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const quizzes = await prisma.quiz.findMany();
        return NextResponse.json(quizzes);
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }
}

export async function DELETE(req: Request) {
	try {
		const { userId } = auth();
		const { id } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		await prisma.quiz.delete({
			where: { id: Number(id) },
		});

		return new NextResponse("Quiz deleted successfully", { status: 200 });
	} catch (error) {
		console.log("[DELETE QUIZ]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}