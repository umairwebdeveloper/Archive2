import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	try {
		const levels = await prisma.level.findMany({
			include: {
				subjects: true,
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

		const { title } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const level = await prisma.level.create({
			data: {
				title: title,
			},
		});
		return NextResponse.json(level);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}

export async function DELETE(req: Request) {
	try {
		const { id } = await req.json();
		const level = await prisma.level.delete({
			where: {
				id: id,
			},
		});
		return NextResponse.json(level);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
