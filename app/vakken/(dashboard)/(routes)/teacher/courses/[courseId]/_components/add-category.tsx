"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const AddCategoryForm: React.FC = () => {
	const [quizTitle, setQuizTitle] = useState("");
	const [courses, setCourses] = useState<any[]>([]);

	const [loading, setLoading] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState("");
	const [courseLoading, setCourseLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				setCourseLoading(true);
				const response = await fetch("/api/level/subject/");
				const data = await response.json();
				setCourses(data);
			} catch (error) {
				console.error("Failed to fetch subject", error);
				toast.error("Failed to fetch subjects");
			} finally {
				setCourseLoading(false);
			}
		};

		fetchCourses();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const response = await fetch("/api/categories/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: quizTitle,
				subjectId: selectedCourse,
			}),
		});

		if (response.ok) {
			setQuizTitle("");
			toast.success("Category created successfully");
			window.location.reload();
		} else {
			console.error("Failed to create category");
			toast.error("Failed to create category");
		}
		setLoading(false);
	};

	const handleCourseSelect = async (quizId: string) => {
		setSelectedCourse(quizId);
	};

	return (
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					
					<select
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
						value={selectedCourse}
						onChange={(e) => handleCourseSelect(e.target.value)}
						required
					>
						<option value="" disabled>
							Select a subject
						</option>
						{courses.map((course) => (
							<option key={course.id} value={course.id}>
								{course.title}
							</option>
						))}
					</select>
					<Link href="/vakken/teacher/subject/create">
						<p className="text-blue-500 mt-1">Create a subject</p>
					</Link>
					{courseLoading && (
						<div className="text-center mt-2">
							<svg
								className="animate-spin h-5 w-5 text-gray-900"
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
						</div>
					)}
				</div>
				<div>
				
					<input
						type="text"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
						placeholder="Category Title"
						value={quizTitle}
						onChange={(e) => setQuizTitle(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="px-4 py-2 bg-gray-900 text-white rounded-md shadow flex items-center justify-center"
				>
					{loading && (
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
					{loading ? "Submitting..." : "Submit"}
				</button>
			</form>
	);
};

export default AddCategoryForm;
