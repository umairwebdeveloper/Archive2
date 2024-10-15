import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
	const useCasesLinks = [
		{ name: "Trust & Safety", href: "#" },
		{ name: "Terms of Service", href: "#" },
		{ name: "Privacy Policy", href: "#" },
		{ name: "Do Not Sell My Info", href: "#" },
	];

	const companyLinks = [
		{ name: "Blog", href: "#" },
		{ name: "Guides", href: "#" },
		{ name: "FAQ", href: "#" },
		{ name: "Help Center", href: "#" },
	];

	const modulesLinks = [
		{ name: "Contact", href: "#" },
		{ name: "FAQ", href: "#" },
	];

	const socialMediaLinks = [
		{ icon: <Facebook className="w-6 h-6" />, href: "#" },
		{ icon: <Twitter className="w-6 h-6" />, href: "#" },
		{ icon: <Instagram className="w-6 h-6" />, href: "#" },
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
								Terms & privacy
							</h3>
							<ul className="">
								{useCasesLinks.map((link, index) => (
									<li
										key={index}
										className="mb-2 hover:text-gr hover:underline cursor-pointer"
									>
										{link.name}
									</li>
								))}
							</ul>
						</div>
						<div className="flex-auto">
							<h3 className="font-bold text-lg mb-5">
								Resources
							</h3>
							<ul className="">
								{companyLinks.map((link, index) => (
									<li
										key={index}
										className="mb-2 hover:text-gr hover:underline cursor-pointer"
									>
										{link.name}
									</li>
								))}
							</ul>
						</div>
						<div className="flex-auto">
							<h3 className="font-bold text-lg mb-5">About</h3>
							<ul className="">
								{modulesLinks.map((link, index) => (
									<li
										key={index}
										className="mb-2 hover:text-gr hover:underline cursor-pointer"
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
						<div className="flex space-x-4">
							{socialMediaLinks.map((link, index) => (
								<a
									key={index}
									href={link.href}
									className="text-gray-500 hover:text-gr transition-colors"
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.icon}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
