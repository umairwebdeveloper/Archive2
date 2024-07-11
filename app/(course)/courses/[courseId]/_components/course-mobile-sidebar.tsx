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
			<SheetTrigger className="md:hidden p-2 bg-white rounded-xl hover:opacity-75 transition">
				<Menu />
			</SheetTrigger>
			<SheetContent side="left" className="p-0 bg-primBlack w-72">
				<CourseSidebar
					course={course}
					courses={courses}
					progressCount={progressCount}
				/>
			</SheetContent>
		</Sheet>
	);
};
