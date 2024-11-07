import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const Info = () => {
	const products = [
		{
			title: "Kleine klassen",
			description:
				"Je volgt examentraining met maximaal 6 leerlingen tegelijk. Zo krijg je alle aandacht die je verdient. Geen grote klassen zoals bij regulier onderwijs. Alleen jij en maximaal 5 anderen.",
			icon: "/assets/png/sales.png",
		},
		{
			title: "Het gehele examenjaar voorbereid",
			description:
				"Onze examentrainingen bevatten alle stof voor het centraal eindexamen (CE) en de schoolexamens (SE). In het trainingsoverzicht zie je precies welke onderwerpen je moet kennen voor het CE en wat de SE onderwerpen zijn. Met OnlineSlagen bereid je je dus het hele examenjaar voor op de eindexamens!.",
			icon: "/assets/png/support.png",
		},
		{
			title: "Slagingsgarantie",
			description:
				"Op onze examentrainingen geven we een slagingsgarantie. Heb je na het volgen van onze examentraining toch een onvoldoende voor het vak gehaald? Wij storten het volledige bedrag terug. Lees hier meer over de slagingsgarantie.",
			icon: "/assets/png/help.png",
			button: "Lees meer"
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
							Zonder zorgen de examens in
						</h2>
						<p className="text-gray-600 text-base md:text-lg mb-6 max-w-2xl">
							Het examenjaar is voor leerlingen én hun ouders vaak een spannend jaar. Met
							een examentraining van Gotutor gaat jouw kind vol vertrouwen en zonder
							zorgen de school- of eindexamens in. Boek een examentraining die vóór 15
							januari plaatsvindt en ontvang 15% korting!
						</p>

						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
							<span style={{ color: 'rgb(0, 162, 16)' }}>Gotutor</span> examentraining 
							<br /> in het kort
						</h2>
						<p className="text-gray-600 text-base md:text-lg mb-6 max-w-2xl">
							Een examentraining van Gotutor duurt twee aaneengesloten dagen en verloopt
							volgens een vast programma. Tijdens een examentraining worden leerlingen
							door enthousiaste en ervaren begeleiders voorbereid op de school- en
							eindexamens. We werken hierbij met eigen ontwikkeld lesmateriaal. Zo
							zorgen we ervoor dat jouw kind de examenstof goed in de vingers krijgt en
							met zelfvertrouwen de examens ingaat. Examentrainingen vinden plaats in
							elke weekend en alle schoolvakanties.
						</p>
						<button className="bg-[rgb(0,162,16)] text-white font-medium rounded-md px-6 py-3 transition duration-200 hover:opacity-80" style={{ borderRadius: '8px', opacity: 1 }}> 
							Lees Meer
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
								{/* Render the button only if the product has a button property */}
								{product.button && (
									<button className="w-[25%] bg-[rgb(0,162,16)] text-white font-medium rounded-md px-6 py-3 transition duration-200 hover:opacity-80" style={{ borderRadius: '8px', opacity: 1 }}> 
										{product.button}
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Info;
