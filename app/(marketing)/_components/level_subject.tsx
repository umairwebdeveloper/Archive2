"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Button } from "@/components/ui/button";

// Sample data structure
interface Subject {
	id: string;
	name: string;
	price: number;
	category: string;
}

interface Level {
	id: string;
	name: string;
	subjects: Subject[];
}

const levels: Level[] = [
	{
		id: "1",
		name: "VWO",
		subjects: [
			{ id: "1-1", name: "Geography", price: 29, category: "Society" },
			{
				id: "1-2",
				name: "Business Economics",
				price: 29,
				category: "Society",
			},
			{ id: "1-3", name: "Economics", price: 29, category: "Society" },
			{ id: "1-4", name: "History", price: 29, category: "Society" },
			{ id: "1-5", name: "Biology", price: 29, category: "Exactly" },
			{ id: "1-6", name: "Physics", price: 29, category: "Exactly" },
			{ id: "1-7", name: "Chemistry", price: 29, category: "Exactly" },
			{ id: "1-8", name: "Mathematics A", price: 29, category: "Exactly" },
			{ id: "1-9", name: "Mathematics B", price: 29, category: "Exactly" },
			{ id: "1-10", name: "Mathematics C", price: 29, category: "Exactly" },
			{ id: "1-11", name: "German", price: 29, category: "Languages" },
			{ id: "1-12", name: "English", price: 29, category: "Languages" },
			{ id: "1-13", name: "French", price: 29, category: "Languages" },
			{ id: "1-14", name: "Dutch", price: 29, category: "Languages" },
		],
	},
	{
		id: "2",
		name: "HAVO",
		subjects: [
			{ id: "2-1", name: "Geography", price: 29, category: "Society" },
			{
				id: "2-2",
				name: "Business Economics",
				price: 29,
				category: "Society",
			},
			{ id: "2-3", name: "Economics", price: 29, category: "Society" },
			{ id: "2-4", name: "History", price: 29, category: "Society" },
			{ id: "2-5", name: "Biology", price: 29, category: "Exactly" },
			{ id: "2-6", name: "Physics", price: 29, category: "Exactly" },
			{ id: "2-7", name: "Chemistry", price: 29, category: "Exactly" },
			{ id: "2-8", name: "Mathematics A", price: 29, category: "Exactly" },
			{ id: "2-9", name: "Mathematics B", price: 29, category: "Exactly" },
			{ id: "2-10", name: "German", price: 29, category: "Languages" },
			{ id: "2-11", name: "English", price: 29, category: "Languages" },
			{ id: "2-12", name: "French", price: 29, category: "Languages" },
			{ id: "2-13", name: "Dutch", price: 29, category: "Languages" },
		],
	},
	{
		id: "3",
		name: "VMBO BB",
		subjects: [
			{ id: "3-1", name: "Geography", price: 29, category: "Society" },
			{ id: "3-2", name: "Economics", price: 29, category: "Society" },
			{ id: "3-3", name: "History", price: 29, category: "Society" },
			{ id: "3-4", name: "Society", price: 29, category: "Society" },
			{ id: "3-5", name: "Biology", price: 29, category: "Exactly" },
			{ id: "3-6", name: "NaSk 1", price: 29, category: "Exactly" },
			{ id: "3-7", name: "NaSk 2", price: 29, category: "Exactly" },
			{ id: "3-8", name: "Mathematics", price: 29, category: "Exactly" },
			{ id: "3-9", name: "German", price: 29, category: "Languages" },
			{ id: "3-10", name: "English", price: 29, category: "Languages" },
			{ id: "3-11", name: "French", price: 29, category: "Languages" },
			{ id: "3-12", name: "Dutch", price: 29, category: "Languages" },
		],
	},
	{
		id: "4",
		name: "VMBO KB",
		subjects: [
			{ id: "4-1", name: "Geography", price: 29, category: "Society" },
			{ id: "4-2", name: "Economics", price: 29, category: "Society" },
			{ id: "4-3", name: "History", price: 29, category: "Society" },
			{ id: "4-4", name: "Society", price: 29, category: "Society" },
			{ id: "4-5", name: "Biology", price: 29, category: "Exactly" },
			{ id: "4-6", name: "NaSk 1", price: 29, category: "Exactly" },
			{ id: "4-7", name: "NaSk 2", price: 29, category: "Exactly" },
			{ id: "4-8", name: "Mathematics", price: 29, category: "Exactly" },
			{ id: "4-9", name: "German", price: 29, category: "Languages" },
			{ id: "4-10", name: "English", price: 29, category: "Languages" },
			{ id: "4-11", name: "French", price: 29, category: "Languages" },
			{ id: "4-12", name: "Dutch", price: 29, category: "Languages" },
		],
	},
	{
		id: "5",
		name: "VMBO GL/TL",
		subjects: [
			{ id: "5-1", name: "Geography", price: 29, category: "Society" },
			{ id: "5-2", name: "Economics", price: 29, category: "Society" },
			{ id: "5-3", name: "History", price: 29, category: "Society" },
			{ id: "5-4", name: "Society", price: 29, category: "Society" },
			{ id: "5-5", name: "Biology", price: 29, category: "Exactly" },
			{ id: "5-6", name: "NaSk 1", price: 29, category: "Exactly" },
			{ id: "5-7", name: "NaSk 2", price: 29, category: "Exactly" },
			{ id: "5-8", name: "Mathematics", price: 29, category: "Exactly" },
			{ id: "5-9", name: "German", price: 29, category: "Languages" },
			{ id: "5-10", name: "English", price: 29, category: "Languages" },
			{ id: "5-11", name: "French", price: 29, category: "Languages" },
			{ id: "5-12", name: "Dutch", price: 29, category: "Languages" },
		],
	},
];

const LevelAndSubjectSelector: React.FC = () => {
	const [selectedLevel, setSelectedLevel] = useState<string>(levels[0].id);
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
	const [selectAll, setSelectAll] = useState<boolean>(false);
	const [allSubjects, setAllSubjects] = useState<boolean>(false);
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const currentLevel = levels.find((level) => level.id === selectedLevel);
	const router = useRouter(); // Initialize useRouter

	useEffect(() => {
		if (selectAll && currentLevel) {
			const allSubjects = currentLevel.subjects.map(
				(subject) => subject.id
			);
			setSelectedSubjects(allSubjects);
		} else {
			setSelectedSubjects([]);
		}
	}, [selectAll, selectedLevel]);

	const handleLevelChange = (levelId: string) => {
		setSelectedLevel(levelId);
		setSelectAll(false);
		setAllSubjects(false);
		setSelectedSubjects([]);
	};

	const handleSubjectChange = (subjectId: string) => {
		const updatedSelectedSubjects = selectedSubjects.includes(subjectId)
			? selectedSubjects.filter((id) => id !== subjectId)
			: [...selectedSubjects, subjectId];

		setSelectedSubjects(updatedSelectedSubjects);

		if (currentLevel) {
			const selectedSubject = currentLevel.subjects.find(
				(s) => s.id === subjectId
			);
			if (selectedSubject) {
				console.log(
					`Selected subject: ${selectedSubject.name}, Level: ${currentLevel.name}`
				);
			}
		}

		const selectedSubjectsDetails = updatedSelectedSubjects
			.map((subjectId) => {
				const subject = currentLevel?.subjects.find(
					(s) => s.id === subjectId
				);
				return subject
					? {
							id: subject.id,
							name: subject.name,
							price: subject.price,
							category: subject.category,
						}
					: null;
			})
			.filter((subject) => subject !== null);

		console.log("Selected subjects with level:", {
			allSubjects: false,
			level: currentLevel?.name,
			subjects: selectedSubjectsDetails,
		});
	};

	const handleSelectAllChange = () => {
		setSelectAll(!selectAll);
		setAllSubjects(!allSubjects);
		if (!allSubjects) {
			const selectedSubjectsDetails = currentLevel?.subjects.map(
				(subject) => ({
					id: subject.id,
					name: subject.name,
					price: subject.price,
					category: subject.category,
				})
			);

			console.log("Selected subjects with level:", {
				allSubjects: true,
				level: currentLevel?.name,
				subjects: selectedSubjectsDetails,
			});
		} else {
			console.log("Selected subjects with level:", {
				allSubjects: false,
				level: currentLevel?.name,
				subjects: [],
			});
		}
	};

	const totalPrice = selectedSubjects.reduce((acc, subjectId) => {
		const subject = currentLevel?.subjects.find((s) => s.id === subjectId);
		return acc + (subject ? subject.price : 0);
	}, 0);

	const allSubjectsPrice = currentLevel
		? currentLevel.subjects.reduce((acc, subject) => acc + subject.price, 0)
		: 0;

	const discountedPrice = 180;

	const handleButtonClick = () => {
		setButtonLoading(true);
		const selectedSubjectsDetails = selectedSubjects.map((subjectId) => {
			const subject = currentLevel?.subjects.find(
				(s) => s.id === subjectId
			);
			return subject
				? {
						id: subject.id,
						name: subject.name,
						price: subject.price,
						category: subject.category,
					}
				: null;
		});

		const data = {
			allSubjects,
			level: currentLevel?.name,
			subjects: selectedSubjectsDetails.filter(
				(subject) => subject !== null
			),
		};

		// Save to local storage
		localStorage.setItem("selectedSubjectsWithLevel", JSON.stringify(data));
		console.log("Saved data:", data);

		// Redirect to cart page
		router.push("/cart");
	};

	// Helper function to get subjects by category
	const getSubjectsByCategory = (category: string) => {
		return (
			currentLevel?.subjects.filter(
				(subject) => subject.category === category
			) || []
		);
	};

	// find level name by selectedLevel id
	const levelName = levels.find((level) => level.id === selectedLevel)?.name;

	return (
		<div className="md:w-2/3 w-full mx-auto p-4">
			<h2 className="text-start text-xl font-bold mb-2">
				Choose your subjects
			</h2>
			<p className="text-start mb-4">
				€29.00 per subject or €180 for all subjects
			</p>
			<div className="flex flex-col md:flex-row justify-between items-start h-full gap-3">
				<div className="mb-4 flex flex-col justify-start items-start bg-white rounded-xl border p-6 w-full h-full md:w-1/4">
					<h3 className="text-start text-2xl font-bold mb-4">
						Select Level
					</h3>
					{levels.map((level) => (
						<label key={level.id} className="mr-4 mb-4 text-lg">
							<input
								type="radio"
								name="level"
								value={level.id}
								checked={selectedLevel === level.id}
								onChange={() => handleLevelChange(level.id)}
								className="mr-4 scale-150"
							/>
							{level.name}
						</label>
					))}
				</div>
				<div className="border rounded-xl p-6 bg-white w-full md:w-3/4">
					{currentLevel && (
						<div className="">
							<h3 className="text-start text-2xl font-bold mb-4">
								Select your {levelName} subjects
							</h3>
							<label className="block mb-4 text-start text-lg">
								<input
									type="checkbox"
									checked={selectAll}
									onChange={handleSelectAllChange}
									className="mr-4 scale-150"
								/>
								All Subjects
							</label>

							<div className="flex flex-wrap justify-between">
								{["Society", "Exactly", "Languages"].map(
									(category) => (
										<div
											key={category}
											className="w-full md:w-1/3 mb-4"
										>
											<h3 className="text-start text-xl font-bold mb-4">
												{category}
											</h3>
											{getSubjectsByCategory(
												category
											).map((subject) => (
												<label
													key={subject.id}
													className="block text-start mb-4 text-lg"
												>
													<input
														type="checkbox"
														value={subject.id}
														checked={selectedSubjects.includes(
															subject.id
														)}
														onChange={() =>
															handleSubjectChange(
																subject.id
															)
														}
														disabled={selectAll}
														className="mr-4 scale-150"
													/>
													{subject.name}
												</label>
											))}
										</div>
									)
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="mt-4 flex justify-end items-center">
				<Button
					onClick={handleButtonClick}
					disabled={totalPrice === 0 || buttonLoading}
					className={`px-4 py-2 font-bold text-white rounded ${totalPrice === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900"} ${buttonLoading ? "opacity-50 cursor-not-allowed" : ""}`}
				>
					{buttonLoading ? (
						"Loading..."
					) : (
						<>
							€
							{selectAll
								? discountedPrice.toFixed(2)
								: totalPrice.toFixed(2)}
							{selectAll && (
								<span className="ml-2 line-through">
									€{allSubjectsPrice.toFixed(2)}
								</span>
							)}{" "}
							| Shopping Cart
						</>
					)}
				</Button>
			</div>
		</div>
	);
};

export default LevelAndSubjectSelector;
