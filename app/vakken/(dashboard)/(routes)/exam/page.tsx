import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { db } from "@/lib/db";
import SubjectsLevels from "./_components/subjects";

const ExamPage = async () => {
	const { userId } = auth();

	if (!userId) {
		return redirect("/");
	}

	const examLevels = await db.examLevel.findMany({
		orderBy: {
			name: "asc",
		},
	});

	return (
		<>
			<div className="p-6">
				<SubjectsLevels examLevels={examLevels} />
			</div>
		</>
	);
};

export default ExamPage;
