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
				<div className="flex flex-wrap gap-3 justify-end mb-3 pr-8">
					<Link href="/vakken/teacher/create">
						<Button className="w-full md:w-auto">
							<PlusCircle className="h-4 w-4 mr-2" />
							New Course
						</Button>
					</Link>
					<Link href="/vakken/teacher/resume">
						<Button className="w-full md:w-auto">
							<PlusCircle className="h-4 w-4 mr-2" />
							New Resume
						</Button>
					</Link>
					<Link href="/vakken/teacher/quiz/create">
						<Button className="w-full md:w-auto">
							<PlusCircle className="h-4 w-4 mr-2" />
							New Quiz
						</Button>
					</Link>
					<Link href="/vakken/teacher/subject/create">
						<Button className="w-full md:w-auto">
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
