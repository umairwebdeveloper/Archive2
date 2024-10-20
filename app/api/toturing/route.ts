import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { formData } = await req.json();
		const savedData = await prisma.tutoringForm.create({
			data: {
				fullName: formData.fullName,
				email: formData.email,
				phone: formData.phone,
				studentName: formData.studentName,
				educationType: formData.educationType,
				schoolYear: formData.schoolYear,
				tutoringSubjects: formData.tutoringSubjects,
				address: formData.address,
				postalCode: formData.postalCode,
			},
		});
		return NextResponse.json(savedData);
	} catch (error) {
		return new NextResponse("Internal Error", { status: 500 });
	}
}


export async function GET(req: Request) {
	try {
		const allData = await prisma.tutoringForm.findMany(); // Fetch all records
		return NextResponse.json(allData); // Return the fetched data in JSON format
	} catch (error) {
		return new NextResponse("Internal Error", { status: 500 });
	}
}


export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		if (!id) {
			return new NextResponse("ID is required", { status: 400 });
		}

		const deletedData = await prisma.tutoringForm.delete({
			where: {
				id: parseInt(id),
			},
		});

		return NextResponse.json(deletedData);
	} catch (error) {
		return new NextResponse("Internal Error", { status: 500 });
	}
}