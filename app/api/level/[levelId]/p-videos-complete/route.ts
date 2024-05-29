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
		const chapters = await prisma.chapter.findMany({
			where: {
				course: {
					category: {
						subjectId: params.levelId,
					},
				},
			},
			select: {
				id: true,
			},
		});

		const completedCount = await prisma.userProgress.count({
			where: {
				userId,
				chapterId: {
					in: chapters.map((chapter) => chapter.id),
				},
				isCompleted: true,
			},
		});

		return NextResponse.json({ completedCount: completedCount });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
