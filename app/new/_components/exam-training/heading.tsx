import { ArrowRight, CheckCircle2 } from "lucide-react";

const Heading = () => {
	return (
		<>
			<div className="flex flex-col md:flex-row justify-between items-center mt-10">
				<div className="md:text-left md:w-1/2">
					<h3 className="font-bold text-3xl mb-3">
						Online exam training (CE + SE)
					</h3>
					<p className="mb-3">
						Bereid je het gehele examenjaar optimaal voor op de
						schoolexamens én het centraal <br /> eindexamen!
					</p>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-prim400">
								<CheckCircle2 />
							</span>
							<p className="text-lg">Uitlegvideo's</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-prim400">
								<CheckCircle2 />
							</span>
							<p className="text-lg">Samenvattingen</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-prim400">
								<CheckCircle2 />
							</span>
							<p className="text-lg">
								Interactieve oefenomgeving
							</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-prim400">
								<CheckCircle2 />
							</span>
							<p className="text-lg">Digitale examenbundel</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-prim400">
								<CheckCircle2 />
							</span>
							<p className="text-lg">
								Bijles-chat (vanaf 1 april)
							</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-prim400">
								<CheckCircle2 />
							</span>
							<p className="text-lg">
								Begrippenlijsten en flashcards
							</p>
						</div>
					</div>
					<div className="flex gap-3 justify-center md:justify-start mt-3">
						<button className="bg-prim400 hover:bg-prim500 rounded-full py-3 px-8 text-white flex items-center justify-between gap-3">
							<span></span>
							<span>Kies je vakken</span> <ArrowRight />
						</button>
					</div>
				</div>

				<div className="mt-10 md:mt-0 md:ml-10 md:w-1/2 relative">
					<img
						className="w-full absolute z-50"
						src="/assets/png/laptop.png"
						style={{ top: "-4%", left: "6%" }}
						alt="laptop"
					/>
					<img
						className="z-0 w-full"
						src="/assets/svg/logo-icon.svg"
						alt="logo"
					/>
				</div>
			</div>
		</>
	);
};

export default Heading;
