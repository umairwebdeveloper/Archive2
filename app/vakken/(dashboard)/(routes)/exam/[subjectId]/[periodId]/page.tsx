import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import SubjectsPdfs from "../../_components/pdfs";

const SubjectpdfPage = async ({ params }: { params: { periodId: string } }) => {
	const { userId } = auth();

	if (!userId) {
		return redirect("/");
	}

	const period: any = await db.examSubjectPeriod.findUnique({
		where: {
			id: params.periodId,
		},
		include: {
			examSubject: {
				include: {
					examLevel: true,
				},
			},
		},
	});

	const pdfs: any = await db.examSubjectPdf.findMany({
		where: {
			examSubjectPeriodId: params.periodId,
		},
	});

	return (
		<div className="p-6">
			<SubjectsPdfs subjectPeriod={period} subjectPdfs={pdfs} />
		</div>
	);
};

export default SubjectpdfPage;
