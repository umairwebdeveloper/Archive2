"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";

type Props = {
	examLevels: any[];
};

type Subject = {
	id: string;
	name: string;
	category: string;
	examLevelId: string;
};

const SubjectsLevels: React.FC<Props> = ({ examLevels = [] }) => {
	const [selectedLevel, setSelectedLevel] = useState(examLevels[0]?.id || "");
	const [selectedLevelName, setSelectedLevelName] = useState(
		examLevels[0]?.name || ""
	);
	const [loading, setLoading] = useState(true);
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (selectedLevel) {
			setLoading(true);
			fetch(`/api/exam/subjects/${selectedLevel}`)
				.then((response) => response.json())
				.then((data) => {
					setSubjects(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching subjects:", error);
					toast.error("Failed to fetch subjects");
					setLoading(false);
				});
		}
	}, [selectedLevel]);

	const categorizedSubjects = subjects.reduce(
		(acc: any, subject: Subject) => {
			if (!acc[subject.category]) {
				acc[subject.category] = [];
			}
			acc[subject.category].push(subject);
			return acc;
		},
		{}
	);

	const orderedCategories = ["EXACT", "SOCIAL", "LANGUAGE"];

	const handleSubjectClick = (subjectId: string) => {
		router.push(`/vakken/exam/${subjectId}`);
	};

	const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const levelId = e.target.value;
		const levelName =
			examLevels.find((level) => level.id === levelId)?.name || "";
		setSelectedLevel(levelId);
		setSelectedLevelName(levelName);
	};

	return (
		<>
			<div className="flex justify-center items-center">
				<div className="border rounded border shadow-sm w-full">
					<div className="p-6 border-b flex items-center gap-3">
						<h1 className="font-bold text-2xl">Exams</h1>
						<p>{selectedLevelName}</p>
					</div>
					<div className="p-6">
						<div className="w-3/12">
							<label
								htmlFor="examLevelId"
								className="block text-sm font-medium text-gray-700"
							>
								Selected learning level
							</label>
							{examLevels.length > 0 ? (
								<select
									id="examLevelId"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									value={selectedLevel}
									onChange={handleLevelChange}
								>
									{examLevels.map((level: any) => (
										<option key={level.id} value={level.id}>
											{level.name}
										</option>
									))}
								</select>
							) : (
								<p className="text-center">
									No exam levels available
								</p>
							)}
						</div>
						<div className="mt-6">
							{loading ? (
								<div className="flex justify-center items-center mt-3">
									<Spinner />
								</div>
							) : subjects.length > 0 ? (
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
									{orderedCategories.map(
										(category) =>
											categorizedSubjects[category]
												?.length > 0 && (
												<div
													key={category}
													className="mt-4"
												>
													<h2 className="font-bold text-xl mb-2 text-center">
														{category === "EXACT"
															? "Exact Subjects"
															: category ===
																  "SOCIAL"
																? "Social Subjects"
																: category ===
																	  "LANGUAGE"
																	? "Language"
																	: category}
													</h2>
													<ul className="list-none border rounded shadow-sm">
														{categorizedSubjects[
															category
														].map(
															(
																subject: Subject
															) => (
																<li
																	key={
																		subject.id
																	}
																	className="border-b last:border-b-0 p-3 hover:bg-gray-100 hover:font-bold cursor-pointer"
																	onClick={() =>
																		handleSubjectClick(
																			subject.id
																		)
																	}
																>
																	{
																		subject.name
																	}
																</li>
															)
														)}
													</ul>
												</div>
											)
									)}
								</div>
							) : (
								<p className="text-center">No subjects found</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SubjectsLevels;
