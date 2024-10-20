import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
	value: number;
	variant?: "default" | "success";
	size?: "default" | "sm";
}

const colorByVariant = {
	default: "text-sky-700",
	success: "text-white",
};

const sizeByVariant = {
	default: "text-sm",
	sm: "text-xs",
};

export const CourseProgress = ({
	value,
	variant,
	size,
}: CourseProgressProps) => {
	return (
		<div>
			<Progress className="h-2" value={value} variant={variant} />
			<p className="text-gray-700 mt-2">{Math.round(value)}% Video Complete</p>
		</div>
	);
};
