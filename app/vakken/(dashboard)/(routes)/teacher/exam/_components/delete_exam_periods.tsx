import { useState } from "react";
import { Spinner } from "@/components/spinner";
import toast from "react-hot-toast";
type ExamPeriod = {
	id: string;
	date: string;
	examSubject: any;
};

type DeleteExamPeriodProps = {
	examPeriods: ExamPeriod[];
	loadingPeriods: boolean;
	onDelete: () => void;
};

const DeleteExamPeriod: React.FC<DeleteExamPeriodProps> = ({
	examPeriods,
	loadingPeriods,
	onDelete,
}) => {
	const [selectedDeleteId, setSelectedDeleteId] = useState("");
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async () => {
		setDeleting(true);

		const response = await fetch(`/api/exam/periods`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: selectedDeleteId }),
		});

		if (!response.ok) {
			toast.error("Failed to delete Exam Period");
			setDeleting(false);
			return;
		}
		toast.success("Exam Period deleted successfully");
		onDelete();
		setSelectedDeleteId("");
		setDeleting(false);
	};

	function formatDate(dateString: string): string {
		const date = new Date(dateString);

		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		return date.toLocaleDateString("en-US", options);
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-xl font-bold mb-4">Delete Exam Period</h1>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="deleteId"
						className="block text-sm font-medium text-gray-700"
					>
						Select Exam Period
					</label>
					<select
						id="deleteId"
						value={selectedDeleteId}
						onChange={(e) => setSelectedDeleteId(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						disabled={loadingPeriods}
					>
						<option value="">Select Exam Period</option>
						{examPeriods.map((period) => (
							<option key={period.id} value={period.id}>
								{period.examSubject.examLevel.name} -{" "}
								{period.examSubject.name} -{" "}
								{formatDate(period.date)}
							</option>
						))}
					</select>
					{loadingPeriods && (
						<div className="mt-2">
							<Spinner />
						</div>
					)}
				</div>
				<button
					onClick={handleDelete}
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					disabled={!selectedDeleteId || deleting}
				>
					{deleting ? "Deleting..." : "Delete"}
				</button>
			</div>
		</div>
	);
};

export default DeleteExamPeriod;
