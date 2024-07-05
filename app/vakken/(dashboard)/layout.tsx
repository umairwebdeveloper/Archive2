"use client";

import { useState, useEffect } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarWidth, setSidebarWidth] = useState(320); // Default width in pixels

  const handleSidebarResize = (newWidth: any) => {
		setSidebarWidth(newWidth);
  };
	return (
		<div className="h-full">
			<div
				className="h-[80px] fixed inset-y-0 w-full z-50 bg-prim50"
				style={{ paddingLeft: `${sidebarWidth}px` }}
			>
				<Navbar />
			</div>
			<Sidebar onResize={handleSidebarResize} />
			<main
				className="pt-[80px] bg-prim50"
				style={{ paddingLeft: `${sidebarWidth}px`, minHeight: "100vh" }}
			>
				{children}
			</main>
		</div>
	);
};

export default DashboardLayout;
