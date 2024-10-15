import { CheckCircle2 } from "lucide-react";

const ExamTraining = () => {
	const features = [
		"Uitlegvideo's",
		"Samenvattingen",
		"Interactieve oefenomgeving",
		"Digitale examenbundel",
		"Bijles-chat (vanaf 1 april)",
		"Begrippenlijsten en flashcards",
	];

	return (
		<div className="container">
			<h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 my-10">
				Alles-in-1 online examentraining
			</h2>
			<div className="flex flex-col md:flex-row justify-between items-center border rounded-3xl p-3 md:p-5">
				<div className="md:text-left md:w-1/2">
					<h3 className="font-bold text-2xl mb-5">
						Online exam training (CE + SE)
					</h3>
					{features.map((feature, index) => (
						<div
							key={index}
							className="flex gap-3 items-center mb-3 check-list"
						>
							<span className="text-gr">
								<CheckCircle2 />
							</span>
							<p className="text-lg">{feature}</p>
						</div>
					))}
					<div className="flex gap-3 justify-center md:justify-start mt-5">
						<button className="bg-gr hover:bg-green-600 text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-3">
							Kies je vakken
						</button>
					</div>
				</div>
				<div className="md:w-1/2 mt-5 md:mt-0">
					<img
						className="w-full"
						src="/assets/png/customer-service.png"
						alt="laptop"
					/>
				</div>
			</div>
		</div>
	);
};

export default ExamTraining;
