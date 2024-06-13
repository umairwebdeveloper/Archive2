import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	try {
		const levels = await prisma.examSubject.findMany({
			include: {
				examLevel: true,
			},
		});

		return NextResponse.json(levels);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const { name, category, examLevelId } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const newExamSubject = await prisma.examSubject.create({
			data: {
				name,
				category,
				examLevelId,
			},
		});
		return NextResponse.json(newExamSubject);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}

export async function DELETE(req: Request) {
	try {
		const { userId } = auth();
		const { id } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const deletedExamSubject = await prisma.examSubject.delete({
			where: {
				id,
			},
		});
		return NextResponse.json(deletedExamSubject);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
