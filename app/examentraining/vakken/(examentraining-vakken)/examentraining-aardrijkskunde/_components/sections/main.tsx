import ExamProduct from "./exam-products";
import ExamTraining from "./exam-training";
import Examenstof from "./examenstof";
import Footer from "./footer";
import Hero from "./hero";
import Price from "./price";
import Subscribe from "./subscibe";
import LevelAndSubjectSelector from "../level_subject";
import JourneyCards from "./journery-cards";
import Info from "./info";
import Faq from "./faq";

const MainSections = () => {
	return (
		<>
			<Hero />
			<Info/>	
			<ExamTraining />
			<Examenstof />
			<Faq/>
			<Subscribe />
			<Footer />
		</>
	);
};

export default MainSections;
