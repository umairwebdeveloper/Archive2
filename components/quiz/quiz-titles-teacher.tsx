import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
interface QuizTypeProps {
	quizTypeId: string;
}

const QuizList: React.FC<QuizTypeProps> = ({ quizTypeId }) => {
	const [quizzes, setQuizzes] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [viewLoading, setViewLoading] = useState<{ [key: number]: boolean }>(
		{}
	);
	const [deleteLoading, setDeleteLoading] = useState<{
		[key: number]: boolean;
	}>({});
	const router = useRouter();

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				if (!quizTypeId) return;
				const response = await fetch(`/api/quiz-title/${quizTypeId}`);
				if (response.ok) {
					const data = await response.json();
					setQuizzes(data);
				} else {
					console.error("Failed to fetch quizzes");
				}
			} catch (error) {
				console.error(
					"An error occurred while fetching quizzes",
					error
				);
			} finally {
				setLoading(false);
			}
		};

		fetchQuizzes();
	}, [quizTypeId]);

	const handlePush = async (id: number) => {
		setViewLoading((prev) => ({ ...prev, [id]: true }));
		router.push(`/vakken/teacher/quiz/${id}`);
	};

	const handleDelete = async (id: number) => {
		setDeleteLoading((prev) => ({ ...prev, [id]: true }));
		try {
			const response = await fetch(`/api/quiz-title`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }), // Include the id in the request body
			});

			if (response.ok) {
				setQuizzes(quizzes.quiz.filter((quiz: any) => quiz.id !== id));
				toast.success("Quiz deleted successfully");
			} else {
				console.error("Failed to delete quiz");
			}
		} catch (error) {
			console.error("An error occurred while deleting the quiz", error);
		} finally {
			setDeleteLoading((prev) => ({ ...prev, [id]: false }));
		}
	};

	const handleBack = () => {
		router.back();
	};

	return (
		<div className="container mx-auto mt-5">
			<div className="flex justify-start mb-5">
				<Button onClick={handleBack}>Back</Button>
			</div>
			{loading ? (
				<div className="flex items-center justify-center mt-5">
					<Spinner size="lg" />
				</div>
			) : (
				<>
					<h1 className="text-center text-3xl font-bold">
						<Link href="/vakken/quiz">
							<span className="text-blue-600">
								{quizzes.title}
							</span>
						</Link>{" "}
						&gt; Quiz Types
					</h1>
					<div className="flex justify-center mt-6">
						{quizzes.quiz.length === 0 ? (
							<h2 className="text-xl font-semibold">
								No Quiz found
							</h2>
						) : (
							<div className="grid grid-cols-1 gap-3 w-1/2">
								{quizzes.quiz.map(
									(quiz: any, index: number) => (
										<div
											key={quiz.id}
											className="block p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
										>
											<h2 className="text-xl font-semibold">
												{index + 1}. {quiz.title}
											</h2>
											<div className="flex justify-between items-center mt-4">
												<Button
													onClick={() =>
														handlePush(quiz.id)
													}
													disabled={
														viewLoading[quiz.id]
													}
													className="flex items-center"
												>
													{viewLoading[quiz.id] && (
														<svg
															className="animate-spin h-5 w-5 mr-3 text-white"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
														>
															<circle
																className="opacity-25"
																cx="12"
																cy="12"
																r="10"
																stroke="currentColor"
																strokeWidth="4"
															></circle>
															<path
																className="opacity-75"
																fill="currentColor"
																d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.963 7.963 0 014 12H2c0 2.042.632 3.938 1.709 5.291l1.292-1.292z"
															></path>
														</svg>
													)}
													{viewLoading[quiz.id]
														? "Loading"
														: "View"}
												</Button>
												<button
													onClick={() =>
														handleDelete(quiz.id)
													}
													disabled={
														deleteLoading[quiz.id]
													}
													className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 flex items-center"
												>
													{deleteLoading[quiz.id] && (
														<svg
															className="animate-spin h-5 w-5 mr-3 text-white"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
														>
															<circle
																className="opacity-25"
																cx="12"
																cy="12"
																r="10"
																stroke="currentColor"
																strokeWidth="4"
															></circle>
															<path
																className="opacity-75"
																fill="currentColor"
																d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.963 7.963 0 014 12H2c0 2.042.632 3.938 1.709 5.291l1.292-1.292z"
															></path>
														</svg>
													)}

													{deleteLoading[quiz.id]
														? "Deleting"
														: "Delete"}
												</button>
											</div>
										</div>
									)
								)}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default QuizList;
