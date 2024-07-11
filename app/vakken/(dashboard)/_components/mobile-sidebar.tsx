import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden p-2 bg-white rounded-xl hover:opacity-75 transition">
				<Menu />
			</SheetTrigger>
			<SheetContent side="left" className="p-0 bg-primBlack">
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
};
