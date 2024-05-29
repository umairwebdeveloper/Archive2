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
		const answersCount = await prisma.answer.count({
			where: {
				userId: userId,
				quiz: {
					courseId: params.levelId,
				},
			},
		});
		return NextResponse.json({ answersCount: answersCount });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
