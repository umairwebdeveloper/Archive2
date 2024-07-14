import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
// icons
import { Pen } from "lucide-react";
import Link from "next/link";
import Progress from "./progress";
import { useProgress } from "@/hooks/context/ProgressContext";

interface QuizTypeProps {
	quizTypeId: string;
}

const QuizList: React.FC<QuizTypeProps> = ({ quizTypeId }) => {
	const { setProgressId, setTitle } = useProgress();
	const [quizzes, setQuizzes] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				if (!quizTypeId) return;
				const response = await fetch(
					`/api/level/subject/${quizTypeId}`
				);
				if (response.ok) {
					const data = await response.json();
					console.log(data);
					setQuizzes(data);
					setProgressId(quizTypeId); // Set the progressId in context
					setTitle(data.title); // Set the title in context
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
	}, [quizTypeId, setProgressId, setTitle]);

	const handlePush = (id: number) => {
		router.push(`/courses/${id}`);
	};

	const handleBack = () => {
		router.back();
	};

	const getAlphabetPrefix = (index: number) => {
		return String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
	};

	return (
		<div className="container mt-5">
			{loading ? (
				<div className="flex items-center justify-center mt-5">
					<Spinner size="lg" />
				</div>
			) : (
				<>
					<div className="p-0 md:p-6">
						<h1 className="text-center text-3xl font-bold">
							{quizzes.title}
						</h1>

						<div className="flex justify-center mt-6">
							{quizzes.categorys.length === 0 ? (
								<p className="text-center my-4">
									No Courses found
								</p>
							) : (
								<div className="grid grid-cols-1 gap-3 w-full">
									{quizzes.categorys.map(
										(quiz: any, index: number) => (
											<div key={index}>
												<h2 className="text-xl">
													<span className="font-bold">
														#{index + 1}
													</span>{" "}
													{quiz.name}
												</h2>
												<div className="border rounded p-3 my-3">
													{quiz.courses.length ===
													0 ? (
														<p className="text-center">
															No Subtopic found
														</p>
													) : (
														quiz.courses.map(
															(
																course: any,
																courseIndex: number
															) => (
																<>
																	{course.isPublished && (
																		<a
																			key={
																				course.id
																			}
																			className="block p-4 border rounded-lg shadow hover:border-prim500 transition-shadow duration-300 cursor-pointer mb-3"
																			onClick={() =>
																				handlePush(
																					course.id
																				)
																			}
																		>
																			<h2 className="text-xl">
																				<span className="font-bold">
																					{getAlphabetPrefix(
																						courseIndex
																					)}{" "}
																				</span>
																				{
																					course.title
																				}
																			</h2>
																		</a>
																	)}
																</>
															)
														)
													)}
												</div>
											</div>
										)
									)}
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default QuizList;
