"use client";

import Resume from "./_components/resume";
import { SelectionProvider } from "react-selection-highlighter";

const QuizQuestionsPage = ({ params }: { params: { courseId: string } }) => {
	return (
		<div className="p-6">
			<SelectionProvider>
				<Resume courseId={params.courseId} />
			</SelectionProvider>
		</div>
	);
};

export default QuizQuestionsPage;
