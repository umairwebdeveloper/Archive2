import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { Button } from "@/components/ui/button";
import QuizSidebar from "./quiz-sidebar";
import Link from "next/link";

interface CourseSidebarProps {
	course: Course & {
		chapters: (Chapter & {
			userProgress: UserProgress[] | null;
		})[];
	};
	progressCount: number;
}

export const CourseSidebar = async ({
	course,
	progressCount,
}: CourseSidebarProps) => {
	const { userId } = auth();

	if (!userId) {
		return redirect("/");
	}

	const courses = await db.course.findUnique({
		where: {
			id: course.id,
		},
		include: {
			category: {
				include: {
					subject: true,
				},
			},
		},
	});


	return (
		<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
			<div className="p-8 flex flex-col border-b">
				<h1>
					<Link href={`/vakken/subject`}>
						<span className="text-sm text-blue-400 hover:text-blue-600 hover:underline">
							Subject
						</span>
					</Link>
					<span className="text-sm text-blue-600">
						{" "}
						&gt;{" "}
					</span>
					<Link
						href={`/vakken/subject/${courses?.category?.subject?.id}`}
					>
						<span className="text-sm text-blue-400 hover:text-blue-600 hover:underline">
							{courses?.category?.subject?.title}
						</span>
					</Link>
					<span className="text-sm text-blue-600">
						{" "}
						&gt;{" "}
					</span>
					<span className="text-sm text-blue-600">
						{course.title}
					</span>
				</h1>
				<div className="mt-10">
					<CourseProgress variant="success" value={progressCount} />
				</div>
			</div>
			<div className="flex flex-col w-full">
				{course.chapters.map((chapter) => (
					<CourseSidebarItem
						key={chapter.id}
						id={chapter.id}
						label={chapter.title}
						isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
						courseId={course.id}
					/>
				))}
				<QuizSidebar courseId={course.id} />
			</div>
		</div>
	);
};
