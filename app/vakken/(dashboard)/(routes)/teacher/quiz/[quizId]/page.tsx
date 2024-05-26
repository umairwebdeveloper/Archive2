"use client";

import QuizQuestions from "@/components/quiz/quiz-questions";

const QuizQuestionsPage = ({ params }: { params: { quizId: string } }) => {

	return (
		<div className="p-6">
			<QuizQuestions quizId={params.quizId} />
		</div>
	);
};

export default QuizQuestionsPage;

