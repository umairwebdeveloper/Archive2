import { useState, useEffect } from "react";
import CreateExamLevel from "./create_exam_level";
import CreateExamSubject from "./create_exam_subject";
import CreateExamPeriod from "./create_exam_period";
import CreateExamPdf from "./create_exam_pdf";
import DeleteExamLevel from "./delete_exam_level";
import DeleteExamSubject from "./delete_exam_subject";
import DeleteExamPeriod from "./delete_exam_periods";

type ExamLevel = {
	id: string;
	name: string;
};

type ExamSubject = {
	id: string;
	name: string;
	examLevel: any;
};

type ExamPeriod = {
	id: string;
	date: string;
	examSubject: any;
};

export default function CreateExam() {
	const [examLevels, setExamLevels] = useState<ExamLevel[]>([]);
	const [examSubjects, setExamSubjects] = useState<ExamSubject[]>([]);
	const [examPeriods, setExamPeriods] = useState<ExamPeriod[]>([]);
	const [loadingLevels, setLoadingLevels] = useState(false);
	const [loadingSubjects, setLoadingSubjects] = useState(false);
	const [loadingPeriods, setLoadingPeriods] = useState(false);

	useEffect(() => {
		fetchExamLevels();
		fetchExamSubjects();
		fetchExamPeriods();
	}, []);

	const fetchExamLevels = async () => {
		setLoadingLevels(true);
		const response = await fetch("/api/exam/levels");
		const data = await response.json();
		setExamLevels(data);
		setLoadingLevels(false);
	};

	const fetchExamSubjects = async () => {
		setLoadingSubjects(true);
		const response = await fetch("/api/exam/subjects");
		const data = await response.json();
		setExamSubjects(data);
		setLoadingSubjects(false);
	};

	const fetchExamPeriods = async () => {
		setLoadingPeriods(true);
		const response = await fetch("/api/exam/periods");
		const data = await response.json();
		setExamPeriods(data);
		setLoadingPeriods(false);
	};

	const onDelete = () => {
		fetchExamLevels();
		fetchExamSubjects();
		fetchExamPeriods();
	};

	return (
		<div className="max-w-2xl mx-auto mt-10 space-y-10">
			<CreateExamLevel onExamLevelCreated={fetchExamLevels} />
			<CreateExamSubject
				examLevels={examLevels}
				loadingLevels={loadingLevels}
				onExamSubjectCreated={fetchExamSubjects}
			/>
			<CreateExamPeriod
				examSubjects={examSubjects}
				loadingSubjects={loadingSubjects}
				onExamPeriodCreated={fetchExamPeriods}
			/>
			<CreateExamPdf
				examPeriods={examPeriods}
				loadingPeriods={loadingPeriods}
			/>
			<hr className="my-4" />
			<h1 className="text-3xl font-bold text-center mb-6">Delete Exam</h1>
			<DeleteExamLevel
				examLevels={examLevels}
				loadingLevels={loadingLevels}
				onDelete={onDelete}
			/>
			<DeleteExamSubject
				examSubjects={examSubjects}
				loadingSubjects={loadingSubjects}
				onDelete={onDelete}
			/>
			<DeleteExamPeriod
				examPeriods={examPeriods}
				loadingPeriods={loadingPeriods}
				onDelete={onDelete}
			/>
		</div>
	);
}
