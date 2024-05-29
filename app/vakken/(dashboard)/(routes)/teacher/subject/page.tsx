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
				<div className="flex justify-end gap-2 pr-8">
					<Link href="/vakken/teacher/create">
						<Button>
							<PlusCircle className="h-4 w-4 mr-2" />
							New Course
						</Button>
					</Link>
					<Link href="/vakken/teacher/quiz/create">
						<Button>
							<PlusCircle className="h-4 w-4 mr-2" />
							New quiz
						</Button>
					</Link>
					<Link href="/vakken/teacher/subject/create">
						<Button>
							<PlusCircle className="h-4 w-4 mr-2" />
							New Subject
						</Button>
					</Link>
				</div>
				<h1 className="text-3xl font-bold text-center mb-3">
					Subjects
				</h1>

				<SubjectsAndLevels />
			</div>
		</>
	);
};

export default SubjectPage;
