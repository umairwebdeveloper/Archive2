import { useState, useEffect, useRef } from "react";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Settings, X, Check } from "lucide-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
	const [loadingLevels, setLoadingLevels] = useState<string[]>([]);
	const { isAuthenticated, isLoading } = useConvexAuth();
	const menuRef = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "#" },
		{ name: "How it works", href: "#" },
		{ name: "Validation", href: "#" },
		{ name: "Contact", href: "/contact" },
	];

	useEffect(() => {
		if (isAuthenticated && !isLoading) {
			const storedLevels = localStorage.getItem("userLevels");
			if (storedLevels) {
				setSelectedLevels(JSON.parse(storedLevels));
			} else {
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

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleBackdropClick = (event: any) => {
		if (event.target === event.currentTarget) {
			setShowModal(false);
		}
	};

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
									<Link href={link.href}>
										<span
											className={`block py-2 px-3 ${
												pathname === link.href
													? "text-gr rounded"
													: "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gr"
											} md:p-0 cursor-pointer`}
											aria-current={
												pathname === link.href
													? "page"
													: undefined
											}
										>
											{link.name}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
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

export default Navbar;
