import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	try {
		const periods = await prisma.examSubjectPeriod.findMany({
			include: {
				examSubject: {
					include: {
						examLevel: true,
					},
				},
			},
		});

		return NextResponse.json(periods);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const { date, examSubjectId } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const name = "Period";

		const newExamSubject = await prisma.examSubjectPeriod.create({
			data: {
				name,
				date: new Date(date),
				examSubjectId,
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

		const examSubjectPeriod = await prisma.examSubjectPeriod.delete({
			where: {
				id,
			},
		});
		return NextResponse.json(examSubjectPeriod);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
