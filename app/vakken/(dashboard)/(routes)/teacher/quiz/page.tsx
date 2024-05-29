"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CourseList from "@/components/quiz/quiz-courses";

const CoursesPage = () => {
	return (
		<div className="p-6">
			<div className="flex justify-end pr-8 gap-2">
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
			<CourseList />
		</div>
	);
};

export default CoursesPage;
