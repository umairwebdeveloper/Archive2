"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Props = {
	subjectLevel: any;
	subjectPeriods: any[];
};

const SubjectsPeriods: React.FC<Props> = ({ subjectLevel, subjectPeriods }) => {
	const router = useRouter();

	const handleBack = () => {
		router.push("/vakken/exam");
	};

	const handlePeriodClick = (subjectId: any) => {
		router.push(`/vakken/exam/${subjectLevel.id}/${subjectId}`);
	}

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
		<>
			<div className="flex justify-center items-center">
				<div className="border rounded border shadow-sm w-2/3">
					<div className="p-6 border-b flex justify-between items-center gap-3">
						<Button onClick={handleBack}>
							<ChevronLeft className="h-4 w-4 mr-2" />
							Back
						</Button>
						<h1 className="font-bold text-xl">
							{subjectLevel.examLevel.name} - {subjectLevel.name}
						</h1>
						<span></span>
					</div>
					<div className="p-6">
						{subjectPeriods.length > 0 && (
							<ul className="list-none border rounded shadow-sm">
								{subjectPeriods.map((period: any) => (
									<li
										key={period.id}
										className="flex justify-between items-center border-b last:border-b-0 p-3 hover:bg-gray-100 hover:font-bold cursor-pointer"
										onClick={() =>
											handlePeriodClick(period.id)
										}
									>
										<span>
											<span className="mr-4">
												{formatDate(period.date)}
											</span>
											<span className="font-bold">
												{period.name} 1
											</span>
										</span>
										<span>Start exam</span>
									</li>
								))}
							</ul>
						)}
						{subjectPeriods.length === 0 && (
							<p className="text-center">No periods available</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SubjectsPeriods;
