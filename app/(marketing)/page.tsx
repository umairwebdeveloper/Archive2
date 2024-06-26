import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import LevelAndSubjectSelector from "./_components/level_subject";
import DebitCredit from "./_components/debit_credit";

const MarketingPage = () => {
	return (
		<div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
			<div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
				<Heading />
				<Heroes />
				<LevelAndSubjectSelector />
			</div>

			<Footer />
		</div>
	);
};

export default MarketingPage;
