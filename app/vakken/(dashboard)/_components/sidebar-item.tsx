"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
	const pathname = usePathname();
	const router = useRouter();

	const isActive =
		(pathname === "/" && href === "/") ||
		pathname === href ||
		pathname?.startsWith(`${href}/`);

	const onClick = () => {
		router.push(href);
	};

	return (
		<button
			onClick={onClick}
			type="button"
			className={cn(
				"flex items-center mx-5 rounded-xl gap-x-2 text-sec400 text-sm font-[500] pl-6 transition-all hover:bg-slate-100/20 mb-3",
				isActive &&
					"text-white bg-prim400 hover:text-prim50 hover:bg-prim500"
			)}
		>
			<div className="flex items-center gap-x-2 py-4">
				<Icon
					size={22}
					className={cn("text-sec400", isActive && "text-prim50")}
				/>
				{label}
			</div>
		</button>
	);
};
