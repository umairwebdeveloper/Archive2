"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Spinner } from "@/components/spinner";

type SubjectPeriod = {
	examSubject: {
		examLevel: {
			name: string;
		};
		name: string;
	};
	date: string;
	name: string;
};

type SubjectPdf = {
	id: string;
	category: string;
	file: string;
	examSubjectPeriodId: string;
};

type Props = {
	subjectPeriod: SubjectPeriod;
	subjectPdfs: SubjectPdf[];
};

const SubjectsPdfs: React.FC<Props> = ({ subjectPeriod, subjectPdfs }) => {
	const router = useRouter();
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [categories, setCategories] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		// Simulate loading delay
		setTimeout(() => {
			// Extract unique categories from subjectPdfs data
			const uniqueCategories = Array.from(
				new Set(subjectPdfs.map((pdf) => pdf.category))
			);
			setCategories(uniqueCategories);

			// Set the initial active category to the first category if it exists
			if (uniqueCategories.length > 0) {
				setActiveCategory(uniqueCategories[0]);
			}
			setLoading(false);
		}, 1000); // Adjust the delay as needed
	}, [subjectPdfs]);

	const handleBack = () => {
		router.back();
	};

	const handleCategoryClick = (category: string) => {
		setActiveCategory(category);
	};

	const filteredPdfs = activeCategory
		? subjectPdfs.filter((pdf) => pdf.category === activeCategory)
		: subjectPdfs;

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
							{subjectPeriod.examSubject.examLevel.name} -{" "}
							{subjectPeriod.examSubject.name}{" "}
							<span className="text-gray-500">
								{formatDate(subjectPeriod.date)} -{" "}
								{subjectPeriod.name} 1
							</span>
						</h1>
						<span></span>
					</div>
					<div className="p-6">
						{loading ? (
							<div className="flex justify-center items-center mt-2">
								<Spinner />
							</div>
						) : (
							<>
								<div className="flex space-x-4 mb-4">
									{categories.map((category) => (
										<Button
											key={category}
											onClick={() =>
												handleCategoryClick(category)
											}
											className={`${
												activeCategory === category
													? "bg-blue-500 text-white"
													: ""
											} hover:bg-blue-600`}
										>
											{category
												.replace(/_/g, " ")
												.toLowerCase()
												.replace(/\b\w/g, (char) =>
													char.toUpperCase()
												)}
										</Button>
									))}
								</div>
								{filteredPdfs.length > 0 ? (
									<div className="pdfs-data">
										{filteredPdfs.map((pdf) => (
											<div key={pdf.id} className="mb-4">
												<div className="flex items-center justify-center min-h-screen bg-gray-100">
													<iframe
														src={pdf.file}
														className="w-full h-screen rounded border-0"
														title="PDF Viewer"
													></iframe>
												</div>
												<hr className="my-4" />
											</div>
										))}
									</div>
								) : (
									<p className="text-center text-gray-500">
										No PDFs available
									</p>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SubjectsPdfs;
