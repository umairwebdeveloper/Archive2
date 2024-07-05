"use client";

import { Chapter, Course, UserProgress } from "@prisma/client";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import QuizSidebar from "./quiz-sidebar";
import Link from "next/link";
import ResumeSidebar from "./resume-sidebar";
import useResizableSidebar from "@/hooks/use-resize-sidebar";

interface CourseSidebarProps {
	course: Course & {
		chapters: (Chapter & {
			userProgress: UserProgress[] | null;
		})[];
	};
	courses: any;
	progressCount: number;
	onResize: (newWidth: number) => void;
}

export const CourseSidebar = ({
	course,
	courses,
	progressCount,
	onResize,
}: CourseSidebarProps) => {
	const { sidebarRef, resizeHandleRef, sidebarWidth } = useResizableSidebar({
		initialWidth: 320,
		onResize,
	});

	return (
		<div
			className="hidden md:flex h-full flex-col fixed inset-y-0 z-50 bg-primBlack"
			ref={sidebarRef}
			style={{ width: sidebarWidth }}
		>
			<div className="h-full flex flex-col overflow-y-auto shadow-sm">
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
						<CourseProgress
							variant="success"
							value={progressCount}
						/>
					</div>
				</div>
				<div className="flex flex-col w-full px-6">
					{course.chapters.map((chapter) => (
						<CourseSidebarItem
							key={chapter.id}
							id={chapter.id}
							label={chapter.title}
							isCompleted={
								!!chapter.userProgress?.[0]?.isCompleted
							}
							courseId={course.id}
						/>
					))}
					<ResumeSidebar courseId={course.id} />
					<QuizSidebar courseId={course.id} />
				</div>
			</div>
			<div
				ref={resizeHandleRef}
				className="absolute top-0 right-0 h-full w-2 bg-sec400 cursor-ew-resize flex flex-col justify-center"
			>
				<span className="bg-prim300 text-sec800 mx-auto my-auto rounded-lg">
					|
				</span>
			</div>
		</div>
	);
};
