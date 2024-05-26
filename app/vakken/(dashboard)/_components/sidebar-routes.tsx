"use client";

import { BarChart, Compass, List, Radio, Lock, Puzzle } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
	{
		icon: Compass,
		label: "Browse",
		href: "/vakken/search",
	},
	{
		icon: Puzzle,
		label: "Quiz",
		href: "/vakken/quiz",
	},
	{
		icon: Radio,
		label: "Livestream",
		href: "/vakken/livestream",
	},
];

const teacherRoutes = [
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
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}