"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
	Pen,
	Youtube,
	Book,
	StickyNote,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { useProgress } from "@/hooks/context/ProgressContext";

const Progress: React.FC = () => {
	const { progressId, title } = useProgress();
	const router = useRouter();
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [userAnswers, setUserAnswers] = useState(0);
	const [videosCount, setVideosCount] = useState(0);
	const [completedVideos, setCompletedVideos] = useState(0);
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchProgressData = async () => {
			setLoading(true);
			try {
				const questionsResponse = await axios.get(
					`/api/level/${progressId}/p-questions`
				);
				const answersResponse = await axios.get(
					`/api/level/${progressId}/p-answers`
				);
				const videosResponse = await axios.get(
					`/api/level/${progressId}/p-videos`
				);
				const completedVideosResponse = await axios.get(
					`/api/level/${progressId}/p-videos-complete`
				);

				setTotalQuestions(questionsResponse.data.totalQuestions);
				setUserAnswers(answersResponse.data.userAnswers);
				setVideosCount(videosResponse.data.videosCount);
				setCompletedVideos(completedVideosResponse.data.completedCount);
			} catch (error) {
				console.error("Error fetching progress data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProgressData();
	}, [progressId]);

	const handleBack = () => {
		router.back();
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const progressPercentage =
		totalQuestions > 0 ? (userAnswers / totalQuestions) * 100 : 0;

	const videoProgressPercentage =
		videosCount > 0 ? (completedVideos / videosCount) * 100 : 0;

	return (
		<div className="mx-5 mb-3">
			<div className="flex justify-start mb-5">
				<Link href="/vakken/subject">
					<span className="text-prim400 hover:underline hover:text-prim600">
						Subject
					</span>
				</Link>
				<span className="mx-2 text-prim600">&gt;</span>
				<span className="text-prim600">{title}</span>
			</div>
			<div className="bg-prim50 text-dark p-4 rounded-lg shadow-sm border">
				<div
					className="flex justify-between items-center cursor-pointer"
					onClick={toggleDropdown}
				>
					<h3 className="text-xl font-semibold">Voortgang</h3>
					{isOpen ? (
						<ChevronUp className="h-5 w-5 text-prim400" />
					) : (
						<ChevronDown className="h-5 w-5 text-prim400" />
					)}
				</div>
				{isOpen && (
					<div className="mt-4">
						{loading ? (
							<div className="flex justify-center items-center">
								<Spinner />
							</div>
						) : (
							<>
								<div className="flex mb-4">
									<div className="mr-2">
										<Pen className="h-4 w-4 mr-2 text-prim400" />
									</div>
									<div className="w-full">
										<div className="flex w-full h-1.5 bg-sec200 rounded-full overflow-hidden dark:bg-neutral-700">
											<div
												className="flex flex-col justify-center rounded-full overflow-hidden bg-prim400 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
												style={{
													width: `${progressPercentage}%`,
												}}
											></div>
										</div>
										<div className="flex justify-between items-center">
											<p className="mt-1">Opgaven</p>
											<p className="mt-1">
												{userAnswers}/{totalQuestions}
											</p>
										</div>
									</div>
								</div>
								<div className="flex mb-4">
									<div className="mr-2">
										<Youtube className="h-4 w-4 mr-2 text-prim400" />
									</div>
									<div className="w-full">
										<div className="flex w-full h-1.5 bg-sec200 rounded-full overflow-hidden dark:bg-neutral-700">
											<div
												className="flex flex-col justify-center rounded-full overflow-hidden bg-prim400 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
												style={{
													width: `${videoProgressPercentage}%`,
												}}
											></div>
										</div>
										<div className="flex justify-between items-center">
											<p className="mt-1">Video's</p>
											<p className="mt-1">
												{completedVideos}/{videosCount}
											</p>
										</div>
									</div>
								</div>
								<div className="flex mb-4">
									<div className="mr-2">
										<Book className="h-4 w-4 mr-2 text-prim400" />
									</div>
									<div className="w-full">
										<div className="flex w-full h-1.5 bg-sec200 rounded-full overflow-hidden dark:bg-neutral-700">
											<div
												className="flex flex-col justify-center rounded-full overflow-hidden bg-prim400 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
												style={{
													width: `0`,
												}}
											></div>
										</div>
										<div className="flex justify-between items-center">
											<p className="mt-1">
												Samenvattingen
											</p>
											<p className="mt-1">0/0</p>
										</div>
									</div>
								</div>
								<div className="flex">
									<div className="mr-2">
										<StickyNote className="h-4 w-4 mr-2 text-prim400" />
									</div>
									<div className="w-full">
										<div className="flex w-full h-1.5 bg-sec200 rounded-full overflow-hidden dark:bg-neutral-700">
											<div
												className="flex flex-col justify-center rounded-full overflow-hidden bg-prim400 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
												style={{
													width: `0`,
												}}
											></div>
										</div>
										<div className="flex justify-between items-center">
											<p className="mt-1">Begrippen</p>
											<p className="mt-1">0/0</p>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Progress;
