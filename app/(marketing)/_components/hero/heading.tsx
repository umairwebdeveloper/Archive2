"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { SignInButton } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const Heading = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const router = useRouter();

	return (
		<>
			<div className="flex flex-col lg:flex-row justify-between items-center mt-10">
				<div className="text-center lg:text-left lg:w-1/2">
					<h3 className="font-bold text-4xl lg:text-6xl text-white mb-3">
						Build Online <br />
						Examentrainingen
					</h3>
					<p className="text-lg text-white mb-3">
						Easily create dynamic user journeys to activate, retain,
						and understand users, without engineering effort.
					</p>
					<div className="flex gap-3 justify-center lg:justify-start mt-3">
						{isLoading && (
							<div className="flex items-center justify-center">
								<Spinner size="lg" />
							</div>
						)}
						{isAuthenticated && !isLoading && (
							<>
								<button
									className="text-sm lg:text-md bg-white hover:bg-primWhite rounded-full py-3 px-6"
									onClick={() =>
										router.push("/vakken/subject")
									}
								>
									Ik ben leerling
								</button>
								<button
									className="text-sm lg:text-md bg-prim400 hover:bg-prim500 rounded-full py-3 px-8 text-white flex items-center justify-between gap-3"
									onClick={() =>
										router.push("/vakken/teacher/courses")
									}
								>
									<span></span>
									<span>Ik ben docent</span> <ArrowRight />
								</button>
							</>
						)}
						{!isAuthenticated && !isLoading && (
							<SignInButton mode="modal">
								<button className="text-sm lg:text-md bg-prim400 hover:bg-prim500 rounded-full py-3 px-8 text-white flex items-center justify-between gap-3">
									<span></span>
									<span>Get Started</span> <ArrowRight />
								</button>
							</SignInButton>
						)}
					</div>
				</div>
				<div className="mt-10 lg:mt-0 lg:ml-10 lg:w-1/2 relative">
					<img
						className="w-full h-auto"
						src="/assets/png/landing.png"
						alt="hero"
					/>
					<img
						className="absolute"
						src="/assets/png/mobile-info.png"
						style={{ top: "25%", left: "1%", width: "20.8%" }}
						alt="mobile content"
					/>
				</div>
			</div>
			<div className="text-center text-white mt-5 lg:mt-10 w-full">
				<p>Loved by product & marketing teams</p>
			</div>
		</>
	);
};

export default Heading;
