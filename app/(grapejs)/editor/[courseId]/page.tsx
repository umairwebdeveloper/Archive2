import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import GrapesJSEditor from "./_components/editor";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
	const resume:any = await db.resume.findUnique({
		where: { courseId: params.courseId },
	});

	return (
		<>
			<GrapesJSEditor courseId={params.courseId} resumeContent={resume} />
		</>
	);
};

export default CourseIdPage;
