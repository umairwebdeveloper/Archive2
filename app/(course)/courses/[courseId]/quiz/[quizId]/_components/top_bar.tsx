import { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./timer";
import { Spinner } from "@/components/spinner";

interface ProgressBarProps {
	courseId: string;
}

const TopBar: React.FC<ProgressBarProps> = ({ courseId }) => {
	const [loading, setLoading] = useState(false);
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [userAnswers, setUserAnswers] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const [questionsResponse, answersResponse] = await Promise.all([
					axios.get(`/api/level/${courseId}/p-course-questions`),
					axios.get(`/api/level/${courseId}/p-course-answers`),
				]);

				setTotalQuestions(questionsResponse.data.questionsCount);
				setUserAnswers(answersResponse.data.answersCount);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [courseId]);

	const progressPercentage = totalQuestions
		? (userAnswers / totalQuestions) * 100
		: 0;

	return (
		<div className="w-full flex gap-3 items-center justify-between">
			<div className="w-full">
				<h3 className="font-bold text-2xl">Examen 2024</h3>
				<p>Module 01</p>
			</div>
			{loading ? (
				<div className="flex justify-center items-center">
                    <Spinner/>
                </div>
			) : (
				<div className="flex flex-col items-center w-10/12 me-20">
					<div className="w-full bg-gray-200 rounded-full h-3">
						<div
							className="bg-green-400 h-3 rounded-full"
							style={{ width: `${progressPercentage}%` }}
						/>
					</div>
					<p className="mt-2 text-gray-700">
						{userAnswers} out of {totalQuestions} questions answered
						({progressPercentage.toFixed(2)}%)
					</p>
				</div>
			)}
			<div className="">
				<Timer />
			</div>
		</div>
	);
};

export default TopBar;
