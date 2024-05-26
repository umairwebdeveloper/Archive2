import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { quizTypeId: string } }
) {
	try {
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
