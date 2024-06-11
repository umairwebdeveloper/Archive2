import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";
import { Highlighter, SelectionProvider } from "react-selection-highlighter";
import { Button } from "@/components/ui/button";

const MyPopoverChildren: React.FC<{
	selection: any;
	removeSelection: (selection: any) => void;
	updateSelection: (id: string, updatedSelection: any) => void;
}> = ({ selection, removeSelection, updateSelection }) => {
	return (
		<div>
			<Button onClick={() => removeSelection(selection)}>Remove</Button>
			<Button className="ms-3">Note</Button>
		</div>
	);
};

interface CourseIdProps {
	courseId: string;
}

const Resume: React.FC<CourseIdProps> = ({ courseId }) => {
	const [resume, setResume] = useState<any>(null);
	const [highlights, setHighlights] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchResume = async () => {
			try {
				const response = await fetch(`/api/courses/${courseId}/resume`);
				const data = await response.json();
				setResume(data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error("Failed to fetch resume", error);
				toast.error("Failed to fetch resume");
			}
		};

		fetchResume();
	}, [courseId]);

	useEffect(() => {
		const fetchHighlights = async () => {
			try {
				const response = await fetch(
					`/api/courses/${courseId}/highlight`
				);
				const data = await response.json();
				setHighlights(data);
			} catch (error) {
				console.error("Failed to fetch highlights", error);
				toast.error("Failed to fetch highlights");
			}
		};

		fetchHighlights();
	}, [courseId]);

	const handleSelection = async (selection: any) => {
		console.log("Selected text:", selection);
		const payload = {
			meta: selection.meta,
			text: selection.text,
			textId: selection.id,
			textClassName: selection.className,
			startContainerText: selection.startContainerText,
			endContainerText: selection.endContainerText,
		};

		// try {
		// 	const response = await fetch(`/api/courses/${courseId}/highlight`, {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(payload),
		// 	});

		// 	const data = await response.json();
		// 	console.log("Highlight created", data);
		// 	toast.success("Highlight created");
		// } catch (error) {
		// 	console.error("Failed to create highlight", error);
		// 	toast.error("Failed to create highlight");
		// }
	};

	const applyHighlights = (text: string, highlights: any[]) => {
		let highlightedText = text;

		highlights.forEach((highlight) => {
			const startTag = `<span id="${highlight.textId}" class="${highlight.textClassName}">`;
			const endTag = "</span>";
			highlightedText = highlightedText.replace(
				new RegExp(`(${highlight.text})`, "g"),
				`${startTag}$1${endTag}`
			);
		});

		return highlightedText;
	};

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold text-center mb-6">Resume</h1>
			<div className="card border rounded-lg p-4">
				{loading ? (
					<div className="flex items-center justify-center mt-5">
						<Spinner size="lg" />
					</div>
				) : resume ? (
					<SelectionProvider>
						<Highlighter
							htmlString={applyHighlights(
								resume.text,
								highlights
							)}
							PopoverChildren={MyPopoverChildren}
							onSelection={handleSelection}
						/>
					</SelectionProvider>
				) : (
					<div className="text-center mt-5">Resume not found</div>
				)}
			</div>
		</div>
	);
};

export default Resume;

// const updatedHighlights = highlights.filter(
// 			(highlight) => highlight.textId !== selection.textId
// 		);
// 		setHighlights(updatedHighlights);
// 		toast.success("Highlight removed");