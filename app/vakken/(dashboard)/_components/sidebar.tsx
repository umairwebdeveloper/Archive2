import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"
import useResizableSidebar from "@/hooks/use-resize-sidebar";

interface SidebarProps {
  onResize: (newWidth: number) => void;
}

export const Sidebar = ({ onResize }: SidebarProps) => {
	const { sidebarRef, resizeHandleRef, sidebarWidth } = useResizableSidebar({
		initialWidth: 320,
		onResize,
	});

	return (
		<div
			className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50"
			ref={sidebarRef}
			style={{ width: sidebarWidth }}
		>
			<div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
				<div className="p-6">
					<Logo />
				</div>
				<div className="flex flex-col w-full">
					<SidebarRoutes />
				</div>
			</div>
			<div
				ref={resizeHandleRef}
				className="absolute top-0 right-0 h-full w-2 bg-gray-200 cursor-ew-resize"
			></div>
		</div>
	);
};