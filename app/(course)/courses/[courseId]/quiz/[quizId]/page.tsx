"use client";

import QuizQuestions from "./_components/quiz-questions";
import TopBar from "./_components/top_bar";

const QuizQuestionsPage = ({
	params,
}: {
	params: { courseId: string; quizId: string };
}) => {
	return (
		<div className="p-6">
			<TopBar courseId={params.courseId} />
			<QuizQuestions quizId={params.quizId} />
		</div>
	);
};

export default QuizQuestionsPage;
