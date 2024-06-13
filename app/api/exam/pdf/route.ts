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
		const subjects = await prisma.examSubjectPdf.findMany();
		return NextResponse.json(subjects);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}

interface CustomRequest extends Request {
	formData: () => Promise<FormData>;
}

export async function POST(req: CustomRequest) {
	try {
		const data = await req.formData();
		const category = data.get("category") as any;
		const examPeriodId = data.get("examPeriodId");
		const pdfFile = data.get("pdfFile") as File;

		// const byteData = await image.arrayBuffer();
		// const buffer = Buffer.from(byteData);
		// const path = `./public/uploads/${image.name}`;
		// await writeFile(path, buffer);

		const upload = await put(pdfFile.name, pdfFile, {
			access: "public",
		});

		const subject = await prisma.examSubjectPdf.create({
			data: {
				category: category,
				file: upload.url,
				examSubjectPeriodId: examPeriodId as string,
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
		const { userId } = auth();
		const { id } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const examSubjectPdf = await prisma.examSubjectPdf.delete({
			where: {
				id,
			},
		});
		return NextResponse.json(examSubjectPdf);
	} catch (error) {
		console.error(error);
		return NextResponse.json(error);
	}
}
