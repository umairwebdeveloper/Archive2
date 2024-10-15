import { useState, useEffect, useRef } from "react";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Settings, X } from "lucide-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { isAuthenticated, isLoading } = useConvexAuth();
	const menuRef = useRef<HTMLDivElement | null>(null);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const navLinks = [
		{ name: "Home", href: "#", current: true },
		{ name: "About", href: "#", current: false },
		{ name: "How it works", href: "#", current: false },
		{ name: "Validation", href: "#", current: false },
		{ name: "Blog", href: "#", current: false },
	];

	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			const level = localStorage.getItem("userLevel");
			if (!level) {
				setShowModal(true);
			}
		}
	}, [isAuthenticated, isLoading]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleBackdropClick = (event: any) => {
		if (event.target === event.currentTarget) {
			setShowModal(false);
		}
	};

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
			<nav className="bg-white w-full z-20">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
					<a className="flex items-center space-x-3 rtl:space-x-reverse">
						<img
							src="/assets/svg/new_logo.svg"
							className="h-8"
							alt="Flowbite Logo"
						/>
					</a>
					<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
						{isLoading && <Spinner />}
						{!isAuthenticated && !isLoading && (
							<>
								<SignInButton mode="modal">
									<button
										type="button"
										className="text-white bg-gr hover:bg-green-500 font-medium rounded-full px-5 py-2 text-center"
									>
										Sign in
									</button>
								</SignInButton>
							</>
						)}
						{isAuthenticated && !isLoading && (
							<>
								<button
									onClick={() => setShowModal(true)}
									className="mr-2 text-gray-600 hover:text-gr"
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
							onClick={toggleMenu}
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-sticky"
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
						ref={menuRef}
						className={`items-center justify-between ${
							isOpen ? "block" : "hidden"
						} w-full md:flex md:w-auto md:order-1`}
						id="navbar-sticky"
					>
						<ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:py-3 md:px-6 md:rounded-full">
							{navLinks.map((link, index) => (
								<li key={index}>
									<a
										href={link.href}
										className={`block py-2 px-3 ${
											link.current
												? "text-gr rounded"
												: "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gr"
										} md:p-0 cursor-pointer`}
										aria-current={
											link.current ? "page" : undefined
										}
									>
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
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
