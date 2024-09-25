import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ManageQuestions() {
	const [questions, setQuestions] = useState<any>([]);
	const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
	const [formData, setFormData] = useState<any>({
		title: "",
		questionText: "",
		explanation: "",
	});
	const [questionType, setQuestionType] = useState<any>(null);
	const [loading, setLoading] = useState<any>(false); // Loading state
	const [loadingQuestions, setLoadingQuestions] = useState<any>(true); // Initial loading for questions

	useEffect(() => {
		fetchQuestions();
	}, []);

	const fetchQuestions = async () => {
		setLoadingQuestions(true); // Start loading when fetching questions
		try {
			const res: any = await axios.get("/api/questions");
			setQuestions(res.data);
		} catch (error: any) {
			console.error("Error fetching questions:", error);
		} finally {
			setLoadingQuestions(false); // End loading after fetching questions
		}
	};

	const handleSelectChange = (e: any) => {
		const questionId: any = e.target.value;
		const question: any = questions.find(
			(q: any) => q.id === parseInt(questionId)
		);
		setSelectedQuestion(question);
		setFormData({
			title: question.title,
			questionText: question.questionText,
			explanation: question.explanation,
		});
		setQuestionType(question.type);
	};

	const handleInputChange = (e: any) => {
		const { name, value }: any = e.target;
		setFormData((prevState: any) => ({ ...prevState, [name]: value }));
	};

	const handleUpdate = async () => {
		if (!selectedQuestion) return;

		setLoading(true); // Start loading when updating
		try {
			const res: any = await axios.put(
				`/api/questions/${selectedQuestion.id}`,
				formData
			);
			if (res.status === 200) {
				fetchQuestions(); // Refresh questions list after update
                toast.success("Question Update Successfully !")
			}
		} catch (error: any) {
			console.error("Error updating question:", error);
            toast.error("Error in updating, please try again")
		} finally {
			setLoading(false); // End loading after update
		}
	};

	const handleDelete = async () => {
		if (!selectedQuestion) return;

		setLoading(true); // Start loading when deleting
		try {
			const res: any = await axios.delete(
				`/api/questions/${selectedQuestion.id}`
			);
			if (res.status === 200) {
				setSelectedQuestion(null);
				fetchQuestions(); // Refresh questions list after deletion
                toast.success("Question delete successfully !")
			}
		} catch (error: any) {
			console.error("Error deleting question:", error);
            toast.error("Question not delete !")
		} finally {
			setLoading(false); // End loading after deletion
		}
	};

	const handleEditorChange = (content: string) => {
		setFormData((prevState: any) => ({
			...prevState,
			questionText: content,
		}));
	};

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6] }],
				[{ size: [] }],
				["bold", "italic", "underline", "strike", "blockquote"],
				[{ list: "ordered" }, { list: "bullet" }],
				["link", "image", "video"],
				["clean"],
				["code-block"],
			],
		},
	};

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold text-center mb-6">
				Manage Questions
			</h1>
			<div className="card border rounded-lg p-4">
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">
						Select Question
					</label>
					{loadingQuestions ? (
						<div className="text-center text-gray-500">
							<Spinner />
						</div>
					) : (
						<select
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							onChange={handleSelectChange}
							value={selectedQuestion ? selectedQuestion.id : ""}
						>
							<option value="" disabled>
								Select a question
							</option>
							{questions.map((question: any) => (
								<option key={question.id} value={question.id}>
									{question.title}
								</option>
							))}
						</select>
					)}
				</div>

				{selectedQuestion && (
					<>
						<div>
							<p className="text-center font-bold mb-2">
								Question Type: {questionType}
							</p>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Title
							</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Question Text
							</label>
							{/* ReactQuill Editor */}
							<ReactQuill
								value={formData.questionText}
								onChange={handleEditorChange}
								className="bg-white border border-gray-300 rounded-md"
								modules={modules}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Explanation
							</label>
							<textarea
								name="explanation"
								value={formData.explanation}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md"
							/>
						</div>
						<div className="flex justify-between">
							<Button
								onClick={handleUpdate}
								className={`${loading ? "opacity-50" : ""}`}
								disabled={loading}
							>
								Update
							</Button>
							<button
								onClick={handleDelete}
								className={`px-4 py-2 bg-red-500 text-white rounded-md ${
									loading ? "opacity-50" : ""
								}`}
								disabled={loading}
							>
								Delete
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
