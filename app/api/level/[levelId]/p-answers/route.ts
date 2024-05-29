import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { levelId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const userAnswers = await prisma.answer.count({
			where: {
				userId: userId,
				question: {
					quiz: {
						course: {
							category: {
								subjectId: params.levelId,
							},
						},
					},
				},
			},
		});
		return NextResponse.json({ userAnswers: userAnswers });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
