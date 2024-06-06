"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

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

	const router = useRouter();

	useEffect(() => {
		const fetchLevels = async () => {
			try {
				setLoading(true);
				const response = await axios.get<Level[]>("/api/level");
				setLevels(response.data);
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
		<div className="container">
			<div className="flex flex-wrap justify-center gap-3 mb-4">
				<button
					onClick={() => handleLevelClick(null)}
					className={`py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition ${activeLevelId === null && "border-sky-700 bg-sky-200/20 text-sky-800"}`}
				>
					All Levels
				</button>
				{levels.map((level) => (
					<button
						key={level.id}
						onClick={() => handleLevelClick(level.id)}
						className={`py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition ${
							activeLevelId === level.id &&
							"border-sky-700 bg-sky-200/20 text-sky-800"
						}`}
					>
						{level.title}
					</button>
				))}
			</div>

			{subjects.length === 0 ? (
				<p className="text-center my-4">No Subjects found</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{subjects.map((subject) => (
						<>
							<div
								key={subject.id}
								className="border max-w-sm rounded overflow-hidden shadow-sm transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-white cursor-pointer"
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

								<hr />

								<div className="px-6 py-4">
									<div className="font-bold text-xl mb-2">
										{subject.title}
									</div>
								</div>
								<div className="px-6 pt-4 pb-2">
									<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
										{subject.level.title}
									</span>
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
