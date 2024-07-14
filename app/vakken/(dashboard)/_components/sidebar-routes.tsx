"use client";

import {
	BarChart,
	Compass,
	List,
	Radio,
	Lock,
	Puzzle,
	icons,
	Book,
	BookCheck,
	ShoppingCart,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import Progress from "./progress";

const guestRoutes = [
	{
		icon: Book,
		label: "Subjects",
		href: "/vakken/subject",
	},
	{
		icon: BookCheck,
		label: "Exam",
		href: "/vakken/exam",
	},
];

const teacherRoutes = [
	{
		icon: Book,
		label: "Subjects",
		href: "/vakken/teacher/subject",
	},
	{
		icon: List,
		label: "Courses",
		href: "/vakken/teacher/courses",
	},
	{
		icon: BookCheck,
		label: "Exam",
		href: "/vakken/teacher/exam",
	},
];

export const SidebarRoutes = () => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.includes("/vakken/teacher");
	const isSubjectPage = /\/vakken\/subject\/[0-9a-fA-F-]{36}/.test(pathname); // Regex to match /vakken/subject/[uuid]

	const routes = isTeacherPage ? teacherRoutes : guestRoutes;

	return (
		<div className="flex flex-col justify-between w-full">
			{isSubjectPage && <Progress />}
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
				/>
			))}
		</div>
	);
};
