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
			<div className="bg-gr1 py-10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row justify-between gap-10">
						<div className="flex-auto">
							<img
								src="/assets/svg/new_logo.svg"
								alt="logo"
								className="mb-5"
							/>
							<p className="my-5">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit.
								<br /> Consequat et est, diam et vulputate.
								Posuere
								<br /> feugiat phasellus
							</p>
						</div>
						<div className="flex-auto">
							<h3 className="font-bold text-lg mb-5">
								Use Cases
							</h3>
							<ul className="">
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
							<h3 className="font-bold text-lg mb-5">Company</h3>
							<ul className="">
								{companyLinks.map((link, index) => (
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
							<h3 className="font-bold text-lg mb-5">Modules</h3>
							<ul className="">
								{modulesLinks.map((link, index) => (
									<li
										key={index}
										className="mb-2 hover:text-sec300 hover:underline cursor-pointer"
									>
										{link.name}
									</li>
								))}
							</ul>
						</div>
					</div>
					<hr className="my-8 border-sec200" />
					<div className="flex justify-between items-center">
						<p>© 2024 Gotutor</p>
						<div>
							{footerLinks.map((link, index) => (
								<span
									key={index}
									className="hover:text-sec300 hover:underline cursor-pointer ml-3"
								>
									{link.name}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
