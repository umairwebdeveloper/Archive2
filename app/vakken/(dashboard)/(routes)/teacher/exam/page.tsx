"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreateExam from "./_components/create_exam";

const ExamPage = () => {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-center mb-6">Create Exam</h1>
			<CreateExam />
		</div>
	);
};

export default ExamPage;
