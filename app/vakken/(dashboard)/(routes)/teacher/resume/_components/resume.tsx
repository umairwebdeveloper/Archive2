import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Spinner } from "@/components/spinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Resume: React.FC = () => {
	const [courses, setCourses] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState("");
	const [courseLoading, setCourseLoading] = useState(true);
	const [resumeContent, setResumeContent] = useState("");
	const quillRef = useRef<any>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				setCourseLoading(true);
				const response = await fetch("/api/courses/");
				const data = await response.json();
				setCourses(data);
			} catch (error) {
				console.error("Failed to fetch quizzes", error);
				toast.error("Failed to fetch quizzes");
			} finally {
				setCourseLoading(false);
			}
		};

		fetchCourses();
	}, []);

	const handleCourseSelect = async (courseId: string) => {
		setSelectedCourse(courseId);
		try {
			const response = await fetch(`/api/courses/${courseId}/resume`);
			if (response.ok) {
				const data = await response.json();
				setResumeContent(data.text || "");
			} else {
				setResumeContent("");
			}
		} catch (error) {
			console.error("Failed to fetch resume", error);
			toast.error("Failed to fetch resume");
			setResumeContent("");
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(
				`/api/courses/${selectedCourse}/resume`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						content: resumeContent,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to submit resume");
			}

			toast.success("Resume submitted successfully!");
		} catch (error) {
			console.error("Failed to submit resume", error);
			toast.error("Failed to submit resume");
		} finally {
			setLoading(false);
		}
	};

	const modules = {
		toolbar: {
			container: [
				["image"], // Add video
				["clean"], // Remove formatting button
			],
		},
	};

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold text-center mb-6">
				Create Resume
			</h1>
			<div className="card border rounded-lg p-4">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<label className="block text-lg font-medium text-gray-700">
							Select Course to Create Resume
						</label>
						<select
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
							value={selectedCourse}
							onChange={(e) => handleCourseSelect(e.target.value)}
							required
						>
							<option value="" disabled>
								Select a course
							</option>
							{courses.map((course) => (
								<option key={course.id} value={course.id}>
									{course.title}
								</option>
							))}
						</select>
						<Link href="/vakken/teacher/create">
							<p className="text-blue-500 mt-1">
								Create a course
							</p>
						</Link>
						{courseLoading && (
							<div className="text-center mt-2">
								<Spinner />
							</div>
						)}
					</div>

					{selectedCourse && (
						<div>
							<label className="block text-lg font-medium text-gray-700">
								Resume Content
							</label>
							<ReactQuill
								ref={quillRef}
								value={resumeContent}
								onChange={setResumeContent}
								className="mt-1"
								modules={modules}
							/>
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

export default Resume;
