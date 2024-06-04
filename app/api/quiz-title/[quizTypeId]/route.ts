import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { quizTypeId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// find one course by id
		const quizTitle = await prisma.course.findUnique({
			where: {
				id: params.quizTypeId,
			},
			include: {
				quiz: {
					include: {
						questions: {
							include: {
								options: true,
							},
						},
						answers: {
							where: {
								userId: userId,
							},
						},
					},
				},
			},
		});

		// return the course
		return NextResponse.json(quizTitle);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
