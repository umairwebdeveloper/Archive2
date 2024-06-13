import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import SubjectsPeriods from "../_components/periods";

const SubjectPeriodPage = async ({
	params,
}: {
	params: { subjectId: string };
}) => {
	const { userId } = auth();

	if (!userId) {
		return redirect("/");
	}

	const subject = await db.examSubject.findUnique({
		where: {
			id: params.subjectId,
		},
		include: {
			examLevel: true,
		},
	});

	const periods = await db.examSubjectPeriod.findMany({
		where: {
			examSubjectId: params.subjectId,
		},
	});

	return (
		<div className="p-6">
			<SubjectsPeriods subjectLevel={subject} subjectPeriods={periods} />
		</div>
	);
};

export default SubjectPeriodPage;
