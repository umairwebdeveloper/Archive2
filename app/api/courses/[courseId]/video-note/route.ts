import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import exp from "constants";

export async function GET(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const Notes = await db.userVideoNote.findMany({
			where: { userId: userId, chapterId: params?.courseId },
		});

		return NextResponse.json(Notes);
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
		const { content, time } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		

		const Note = await db.userVideoNote.create({
			data: {
				userId: userId,
				chapterId: params?.courseId,
				content: content,
				time: time,
			},
		});

		return NextResponse.json(Note);
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
		const { id } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const Note = await db.userVideoNote.delete({
			where: { id },
		});

		return NextResponse.json(Note);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
