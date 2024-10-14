"use client";
import { useState, useEffect } from "react";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogOut, Settings, X } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import toast from "react-hot-toast";
import { isTeacher } from "@/lib/teacher";
import axios from "axios";

export const NavbarRoutes = () => {
	const { userId } = useAuth();
	const pathname = usePathname();
	const [showModal, setShowModal] = useState(false);

	const isTeacherPage = pathname?.startsWith("/vakken/teacher");
	const isCoursePage = pathname?.includes("/courses");
	const isSearchPage = pathname === "/vakken/search";
	const isSubjectPage = pathname === "/vakken/subject";

	const handleBackdropClick = (event: any) => {
		if (event.target === event.currentTarget) {
			setShowModal(false);
		}
	};
	// Handle level selection
	const handleLevelSelect = async (level: any) => {
		try {
			localStorage.setItem("userLevel", level);
			const response = await axios.get(
				`/api/level/check-level?title=${encodeURIComponent(level)}`
			);
			const levelData = response.data;
			if (
				levelData &&
				levelData.subjects &&
				levelData.subjects.length > 0
			) {
				toast.success(`The level "${level}" has associated subjects.`);
			} else {
				toast.error(
					`The level "${level}" does not have any associated subjects.`
				);
			}
			setShowModal(false);
		} catch (error) {
			console.error(error);
			toast.error(
				"An error occurred while checking subjects for this level."
			);
			setShowModal(false);
		}
	};

	return (
		<>
			{isSubjectPage && (
				<div className="px-4 hidden md:block">
					<h3 className="font-bold text-2xl">Hello 👋</h3>
					<p>Let’s learn something new today!</p>
				</div>
			)}
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}
			<div className="flex gap-x-2 ml-auto">
				{isTeacher(userId) && !isTeacherPage && (
					<>
						<button
							onClick={() => setShowModal(true)}
							className="ml-3 text-gray-600 hover:text-prim400"
						>
							<Settings className="w-6 h-6" />
						</button>
						<Link href="/vakken/teacher/courses">
							<Button size="sm" variant="ghost">
								Teacher Mode
							</Button>
						</Link>
					</>
				)}
				{isTeacherPage || isCoursePage ? (
					<Link href="/vakken/search">
						<Button size="sm" variant="ghost">
							<LogOut className="h-4 w-4 mr-2" />
							Exit
						</Button>
					</Link>
				) : null}
				<UserButton afterSignOutUrl="/" />
			</div>
			{showModal && (
				<div
					className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
					onClick={
						localStorage.getItem("userLevel")
							? handleBackdropClick
							: undefined
					}
				>
					<div className="bg-white rounded-lg p-6 w-full max-w-md relative">
						{/* Close Icon */}
						{localStorage.getItem("userLevel") && (
							<button
								onClick={() => setShowModal(false)}
								className="absolute top-4 right-5 text-gray-600 hover:text-gray-900"
							>
								<X />
							</button>
						)}
						{/* Modal Content */}
						<h3 className="text-xl font-semibold text-center mb-4">
							Select Level
						</h3>
						<div className="space-y-4">
							<button
								onClick={() => handleLevelSelect("mavo")}
								className={`w-full py-2 rounded-lg ${
									localStorage.getItem("userLevel") === "mavo"
										? "bg-green-500 hover:bg-green-600 text-white"
										: "bg-prim400 hover:bg-prim500 text-white"
								}`}
							>
								MAVO
							</button>
							<button
								onClick={() => handleLevelSelect("havo")}
								className={`w-full py-2 rounded-lg ${
									localStorage.getItem("userLevel") === "havo"
										? "bg-green-500 hover:bg-green-600 text-white"
										: "bg-prim400 hover:bg-prim500 text-white"
								}`}
							>
								HAVO
							</button>
							<button
								onClick={() => handleLevelSelect("vwo")}
								className={`w-full py-2 rounded-lg ${
									localStorage.getItem("userLevel") === "vwo"
										? "bg-green-500 hover:bg-green-600 text-white"
										: "bg-prim400 hover:bg-prim500 text-white"
								}`}
							>
								VWO
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
