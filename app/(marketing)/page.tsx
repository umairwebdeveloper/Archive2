import { Footer } from "./_components/footer";
import LevelAndSubjectSelector from "./_components/level_subject";
import Hero from "./_components/hero/main";
import Form from "./_components/form";
import PricingCards from "./_components/pricing";
const MarketingPage = () => {
	return (
		<div className="min-h-full dark:bg-[#1F1F1F]">
			<Hero />
			<div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 mt-10">
				<LevelAndSubjectSelector />
			</div>
			<PricingCards />
			<Form />
			<Footer />
		</div>
	);
};

export default MarketingPage;
