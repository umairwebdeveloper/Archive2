"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-gray-100 bg-opacity-75 py-4 md:rounded-full rounded-lg">
			<div className="container mx-auto flex flex-wrap items-center justify-between px-4">
				<a
					href="#"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img
						src="/assets/svg/logo.svg"
						className="h-8"
						alt="Logo"
					/>
					
				</a>
				<div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
					<button
						type="button"
						className="flex items-center justify-between gap-3 text-white bg-prim400 hover:bg-prim500 shadow-sm font-medium rounded-full text-sm px-5 py-2 text-center"
					>
						<span></span>
						<span>Sign in</span> <ArrowRight />
					</button>
					<button
						onClick={() => setIsOpen(!isOpen)}
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
					} w-full md:flex md:items-center md:w-auto md:order-1`}
					id="navbar-cta"
				>
					<ul className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse font-medium p-4 md:p-0 mt-4 md:mt-0 bg-gray-100 rounded-lg md:bg-transparent md:dark:bg-transparent dark:bg-gray-800 md:dark:bg-opacity-50">
						<li>
							<a
								href="#"
								className="block py-2 px-3 md:p-0 text-gray-900 rounded bg-gray-200 md:bg-transparent md:text-prim400 dark:text-white"
								aria-current="page"
							>
								Home
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-300 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-prim400 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-300 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-prim400 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
							>
								Services
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-300 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-prim400 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
