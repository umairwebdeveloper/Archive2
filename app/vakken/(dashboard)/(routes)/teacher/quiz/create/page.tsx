"use client";

import AddQuestion from "@/components/quiz/add-question";
import CreateQuiz from "@/components/quiz/create-quiz";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const CreatePage = () => {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<>
			<div className="flex justify-start m-5">
				<Button onClick={handleBack}>Back</Button>
			</div>
			<div className="max-w-5xl mx-auto flex md:items-center md:justify-center">
				<div className="">
					<CreateQuiz />
					<AddQuestion />
				</div>
			</div>
		</>
	);
};

export default CreatePage;
