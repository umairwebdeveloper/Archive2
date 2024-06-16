import { useState, useEffect, useRef } from "react";

interface UseResizableSidebarProps {
	initialWidth: number;
	onResize: (newWidth: number) => void;
}

const useResizableSidebar = ({
	initialWidth,
	onResize,
}: UseResizableSidebarProps) => {
	const [sidebarWidth, setSidebarWidth] = useState(initialWidth);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const resizeHandleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			const startX = e.clientX;
			const startWidth = sidebarRef.current?.offsetWidth || sidebarWidth;

			const handleMouseMove = (e: MouseEvent) => {
				const newWidth = startWidth + e.clientX - startX;
				setSidebarWidth(newWidth);
				onResize(newWidth);
			};

			const handleMouseUp = () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};

			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		};

		resizeHandleRef.current?.addEventListener("mousedown", handleMouseDown);

		return () => {
			resizeHandleRef.current?.removeEventListener(
				"mousedown",
				handleMouseDown
			);
		};
	}, [sidebarWidth, onResize]);

	return { sidebarRef, resizeHandleRef, sidebarWidth };
};

export default useResizableSidebar;
