import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { SignInButton } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import Navbar from "./navbar";

const Hero = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
	const router = useRouter();
	return (
		<>
			<div className="bg-gr1 relative">
				<div
					className="bg-white w-full"
					style={{
						borderBottomRightRadius: "72px",
						borderBottomLeftRadius: "72px",
						paddingBottom: "200px",
					}}
				>
					<div className="container">
						<Navbar />
						<div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 bg-white px-4">
							<h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
								Build Online
								<br /> Examentrainingen
							</h1>
							<p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 max-w-md sm:max-w-xl">
								Easily create dynamic user journeys to activate,
								retain, and understand users, without
								engineering effort.
							</p>
							{isLoading && (
								<div className="flex items-center justify-center">
									<Spinner size="lg" />
								</div>
							)}
							{isAuthenticated && !isLoading && (
								<>
									<div>
										<button
											className="bg-gray-100 hover:bg-gray-200 font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3 mr-3"
											onClick={() =>
												router.push("/vakken/subject")
											}
										>
											Ik ben leerling
										</button>
										<button
											className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3"
											onClick={() =>
												router.push(
													"/vakken/teacher/courses"
												)
											}
										>
											<span>Ik ben docent</span>
										</button>
									</div>
								</>
							)}
							{!isAuthenticated && !isLoading && (
								<SignInButton mode="modal">
									<button className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3">
										Sign in
									</button>
								</SignInButton>
							)}
						</div>
					</div>
				</div>
				<div className="absolute bottom-1/2 left-1/2 transform translate-x-[-50%] translate-y-[180%] md:translate-y-[120%]">
					<img
						src="/assets/png/MacbookAir.png"
						alt="laptop"
						className="w-6/7"
					/>
				</div>
			</div>
		</>
	);
};

export default Hero;
