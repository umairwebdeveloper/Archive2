export type ExamLevel = {
	name: string;
};

export type ExamSubject = {
	name: string;
	examLevel: ExamLevel;
};

export type ExamSubjectPeriod = {
	id: string;
	date: string;
	name: string;
	examSubject: ExamSubject;
};

export type ExamSubjectPdf = {
	id: string;
	category: string;
	file: string;
	examSubjectPeriodId: string;
};
