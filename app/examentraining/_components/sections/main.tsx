import ExamProduct from "./exam-products";
import ExamTraining from "./exam-training";
import Faq from "./faq";
import Footer from "./footer";
import Hero from "./hero";
import Price from "./price";
import Subscribe from "./subscibe";
import LevelAndSubjectSelector from "../level_subject";
import JourneyCards from "./journery-cards";
import Info from "./info";
import Location from "./location"

const MainSections = () => {
	return (
		<>
			<Hero />
			<Info/>	
			<ExamTraining />
			<Location/>
			<ExamProduct />
			<Faq />
			<Subscribe />
			<Footer />
		</>
	);
};

export default MainSections;
