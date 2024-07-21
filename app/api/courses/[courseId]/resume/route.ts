import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

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
		const resume = await db.resume.findUnique({
			where: { courseId: params?.courseId },
		});

        if (!resume) {
            return new NextResponse("Not found", { status: 404 });
        }

		return NextResponse.json(resume);
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
		const { content, style } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const existingResume = await prisma.resume.findUnique({
			where: { courseId: params.courseId },
		});

		let newResume;
		if (existingResume) {
			newResume = await prisma.resume.update({
				where: { courseId: params.courseId },
				data: { text: content, style: style },
			});
		} else {
			newResume = await prisma.resume.create({
				data: {
					courseId: params.courseId,
					text: content,
					style: style,
				},
			});
		}

		return NextResponse.json(newResume);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
