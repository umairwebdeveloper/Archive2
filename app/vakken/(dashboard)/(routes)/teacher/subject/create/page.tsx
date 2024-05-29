"use client";

import AddSubject from "./../_components/add_subject";
import AddLevel from "./../_components/add_level";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SubjectPage = () => {

	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<div className="p-6">
			<div className="flex justify-start mb-5">
				<Button onClick={handleBack}>Back</Button>
			</div>
			<h1 className="text-3xl font-bold text-center mb-6">
				Create New Subject
			</h1>
			<div className="container flex justify-center mx-auto py-6">
				<div className="grid grid-cols-1 gap-3 w-1/2">
					<AddLevel />
					<AddSubject />
				</div>
			</div>
		</div>
	);
};

export default SubjectPage;
