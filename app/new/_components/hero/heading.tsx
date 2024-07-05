import { ArrowRight } from "lucide-react";

const Heading = () => {
	return (
		<>
			<div className="flex flex-col md:flex-row justify-between items-center mt-10">
				<div className="text-center md:text-left md:w-1/2">
					<h3 className="font-bold text-4xl md:text-6xl text-white mb-3">
						Build Online <br />
						Examentrainingen
					</h3>
					<p className="text-lg text-white mb-3">
						Easily create dynamic user journeys to activate, retain,
						and understand users, without engineering effort.
					</p>
					<div className="flex gap-3 justify-center md:justify-start mt-3">
						<button className="bg-white hover:bg-primWhite rounded-full py-3 px-6">
							Ik ben leerling
						</button>
						<button className="bg-prim400 hover:bg-prim500 rounded-full py-3 px-8 text-white flex items-center justify-between gap-3">
							<span></span>
							<span>Ik ben docent</span> <ArrowRight />
						</button>
					</div>
				</div>
				<div className="mt-10 md:mt-0 md:ml-10 md:w-1/2 relative">
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
			<div className="text-center text-white mt-5 md:mt-10 w-full">
				<p>Loved by product & marketing teams</p>
			</div>
		</>
	);
};

export default Heading;
