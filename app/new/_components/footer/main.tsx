const Footer = () => {
	const useCasesLinks = [
		{ name: "Link 1", href: "#" },
		{ name: "Link 2", href: "#" },
		{ name: "Link 3", href: "#" },
		{ name: "Link 4", href: "#" },
	];

	const companyLinks = [
		{ name: "Link 1", href: "#" },
		{ name: "Link 2", href: "#" },
		{ name: "Link 3", href: "#" },
		{ name: "Link 4", href: "#" },
	];

	const modulesLinks = [
		{ name: "Link 1", href: "#" },
		{ name: "Link 2", href: "#" },
		{ name: "Link 3", href: "#" },
		{ name: "Link 4", href: "#" },
	];

	const footerLinks = [
		{ name: "Link 1", href: "#" },
		{ name: "Link 2", href: "#" },
		{ name: "Link 3", href: "#" },
	];
	return (
		<>
			<div className="bg-primBlack py-10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row justify-between gap-10">
						<div className="flex-auto">
							<img
								src="/assets/svg/dark-logo.svg"
								alt="logo"
								className="mb-5"
							/>
							<p className="text-white my-5 text-sec200">
								Subscribe to our newsletter
							</p>
							<form>
								<div className="relative w-full">
									<input
										type="email"
										placeholder="Enter your email"
										className="bg-sec400 opacity-75 text-white py-5 w-full rounded-full border-sec200 placeholder-sec200 focus:outline-none focus:ring-2 focus:ring-prim400 focus:border-transparent"
									/>
									<button
										type="submit"
										className="bg-prim400 hover:bg-prim500 absolute text-white py-3 px-5 rounded-full"
										style={{ bottom: "14%", right: "2%" }}
									>
										Subscribe
									</button>
								</div>
							</form>
						</div>
						<div className="flex-auto">
							<h3 className="text-white text-lg mb-5">
								Use Cases
							</h3>
							<ul className="text-sec200">
								{useCasesLinks.map((link, index) => (
									<li
										key={index}
										className="mb-2 hover:text-sec300 hover:underline cursor-pointer"
									>
										{link.name}
									</li>
								))}
							</ul>
						</div>
						<div className="flex-auto">
							<h3 className="text-white text-lg mb-5">Company</h3>
							<ul className="text-sec200">
								{companyLinks.map(
									(link, index) => (
										<li
											key={index}
											className="mb-2 hover:text-sec300 hover:underline cursor-pointer"
										>
											{link.name}
										</li>
									)
								)}
							</ul>
						</div>
						<div className="flex-auto">
							<h3 className="text-white text-lg mb-5">Modules</h3>
							<ul className="text-sec200">
								{modulesLinks.map(
									(link, index) => (
										<li
											key={index}
											className="mb-2 hover:text-sec300 hover:underline cursor-pointer"
										>
											{link.name}
										</li>
									)
								)}
							</ul>
						</div>
					</div>
					<hr className="my-8 border-sec200" />
					<div className="flex flex-col lg:flex-row gap-4 items-center text-sec100">
						<p>© 2024 Gotutor | Alle rechten voorbehouden</p>
						{footerLinks.map((link, index) => (
							<p
								key={index}
								className="hover:text-sec300 hover:underline cursor-pointer"
							>
								{link.name}
							</p>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
