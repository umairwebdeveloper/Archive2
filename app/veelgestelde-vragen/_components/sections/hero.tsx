import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { SignInButton } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Navbar from "./navbar";

const Hero = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
	const router = useRouter();
	return (
		<div className="bg-gr1 relative">
			<div
				className="bg-white w-full pb-32"
				style={{
					borderBottomRightRadius: "72px",
					borderBottomLeftRadius: "72px",
				}}
			>
				<div className="container mx-auto flex flex-col items-center">
					<Navbar />
					<div className="flex flex-col items-center justify-center text-center py-16 px-4">
						<h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
							Veelgestelde vragen 🎓
						</h1>
						
						{isLoading && (
							<div className="flex items-center justify-center mb-4">
								<Spinner size="lg" />
							</div>
						)}
						{isAuthenticated && !isLoading && (
							<div className="flex justify-center gap-4 mb-4">
								<button
									className="bg-gray-100 hover:bg-gray-200 font-medium rounded-full px-5 py-3"
									onClick={() => router.push("/vakken/subject")}
								>
									Ik ben leerling
								</button>
								<button
									className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-5 py-3"
									onClick={() => router.push("/vakken/teacher/courses")}
								>
									Ik ben docent
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
