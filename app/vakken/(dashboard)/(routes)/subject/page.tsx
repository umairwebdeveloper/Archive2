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
			<div className="px-8">
				<h1 className="text-2xl font-bold my-4">
					Subjects
				</h1>

				<SubjectsAndLevels />
			</div>
		</>
	);
};

export default SubjectPage;
