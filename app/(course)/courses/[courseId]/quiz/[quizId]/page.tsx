"use client";

import QuizQuestions from "./_components/quiz-questions";
import TopBar from "./_components/top_bar";

const QuizQuestionsPage = ({
	params,
}: {
	params: { courseId: string; quizId: string };
}) => {
	return (
		<div className="px-0 md:px-6 py-6">
			<TopBar courseId={params.courseId} />
			<QuizQuestions quizId={params.quizId} />
		</div>
	);
};

export default QuizQuestionsPage;
