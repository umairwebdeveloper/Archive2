"use client";

import { Pen } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

interface QuizTypeProps {
	courseId: string;
}

const QuizSidebar: React.FC<QuizTypeProps> = ({ courseId }) => {
	const router = useRouter();
	const pathname = usePathname();

	const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
	const [userAnswers, setUserAnswers] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const [links, setLinks] = useState<any>([]);
	const [linksLoading, setLinksLoading] = useState(false);

	const isActive = pathname?.includes(`/courses/${courseId}/quiz`);
	const activeLinkId =
		links.find((link: any) => pathname?.endsWith(`${link.id}`))?.id || null;

	const fetchLinks = async () => {
		try {
			setLinksLoading(true);
			const response = await axios.get(`/api/quiz-title/${courseId}`);
			setLinks(response.data.quiz);
			return response.data.quiz;
		} catch (error) {
			console.error("Failed to fetch links:", error);
			return [];
		} finally {
			setLinksLoading(false);
		}
	};

	const onClick = async () => {
		const fetchedLinks = await fetchLinks();
		if (fetchedLinks.length > 0) {
			const firstLinkId = fetchedLinks[0].id;
			router.push(`/courses/${courseId}/quiz/${firstLinkId}`);
		}
	};

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

	useEffect(() => {
		if (isActive) {
			fetchLinks();
		}
	}, [isActive, courseId]);

	const getAnswerColor = (question: any, userAnswer: any) => {
		if (question.type === "multiple-choice" && userAnswer) {
			const userAnswerText = userAnswer.answer;
			const correctAnswer = question.correctAnswer;
			if (userAnswerText === correctAnswer) {
				return "bg-green-300 text-green-800 hover:bg-green-400";
			} else {
				return "bg-red-300 text-red-800 hover:bg-red-400";
			}
		}
		return "";
	};

	return (
		<div>
			<button
				onClick={onClick}
				type="button"
				className={`mt-3 flex items-center rounded-xl gap-x-2 text-sm font-[500] pl-6 transition-all py-4 w-full pr-3 ${
					isActive
						? "text-white bg-prim400 hover:text-prim50 hover:bg-prim500"
						: "text-sec400 hover:bg-slate-100/20"
				}`}
			>
				<div className="flex items-center justify-between gap-x-2 w-full">
					<span className="flex gap-2">
						<Pen
							size={22}
							className={`${isActive ? "text-prim50" : "text-sec400"}`}
						/>
						Questions
					</span>
					{loading ? (
						<Spinner />
					) : (
						<span>
							{userAnswers}/{totalQuestions}
						</span>
					)}
				</div>
			</button>
			{isActive && (
				<div className="mt-2 p-3 mb-5">
					{linksLoading ? (
						<div className="my-3 flex justify-center items-center">
							<Spinner />
						</div>
					) : (
						<div className="text-sm text-slate-600">
							{links.map((link: any, index: number) => (
								<>
									<div className="mb-3 shadow" key={index}>
										<div
											onClick={() =>
												router.push(
													`/courses/${courseId}/quiz/${link.id}`
												)
											}
											className={`cursor-pointer font-semibold rounded text-lg p-2 mb-1 ${
												activeLinkId === link.id
													? "bg-prim400 text-prim50 hover:bg-prim400"
													: "text-sec400 hover:bg-sec700 hover:text-sec200 bg-slate-100/20"
											}`}
										>
											<span className="text-lg font-bold">
												{index + 1}: {link.title}
											</span>
										</div>
										<div>
											{link.questions.map(
												(
													question: any,
													questionIndex: number
												) => {
													const userAnswer =
														link.answers.find(
															(answer: any) =>
																answer.questionId ===
																question.id
														);
													return (
														<div
															key={questionIndex}
															className="mb-1 w-full"
														>
															<a
																href={
																	pathname ===
																	`/courses/${courseId}/quiz/${link.id}`
																		? `#question${questionIndex + 1}`
																		: `/courses/${courseId}/quiz/${link.id}/#question${questionIndex + 1}`
																}
																className={`px-2 block w-full rounded hover:bg-sec400 text-lg ${getAnswerColor(
																	question,
																	userAnswer
																)}`}
															>
																{questionIndex +
																	1}
																:{" "}
																{question.title}
															</a>
														</div>
													);
												}
											)}
										</div>
									</div>
								</>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default QuizSidebar;
