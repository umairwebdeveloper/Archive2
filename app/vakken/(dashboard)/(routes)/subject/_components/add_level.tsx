"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const AddLevel: React.FC = () => {
	const [quizTitle, setQuizTitle] = useState("");

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const response = await fetch("/api/level/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: quizTitle }),
		});

		if (response.ok) {
			setQuizTitle("");
			toast.success("Level created successfully");
			window.location.reload();
		} else {
			console.error("Failed to create level");
			toast.error("Failed to create level");
		}
		setLoading(false);
	};

	return (
		<>
			<div className="card border rounded-lg p-4 mb-4">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-lg font-medium text-gray-700">
							level Title
						</label>
						<input
							type="text"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
							placeholder="Level Title"
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
			</div>
		</>
	);
};

export default AddLevel;
