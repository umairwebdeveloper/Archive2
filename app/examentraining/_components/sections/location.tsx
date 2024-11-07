import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const Info = () => {
	
	const products = [
		{
			title: "Locatie",
			description: "De trainingen vinden plaats op Young Business School. Dit is een middelbare school in Rotterdam-Zuid.",
			school: "Young Business School",
			location: "Maashavenweg 14, 3072 AZ Rotterdam"
		},
		{
			title: "Bereikbaarheid",
			description:
				"Het Gerrit van der Veen College is goed bereikbaar het openbaar vervoer. Je kunt vanaf station Amsterdam Zuid verschillende bus- en tramlijnen naar de halte Gerrit van der Veenstraat nemen, maar ook lopend ben je binnen 15 tot 20 minuten op de trainingslocatie.",
		},
	];

	return (
		<section className="bg-[rgb(250,250,250)] py-12">
			<div className="container mx-auto px-6 lg:px-8">
				<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
							 <span style={{ color: 'rgb(0, 162, 16)' }}>Gotutor</span> trainingslocatie
						</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
					<div>
						<div className="flex flex-col items-center bg-[#f9f9f9] border border-solid border-[#dedede] rounded-lg gap-1 h-64 overflow-hidden p-4 relative w-full mb-4">
							<img
								src="/assets/png/building.png" // vervang dit door de URL van je afbeelding
								className="absolute inset-0 w-full h-full object-cover" // zorgt ervoor dat de afbeelding de volledige div vult

							/>
						</div>


						<div className="flex flex-col items-center bg-[#f9f9f9] border border-solid border-[#dedede] rounded-lg gap-1 h-64 overflow-hidden p-4 relative w-full mb-4">
							<img
								src="/assets/png/building2.png" // vervang dit door de URL van je afbeelding
								className="absolute inset-0 w-full h-full object-cover" // zorgt ervoor dat de afbeelding de volledige div vult
							/>
						</div>

					</div>
					<div className="w-full">
							{products.map((product, index) => (
								<div
									key={index}
									className="flex flex-col bg-white rounded-2xl border p-6 mb-4"
								>
									
									<h3 className="text-xl font-semibold text-gray-800 mb-2">
										{product.title}
									</h3>
									<p className="text-gray-600 mb-4">
										{product.description}
									</p>
									<div className="flex flex-col items-center bg-[#f9f9f9] border border-solid border-[#dedede] rounded-lg gap-1 h-min overflow-hidden p-4 relative w-full">
									<h1 className="text-xl font-semibold text-gray-800">
									{product.school}
									</h1>
									<h2>
									{product.location}
									</h2>
									</div>
								</div>
							))}
						</div>
				</div>
				
			</div>
		</section>
	);
};

export default Info;
