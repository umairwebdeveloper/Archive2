"use client";
import { useState, useEffect } from "react";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogOut, Settings, X, Check } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import toast from "react-hot-toast";
import { isTeacher } from "@/lib/teacher";
import { Spinner } from "@/components/spinner";
import axios from "axios";

export const NavbarRoutes = () => {
	const { userId } = useAuth();
	const pathname = usePathname();
	const [showModal, setShowModal] = useState(false);
	const [loadingLevels, setLoadingLevels] = useState<string[]>([]);
	const [selectedLevels, setSelectedLevels] = useState<string[]>([]);


	const isTeacherPage = pathname?.startsWith("/vakken/teacher");
	const isCoursePage = pathname?.includes("/courses");
	const isSearchPage = pathname === "/vakken/search";
	const isSubjectPage = pathname === "/vakken/subject";
	
	useEffect(() => {
		const storedLevels = localStorage.getItem("userLevels");
		if (storedLevels) {
			setSelectedLevels(JSON.parse(storedLevels));
		}
	}, []);

	const handleBackdropClick = (event: any) => {
		if (event.target === event.currentTarget) {
			setShowModal(false);
		}
	};
	// Handle level selection
	const handleLevelSelect = async (level: string) => {
		// Add loading state
		setLoadingLevels((prev) => [...prev, level]);
		try {
			// Toggle level selection
			setSelectedLevels((prev) => {
				const updatedLevels = prev.includes(level)
					? prev.filter((l) => l !== level)
					: [...prev, level];
				// Store updated levels in localStorage
				localStorage.setItem("userLevels", JSON.stringify(updatedLevels));
				return updatedLevels;
			});
	
			// Simulate an API call to check level
			const response = await axios.get(
				`/api/level/check-level?title=${encodeURIComponent(level)}`
			);
			const levelData = response.data;
			if (levelData?.subjects?.length > 0) {
				toast.success(`The level "${level}" has associated subjects.`);
			} else {
				toast.error(
					`The level "${level}" does not have any associated subjects.`
				);
			}
		} catch (error) {
			console.error(error);
			toast.error("An error occurred while checking subjects for this level.");
		} finally {
			// Remove loading state
			setLoadingLevels((prev) => prev.filter((l) => l !== level));
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
					onClick={handleBackdropClick}
				>
					<div className="bg-white rounded-lg p-6 w-full max-w-md relative">
						{/* Close Icon */}
						<button
							onClick={() => setShowModal(false)}
							className="absolute top-4 right-5 text-gray-600 hover:text-gray-900"
						>
							<X />
						</button>
						{/* Modal Content */}
						<h3 className="text-xl font-semibold text-center mb-4">
							Select Levels
						</h3>
						<div className="space-y-4">
							{["mavo", "havo", "vwo"].map((level) => (
								<button
									key={level}
									onClick={() => handleLevelSelect(level)}
									className={`w-full p-2 flex items-center justify-between rounded-lg ${
										selectedLevels.includes(level)
											? "bg-green-500 text-white"
											: "bg-prim400 text-white"
									} ${
										loadingLevels.includes(level)
											? "opacity-50 cursor-not-allowed"
											: ""
									}`}
									disabled={loadingLevels.includes(level)}
								>
									<span>{level.toUpperCase()}</span>
									{loadingLevels.includes(level) ? (
										<Spinner />
									) : selectedLevels.includes(level) ? (
										<Check className="h-5 w-5 text-white" />
									) : null}
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
