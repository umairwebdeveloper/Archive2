"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type Exam = {
	id: number;
	subject: string;
	level: string;
	date: string;
	questions: string;
};

const initialExams: Exam[] = [
	{
		id: 1,
		subject: "Aardrijkskunde",
		level: "HAVO",
		date: "02-07-2024",
		questions: "2 / 31 opgaven",
	},
	{
		id: 2,
		subject: "Aardrijkskunde",
		level: "HAVO",
		date: "02-07-2024",
		questions: "2 / 31 opgaven",
	},
	{
		id: 3,
		subject: "Aardrijkskunde",
		level: "HAVO",
		date: "02-07-2024",
		questions: "2 / 31 opgaven",
	},
];

interface Subject {
	id: string;
	levelId: string;
	imageUrl?: string;
	isPublished: boolean;
	title: string;
	level: Level;
}

interface Level {
	id: string;
	title: string;
}

const SubjectsAndLevels: React.FC = () => {
	const [levels, setLevels] = useState<Level[]>([]);
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
	const [exams, setExams] = useState<Exam[]>(initialExams);

	const handleDeleteExam = (id: number) => {
		setExams(exams.filter((exam) => exam.id !== id));
	};

	const router = useRouter();

	useEffect(() => {
		const fetchLevels = async () => {
			try {
				setLoading(true);
				const response = await axios.get<Level[]>("/api/level");
				setLevels(response.data);
				// Check localStorage for userLevel
				const storedUserLevel = localStorage.getItem("userLevel");
				if (storedUserLevel) {
					// Find the matching level by title
					const matchingLevel = response.data.find(
						(level) => level.title === storedUserLevel
					);
					// If a match is found, set it as the active level
					if (matchingLevel) {
						setActiveLevelId(matchingLevel.id);
					} else {
						// If no match is found, default to "All Levels"
						setActiveLevelId(null);
					}
				} else {
					// Default to "All Levels" if no userLevel is found in localStorage
					setActiveLevelId(null);
				}
			} catch (error) {
				console.error("Error fetching levels:", error);
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchLevels();
	}, []);

	useEffect(() => {
		const fetchSubjects = async () => {
			try {
				setLoading(true);
				const response = await axios.get<Subject[]>(
					activeLevelId
						? `/api/level/${activeLevelId}`
						: "/api/level/subject"
				);
				setSubjects(response.data);
			} catch (error) {
				console.error("Error fetching subjects:", error);
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchSubjects();
	}, [activeLevelId]);

	const handleLevelClick = (levelId: any) => {
		setActiveLevelId(levelId);
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center my-5">
				<Spinner size="lg" />
			</div>
		);
	}

	return (
		<div className="">
			<div className="flex flex-wrap justify-start gap-3 mb-4">
				<label
					className={`py-2 px-3 text-sm border border-sec600 rounded-full flex items-center gap-x-1 hover:border-sec700 transition cursor-pointer ${activeLevelId === null && "bg-prim400 text-prim50 border-none"}`}
				>
					<input
						type="radio"
						name="level"
						value="all"
						checked={activeLevelId === null}
						onChange={() => handleLevelClick(null)}
						className={`me-2 ${activeLevelId === null && "bg-prim300 text-prim300"}`}
					/>
					All Levels
				</label>
				{levels.map((level) => (
					<label
						key={level.id}
						className={`py-2 px-3 text-sm border border-sec600 rounded-full flex items-center gap-x-1 hover:border-sec700 transition cursor-pointer ${
							activeLevelId === level.id &&
							"bg-prim400 text-prim50 border-none"
						}`}
					>
						<input
							type="radio"
							name="level"
							value={level.id}
							checked={activeLevelId === level.id}
							onChange={() => handleLevelClick(level.id)}
							className={`me-2 ${activeLevelId === level.id && "bg-prim300 text-prim300"}`}
						/>
						{level.title}
					</label>
				))}
			</div>

			{subjects.length === 0 ? (
				<p className="text-center my-4">No Subjects found</p>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
					{subjects.map((subject) => (
						<>
							<div
								key={subject.id}
								className="border rounded-2xl overflow-hidden shadow transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
								onClick={() =>
									router.push(`/vakken/subject/${subject.id}`)
								}
							>
								{subject.imageUrl ? (
									<img
										src={`${subject.imageUrl.startsWith("https") ? subject.imageUrl : "/uploads/" + subject.imageUrl}`}
										alt={subject.title}
										className="mb-4 w-full h-48 object-cover rounded-md"
									/>
								) : (
									<>
										<div className="bg-gray-400 h-48 w-full rounded-md">
											<div className="flex items-center justify-center h-full text-white text-2xl font-bold">
												{subject.title[0]}
											</div>
										</div>
									</>
								)}
								<div className="px-6 py-2">
									<div className="font-bold text-xl mb-2">
										{subject.title} - {subject.level.title}
									</div>
								</div>
								<div className="mx-6 p-3 bg-prim100 mb-3 rounded-xl">
									<span className="flex justify-between items-center">
										<img
											src="/assets/svg/ai-magic.svg"
											width="20px"
											alt="ai"
										/>
										<p>8</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="3"
											height="20"
											viewBox="0 0 3 20"
											fill="none"
										>
											<path
												d="M1.5 1V19"
												stroke="url(#paint0_linear_227_4193)"
												stroke-width="2"
												stroke-linecap="round"
											/>
											<defs>
												<linearGradient
													id="paint0_linear_227_4193"
													x1="2"
													y1="1"
													x2="2"
													y2="19"
													gradientUnits="userSpaceOnUse"
												>
													<stop
														stop-color="#CDCED4"
														stop-opacity="0"
													/>
													<stop
														offset="0.5"
														stop-color="#CDCED4"
													/>
													<stop
														offset="1"
														stop-color="#CDCED4"
														stop-opacity="0"
													/>
												</linearGradient>
											</defs>
										</svg>
										<img
											src="/assets/svg/clock-01.svg"
											width="20px"
											alt="clock"
										/>
										<p>1 hr 30 min</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="3"
											height="20"
											viewBox="0 0 3 20"
											fill="none"
										>
											<path
												d="M1.5 1V19"
												stroke="url(#paint0_linear_227_4193)"
												stroke-width="2"
												stroke-linecap="round"
											/>
											<defs>
												<linearGradient
													id="paint0_linear_227_4193"
													x1="2"
													y1="1"
													x2="2"
													y2="19"
													gradientUnits="userSpaceOnUse"
												>
													<stop
														stop-color="#CDCED4"
														stop-opacity="0"
													/>
													<stop
														offset="0.5"
														stop-color="#CDCED4"
													/>
													<stop
														offset="1"
														stop-color="#CDCED4"
														stop-opacity="0"
													/>
												</linearGradient>
											</defs>
										</svg>
										<img
											src="/assets/svg/user-group.svg"
											width="20px"
											alt="clock"
										/>
										<p>99</p>
									</span>
								</div>
								<div className="px-6 mb-2 flex items-center gap-2">
									<p className="text-lg underline">
										Start vak
									</p>
									<ChevronRight />
								</div>
							</div>
						</>
					))}
				</div>
			)}
		</div>
	);
};

export default SubjectsAndLevels;
