"use client";
import QuizList from "./_components/courses_list";

const CoursesPage = ({ params }: { params: { courseId: string } }) => {
	return (
		<div className="px-6">
			<QuizList quizTypeId={params.courseId} />
		</div>
	);
};

export default CoursesPage;
