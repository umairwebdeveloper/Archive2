"use client";

import { Pen } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

interface QuizTypeProps {
	courseId: string;
}

const QuizSidebar: React.FC<QuizTypeProps> = ({ courseId }) => {
	const router = useRouter();
	const pathname = usePathname();

	const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
	const [userAnswers, setUserAnswers] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const [links, setLinks] = useState<any>([]);
	const [linksLoading, setLinksLoading] = useState(false);

	const isActive = pathname?.includes(`/courses/${courseId}/quiz`);
	const activeLinkId =
		links.find((link: any) => pathname?.endsWith(`${link.id}`))?.id || null;

	const fetchLinks = async () => {
		try {
			setLinksLoading(true);
			const response = await axios.get(`/api/quiz-title/${courseId}`);
			setLinks(response.data.quiz);
			return response.data.quiz;
		} catch (error) {
			console.error("Failed to fetch links:", error);
			return [];
		} finally {
			setLinksLoading(false);
		}
	};

	const onClick = async () => {
		const fetchedLinks = await fetchLinks();
		if (fetchedLinks.length > 0) {
			const firstLinkId = fetchedLinks[0].id;
			router.push(`/courses/${courseId}/quiz/${firstLinkId}`);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const [questionsResponse, answersResponse] = await Promise.all([
					axios.get(`/api/level/${courseId}/p-course-questions`),
					axios.get(`/api/level/${courseId}/p-course-answers`),
				]);

				setTotalQuestions(questionsResponse.data.questionsCount);
				setUserAnswers(answersResponse.data.answersCount);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [courseId]);

	useEffect(() => {
		if (isActive) {
			fetchLinks();
		}
	}, [isActive, courseId]);

	return (
		<div>
			<button
				onClick={onClick}
				type="button"
				className={`mt-3 flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all py-4 w-full pr-3 ${
					isActive
						? "text-slate-700 bg-slate-200/20"
						: "text-slate-500 hover:text-slate-600 hover:bg-slate-300/20"
				}`}
			>
				<div className="flex items-center justify-between gap-x-2 w-full">
					<span className="flex gap-2">
						<Pen
							size={22}
							className={`${isActive ? "text-slate-700" : "text-slate-500"}`}
						/>
						Questions
					</span>
					{loading ? (
						<Spinner />
					) : (
						<span>
							{userAnswers}/{totalQuestions}
						</span>
					)}
				</div>
			</button>
			{isActive && (
				<div className="mt-2 pl-6 pr-3">
					{linksLoading ? (
						<div className="my-3 flex justify-center items-center">
							<Spinner />
						</div>
					) : (
						<div className="text-sm text-slate-600">
							{links.map((link: any, index: number) => (
								<>
									<div>
										<hr className="my-3" />
										<div
											key={index}
											onClick={() =>
												router.push(
													`/courses/${courseId}/quiz/${link.id}`
												)
											}
											className={`cursor-pointer text-slate-700 font-semibold text-lg p-2 hover:bg-slate-100 hover:rounded mb-1 ${
												activeLinkId === link.id
													? "bg-slate-200/20 rounded"
													: ""
											}`}
										>
											<span className="">
												{index + 1}: {link.title}
											</span>
										</div>
										<div>
											{link.questions.map(
												(
													option: any,
													optionIndex: number
												) => (
													<div key={optionIndex}>
														<p className="px-2 mb-1">
															{optionIndex + 1}: {" "}
															{option.title}
														</p>
													</div>
												)
											)}
										</div>
									</div>
								</>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default QuizSidebar;
