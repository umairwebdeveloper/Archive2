import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const courses = await prisma.course.findMany({
			where: {
				isPublished: false,
			},
		});

		return NextResponse.json(courses);
	} catch (error) {
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const { title } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await prisma.course.create({
			data: {
				userId,
				title,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
