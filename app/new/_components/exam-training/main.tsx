import Heading from "./heading";
import Borrowers from "./borrowers";

const ExamTraining = () => {
	return (
		<>
			<div className="bg-gradient-to-r from-gra to-prim50 my-5 py-16">
				<h3 className="text-center font-bold text-4xl text-sec950">
					Alles-in-1 online examentraining
				</h3>
				<div className="container">
					<Heading />
				</div>
			</div>
			<div className="container">
				<Borrowers />
			</div>
		</>
	);
};

export default ExamTraining;
