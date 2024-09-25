import { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./timer";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ProgressBarProps {
	courseId: string;
}

const TopBar: React.FC<ProgressBarProps> = ({ courseId }) => {
	const [loading, setLoading] = useState(false);
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [userAnswers, setUserAnswers] = useState(0);
	const [btnLoading, setBtnLoading] = useState(false);

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

	const resetAllAnswers = async () => {
		setBtnLoading(true);
		try {
			const response = await axios.post("/api/questions/");
			toast.success(response.data.message);
			window.location.reload();
		} catch (error) {
			console.error("Error resetting all answers:", error);
			toast.error("Failed to reset all answers");
		} finally {
			setBtnLoading(false);
		}
	};

	const progressPercentage = totalQuestions
		? (userAnswers / totalQuestions) * 100
		: 0;

	return (
		<div className="flex flex-col gap-3 items-center lg:flex-row lg:justify-between px-4 lg:px-0">
			<div className="text-center lg:text-left">
				<h3 className="font-bold text-2xl">Examen 2024</h3>
				<p className="mb-2">Module 01</p>
				<Button onClick={resetAllAnswers} disabled={btnLoading}>
					{btnLoading ? "Resetting..." : "Reset Answers"}
				</Button>
			</div>
			{loading ? (
				<div className="flex justify-center items-center">
					<Spinner />
				</div>
			) : (
				<div className="flex flex-col items-center mx-4 lg:mx-20 flex-1 w-full lg:w-auto">
					<div className="w-full bg-gray-200 rounded-full h-3">
						<div
							className="bg-green-400 h-3 rounded-full"
							style={{ width: `${progressPercentage}%` }}
						/>
					</div>
					<p className="mt-2 text-gray-700 text-center lg:text-left">
						{userAnswers} out of {totalQuestions} questions answered
						({progressPercentage.toFixed(2)}%)
					</p>
				</div>
			)}
			<div className="mt-3 lg:mt-0">
				<Timer />
			</div>
		</div>
	);
};

export default TopBar;
