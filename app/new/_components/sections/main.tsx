import ExamProduct from "./exam-products";
import ExamTraining from "./exam-training";
import Faq from "./faq";
import Footer from "./footer";
import Hero from "./hero";
import Price from "./price";
import Subscribe from "./subscibe";

const MainSections = () => {
	return (
		<>
			<Hero />
			<ExamProduct />
			<ExamTraining />
			<Price />
			<Faq />
			<Subscribe />
			<Footer />
		</>
	);
};

export default MainSections;
