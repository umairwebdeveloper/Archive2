
import { FaAtom, FaCalculator, FaEarlybirds, FaEuroSign, FaFlask, FaGlobeEurope, FaLandmark, FaMicroscope, FaPercent, FaSquareRootAlt } from "react-icons/fa";










const ExamProduct = () => {
	const partners = [
		{ src: "/assets/png/comp1.png", alt: "Partner 1 Logo" },
		{ src: "/assets/png/comp2.png", alt: "Partner 2 Logo" },
		{ src: "/assets/png/comp3.png", alt: "Partner 3 Logo" },
		{ src: "/assets/png/comp4.png", alt: "Partner 4 Logo" },
		{ src: "/assets/png/comp5.png", alt: "Partner 5 Logo" },
	];

	
	return (
		<>
			<div className="bg-gr1 md: pt-0">
				<div className="container">
					<div className="flex flex-col items-center justify-center text-center py-10 md:mb-10">
		
						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
							Vakken 
						</h2>

						<div className="flex flex-wrap justify-center">

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
								<FaEuroSign className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Economie</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Maatschappijleer</p>
							</div>
							
							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
								<FaCalculator className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Bedrijfseconomie</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Maatschappij</p>
							</div>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaGlobeEurope className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Aardrijkskunde</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Maatschappij</p>
							</div>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaLandmark className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Geschiedenis</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Maatschappij</p>
							</div>

							<br></br>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaMicroscope className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Biologie</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Exact</p>
							</div>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaAtom className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">NASK1</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Exact</p>
							</div>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaFlask className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Nask2</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Exact</p>
							</div>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaPercent className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Wiskunde A</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Exact</p>
							</div>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaSquareRootAlt className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Wiskunde B</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Exact</p>
							</div>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaFlask className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Nederlands</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Talen</p>
							</div>

							<div className="inline-flex flex-col items-center bg-[#F4FFEF] w-48 h-48 p-8 rounded-2xl mt-0 mb-5 mx-2 border border-gray-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out">
    							<div className="flex items-center justify-center mb-4">
        							<FaFlask className="w-12 h-12 text-gray-700" />
    							</div>
    							<span className="text-lg font-bold text-gray-900 tracking-wide">Engels</span>
    							<div className="w-8 h-1 bg-gray-700 mt-2 mb-2 rounded"></div>
    							<p className="text-sm text-gray-600 mt-1 text-center">Talen</p>
							</div>
						
						
						</div>						
					</div>
				</div>
			</div>
		</>
	);
};

export default ExamProduct;
