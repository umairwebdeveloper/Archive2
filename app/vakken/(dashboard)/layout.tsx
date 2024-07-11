import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50 bg-sec50">
				<Navbar />
			</div>
			<div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 bg-primBlack">
				<Sidebar />
			</div>
			<main
				className="md:pl-80 pt-[80px] bg-sec50"
				style={{ minHeight: "100vh" }}
			>
				{children}
			</main>
		</div>
	);
};

export default DashboardLayout;
