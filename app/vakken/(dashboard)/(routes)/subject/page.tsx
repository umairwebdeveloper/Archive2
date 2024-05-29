import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SubjectsAndLevels from "./_components/subjects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const SubjectPage = () => {
	const { userId } = auth();

	if (!userId) {
		return redirect("/");
	}

	return (
		<>
			<div className="p-6">
				<h1 className="text-3xl font-bold text-center mb-6">
					Subjects
				</h1>

				<SubjectsAndLevels />
			</div>
		</>
	);
};

export default SubjectPage;
