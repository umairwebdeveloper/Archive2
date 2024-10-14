"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Footer from "./_components/footer/main";

const NewPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className="bg-gr1 relative">
				<div
					className="bg-white w-full"
					style={{
						borderBottomRightRadius: "72px",
						borderBottomLeftRadius: "72px",
						paddingBottom: "200px",
					}}
				>
					<div className="container">
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
									<button
										type="button"
										className="text-white bg-gr hover:bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-full px-5 py-2 text-center"
									>
										Sign in
									</button>
									<button
										onClick={toggleMenu}
										type="button"
										className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
										aria-controls="navbar-sticky"
										aria-expanded={isOpen}
									>
										<span className="sr-only">
											Open main menu
										</span>
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
									className={`items-center justify-between ${
										isOpen ? "block" : "hidden"
									} w-full md:flex md:w-auto md:order-1`}
									id="navbar-sticky"
								>
									<ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:py-3 md:px-6 md:rounded-full">
										<li>
											<a
												className="block py-2 px-3 text-white bg-gr rounded md:bg-transparent md:text-gr md:p-0 cursor-pointer"
												aria-current="page"
											>
												Home
											</a>
										</li>
										<li>
											<a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gr md:p-0 cursor-pointer">
												About
											</a>
										</li>
										<li>
											<a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gr md:p-0 cursor-pointer">
												How it works
											</a>
										</li>
										<li>
											<a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gr md:p-0 cursor-pointer">
												Validation
											</a>
										</li>
										<li>
											<a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gr md:p-0 cursor-pointer">
												Blog
											</a>
										</li>
									</ul>
								</div>
							</div>
						</nav>
						<div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 bg-white px-4">
							<h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
								Build Online
								<br /> Examentrainingen
							</h1>
							<p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 max-w-md sm:max-w-xl">
								Easily create dynamic user journeys to activate,
								retain, and understand users, without
								engineering effort.
							</p>
							<button className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3">
								Get a Demo
							</button>
						</div>
					</div>
				</div>
				<div className="absolute bottom-1/2 left-1/2 transform translate-x-[-50%] translate-y-[180%] md:translate-y-[120%]">
					<img
						src="/assets/png/MacbookAir.png"
						alt="laptop"
						className="w-6/7"
					/>
				</div>
			</div>
			<div className="bg-gr1 md:pt-[230px] pt-0">
				<div className="container">
					<div className="flex flex-col items-center justify-center text-center py-10 md:mb-10">
						<h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-3">
							Meet Our Partners
						</h2>
						<p className="text-base md:text-lg max-w-2xl mb-8">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Nunc, massa, viverra tempus, pulvinar
							ullamcorper odio. Amet non enim, orci ut vivamus
							pellentesque sed sit nam.
						</p>
						<div className="flex flex-wrap justify-center md:justify-between items-center gap-4 p-6 bg-white rounded-3xl border shadow-sm w-full">
							<img
								src="/assets/png/comp1.png"
								alt="Partner 1 Logo"
								className="h-10 transition-transform transform hover:scale-110"
							/>
							<img
								src="/assets/png/comp2.png"
								alt="Partner 2 Logo"
								className="h-10 transition-transform transform hover:scale-110"
							/>
							<img
								src="/assets/png/comp3.png"
								alt="Partner 3 Logo"
								className="h-10 transition-transform transform hover:scale-110"
							/>
							<img
								src="/assets/png/comp4.png"
								alt="Partner 4 Logo"
								className="h-10 transition-transform transform hover:scale-110"
							/>
							<img
								src="/assets/png/comp5.png"
								alt="Partner 5 Logo"
								className="h-10 transition-transform transform hover:scale-110"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
								Alle examenproducten
								<br /> op één plek
							</h2>
							<p className="text-gray-600 text-base md:text-lg mb-6 max-w-2xl">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nunc,
								<br /> massa, viverra tempus, pulvinar
								ullamcorper odio. Amet non enim,
								<br /> orci ut vivamus pellentesque sed sit nam.
							</p>
							<button className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3">
								Read More
							</button>
						</div>
						<div className="w-full">
							<div className="flex flex-col bg-white rounded-2xl border p-6 mb-4">
								<div className="mb-4">
									<img
										src="/assets/png/sales.png"
										alt="Sales Icon"
										className="h-15 w-15"
									/>
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">
									Sales
								</h3>
								<p className="text-gray-600 mb-4">
									Embolden your sales team with on-the-spot,
									precise answers. Handle everything from
									quick queries to complex issues with ease
									and confidence.
								</p>
							</div>
							<div className="flex flex-col bg-white rounded-2xl border p-6 mb-4">
								<div className="mb-4">
									<img
										src="/assets/png/support.png"
										alt="Sales Icon"
										className="h-15 w-15"
									/>
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">
									Support
								</h3>
								<p className="text-gray-600 mb-4">
									quip your support team to provide brilliant
									answers with increased efficiency.
									Experience faster resolutions, increased
									customer satisfaction, and a more versatile
									support team.
								</p>
							</div>
							<div className="flex flex-col bg-white rounded-2xl border p-6 mb-4">
								<div className="mb-4">
									<img
										src="/assets/png/help.png"
										alt="Sales Icon"
										className="h-15 w-15"
									/>
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-2">
									In Product Help
								</h3>
								<p className="text-gray-600 mb-4">
									Empower your customers with in-product
									answers, enabling them to resolve issues
									independently and effortlessly. Reduce
									reliance on support teams and streamline the
									customer experience.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="py-10 container">
				<h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 mb-10">
					Alles-in-1 online examentraining
				</h2>
				<div className="flex flex-col md:flex-row justify-between items-center border rounded-3xl p-3 md:p-5">
					<div className="md:text-left md:w-1/2">
						<h3 className="font-bold text-2xl mb-5">
							Online exam training (CE + SE)
						</h3>
						<div>
							<div className="flex gap-3 items-center mb-3 check-list">
								<span className="text-gr">
									<CheckCircle2 />
								</span>
								<p className="text-lg">Uitlegvideo's</p>
							</div>
						</div>
						<div>
							<div className="flex gap-3 items-center mb-3 check-list">
								<span className="text-gr">
									<CheckCircle2 />
								</span>
								<p className="text-lg">Samenvattingen</p>
							</div>
						</div>
						<div>
							<div className="flex gap-3 items-center mb-3 check-list">
								<span className="text-gr">
									<CheckCircle2 />
								</span>
								<p className="text-lg">
									Interactieve oefenomgeving
								</p>
							</div>
						</div>
						<div>
							<div className="flex gap-3 items-center mb-3 check-list">
								<span className="text-gr">
									<CheckCircle2 />
								</span>
								<p className="text-lg">Digitale examenbundel</p>
							</div>
						</div>
						<div>
							<div className="flex gap-3 items-center mb-3 check-list">
								<span className="text-gr">
									<CheckCircle2 />
								</span>
								<p className="text-lg">
									Bijles-chat (vanaf 1 april)
								</p>
							</div>
						</div>
						<div>
							<div className="flex gap-3 items-center mb-3 check-list">
								<span className="text-gr">
									<CheckCircle2 />
								</span>
								<p className="text-lg">
									Begrippenlijsten en flashcards
								</p>
							</div>
						</div>
						<div className="flex gap-3 justify-center md:justify-start mt-5">
							<button className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3">
								Kies je vakken
							</button>
						</div>
					</div>

					<div className="md:w-1/2 mt-5 md:mt-0">
						<img
							className="w-full"
							src="/assets/png/customer-service.png"
							alt="laptop"
						/>
					</div>
				</div>
				<h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 my-10">
					Pricing
				</h2>
				<div className="bg-white dark:bg-gray-900">
					<div className="px-4 mx-auto max-w-screen-xl lg:px-6">
						<div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
							<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
								<h3 className="mb-4 text-2xl font-semibold">
									Starter
								</h3>
								<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
									Best option for personal use & for your next
									project.
								</p>
								<div className="flex justify-center items-baseline my-8">
									<span className="mr-2 text-5xl font-extrabold">
										$29
									</span>
									<span className="text-gray-500 dark:text-gray-400">
										/month
									</span>
								</div>

								<ul
									role="list"
									className="mb-8 space-y-4 text-left"
								>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>Individual configuration</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>No setup, or hidden fees</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Team size:{" "}
											<span className="font-semibold">
												1 developer
											</span>
										</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Premium support:{" "}
											<span className="font-semibold">
												6 months
											</span>
										</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Free updates:{" "}
											<span className="font-semibold">
												6 months
											</span>
										</span>
									</li>
								</ul>
								<a
									href="#"
									className="text-white bg-gr hover:bg-green-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
								>
									Get started
								</a>
							</div>

							<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
								<h3 className="mb-4 text-2xl font-semibold">
									Company
								</h3>
								<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
									Relevant for multiple users, extended &
									premium support.
								</p>
								<div className="flex justify-center items-baseline my-8">
									<span className="mr-2 text-5xl font-extrabold">
										$99
									</span>
									<span className="text-gray-500 dark:text-gray-400">
										/month
									</span>
								</div>

								<ul
									role="list"
									className="mb-8 space-y-4 text-left"
								>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>Individual configuration</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>No setup, or hidden fees</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Team size:{" "}
											<span className="font-semibold">
												10 developers
											</span>
										</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Premium support:{" "}
											<span className="font-semibold">
												24 months
											</span>
										</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Free updates:{" "}
											<span className="font-semibold">
												24 months
											</span>
										</span>
									</li>
								</ul>
								<a
									href="#"
									className="text-white bg-gr hover:bg-green-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
								>
									Get started
								</a>
							</div>

							<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
								<h3 className="mb-4 text-2xl font-semibold">
									Enterprise
								</h3>
								<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
									Best for large scale uses and extended
									redistribution rights.
								</p>
								<div className="flex justify-center items-baseline my-8">
									<span className="mr-2 text-5xl font-extrabold">
										$499
									</span>
									<span className="text-gray-500 dark:text-gray-400">
										/month
									</span>
								</div>

								<ul
									role="list"
									className="mb-8 space-y-4 text-left"
								>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>Individual configuration</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>No setup, or hidden fees</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Team size:{" "}
											<span className="font-semibold">
												100+ developers
											</span>
										</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Premium support:{" "}
											<span className="font-semibold">
												36 months
											</span>
										</span>
									</li>
									<li className="flex items-center space-x-3">
										<svg
											className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										<span>
											Free updates:{" "}
											<span className="font-semibold">
												36 months
											</span>
										</span>
									</li>
								</ul>
								<a
									href="#"
									className="text-white bg-gr hover:bg-green-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
								>
									Get started
								</a>
							</div>
						</div>
					</div>
				</div>
				<h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 mt-10 mb-2">
					Faq's
				</h2>
				<p className="text-center mb-10">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nunc, massa, viverra tempus, pulvinar<br/> ullamcorper odio. Amet
					non enim, orci ut vivamus pellentesque sed sit nam.
				</p>
				<div id="accordion-collapse" data-accordion="collapse">
					<h2 id="accordion-collapse-heading-1">
						<button
							type="button"
							className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
							data-accordion-target="#accordion-collapse-body-1"
							aria-expanded="true"
							aria-controls="accordion-collapse-body-1"
						>
							<span>What is Flowbite?</span>
							<svg
								data-accordion-icon
								className="w-3 h-3 rotate-180 shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5 5 1 1 5"
								/>
							</svg>
						</button>
					</h2>
					<div
						id="accordion-collapse-body-1"
						className="hidden"
						aria-labelledby="accordion-collapse-heading-1"
					>
						<div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
							<p className="mb-2 text-gray-500 dark:text-gray-400">
								Flowbite is an open-source library of
								interactive components built on top of Tailwind
								CSS including buttons, dropdowns, modals,
								navbars, and more.
							</p>
							<p className="text-gray-500 dark:text-gray-400">
								Check out this guide to learn how to{" "}
								<a
									href="/docs/getting-started/introduction/"
									className="text-blue-600 dark:text-blue-500 hover:underline"
								>
									get started
								</a>{" "}
								and start developing websites even faster with
								components on top of Tailwind CSS.
							</p>
						</div>
					</div>
					<h2 id="accordion-collapse-heading-2">
						<button
							type="button"
							className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
							data-accordion-target="#accordion-collapse-body-2"
							aria-expanded="false"
							aria-controls="accordion-collapse-body-2"
						>
							<span>Is there a Figma file available?</span>
							<svg
								data-accordion-icon
								className="w-3 h-3 rotate-180 shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5 5 1 1 5"
								/>
							</svg>
						</button>
					</h2>
					<div
						id="accordion-collapse-body-2"
						className="hidden"
						aria-labelledby="accordion-collapse-heading-2"
					>
						<div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
							<p className="mb-2 text-gray-500 dark:text-gray-400">
								Flowbite is first conceptualized and designed
								using the Figma software so everything you see
								in the library has a design equivalent in our
								Figma file.
							</p>
							<p className="text-gray-500 dark:text-gray-400">
								Check out the{" "}
								<a
									href="https://flowbite.com/figma/"
									className="text-blue-600 dark:text-blue-500 hover:underline"
								>
									Figma design system
								</a>{" "}
								based on the utility classes from Tailwind CSS
								and components from Flowbite.
							</p>
						</div>
					</div>
					<h2 id="accordion-collapse-heading-3">
						<button
							type="button"
							className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
							data-accordion-target="#accordion-collapse-body-3"
							aria-expanded="false"
							aria-controls="accordion-collapse-body-3"
						>
							<span>
								What are the differences between Flowbite and
								Tailwind UI?
							</span>
							<svg
								data-accordion-icon
								className="w-3 h-3 rotate-180 shrink-0"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5 5 1 1 5"
								/>
							</svg>
						</button>
					</h2>
					<div
						id="accordion-collapse-body-3"
						className="hidden"
						aria-labelledby="accordion-collapse-heading-3"
					>
						<div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
							<p className="mb-2 text-gray-500 dark:text-gray-400">
								The main difference is that the core components
								from Flowbite are open source under the MIT
								license, whereas Tailwind UI is a paid product.
								Another difference is that Flowbite relies on
								smaller and standalone components, whereas
								Tailwind UI offers sections of pages.
							</p>
							<p className="mb-2 text-gray-500 dark:text-gray-400">
								However, we actually recommend using both
								Flowbite, Flowbite Pro, and even Tailwind UI as
								there is no technical reason stopping you from
								using the best of two worlds.
							</p>
							<p className="mb-2 text-gray-500 dark:text-gray-400">
								Learn more about these technologies:
							</p>
							<ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
								<li>
									<a
										href="https://flowbite.com/pro/"
										className="text-blue-600 dark:text-blue-500 hover:underline"
									>
										Flowbite Pro
									</a>
								</li>
								<li>
									<a
										href="https://tailwindui.com/"
										rel="nofollow"
										className="text-blue-600 dark:text-blue-500 hover:underline"
									>
										Tailwind UI
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</>
	);
};

export default NewPage;
