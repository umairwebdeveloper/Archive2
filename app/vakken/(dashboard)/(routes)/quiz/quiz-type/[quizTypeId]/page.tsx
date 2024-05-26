"use client";
import QuizList from "@/components/quiz/quiz-titles";

const QuizTypePage = ({ params }: { params: { quizTypeId: string } }) => {
	return (
		<div className="p-6">
			<QuizList quizTypeId={params.quizTypeId} />
		</div>
	);
};

export default QuizTypePage;
