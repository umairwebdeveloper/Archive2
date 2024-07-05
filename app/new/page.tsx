import ExamTraining from "./_components/exam-training/main";
import Footer from "./_components/footer/main";
import Hero from "./_components/hero/main";

const NewPage = () => {
	return (
		<div className="min-h-full">
			<Hero />
			<ExamTraining />
			<Footer />
		</div>
	);
};

export default NewPage;
