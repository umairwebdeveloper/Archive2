import { useState, useEffect, useRef } from "react";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import SideBox from "./side-box";
import DebitCredit from "./debit_credit";

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
	type: "multiple-choice" | "text" | "debit-credit";
	correctAnswer: string;
	debitAmount: string;
	creditAmount: string;
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
	const [isCorrect, setIsCorrect] = useState<{
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
				await fetchSubmittedAnswers(data.quiz.questions);
			} else {
				console.error("Failed to fetch quiz");
			}
		};

		const fetchSubmittedAnswers = async (questions: Question[]) => {
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
				const initialIsCorrect = questions.reduce(
					(acc: { [key: number]: boolean }, question) => {
						acc[question.id] =
							initialAnswers[question.id] ===
							question.correctAnswer;
						return acc;
					},
					{}
				);
				setIsCorrect(initialIsCorrect);
			}
		};

		fetchQuiz();
	}, [quizId]);

	const handleOptionClick = (questionId: number, option: string) => {
		const question = quiz?.questions.find((q) => q.id === questionId);
		const isAnswerCorrect = question?.correctAnswer === option;

		setSelectedAnswers((prev) => ({
			...prev,
			[questionId]: option,
		}));

		setIsCorrect((prev) => ({
			...prev,
			[questionId]: isAnswerCorrect,
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

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				[{ list: "ordered" }, { list: "bullet" }],
				["bold", "italic", "underline"],
				["link", "image"],
			],
		},
	};

	const handleChildFunctionCall = (questionID: any) => {
		setExplanations((prev) => ({
			...prev,
			[questionID]: true,
		}));
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
				<div className="p-6">
					<h1 className="text-center text-3xl font-bold mb-3">
						Quiz Questions
					</h1>
					<div className="flex justify-center">
						<div
							id="quiz-container"
							className="mt-4 grid grid-cols-1 gap-3 w-1/2"
						>
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
												className="card-text text-start mb-3 bg-gray-100 p-3 rounded-lg"
												dangerouslySetInnerHTML={{
													__html: question.questionText,
												}}
											></p>
											{question.type ===
											"multiple-choice" ? (
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
																			? isCorrect[
																					question
																						.id
																				]
																				? "bg-green-200 text-white border-green-200"
																				: "bg-red-200 text-white border-red-200"
																			: "border-sky-200"
																	}`}
																	onClick={() =>
																		handleOptionClick(
																			question.id,
																			option.label
																		)
																	}
																>
																	{
																		option.label
																	}
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
											) : question.type ===
											  "debit-credit" ? (
												<>
													<DebitCredit
														answerDebitAmount={
															question.debitAmount
														}
														answerCreditAmount={
															question.creditAmount
														}
														questionID={question.id}
														onChildFunctionCall={
															handleChildFunctionCall
														}
													/>
												</>
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
														modules={modules}
													/>
												</div>
											)}

											<div className="flex justify-start">
												{question.type ===
												"debit-credit" ? (
													<></>
												) : (
													<>
														<div className="w-full border-t mt-3">
															<Button
																className="mt-3"
																onClick={() =>
																	handleSubmit(
																		question.id
																	)
																}
																disabled={
																	isSubmitting[
																		question
																			.id
																	]
																}
															>
																{isSubmitting[
																	question.id
																]
																	? "Submitting..."
																	: "Submit"}
															</Button>
														</div>
													</>
												)}
											</div>
											{question.type ===
											"debit-credit" ? (
												<>
													{explanations[
														question.id
													] && (
														<div className="mt-2 p-2 bg-gray-100 border rounded-lg">
															<p className="font-semibold">
																Explanation:
															</p>
															<p>
																{
																	question.explanation
																}
															</p>
														</div>
													)}
												</>
											) : (
												<>
													{selectedAnswers[
														question.id
													] && (
														<>
															{explanations[
																question.id
															] && (
																<div className="mt-2 p-2 bg-gray-100 border rounded-lg">
																	<p className="font-semibold">
																		Explanation:
																	</p>
																	<p>
																		{
																			question.explanation
																		}
																	</p>
																</div>
															)}
														</>
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
		</div>
	);
};

export default QuizQuestions;
