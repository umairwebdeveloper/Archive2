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
		
		const highlights = await prisma.note.findUnique({
			where: {
				highlightId: params.courseId,
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
		const { note } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const existingNote = await prisma.note.findUnique({
			where: { highlightId: params.courseId },
		});

		if (existingNote) {
			const updatedNote = await prisma.note.update({
				where: { highlightId: params.courseId },
				data: { content: note },
			});

			return NextResponse.json(updatedNote);
		}

		const highlightNote = await prisma.note.create({
			data: {
				content: note,
				highlightId: params.courseId,
			},
		});

		return NextResponse.json(highlightNote);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
