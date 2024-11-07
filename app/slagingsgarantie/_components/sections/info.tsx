import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const Info = () => {
	
	const products = [
		{
			title: "1. Examentraining aangeschaft",
			description:
				"Je hebt één of meerdere examentrainingen aangeschaft bij Gotutor",
			icon: "/assets/png/sales.png",
		},
		{
			title: "2. Onvoldoende gehaald + gezakt",
			description:
				"Jammer genoeg heb je een onvoldoende gehaald en bent gezakt. Je komt dan in aanmerking voor een restitutie.  Dit betekent dat je het bedrag, wat je hebt betaald voor de examentraining van het vak waarvoor je een onvoldoende* hebt gehaald, terug kan krijgen. Heb je het voordeelpakket met alle vakken aangekocht en ben je niet geslaagd, dan krijg je het geld terug voor de vakken waar je een onvoldoende voor hebt gehaald.",
			icon: "/assets/png/support.png",
		},
		{
			title: "3. Restitutie aanvragen",
			description: 
				"Het werkt heel simpel. We hebben twee dingen van je nodig:<br>" +
				"1. je definitieve cijferlijst (duidelijke foto of inscannen)<br>" +
				"2. Je Gotutor aankoopbewijs.<br>" +
				"Deze twee documenten kan je mailen naar klantenservice@gotutor.nl.",
			icon: "/assets/png/help.png",
		},
		{
			title: "4. Geld terug",
			description: 
				"Nadat wij je mail hebben ontvangen, zullen we deze zo snel mogelijk verwerken. Als jouw aangeleverde documenten akkoord zijn, wordt het aankoopbedrag teruggestort op jouw rekening.",
			icon: "/assets/png/help.png",
		}
		
	];

	return (
		<section className="bg-[rgb(250,250,250)] py-12">
			<div className="container mx-auto px-6 lg:px-8">
				<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
					Slagingsgarantie van <span style={{ color: 'rgb(0, 162, 16)' }}>Gotutor</span>
				</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
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
		</section>
	);
};

export default Info;
