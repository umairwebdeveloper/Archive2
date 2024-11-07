import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { SignInButton } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Navbar from "./navbar";

import { FaAtom, FaCalculator, FaEarlybirds, FaEuroSign, FaFlask, FaGlobeEurope, FaLandmark, FaMicroscope, FaPercent, FaSquareRootAlt } from "react-icons/fa";


const Hero = () => {
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

    const { isAuthenticated, isLoading } = useConvexAuth();
	const router = useRouter();
	return (
		<>
			<div className="bg-gr1 relative">
				<div
					className="bg-white w-full"
					style={{
						borderBottomRightRadius: "0px",
						borderBottomLeftRadius: "0px",
						paddingBottom: "2.5rem",
					}}
				>
					<div className="container">
						<Navbar /><div className="flex flex-col items-center justify-center text-center py-10 md:mb-10">
		
	
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
	</div>
</div>
		
		</>
	);
};

export default Hero;
