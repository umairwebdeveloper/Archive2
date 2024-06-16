import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
	course: Course & {
		chapters: (Chapter & {
			userProgress: UserProgress[] | null;
		})[];
	};
	courses: any;
	progressCount: number;
}

export const CourseMobileSidebar = ({
	course,
	courses,
	progressCount,
}: CourseMobileSidebarProps) => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
				<Menu />
			</SheetTrigger>
			<SheetContent side="left" className="p-0 bg-white w-72">
				<CourseSidebar
					course={course}
					courses={courses}
					progressCount={progressCount}
					onResize={(newWidth: any) => {
						console.log(newWidth);
					}}
				/>
			</SheetContent>
		</Sheet>
	);
};
