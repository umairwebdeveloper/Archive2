"use client";

import { Chapter, Course, UserProgress } from "@prisma/client";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import QuizSidebar from "./quiz-sidebar";
import Link from "next/link";
import ResumeSidebar from "./resume-sidebar";

interface CourseSidebarProps {
	course: Course & {
		chapters: (Chapter & {
			userProgress: UserProgress[] | null;
		})[];
	};
	courses: any;
	progressCount: number;
}

export const CourseSidebar = ({
	course,
	courses,
	progressCount,
}: CourseSidebarProps) => {
	return (
		<div className="h-full flex flex-col overflow-y-auto shadow-sm border-r">
			<div className="p-8 flex flex-col">
				<h1>
					<Link href="/vakken/subject">
						<span className="text-sm text-blue-400 hover:text-blue-600 hover:underline">
							Subject
						</span>
					</Link>
					<span className="text-sm text-blue-600"> &gt; </span>
					<Link
						href={`/vakken/subject/${courses?.category?.subject?.id}`}
					>
						<span className="text-sm text-blue-400 hover:text-blue-600 hover:underline">
							{courses?.category?.subject?.title}
						</span>
					</Link>
					<span className="text-sm text-blue-600"> &gt; </span>
					<span className="text-sm text-blue-600">
						{course.title}
					</span>
				</h1>
				<div className="mt-10">
					<CourseProgress variant="success" value={progressCount} />
				</div>
			</div>
			<div className="flex flex-col w-full px-6">
				{course.chapters.map((chapter) => (
					<CourseSidebarItem
						key={chapter.id}
						id={chapter.id}
						label={chapter.title}
						isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
						courseId={course.id}
					/>
				))}
				<ResumeSidebar courseId={course.id} />
				<QuizSidebar courseId={course.id} />
			</div>
		</div>
	);
};
