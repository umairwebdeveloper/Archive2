"use client";

import { StickyNote } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface QuizTypeProps {
	courseId: string;
}

const ResumeSidebar: React.FC<QuizTypeProps> = ({ courseId }) => {
	const router = useRouter();
	const pathname = usePathname();
	const isActive = pathname?.includes(`/courses/${courseId}/resume`);
	

	const onClick = async () => {
        router.push(`/courses/${courseId}/resume`);
    };

	return (
		<div>
			<button
				onClick={onClick}
				type="button"
				className={`mt-3 flex items-center rounded-xl gap-x-2 text-sm font-[500] pl-6 transition-all py-4 w-full pr-3 ${
					isActive
						? "text-white bg-prim400 hover:text-prim50 hover:bg-prim500"
						: "text-sec400 hover:bg-slate-100/20"
				}`}
			>
				<div className="flex items-center justify-between gap-x-2 w-full">
					<span className="flex gap-2">
						<StickyNote
							size={22}
							className={`${isActive ? "text-prim50" : "text-sec400"}`}
						/>
						Resume
					</span>
				</div>
			</button>
		</div>
	);
};

export default ResumeSidebar;
