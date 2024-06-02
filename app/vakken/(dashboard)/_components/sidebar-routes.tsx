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
		icon: Puzzle,
		label: "Quiz",
		href: "/vakken/teacher/quiz",
	},
	{
		icon: Radio,
		label: "Livestream",
		href: "/livestream",
	},
];

export const SidebarRoutes = () => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.includes("/vakken/teacher");

	const routes = isTeacherPage ? teacherRoutes : guestRoutes;

	return (
		<div className="flex flex-col justify-between w-full">
			<Progress />
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
