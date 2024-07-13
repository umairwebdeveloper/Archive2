import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  courses: any;
  progressCount: number;
};

export const CourseNavbar = ({
  course,
  courses,
  progressCount,
}: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-sec50 shadow-sm">
      <CourseMobileSidebar
        course={course}
        courses={courses}
        progressCount={progressCount}
      />
      <NavbarRoutes />
    </div>
  )
}