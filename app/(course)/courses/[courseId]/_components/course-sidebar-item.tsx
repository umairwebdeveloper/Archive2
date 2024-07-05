"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { db } from "@/lib/db";

interface CourseSidebarItemProps {
	label: string;
	id: string;
	isCompleted: boolean;
	courseId: string;
}

export const CourseSidebarItem = ({
	label,
	id,
	isCompleted,
	courseId,
}: CourseSidebarItemProps) => {
	const pathname = usePathname();
	const router = useRouter();

	const Icon = isCompleted ? CheckCircle : PlayCircle; //LATER VERWIJDEREN
	const isActive = pathname?.includes(id);

	const onClick = () => {
		router.push(`/courses/${courseId}/chapters/${id}`);
	};

	return (
		<button
			onClick={onClick}
			type="button"
			className={cn(
				"flex items-center rounded-xl gap-x-2 text-sec400 text-sm font-[500] pl-6 transition-all hover:bg-slate-100/20",
				isActive &&
					"text-white bg-prim400 hover:text-prim50 hover:bg-prim500"
			)}
		>
			<div className="flex items-center gap-x-2 py-4">
				<Icon
					size={22}
					className={cn(
						"text-sec400",
						isActive && "text-prim50 ",
					)}
				/>
				{label}
			</div>
		</button>
	);
};
