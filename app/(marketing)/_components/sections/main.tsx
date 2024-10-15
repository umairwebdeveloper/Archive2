import ExamProduct from "./exam-products";
import ExamTraining from "./exam-training";
import Faq from "./faq";
import Footer from "./footer";
import Hero from "./hero";
import Price from "./price";
import Subscribe from "./subscibe";
import LevelAndSubjectSelector from "../level_subject";


const MainSections = () => {
	return (
		<>
			<Hero />
			<ExamProduct />
			<ExamTraining />
			<Price />
			<div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 mt-10">
				<LevelAndSubjectSelector />
			</div>
			<Faq />
			<Subscribe />
			<Footer />
		</>
	);
};

export default MainSections;
