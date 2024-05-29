"use client";

import QuizQuestions from "./_components/quiz-questions";

const QuizQuestionsPage = ({ params }: { params: { quizId: string } }) => {
	return (
		<div className="p-6">
			<QuizQuestions quizId={params.quizId} />
		</div>
	);
};

export default QuizQuestionsPage;
