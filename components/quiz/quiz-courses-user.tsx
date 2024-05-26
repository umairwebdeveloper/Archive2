import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../spinner";
interface Course {
	id: number;
	title: string;
}

// border rounded bg-blue-50 w-100

const CourseListUser: React.FC = () => {
	const [quizzes, setQuizzes] = useState<Course[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				const response = await fetch("/api/courses");
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
	}, []);

	const handlePush = (id: number) => {
		router.push(`/vakken/quiz/quiz-type/${id}`);
	};

	return (
		<div className="container mx-auto mt-5">
			<h1 className="text-center text-3xl font-bold">Quiz Courses</h1>
			{loading ? (
				<div className="flex items-center justify-center mt-5">
					<Spinner size="lg" />
				</div>
			) : (
				<div className="flex justify-center mt-6">
					{quizzes.length === 0 ? (
						<h2 className="text-xl font-semibold">No Courses found</h2>
					) : (
						<div className="grid grid-cols-1 gap-3 w-1/2">
							{quizzes.map((quiz, index) => (
								<a
									key={quiz.id}
									className="block p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
									onClick={() => handlePush(quiz.id)}
								>
									<h2 className="text-xl font-semibold">
										{index + 1}. {quiz.title}
									</h2>
								</a>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CourseListUser;
