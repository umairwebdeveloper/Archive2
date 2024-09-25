import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
	req: Request,
	{ params }: { params: { questionId: string } }
) {
	try {
		const { userId } = auth();
		const { title, questionText, explanation } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
        const updatedQuestion = await prisma.question.update({
			where: { id: parseInt(params.questionId) },
			data: { title, questionText, explanation },
		});
		return NextResponse.json(updatedQuestion);
	} catch (error) {
		console.log("[ADD QUESTION]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}


export async function DELETE(
	req: Request,
	{ params }: { params: { questionId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		await prisma.question.delete({
			where: { id: parseInt(params.questionId) },
		});
		return NextResponse.json({"message": "Delete Successfully !"});
	} catch (error) {
		console.log("[ADD QUESTION]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
