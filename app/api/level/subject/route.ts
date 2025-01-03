import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
// import { writeFile } from "fs/promises";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	try {
		const { userId } = auth();
		if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
		}

		// Parse the query parameters
		const url = new URL(req.url);
		const levels = url.searchParams.get("levels");

		// Build the Prisma query
		const whereCondition: any = levels
		? {
			level: {
				title: {
				in: levels.split(",").map((title) => title.trim()),
				mode: "insensitive", // Case-insensitive filter
				},
			},
			}
		: undefined;

		// Fetch subjects with optional filtering
		const subjects = await prisma.subject.findMany({
			where: whereCondition,
			include: {
				level: true,
			},
		});

		return NextResponse.json(subjects);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
		{ error: "An error occurred while fetching subjects" },
		{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const data = await req.formData();
		const title = data.get("title");
		const type = data.get("type");
		const levelId = data.get("levelId");
		const image = data.get("image") as File;

		if (!title || !levelId || !image) {
			return NextResponse.json({
				message: "Please provide all required fields",
			});
		}

		// const byteData = await image.arrayBuffer();
		// const buffer = Buffer.from(byteData);
		// const path = `./public/uploads/${image.name}`;
		// await writeFile(path, buffer);

		const upload = await put(image.name, image, {
			access: "public",
		});

		const subject = await prisma.subject.create({
			data: {
				title: title as string,
				levelId: levelId as string,
				imageUrl: upload.url,
				subjectType: type as string,
			},
		});
		return NextResponse.json({
			message: "form submit successfully",
			data: subject,
			upload: upload,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}

export async function DELETE(req: Request) {
	try {
		const { id } = await req.json();
		const subject = await prisma.subject.delete({
			where: {
				id: id,
			},
		});
		return NextResponse.json(subject);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
