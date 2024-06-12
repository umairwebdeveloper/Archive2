import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { wrapSelectedText } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		
		const highlights = await prisma.highlight.findMany({
			where: {
				resumeId: params.courseId,
				userId: userId,
			},
			include: {
				note: true,
			},
		});

		return NextResponse.json(highlights);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}


export async function POST(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const { userId } = auth();
		const {
			meta,
			text,
			textId,
			textClassName,
			startContainerText,
			endContainerText,
		} = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const highlight = await prisma.highlight.create({
			data: {
				meta,
				text,
				textId,
				textClassName,
				startContainerText,
				endContainerText,
				resumeId: params.courseId,
				userId,
			},
		});

		return NextResponse.json(highlight);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const highlight = await prisma.highlight.delete({
			where: {
				textId: params.courseId,
			},
		});

		return NextResponse.json(highlight);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
