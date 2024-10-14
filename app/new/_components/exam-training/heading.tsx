import { ArrowRight, CheckCircle2 } from "lucide-react";

const Heading = () => {
	return (
		<>
			<div className="flex flex-col md:flex-row justify-between items-center">
				<div className="md:text-left md:w-1/2">
					<h3 className="font-bold text-3xl mb-5">
						Online exam training (CE + SE)
					</h3>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-gr">
								<CheckCircle2 />
							</span>
							<p className="text-lg">Uitlegvideo's</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-gr">
								<CheckCircle2 />
							</span>
							<p className="text-lg">Samenvattingen</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-gr">
								<CheckCircle2 />
							</span>
							<p className="text-lg">
								Interactieve oefenomgeving
							</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-gr">
								<CheckCircle2 />
							</span>
							<p className="text-lg">Digitale examenbundel</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-gr">
								<CheckCircle2 />
							</span>
							<p className="text-lg">
								Bijles-chat (vanaf 1 april)
							</p>
						</div>
					</div>
					<div>
						<div className="flex gap-3 items-center mb-3 check-list">
							<span className="text-gr">
								<CheckCircle2 />
							</span>
							<p className="text-lg">
								Begrippenlijsten en flashcards
							</p>
						</div>
					</div>
					<div className="flex gap-3 justify-center md:justify-start mt-5">
						<button className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3">
							Kies je vakken
						</button>
					</div>
				</div>

				<div className="md:w-1/2">
					<img
						className="w-full"
						src="/assets/png/customer-service.png"
						alt="laptop"
					/>
				</div>
			</div>
		</>
	);
};

export default Heading;
