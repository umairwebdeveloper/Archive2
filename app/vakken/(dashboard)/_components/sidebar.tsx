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
			className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50 bg-primBlack"
			ref={sidebarRef}
			style={{ width: sidebarWidth }}
		>
			<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
				<div className="p-6">
					<Logo />
				</div>
				<div className="flex flex-col w-full mt-6">
					<SidebarRoutes />
				</div>
			</div>
			<div
				ref={resizeHandleRef}
				className="absolute top-0 right-0 h-full w-2 bg-sec400 cursor-ew-resize flex flex-col justify-center"
			><span className="bg-prim300 text-sec800 mx-auto my-auto rounded-lg">|</span></div>
		</div>
	);
};