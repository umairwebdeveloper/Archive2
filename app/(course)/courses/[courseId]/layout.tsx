import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import ResizeComp from "./_components/resize";

const CourseLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { courseId: string };
}) => {
	const { userId } = auth();
	console.log(userId);

	if (!userId) {
		return redirect("/");
	}

	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		},
		include: {
			chapters: {
				where: {
					isPublished: true,
				},
				include: {
					userProgress: {
						where: {
							userId,
						},
					},
				},
				orderBy: {
					position: "asc",
				},
			},
		},
	});

	const courses: any = await db.course.findUnique({
		where: {
			id: course?.id,
		},
		include: {
			category: {
				include: {
					subject: true,
				},
			},
		},
	});

	if (!course) {
		return redirect("/");
	}

	const progressCount = await getProgress(userId, course.id);

	return (
		<div className="h-full">
			<ResizeComp
				course={course}
				courses={courses}
				progressCount={progressCount}
				children={children}
			/>
		</div>
	);
};

export default CourseLayout;
