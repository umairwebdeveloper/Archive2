import { useState } from "react";
import toast from "react-hot-toast";

type CreateExamLevelProps = {
	onExamLevelCreated: () => void;
};

const CreateExamLevel: React.FC<CreateExamLevelProps> = ({
	onExamLevelCreated,
}) => {
	const [levelName, setLevelName] = useState("");
	const [loadingLevelSubmit, setLoadingLevelSubmit] = useState(false);

	const handleCreateExamLevel = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingLevelSubmit(true);
		const response = await fetch("/api/exam/levels", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: levelName }),
		});

		if (response.ok) {
            toast.success("Exam level created successfully");
			onExamLevelCreated();
			setLevelName("");
		}
		setLoadingLevelSubmit(false);
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h1 className="text-xl font-bold mb-4">Create Exam Level</h1>
			<form onSubmit={handleCreateExamLevel} className="space-y-4">
				<div>
					<label
						htmlFor="levelName"
						className="block text-sm font-medium text-gray-700"
					>
						Name
					</label>
					<input
						type="text"
						id="levelName"
                        placeholder="Enter exam level name"
						value={levelName}
						onChange={(e) => setLevelName(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
					/>
				</div>
				<button
					type="submit"
					className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
						loadingLevelSubmit
							? "bg-gray-500"
							: "bg-indigo-600 hover:bg-indigo-700"
					} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
					disabled={loadingLevelSubmit}
				>
					{loadingLevelSubmit ? "Creating..." : "Create"}
				</button>
			</form>
		</div>
	);
};

export default CreateExamLevel;
