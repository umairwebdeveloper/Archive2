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
				className={`mt-3 flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all py-4 w-full pr-3 ${
					isActive
						? "text-slate-700 bg-slate-200/20"
						: "text-slate-500 hover:text-slate-600 hover:bg-slate-300/20"
				}`}
			>
				<div className="flex items-center justify-between gap-x-2 w-full">
					<span className="flex gap-2">
						<StickyNote
							size={22}
							className={`${isActive ? "text-slate-700" : "text-slate-500"}`}
						/>
						Resume
					</span>
				</div>
			</button>
		</div>
	);
};

export default ResumeSidebar;
