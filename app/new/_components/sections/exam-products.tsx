const ExamProduct = () => {
	const partners = [
		{ src: "/assets/png/comp1.png", alt: "Partner 1 Logo" },
		{ src: "/assets/png/comp2.png", alt: "Partner 2 Logo" },
		{ src: "/assets/png/comp3.png", alt: "Partner 3 Logo" },
		{ src: "/assets/png/comp4.png", alt: "Partner 4 Logo" },
		{ src: "/assets/png/comp5.png", alt: "Partner 5 Logo" },
	];

	const products = [
		{
			title: "Sales",
			description:
				"Embolden your sales team with on-the-spot, precise answers. Handle everything from quick queries to complex issues with ease and confidence.",
			icon: "/assets/png/sales.png",
		},
		{
			title: "Support",
			description:
				"Equip your support team to provide brilliant answers with increased efficiency. Experience faster resolutions and enhanced customer satisfaction.",
			icon: "/assets/png/support.png",
		},
		{
			title: "In Product Help",
			description:
				"Empower your customers with in-product answers, enabling them to resolve issues independently and effortlessly. Reduce reliance on support teams and streamline the customer experience.",
			icon: "/assets/png/help.png",
		},
	];

	return (
		<>
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
							{partners.map((partner, index) => (
								<img
									key={index}
									src={partner.src}
									alt={partner.alt}
									className="h-10 transition-transform transform hover:scale-110"
								/>
							))}
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
								adipiscing elit. Nunc, massa, viverra tempus,
								pulvinar ullamcorper odio. Amet non enim, orci
								ut vivamus pellentesque sed sit nam.
							</p>
							<button className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3">
								Read More
							</button>
						</div>
						<div className="w-full">
							{products.map((product, index) => (
								<div
									key={index}
									className="flex flex-col bg-white rounded-2xl border p-6 mb-4"
								>
									<div className="mb-4">
										<img
											src={product.icon}
											alt={`${product.title} Icon`}
											className="h-15 w-15"
										/>
									</div>
									<h3 className="text-xl font-semibold text-gray-800 mb-2">
										{product.title}
									</h3>
									<p className="text-gray-600 mb-4">
										{product.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExamProduct;
