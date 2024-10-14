"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { ArrowRight, Settings, X } from "lucide-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { isAuthenticated, isLoading } = useConvexAuth();
	const [selectedLevel, setSelectedLevel] = useState(null);

	// Show modal after successful login
	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			const level = localStorage.getItem("userLevel");
			if (!level) {
				// If level is not selected, show the modal
				setShowModal(true);
			}
		}
	}, [isAuthenticated, isLoading]);
	const handleBackdropClick = (event: any) => {
		if (event.target === event.currentTarget) {
			setShowModal(false);
		}
	};
	// Handle level selection
	const handleLevelSelect = async (level: any) => {
		try {
			setSelectedLevel(level);
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
			<nav className="bg-gray-100 bg-opacity-75 py-4 lg:rounded-full rounded-lg">
				<div className="container mx-auto flex flex-wrap items-center justify-between px-4">
					<a
						href="#"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<img
							src="/assets/svg/Logo.svg"
							className="h-8"
							alt="Logo"
						/>
					</a>
					<div className="flex items-center lg:order-2 space-x-3 rtl:space-x-reverse">
						{isLoading && <Spinner />}
						{!isAuthenticated && !isLoading && (
							<>
								<SignInButton mode="modal">
									<button
										type="button"
										className="flex items-center justify-between gap-3 text-white bg-prim400 hover:bg-prim500 shadow-sm font-medium rounded-full text-sm px-5 py-2 text-center"
									>
										<span></span>
										<span>Sign in</span> <ArrowRight />
									</button>
								</SignInButton>
							</>
						)}

						{isAuthenticated && !isLoading && (
							<>
								<button
									onClick={() => setShowModal(true)}
									className="ml-3 text-gray-600 hover:text-prim400"
								>
									<Settings className="w-6 h-6" />
								</button>
								<div className="lg:block hidden">
									<Button variant="ghost" size="sm" asChild>
										<Link href="/vakken/subject">
											Ik ben leerling
										</Link>
									</Button>
								</div>
								<UserButton afterSignOutUrl="/" />
							</>
						)}

						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-cta"
							aria-expanded={isOpen}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						className={`${
							isOpen ? "block" : "hidden"
						} w-full lg:flex lg:items-center lg:w-auto lg:order-1`}
						id="navbar-cta"
					>
						<ul className="flex flex-col lg:flex-row lg:space-x-8 rtl:space-x-reverse font-medium p-4 lg:p-0 mt-4 lg:mt-0 bg-gray-100 rounded-lg lg:bg-transparent lg:dark:bg-transparent dark:bg-gray-800 lg:dark:bg-opacity-50">
							<li>
								<a
									href="#"
									className="block py-2 px-3 lg:p-0 text-gray-900 rounded bg-gray-200 lg:bg-transparent lg:hover:text-prim400 dark:text-white"
									aria-current="page"
								>
									Examentrainingen
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-300 hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-prim400 dark:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
								>
									Examenboekjes
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-300 hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-prim400 dark:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
								>
									Voor Scholen
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-300 hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-prim400 dark:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent"
								>
									Exameninfo
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{/* Modal */}
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

export default Navbar;
