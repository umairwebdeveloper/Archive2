import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Navbar from "./navbar";

const Hero = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    return (
        <div className="bg-gr1 relative">
            <div className="bg-white w-full pb-20 rounded-b-[72px]">
                <div className="container mx-auto flex flex-col items-center">
                    <Navbar />
                    <div className="flex flex-col items-center justify-center text-center py-10 md:py-16 px-4 space-y-4">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">
                            Slagen voor je eindexamen? 🎓
                        </h1>
                        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 max-w-md sm:max-w-xl">
                            Meld je vandaag aan voor de examentraining.
                        </p>
                    </div>

                    <div className="container rounded-3xl bg-[#245810] py-8 px-4 mx-auto max-w-screen-xl lg:py-12 lg:px-8">
                        <div className="max-w-screen-md text-center mx-auto space-y-4">
                            <h2 className="text-3xl sm:text-4xl text-white font-semibold mb-6 tracking-tight">
                                Zoek een examentraining bij jou in de buurt
                            </h2>
                            <form action="#">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                                    <select className="block w-full sm:w-auto p-3 bg-gray-50 rounded-lg border text-gray-900 border-gray-300 focus:ring-primary-500 focus:border-primary-500" required>
                                        <option value="" disabled hidden>Kies niveau</option>
                                        <option value="havo">Havo</option>
                                        <option value="vwo">Vwo</option>
                                    </select>
                                    <select className="block w-full sm:w-auto p-3 bg-gray-50 rounded-lg border text-gray-900 border-gray-300 focus:ring-primary-500 focus:border-primary-500" required>
                                        <option value="" disabled hidden>Kies vak</option>
                                        <option value="wiskunde">Wiskunde</option>
                                        <option value="nederlands">Nederlands</option>
                                        <option value="engels">Engels</option>
                                    </select>
                                    <select className="block w-full sm:w-auto p-3 bg-gray-50 rounded-lg border text-gray-900 border-gray-300 focus:ring-primary-500 focus:border-primary-500" required>
                                        <option value="" disabled hidden>Kies locatie</option>
                                        <option value="rotterdam">Rotterdam</option>
                                        <option value="amsterdam">Amsterdam</option>
                                        <option value="utrecht">Utrecht</option>
                                    </select>
                                    <button type="submit" className="py-3 px-5 w-full sm:w-auto text-sm font-medium text-white bg-gr rounded-lg hover:bg-green-500">
                                        Zoek
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
