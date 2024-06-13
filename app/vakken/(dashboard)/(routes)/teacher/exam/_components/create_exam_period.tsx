import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";

type ExamSubject = {
	id: string;
	name: string;
	examLevel: any;
};

type CreateExamPeriodProps = {
	examSubjects: ExamSubject[];
	loadingSubjects: boolean;
	onExamPeriodCreated: () => void;
};

const CreateExamPeriod: React.FC<CreateExamPeriodProps> = ({
	examSubjects,
	loadingSubjects,
	onExamPeriodCreated,
}) => {
	const [periodDate, setPeriodDate] = useState("");
	const [selectedExamSubjectId, setSelectedExamSubjectId] = useState("");
	const [loadingPeriodSubmit, setLoadingPeriodSubmit] = useState(false);

	const handleCreateExamPeriod = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingPeriodSubmit(true);
		await fetch("/api/exam/periods", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				date: periodDate,
				examSubjectId: selectedExamSubjectId,
			}),
		});

		toast.success("Exam period created successfully");

		setPeriodDate("");
		setSelectedExamSubjectId("");
		setLoadingPeriodSubmit(false);
		onExamPeriodCreated();
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-xl font-bold mb-4">Create Exam Period</h1>
			<form onSubmit={handleCreateExamPeriod} className="space-y-4">
				<div>
					<label
						htmlFor="examSubjectId"
						className="block text-sm font-medium text-gray-700"
					>
						Exam Subject
					</label>
					<select
						id="examSubjectId"
						value={selectedExamSubjectId}
						onChange={(e) =>
							setSelectedExamSubjectId(e.target.value)
						}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						disabled={loadingSubjects}
						required
					>
						<option value="">Select Exam Subject</option>
						{examSubjects.map((subject) => (
							<option key={subject.id} value={subject.id}>
								{subject.examLevel.name} - {subject.name}
							</option>
						))}
					</select>
					{loadingSubjects && (
						<div className="mt-2">
							<Spinner />
						</div>
					)}
				</div>
				<div>
					<label
						htmlFor="periodDate"
						className="block text-sm font-medium text-gray-700"
					>
						date
					</label>
					<input
						type="date"
						id="periodDate"
						value={periodDate}
						onChange={(e) => setPeriodDate(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>
				<button
					type="submit"
					className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
						loadingPeriodSubmit
							? "bg-gray-500"
							: "bg-indigo-600 hover:bg-indigo-700"
					} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
					disabled={loadingPeriodSubmit}
				>
					{loadingPeriodSubmit ? "Creating..." : "Create"}
				</button>
			</form>
		</div>
	);
};

export default CreateExamPeriod;
