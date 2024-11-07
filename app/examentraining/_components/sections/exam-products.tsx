import { FaEuroSign, FaCalculator, FaMicroscope, FaAtom, FaFlask } from "react-icons/fa";

const ExamProduct = () => {
    const vakken = [
        { icon: FaEuroSign, title: "Economie", sub: "Maatschappijleer" },
        { icon: FaCalculator, title: "Bedrijfseconomie", sub: "Maatschappij" },
		{ icon: FaFlask, title: "Aardrijkskunde", sub: "Maatschappij" },
        { icon: FaFlask, title: "Geschiedenis", sub: "Maatschappij" },
        { icon: FaMicroscope, title: "Biologie", sub: "Exact" },
        { icon: FaAtom, title: "Natuurkunde", sub: "Exact" },
        { icon: FaFlask, title: "Scheikunde", sub: "Exact" },
		{ icon: FaFlask, title: "Wiskunde A", sub: "Exact" },
        { icon: FaFlask, title: "Wiskunde B", sub: "Exact" },
        { icon: FaFlask, title: "Nederlands", sub: "Talen" },
        { icon: FaFlask, title: "Engels", sub: "Talen" },      
    ];

    return (
        <div className="bg-[rgb(250,250,250)] py-10">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-10">Vakken</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {vakken.map((vak, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white w-48 h-48 p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-out"
                        >
                            <div className="flex items-center justify-center mb-3">
                                <vak.icon className="w-12 h-12 text-[rgb(0,162,16)]" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900">{vak.title}</span>
                            <div className="w-8 h-1 bg-[rgb(0,162,16)] mt-2 mb-2 rounded"></div>
                            <p className="text-sm text-gray-600">{vak.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExamProduct;
