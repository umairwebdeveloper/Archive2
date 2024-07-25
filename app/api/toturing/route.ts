import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { formData } = await req.json();
		const savedData = await prisma.TutoringForm.create({
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
