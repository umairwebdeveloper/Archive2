import { useState } from "react"; 
import { Clock, Info, ArrowRight, X } from "lucide-react"; // Klok-icoon en andere iconen importeren

// Definieer een type voor de agenda-items
interface AgendaItem {
	time: string;
	title: string;
	description: string; // Voeg een beschrijving toe
	color: string;
}

const Agenda = () => {
	const [selectedDay, setSelectedDay] = useState<string>("D1"); // Maak D1 de standaard actieve dag
	const [activeItem, setActiveItem] = useState<number | null>(null);

	const days: string[] = ["D1", "D2"];

	const agendaItems: { [key: string]: AgendaItem[] } = {
		D1: [
			{ time: "10:00", title: "eerste trainingsblok", description: "Je gaat bekijken of de deals afgelopen week zijn verkocht als verwacht zonder het rendement te schaden.", color: "bg-[#d5f9d8]" },
			{ time: "11:30", title: "Pauze", description: "Bespreek met de leverancier over de status en samenwerking.", color: "bg-orange-100" },
			{ time: "11:45", title: "Tweede trainingsblok", description: "Geniet van je lunch!", color: "bg-[#d5f9d8]" },
			{ time: "13:15", title: "Lunch", description: "Voorbereidingen treffen voor het kwartaalgesprek.", color: "bg-[#d5f9d8]" },
			{ time: "13:45", title: "Derde trainingsblok", description: "Dagelijkse stand-up meeting.", color: "bg-[#d5f9d8]" },
			{ time: "15:15", title: "Pauze", description: "Dagelijkse stand-up meeting.", color: "bg-yellow-100" },
			{ time: "16:45", title: "Vierde trainingsblok", description: "Dagelijkse stand-up meeting.", color: "bg-[#d5f9d8]" },
		],
		D2: [	
			{ time: "10:00", title: "eerste trainingsblok", description: "Je gaat bekijken of de deals afgelopen week zijn verkocht als verwacht zonder het rendement te schaden.", color: "bg-orange-100" },
			{ time: "11:30", title: "Pauze", description: "Bespreek met de leverancier over de status en samenwerking.", color: "bg-orange-100" },
			{ time: "11:45", title: "Tweede trainingsblok", description: "Geniet van je lunch!", color: "bg-blue-100" },
			{ time: "13:15", title: "Lunch", description: "Voorbereidingen treffen voor het kwartaalgesprek.", color: "bg-orange-100" },
			{ time: "13:45", title: "Derde trainingsblok", description: "Dagelijkse stand-up meeting.", color: "bg-yellow-100" },
			{ time: "15:15", title: "Pauze", description: "Dagelijkse stand-up meeting.", color: "bg-yellow-100" },
			{ time: "16:45", title: "Vierde trainingsblok", description: "Dagelijkse stand-up meeting.", color: "bg-yellow-100" },
		],
		// Voeg hier items toe voor de rest van de dagen...
	};

	const openModal = (index: number) => {
		setActiveItem(index);
	};

	const closeModal = () => {
		setActiveItem(null);
	};

	return (
		<div className="bg-gr1 pt-0 min-h-screen">
			<div className="container max-w-4xl mx-auto">
				<h2 className="text-3xl text-center font-bold text-gray-900 py-8">
					Een planning waar jij blij van wordt
				</h2>

				{/* Dagen navigatie */}
				<div className="flex justify-center gap-4 mb-6 flex-wrap">
					{days.map((day) => (
						<button
							key={day}
							onClick={() => setSelectedDay(day)}
							className={`py-2 px-4 rounded-full font-bold transition-all duration-300 ${
								selectedDay === day ? "bg-blue-600 text-white shadow-lg" : "bg-blue-200 text-gray-800"
							}`}
						>
							{day.slice(0, 2).toUpperCase()}.
						</button>
					))}
				</div>

				{/* Agenda items */}
				<div className="space-y-4">
					{agendaItems[selectedDay] && agendaItems[selectedDay].length > 0 ? (
						agendaItems[selectedDay].map((item, index) => (
							<div
								key={index}
								className={`flex items-center p-4 rounded-lg shadow-md ${item.color}`}
							>
								{/* Klok-icoon en tijd */}
								<div className="flex items-center mr-4">
									<Clock className="w-5 h-5 text-blue-500 mr-2" />
									<span className="text-gray-800 font-medium">{item.time}</span>
								</div>

								{/* Agenda item titel */}
								<div className="text-gray-900 font-semibold">
									{item.title}
								</div>

								{/* Pijl met hover animatie */}
								<button
									onClick={() => openModal(index)}
									className="ml-auto text-blue-500 transform transition-transform hover:translate-x-1"
								>
									<ArrowRight />
								</button>
							</div>
						))
					) : (
						<p className="text-center text-gray-700">Geen afspraken voor {selectedDay}.</p>
					)}
				</div>
			</div>

			{/* Modal voor meer informatie */}
			{activeItem !== null && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-bold">{agendaItems[selectedDay][activeItem]?.title}</h3>
							<button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
								<X />
							</button>
						</div>
						<div className="flex items-center gap-2 text-gray-600">
							<Info className="text-blue-500" />
							<span>{agendaItems[selectedDay][activeItem]?.time}</span>
						</div>
						<p className="mt-4 text-gray-700">
							{agendaItems[selectedDay][activeItem]?.description}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Agenda;
