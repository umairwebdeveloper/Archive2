import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";

type ExamPeriod = {
	id: string;
	date: string;
	examSubject: any;
};

type CreateExamPdfProps = {
	examPeriods: ExamPeriod[];
	loadingPeriods: boolean;
};

const CreateExamPdf: React.FC<CreateExamPdfProps> = ({
	examPeriods,
	loadingPeriods,
}) => {
	const [pdfCategory, setPdfCategory] = useState("EXAM");
	const [selectedExamPeriodId, setSelectedExamPeriodId] = useState("");
	const [pdfFile, setPdfFile] = useState<File | null>(null);
	const [loadingPdfSubmit, setLoadingPdfSubmit] = useState(false);

	const handleCreateExamPdf = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingPdfSubmit(true);

		const formData = new FormData();
		formData.append("category", pdfCategory);
		formData.append("examPeriodId", selectedExamPeriodId);
		if (pdfFile) {
			formData.append("pdfFile", pdfFile);
		}

		const response = await fetch("/api/exam/pdf", {
			method: "POST",
			body: formData,
		});
		if (response.ok) {
			toast.success("Exam pdf created successfully");
			setPdfCategory("EXAM");
			setSelectedExamPeriodId("");
			setPdfFile(null);
			setLoadingPdfSubmit(false);
		} else {
			toast.error("Failed to create exam pdf");
			setLoadingPdfSubmit(false);
		}
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
			<h1 className="text-xl font-bold mb-4">Create Exam Pdf</h1>
			<form onSubmit={handleCreateExamPdf} className="space-y-4">
				<div>
					<label
						htmlFor="examPeriodId"
						className="block text-sm font-medium text-gray-700"
					>
						Exam Period
					</label>
					<select
						id="examPeriodId"
						value={selectedExamPeriodId}
						onChange={(e) =>
							setSelectedExamPeriodId(e.target.value)
						}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						disabled={loadingPeriods}
						required
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
				<div>
					<label
						htmlFor="pdfFile"
						className="block text-sm font-medium text-gray-700"
					>
						Pdf File
					</label>
					<input
						type="file"
						id="pdfFile"
						accept="application/pdf"
						onChange={(e) =>
							setPdfFile(
								e.target.files ? e.target.files[0] : null
							)
						}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="pdfCategory"
						className="block text-sm font-medium text-gray-700"
					>
						Category
					</label>
					<select
						id="pdfCategory"
						value={pdfCategory}
						onChange={(e) => setPdfCategory(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						<option value="EXAM">EXAM</option>
						<option value="CORRECTION_MODEL">
							CORRECTION MODEL
						</option>
						<option value="WORK_APPENDIX">WORK APPENDIX</option>
						<option value="CORRECTION_MODEL_ADDITION">
							CORRECTION MODEL ADDITION
						</option>
					</select>
				</div>

				<button
					type="submit"
					className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
						loadingPdfSubmit
							? "bg-gray-500"
							: "bg-indigo-600 hover:bg-indigo-700"
					} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
					disabled={loadingPdfSubmit}
				>
					{loadingPdfSubmit ? "Creating..." : "Create"}
				</button>
			</form>
		</div>
	);
};

export default CreateExamPdf;
