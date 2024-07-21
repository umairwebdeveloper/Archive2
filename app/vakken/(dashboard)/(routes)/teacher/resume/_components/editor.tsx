import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";

const Resume: React.FC = () => {
	const [courses, setCourses] = useState<any[]>([]);
	const [selectedCourse, setSelectedCourse] = useState("");
	const [courseLoading, setCourseLoading] = useState(true);
	const router = useRouter();

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

	const handleCourseChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedCourse(event.target.value);
	};

	const handleEditClick = () => {
		if (selectedCourse) {
			router.push(`/editor/${selectedCourse}`);
		}
	};

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold text-center mb-6">
				Create Resume
			</h1>
			<div className="card border rounded-lg p-4">
				<div>
					<label className="block text-lg font-medium text-gray-700">
						Select Course to Create Resume
					</label>
					<select
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
						value={selectedCourse}
						onChange={handleCourseChange}
						required
					>
						<option value="">Select a course</option>
						{courses.map((course) => (
							<option key={course.id} value={course.id}>
								{course.title}
							</option>
						))}
					</select>
					<Link href="/vakken/teacher/create">
						<p className="text-blue-500 mt-1">Create a course</p>
					</Link>
					{courseLoading && (
						<div className="text-center mt-2">
							<Spinner />
						</div>
					)}
				</div>
				{selectedCourse && (
					<div className="mt-4 text-center">
						<Button onClick={handleEditClick}>Create Resume</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Resume;
