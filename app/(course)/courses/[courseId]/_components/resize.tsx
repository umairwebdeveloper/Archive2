"use client";

import { CourseSidebar } from "./course-sidebar";
import { CourseNavbar } from "./course-navbar";

const ResizeComp = ({ course, courses, progressCount, children }: any) => {
	return (
		<>
			<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
				<CourseNavbar
					course={course}
					courses={courses}
					progressCount={progressCount}
				/>
			</div>
			<div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 bg-white">
				<CourseSidebar
					course={course}
					courses={courses}
					progressCount={progressCount}
				/>
			</div>

			<main
				className="md:pl-80 pt-[80px] bg-sec50"
				style={{ minHeight: "100vh" }}
			>
				{children}
			</main>
		</>
	);
};

export default ResizeComp;
