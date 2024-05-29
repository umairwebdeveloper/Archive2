// components/SideBox.tsx
import React from "react";

interface SideBoxProps {
	quizTitle: string;
	questions: { title: string }[];
	activeIndex: number | null;
	onLinkClick: (index: number) => void;
}

const SideBox: React.FC<SideBoxProps> = ({
	quizTitle,
	questions,
	activeIndex,
	onLinkClick,
}) => {
	return (
		<div className="side-box ml-96 fixed top-1/5 left-0 w-60 bg-white text-dark p-6 rounded-r-lg shadow-lg">
			<h3 className="text-xl font-semibold mb-2">
				{quizTitle ? quizTitle : "No Quiz Title"}
			</h3>
			<div>
				{questions.length > 0 &&
					questions.map((question, index) => (
						<div key={index} className="mb-2">
							<a
								href={`#question${index + 1}`}
								className={`p-1 ${activeIndex === index ? "border rounded bg-blue-50 w-full" : ""}`}
								onClick={(e) => {
									e.preventDefault();
									onLinkClick(index);
								}}
							>
								{index + 1}: {question.title}
							</a>
						</div>
					))}
			</div>
		</div>
	);
};

export default SideBox;
