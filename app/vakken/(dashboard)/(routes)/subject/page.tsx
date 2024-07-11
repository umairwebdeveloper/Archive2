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
			<div className="px-4 block md:hidden">
				<h3 className="font-bold text-2xl">Hello 👋</h3>
				<p>Let’s learn something new today!</p>
			</div>
			<div className="px-4 md:px-8 mt-4">
				<SubjectsAndLevels />
			</div>
		</>
	);
};

export default SubjectPage;
