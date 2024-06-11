"use client";

import React from "react";
import Resume from "./_components/resume";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ResumePage = () => {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<div className="p-6">
			<div className="flex justify-start">
				<Button onClick={handleBack}>Back</Button>
			</div>
			<Resume />
		</div>
	);
};

export default ResumePage;
