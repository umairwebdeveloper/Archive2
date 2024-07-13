import { Footer } from "./_components/footer";
import LevelAndSubjectSelector from "./_components/level_subject";
import Hero from "./_components/hero/main";
const MarketingPage = () => {
	return (
		<div className="min-h-full dark:bg-[#1F1F1F]">
			<Hero />
			<div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 mt-10">
				<LevelAndSubjectSelector />
			</div>

			<Footer />
		</div>
	);
};

export default MarketingPage;
