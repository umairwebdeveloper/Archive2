import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Spinner } from "../spinner";

// Dynamically import React Quill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddQuestion: React.FC = () => {
	const [quizzes, setQuizzes] = useState<any[]>([]);
	const [selectedQuiz, setSelectedQuiz] = useState("");
	const [questionTitle, setQuestionTitle] = useState("");
	const [questionText, setQuestionText] = useState("");
	const [type, setType] = useState<"multiple-choice" | "text">(
		"multiple-choice"
	);
	const [correctAnswer, setCorrectAnswer] = useState("");
	const [explanation, setExplanation] = useState("")
	const [options, setOptions] = useState([{ label: "A", value: "" }]);
	const [loading, setLoading] = useState(false);
	const [quizLoading, setQuizLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				setQuizLoading(true);
				const response = await fetch("/api/quiz-title/");
				const data = await response.json();
				setQuizzes(data);
			} catch (error) {
				console.error("Failed to fetch quizzes", error);
				toast.error("Failed to fetch quizzes");
			} finally {
				setQuizLoading(false);
			}
		};

		fetchQuizzes();
	}, []);

	const handleAddOption = () => {
		const newLabel = String.fromCharCode(65 + options.length); // ASCII 65 is 'A'
		setOptions([...options, { label: newLabel, value: "" }]);
	};

	const handleOptionChange = (index: number, value: string) => {
		const newOptions = options.slice();
		newOptions[index].value = value;
		setOptions(newOptions);
	};

	const handleRemoveOption = (index: number) => {
		const newOptions = options.filter((_, i) => i !== index);
		const updatedOptions = newOptions.map((option, i) => ({
			...option,
			label: String.fromCharCode(65 + i),
		}));
		setOptions(updatedOptions);
		// Update correctAnswer if the correct option is removed
		if (correctAnswer === options[index].label) {
			setCorrectAnswer("");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const question = {
			questionTitle,
			questionText,
			type,
			correctAnswer,
			explanation,
			options,
		};

		const response = await fetch(`/api/quiz-question/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: selectedQuiz,
				question: question,
			}),
		});

		if (response.ok) {
			setQuestionText("");
			setQuestionTitle("");
			setType("multiple-choice");
			setCorrectAnswer("");
			setOptions([{ label: "A", value: "" }]);
			toast.success("Question added successfully");
		} else {
			console.error("Failed to add question");
			toast.error("Failed to add question");
		}
		setLoading(false);
	};

	const handleQuizSelect = async (quizId: string) => {
		setSelectedQuiz(quizId);
	};

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold text-center mb-6">
				Add New Question
			</h1>
			<div className="card border rounded-lg p-4">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-lg font-medium text-gray-700">
							Select Quiz
						</label>
						<select
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
							value={selectedQuiz}
							onChange={(e) => handleQuizSelect(e.target.value)}
							required
						>
							<option value="" disabled>
								Select a quiz
							</option>
							{quizzes.map((quiz) => (
								<option key={quiz.id} value={quiz.id}>
									{quiz.title}
								</option>
							))}
						</select>
						{quizLoading && (
							<div className="text-center mt-2">
								<Spinner />
							</div>
						)}
					</div>
					<div>
						<label className="block text-lg font-medium text-gray-700">
							Question Title
						</label>
						<input
							type="text"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
							placeholder="Question Title"
							value={questionTitle}
							onChange={(e) => setQuestionTitle(e.target.value)}
							required
						/>
					</div>
					<div>
						<label className="block text-lg font-medium text-gray-700">
							Question Text
						</label>
						<ReactQuill
							value={questionText}
							onChange={setQuestionText}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
						/>
					</div>
					<div>
						<label className="block text-lg font-medium text-gray-700">
							Question Type
						</label>
						<select
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
							value={type}
							onChange={(e) =>
								setType(
									e.target.value as "multiple-choice" | "text"
								)
							}
							required
						>
							<option value="multiple-choice">
								Multiple Choice
							</option>
							<option value="text">Text</option>
						</select>
					</div>
					<div>
						<label className="block text-lg font-medium text-gray-700">
							Question Explanation
						</label>
						<textarea
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
							placeholder="Question Explanation"
							value={explanation}
							onChange={(e) => setExplanation(e.target.value)}
							required={type === "text"}
						/>
					</div>
					{type === "multiple-choice" && (
						<div>
							<label className="block text-lg font-medium text-gray-700 mb-3">
								Options
							</label>
							{options.map((option, index) => (
								<div
									key={index}
									className="flex items-center space-x-3 mb-2"
								>
									<input
										type="text"
										className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm"
										placeholder={`Option ${option.label}`}
										value={option.value}
										onChange={(e) =>
											handleOptionChange(
												index,
												e.target.value
											)
										}
										required
									/>
									<button
										type="button"
										className="px-3 py-1.5 bg-red-500 text-white rounded-md shadow"
										onClick={() =>
											handleRemoveOption(index)
										}
										disabled={options.length <= 1}
									>
										Remove
									</button>
								</div>
							))}
							<button
								type="button"
								className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md shadow"
								onClick={handleAddOption}
							>
								Add Option
							</button>
							<div className="mt-4">
								<label className="block text-lg font-medium text-gray-700">
									Correct Option
								</label>
								<select
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
									value={correctAnswer}
									onChange={(e) =>
										setCorrectAnswer(e.target.value)
									}
									required
								>
									<option value="" disabled>
										Select correct option
									</option>
									{options.map((option) => (
										<option
											key={option.label}
											value={option.label}
										>
											{option.label}
										</option>
									))}
								</select>
							</div>
						</div>
					)}
					<button
						type="submit"
						disabled={loading}
						className="px-4 py-2 bg-gray-900 text-white rounded-md shadow flex items-center justify-center"
					>
						{loading && <Spinner />}
						{loading ? "Submitting..." : "Submit"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddQuestion;
