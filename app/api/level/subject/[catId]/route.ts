import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { catId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const subjects = await prisma.subject.findUnique({
			where: {
				id: params.catId,
			},
			include: {
				categorys: {
					include: {
						courses: true,
					},
				},
			},
		});

		return NextResponse.json(subjects);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
