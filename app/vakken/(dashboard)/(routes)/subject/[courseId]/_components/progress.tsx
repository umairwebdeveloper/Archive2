"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pen, Youtube, Book, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

interface QuizTypeProps {
	progressId: string;
	title: string;
}

const Progress: React.FC<QuizTypeProps> = ({ progressId, title }) => {
	const router = useRouter();
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [userAnswers, setUserAnswers] = useState(0);
	const [videosCount, setVideosCount] = useState(0);
	const [completedVideos, setCompletedVideos] = useState(0);
	const [loading, setLoading] = useState(true);

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

	const progressPercentage =
		totalQuestions > 0 ? (userAnswers / totalQuestions) * 100 : 0;

	const videoProgressPercentage =
		videosCount > 0 ? (completedVideos / videosCount) * 100 : 0;

	return (
		<div className="ml-64 fixed top-1/5 left-0 w-60">
			<div className="flex justify-start mb-5">
				<Link href="/vakken/subject">
					<span className="text-blue-400 hover:underline hover:text-blue-600">
						Subject
					</span>
				</Link>
				<span className="mx-2 text-blue-600">&gt;</span>
				<span className="text-blue-600">{title}</span>
			</div>
			<div className="bg-white text-dark p-4 rounded-lg shadow-sm border">
				<h3 className="text-xl font-semibold mb-4">Voortgang</h3>
				<div>
					{loading ? (
						<div className="flex justify-center items-center">
							<Spinner />
						</div>
					) : (
						<>
							<div className="flex mb-4">
								<div className="mr-2">
									<Pen className="h-4 w-4 mr-2 text-blue-500" />
								</div>
								<div className="w-full">
									<div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
										<div
											className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
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
									<Youtube className="h-4 w-4 mr-2 text-blue-500" />
								</div>
								<div className="w-full">
									<div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
										<div
											className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
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
									<Book className="h-4 w-4 mr-2 text-blue-500" />
								</div>
								<div className="w-full">
									<div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
										<div
											className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
											style={{
												width: `0`,
											}}
										></div>
									</div>
									<div className="flex justify-between items-center">
										<p className="mt-1">Samenvattingen</p>
										<p className="mt-1">0/0</p>
									</div>
								</div>
							</div>
							<div className="flex">
								<div className="mr-2">
									<StickyNote className="h-4 w-4 mr-2 text-blue-500" />
								</div>
								<div className="w-full">
									<div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
										<div
											className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
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
			</div>
		</div>
	);
};

export default Progress;
