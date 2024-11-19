import { useState } from "react";

const Info = () => {
	const [selectedProduct, setSelectedProduct] = useState<number>(0); // Altijd de eerste product actief

	const products = [
		{
			title: "We herhalen in korte tijd alle examenstof",
			description:
				"Je volgt examentraining met maximaal 6 leerlingen tegelijk. Zo krijg je alle aandacht die je verdient. Geen grote klassen zoals bij regulier onderwijs. Alleen jij en maximaal 5 anderen.",
			icon: "/assets/png/sales.png",
			extraImage: "/assets/png/building.png",
		},
		{
			title: "Krijg handige strategieën en stappenplannen",
			description:
				"Onze examentrainingen bevatten alle stof voor het centraal eindexamen (CE) en de schoolexamens (SE). In het trainingsoverzicht zie je precies welke onderwerpen je moet kennen voor het CE en wat de SE onderwerpen zijn. Met OnlineSlagen bereid je je dus het hele examenjaar voor op de eindexamens!",
			icon: "/assets/png/support.png",
			extraImage: "/assets/png/building2.png",
		},
		{
			title: "Oefen het beantwoorden van examenvragen",
			description:
				"Op onze examentrainingen geven we een slagingsgarantie. Heb je na het volgen van onze examentraining toch een onvoldoende voor het vak gehaald? Wij storten het volledige bedrag terug. Lees hier meer over de slagingsgarantie.",
			icon: "/assets/png/help.png",
			extraImage: "/assets/png/customer-service.png",
		},
	];

	return (
		<section className="bg-[rgb(250,250,250)] py-12">
			<div className="container mx-auto px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
						Examentraining van <span style={{ color: 'rgb(0, 162, 16)' }}>Gotutor</span>
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-5">
					<div className="w-full flex flex-col items-center md:items-start">
						{products.map((product, index) => (
							<div
								key={index}
								className={`flex items-center bg-white rounded-2xl border p-6 mb-4 cursor-pointer transition-transform transform hover:scale-105 w-full md:w-auto ${
									selectedProduct === index
										? "border-[rgb(0,162,16)] shadow-lg"
										: "shadow-md hover:shadow-lg"
								}`}
								onClick={() => setSelectedProduct(index)}
							>
								<img
									src={product.icon}
									alt={`${product.title} Icon`}
									className="h-15 w-15 mr-4"
								/>
								<div className="flex flex-col text-center md:text-left">
									<h3 className="text-xl font-semibold text-gray-800 mb-1">
										{product.title}
									</h3>
									<p className="text-gray-600">{product.description}</p>
								</div>
							</div>
						))}
					</div>
					{/* Extra image is only shown on large screens */}
					<div className="hidden md:flex justify-center items-center">
						<img
							src={products[selectedProduct].extraImage}
							alt={`${products[selectedProduct].title} Extra Image`}
							className="h-100 w-100 object-contain"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Info;
