import { useState } from "react";
import { Plus, Minus, CheckCircle } from "lucide-react";
import { FaCheck } from "react-icons/fa";

const Examenstof = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("havo");

  const toggleItem = (id: number) => {
    setOpenItem((prevItem) => (prevItem === id ? null : id));
  };


  const havoTopics = [
	{
		title: "Wereld",
		items: [
		  {
			id: 1,
			question: "Mondiale spreidings- en relatiepatronen",
			answer: (
			  <ul className="list-none pl-0">
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
			  </li>
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
			  </li>
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
			  </li>
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
			  </li>
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
			  </li>
			</ul>
			),
			goals: 9,
		  },
		  { id: 2, question: "Het proces van globalisering", answer: (
			  <ul className="list-none pl-0">
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
			  </li>
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
			  </li>
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
			  </li>
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
			  </li>
			  <li className="flex items-center mb-2">
				<FaCheck className="text-green-600 mr-2" />
				Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
			  </li>
			</ul>
			), goals: 5 },
		],
	  },
	  {
		  title: "Aarde",
		  items: [
			  {
				  id: 3,
				  question: "Natuurlijke verschijnselen vaan het aardoppervlak en in de atomosfeer",
				  answer: (
					<ul className="list-none pl-0">
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
					</li>
				  </ul>
				  ),
				  goals: 10,
				}, 
				{
				  id: 4,
				  question: "Kenmerken van de landschapszones op aarde en de veranderingen hierin",
				  answer: (
					<ul className="list-none pl-0">
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
					</li>
				  </ul>
				  ),
				  goals: 4,
				},
			  
			  ],
	  },
	  {
		  title: "Ontwikkelingsland: Brazilië",
		  items: [
			  {
				  id: 5,
				  question: "Sociaalgeografische en fysisch-geografische kenmerken van Brazilië",
				  answer: (
					<ul className="list-none pl-0">
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
					</li>
				  </ul>
				  ),
				  goals: 12,
				}, 
  
			  {
				  id: 6,
				  question: "De sociaaleconomische positie van Brazilië in de regio en in de wereld ",
				  answer: (
					<ul className="list-none pl-0">
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
					</li>
				  </ul>
				  ),
				  goals: 6,
				}, 
				  ],
		},
  
	  {
		  title: "Leefomgeving",
		  items: [
			  {
				  id: 7,
				  question: "Overstromingen en wateroverlast in Nederland",
				  answer: (
					<ul className="list-none pl-0">
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
					</li>
				  </ul>
				  ),
				  goals: 10,
				}, 
  
			  {
				  id: 8,
				  question: "Ruimtelijke en sociaaleconomische vraagstukken van stedelijke gebieden",
				  answer: (
					<ul className="list-none pl-0">
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
					</li>
					<li className="flex items-center mb-2">
					  <FaCheck className="text-green-600 mr-2" />
					  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
					</li>
				  </ul>
				  ),
				  goals: 4,
				},  
		  ],
		},
  ];
  
  const vwoTopics = [
    {
      title: "Wereld",
      items: [
        {
          id: 9,
          question: "Globalisering en Tijd-ruimtecompressie",
          answer: (
			<ul className="list-none pl-0">
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
			</li>
		  </ul>
          ),
          goals: 14,
        },
        { id: 10, question: "Mondiale spreidingspatronen", answer: (
			<ul className="list-none pl-0">
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
			</li>
		  </ul>
          ), goals: 4 },

		{ id: 11, question: "Grootstedelijke gebieden", answer: (
			<ul className="list-none pl-0">
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
			</li>
			<li className="flex items-center mb-2">
			  <FaCheck className="text-green-600 mr-2" />
			  Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
			</li>
		  </ul>
          ), goals: 4 },
      ],
    },
    {
    	title: "Aarde",
    	items: [
			{
				id: 12,
				question: "De aarde als uniek natuurlijk systeem",
				answer: (
				  <ul className="list-none pl-0">
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
				  </li>
				</ul>
				),
				goals: 13,
			  }, 
			{
				id: 14,
				question: "Landschapszones",
				answer: (
				  <ul className="list-none pl-0">
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
				  </li>
				</ul>
				),
				goals: 6,
			  },

			{
				id: 15,
				question: "Natuurlijke en landschappelijke kenmerken van het Middellandse Zeegebied",
				answer: (
				  <ul className="list-none pl-0">
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
				  </li>
				</ul>
				),
				goals: 6,
			  },
			
			],
    },
	{
		title: "Gebieden: Zuid-Amerika",
		items: [
			{
				id: 16,
				question: "Afbakening en gebiedskenmerken",
				answer: (
				  <ul className="list-none pl-0">
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
				  </li>
				</ul>
				),
				goals: 15,
			  }, 

				],
	  },

	{
		title: "Leefomgeving",
		items: [
			{
				id: 17,
				question: "Overstromingen en wateroverlast in Nederland",
				answer: (
				  <ul className="list-none pl-0">
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
				  </li>
				</ul>
				),
				goals: 10,
			  }, 

			{
				id: 18,
				question: "Ruimtelijke en sociaaleconomische vraagstukken van stedelijke gebieden",
				answer: (
				  <ul className="list-none pl-0">
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt zowel financiele als niet-financiele overwegingen uitleggen die komen kijken bij de keuze voor een opleiding.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt financiële keuzes met betrekking tot verzekeren, lenen, sparen en beleggen uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de contante waarde en de eindwaarde van een kapitaal berekenen op basis van samengestelde interest.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de keuze voor het huren of kopen van een woonhuis financieel uitleggen en berekenen.
				  </li>
				  <li className="flex items-center mb-2">
					<FaCheck className="text-green-600 mr-2" />
					Je kunt de financiële en wettelijke consequenties van samenwonen en trouwen en scheiden noemen en berekenen.
				  </li>
				</ul>
				),
				goals: 4,
			  },  
		],
	  },

	  
  ];



  const topics = selectedLevel === "havo" ? havoTopics : vwoTopics;

  return (
		<div className="bg-[250, 250, 250] pt-0">
			<div className="container max-w-7xl mx-auto px-4 md:px-8">
				<h2 className="text-3xl text-center font-bold text-gray-900 mt-10 py-8">
					Onderwerpen {selectedLevel === "havo" ? "havo" : "vwo"}
				</h2>
				<p className="text-center mb-8 text-lg text-gray-700">
					De volgende onderdelen komen aan bod bij de examentraining
				</p>
				<div className="flex justify-center gap-6 mb-8">
					<button
						onClick={() => setSelectedLevel("havo")}
						className={`py-2 px-6 rounded-full font-bold transition-all duration-300 ${
							selectedLevel === "havo"
								? "bg-green-600 text-white shadow-lg"
								: "bg-green-200 text-gray-800"
						}`}
					>
						havo
					</button>
					<button
						onClick={() => setSelectedLevel("vwo")}
						className={`py-2 px-6 rounded-full font-bold transition-all duration-300 ${
							selectedLevel === "vwo"
								? "bg-green-600 text-white shadow-lg"
								: "bg-green-200 text-gray-800"
						}`}
					>
						Vwo
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{topics.map((topic, topicIndex) => (
						<div key={topicIndex} className="space-y-8">
							<h3 className="text-xl font-semibold text-gray-800 mb-4">
								{topic.title}
							</h3>
							{topic.items.map((item) => (
								<div
									key={item.id}
									className="border border-gray-300 bg-white rounded-[10px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-1 flex items-center gap-[1.5rem] transition-transform transition-shadow duration-300"
									onMouseEnter={(e) =>
										(e.currentTarget.style.boxShadow =
											"0 6px 10px rgba(0, 0, 0, 0.15)")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.boxShadow =
											"0 4px 6px rgba(0, 0, 0, 0.1)")
									}
								>
									<div className="flex-grow">
										<h2 id={`accordion-heading-${item.id}`}>
											<button
												type="button"
												onClick={() =>
													toggleItem(item.id)
												}
												className="flex flex-wrap gap-2 md:flex-nowrap items-center justify-between w-full font-medium text-gray-700 hover:text-gray-800 transition duration-200"
												aria-expanded={
													openItem === item.id
												}
												aria-controls={`accordion-body-${item.id}`}
											>
												<div className="flex-shrink-0 border-4 border-[#ebf6ea] bg-[#F5FAF3] rounded-[11px] p-2.5">
													<CheckCircle
														size={28}
														color="#00A210"
													/>
												</div>
												<span className="text-lg font-medium text-gray-800 text-center">
													{item.question}
												</span>
												<div className="flex items-center gap-3">
													<span className="text-green-600 px-3 rounded-md font-semibold">
														{item.goals} leerdoelen
													</span>
													{openItem === item.id ? (
														<Minus className="w-6 h-6" />
													) : (
														<Plus className="w-6 h-6" />
													)}
												</div>
											</button>
										</h2>
										<div
											id={`accordion-body-${item.id}`}
											className={`p-4 text-gray-700 ${
												openItem === item.id
													? "block"
													: "hidden"
											} transition-all duration-300`}
										>
											{item.answer}
										</div>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
  );
};

export default Examenstof;
