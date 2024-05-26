import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import Link from "next/link";

interface QuizTypeProps {
	quizTypeId: string;
}

const QuizList: React.FC<QuizTypeProps> = ({ quizTypeId }) => {
	const [quizzes, setQuizzes] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				if (!quizTypeId) return;
				const response = await fetch(`/api/quiz-title/${quizTypeId}`);
				if (response.ok) {
					const data = await response.json();
					console.log(data);
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

	const handlePush = (id: number) => {
		router.push(`/vakken/quiz/${id}`);
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
										<a
											key={quiz.id}
											className="block p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
											onClick={() => handlePush(quiz.id)}
										>
											<h2 className="text-xl font-semibold">
												{index + 1}. {quiz.title}
											</h2>
										</a>
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
