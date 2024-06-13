import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";

type ExamLevel = {
	id: string;
	name: string;
};

type CreateExamSubjectProps = {
	examLevels: ExamLevel[];
	loadingLevels: boolean;
	onExamSubjectCreated: () => void;
};

const CreateExamSubject: React.FC<CreateExamSubjectProps> = ({
	examLevels,
	loadingLevels,
	onExamSubjectCreated,
}) => {
	const [subjectName, setSubjectName] = useState("");
	const [subjectCategory, setSubjectCategory] = useState("EXACT");
	const [selectedExamLevelId, setSelectedExamLevelId] = useState("");
	const [loadingSubjectSubmit, setLoadingSubjectSubmit] = useState(false);

	const handleCreateExamSubject = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingSubjectSubmit(true);
		await fetch("/api/exam/subjects", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: subjectName,
				category: subjectCategory,
				examLevelId: selectedExamLevelId,
			}),
		});

		toast.success("Exam subject created successfully");

		setSubjectName("");
		setSubjectCategory("EXACT");
		setSelectedExamLevelId("");
		setLoadingSubjectSubmit(false);
		onExamSubjectCreated();
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-xl font-bold mb-4">Create Exam Subject</h1>
			<form onSubmit={handleCreateExamSubject} className="space-y-4">
				<div>
					<label
						htmlFor="examLevelId"
						className="block text-sm font-medium text-gray-700"
					>
						Exam Level
					</label>
					<select
						id="examLevelId"
						value={selectedExamLevelId}
						onChange={(e) => setSelectedExamLevelId(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						disabled={loadingLevels}
						required
					>
						<option value="">Select Exam Level</option>
						{examLevels.map((level) => (
							<option key={level.id} value={level.id}>
								{level.name}
							</option>
						))}
					</select>
					{loadingLevels && (
						<div className="mt-2">
							<Spinner />
						</div>
					)}
				</div>
				<div>
					<label
						htmlFor="subjectCategory"
						className="block text-sm font-medium text-gray-700"
					>
						Category
					</label>
					<select
						id="subjectCategory"
						value={subjectCategory}
						onChange={(e) => setSubjectCategory(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						<option value="EXACT">Exact Subjects</option>
						<option value="SOCIAL">Social Subjects</option>
						<option value="LANGUAGE">Language</option>
					</select>
				</div>
				<div>
					<label
						htmlFor="subjectName"
						className="block text-sm font-medium text-gray-700"
					>
						Name
					</label>
					<input
						type="text"
						id="subjectName"
						placeholder="Enter exam subject name"
						value={subjectName}
						onChange={(e) => setSubjectName(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>

				<button
					type="submit"
					className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
						loadingSubjectSubmit
							? "bg-gray-500"
							: "bg-indigo-600 hover:bg-indigo-700"
					} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
					disabled={loadingSubjectSubmit}
				>
					{loadingSubjectSubmit ? "Creating..." : "Create"}
				</button>
			</form>
		</div>
	);
};

export default CreateExamSubject;
