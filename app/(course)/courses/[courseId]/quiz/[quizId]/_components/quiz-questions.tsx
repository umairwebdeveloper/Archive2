// pages/quiz/[quizId].tsx
import { useState, useEffect, useRef } from "react";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import SideBox from "./side-box";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Option {
	id: number;
	label: string;
	value: string;
	questionId: number;
}

interface Question {
	id: number;
	quizId: number;
	title: string;
	questionText: string;
	type: "multiple-choice" | "text";
	correctAnswer: string;
	explanation: string;
	options: Option[];
}

interface Quiz {
	id: number;
	userId: string;
	title: string;
	questions: Question[];
}

interface Answer {
	questionId: number;
	answer: string;
}

interface QuizQuestionsProps {
	quizId: string;
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quizId }) => {
	const [quiz, setQuiz] = useState<Quiz | null>(null);
	const [course, setCourse] = useState<any>(null);
	const [selectedAnswers, setSelectedAnswers] = useState<{
		[key: number]: string;
	}>({});
	const [isSubmitting, setIsSubmitting] = useState<{
		[key: number]: boolean;
	}>({});
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [explanations, setExplanations] = useState<{
		[key: number]: boolean;
	}>({});
	const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchQuiz = async () => {
			if (!quizId) return;
			const response = await fetch(`/api/quiz/${quizId}`);
			if (response.ok) {
				const data = await response.json();
				setQuiz(data.quiz);
				setCourse(data.course);
				await fetchSubmittedAnswers();
			} else {
				console.error("Failed to fetch quiz");
			}
		};

		const fetchSubmittedAnswers = async () => {
			const response = await fetch(`/api/quiz/${quizId}/answers`);
			if (response.ok) {
				const data = await response.json();
				const initialAnswers = data.reduce(
					(acc: { [key: number]: string }, answer: Answer) => {
						acc[answer.questionId] = answer.answer;
						return acc;
					},
					{}
				);
				setSelectedAnswers(initialAnswers);
			}
		};

		fetchQuiz();
	}, [quizId]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = questionRefs.current.findIndex(
							(ref) => ref === entry.target
						);
						if (index !== -1) {
							setActiveIndex(index);
						}
					}
				});
			},
			{
				threshold: 0.5,
			}
		);

		questionRefs.current.forEach((ref) => {
			if (ref) observer.observe(ref);
		});

		return () => {
			questionRefs.current.forEach((ref) => {
				if (ref) observer.unobserve(ref);
			});
		};
	}, [quiz]);

	const handleOptionClick = (questionId: number, option: string) => {
		setSelectedAnswers((prev) => ({
			...prev,
			[questionId]: option,
		}));
	};

	const handleTextChange = (questionId: number, text: string) => {
		setSelectedAnswers((prev) => ({
			...prev,
			[questionId]: text,
		}));
	};

	const handleSubmit = async (questionId: number) => {
		if (!quiz) return;

		const answer = selectedAnswers[questionId];
		if (!answer) {
			toast.error("Please select an answer before submitting");
			return;
		}

		setIsSubmitting((prev) => ({
			...prev,
			[questionId]: true,
		}));

		const response = await fetch(`/api/quiz/${quizId}/submit-answer`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: quiz.userId,
				questionId,
				answer,
			}),
		});

		if (response.ok) {
			toast.success("Answer submitted successfully");
			setExplanations((prev) => ({
				...prev,
				[questionId]: true,
			}));
			router.refresh();
		} else {
			toast.error("Failed to submit answer");
		}

		setIsSubmitting((prev) => ({
			...prev,
			[questionId]: false,
		}));
	};

	const handleBack = () => {
		router.back();
	};

	const handleLinkClick = (index: number) => {
		setActiveIndex(index);
		scrollToQuestion(index);
	};

	const scrollToQuestion = (index: number) => {
		const offset = 100; // Adjust this value as needed
		const element = document.getElementById(`question${index + 1}`);
		if (element) {
			const elementPosition =
				element.getBoundingClientRect().top + window.pageYOffset;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	if (!quiz) {
		return (
			<div className="flex items-center justify-center mt-5">
				<Spinner size="lg" />
			</div>
		);
	}

	return (
		<div className="container mx-auto mt-5">
			<div className="">
				<SideBox
					quizTitle={quiz.title}
					questions={quiz.questions}
					activeIndex={activeIndex}
					onLinkClick={handleLinkClick}
					
				/>
				<div className="ml-64 p-6">
					<h1 className="text-center text-3xl font-bold mb-3">
						Quiz Questions
					</h1>
					<div id="quiz-container" className="mt-4">
						{quiz.questions && quiz.questions.length > 0 ? (
							quiz.questions.map((question, index) => (
								<div
									key={index}
									id={`question${index + 1}`}
									ref={(el: any) =>
										(questionRefs.current[index] = el)
									}
									className="card mb-6 border rounded-lg shadow-sm"
								>
									<div className="card-body p-4">
										<h5 className="card-title font-bold text-start">
											{index + 1}: {question.title}
										</h5>
										<hr className="my-3" />
										<p
											className="card-text text-start mb-3"
											dangerouslySetInnerHTML={{
												__html: question.questionText,
											}}
										></p>
										{question.type === "multiple-choice" ? (
											<div
												className="flex flex-col space-y-3"
												data-question={`question${index}`}
											>
												{question.options?.map(
													(option) => (
														<div
															key={option.id}
															className="flex items-center"
														>
															<div
																className={`w-12 font-semibold h-8 border rounded-lg flex justify-center items-center cursor-pointer user-select-none ${
																	selectedAnswers[
																		question
																			.id
																	] ===
																	option.label
																		? "bg-sky-200 text-white border-sky-200"
																		: "border-sky-200"
																}`}
																onClick={() =>
																	handleOptionClick(
																		question.id,
																		option.label
																	)
																}
															>
																{option.label}
															</div>
															<div className="ml-3">
																<p className="m-0">
																	{
																		option.value
																	}
																</p>
															</div>
														</div>
													)
												)}
											</div>
										) : (
											<div className="flex flex-col space-y-3">
												<ReactQuill
													value={
														selectedAnswers[
															question.id
														] || ""
													}
													onChange={(value) =>
														handleTextChange(
															question.id,
															value
														)
													}
													className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
												/>
											</div>
										)}
										<hr className="my-3" />
										<div className="flex justify-start">
											<Button
												onClick={() =>
													handleSubmit(question.id)
												}
												disabled={
													isSubmitting[question.id]
												}
											>
												{isSubmitting[question.id]
													? "Submitting..."
													: "Submit"}
											</Button>
										</div>
										{selectedAnswers[question.id] && (
											<>
												<div className="mt-2 p-2 bg-gray-100 border rounded-lg">
													<p className="font-semibold">
														Your Answer:
													</p>
													<p
														dangerouslySetInnerHTML={{
															__html: selectedAnswers[
																question.id
															],
														}}
													></p>
												</div>
												{explanations[question.id] && (
													<div className="mt-2 p-2 bg-gray-100 border rounded-lg">
														<p className="font-semibold">
															Explanation:
														</p>
														<p>
															{
																question.correctAnswer
															}
														</p>
													</div>
												)}
											</>
										)}
									</div>
								</div>
							))
						) : (
							<div className="text-center my-5">
								No questions found for this quiz.
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuizQuestions;
