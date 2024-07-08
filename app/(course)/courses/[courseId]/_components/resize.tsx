"use client";

import { useState, useEffect } from "react";
import { CourseSidebar } from "./course-sidebar";
import { CourseNavbar } from "./course-navbar";

const ResizeComp = ({ course, courses, progressCount, children }: any) => {
	const [sidebarWidth, setSidebarWidth] = useState(320); // Default width in pixels

	const handleSidebarResize = (newWidth: any) => {
		setSidebarWidth(newWidth);
	};

	return (
		<>
			<div
				className="h-[80px] fixed inset-y-0 w-full z-50"
				style={{ paddingLeft: `${sidebarWidth}px` }}
			>
				<CourseNavbar
					course={course}
					courses={courses}
					progressCount={progressCount}
				/>
			</div>
			<CourseSidebar
				course={course}
				courses={courses}
				progressCount={progressCount}
				onResize={handleSidebarResize}
			/>
			<main
				className="pt-[80px] bg-sec50"
				style={{ paddingLeft: `${sidebarWidth}px`, minHeight: "100vh" }}
			>
				{children}
			</main>
		</>
	);
};

export default ResizeComp;
