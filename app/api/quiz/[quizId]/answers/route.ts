import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { quizId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const answers = await prisma.answer.findMany({
			where: { quizId: Number(params.quizId), userId: userId },
		});
		return NextResponse.json(answers);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
