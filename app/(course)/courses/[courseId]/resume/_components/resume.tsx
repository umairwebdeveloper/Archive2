import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";
import { Highlighter } from "react-selection-highlighter";
import { Button } from "@/components/ui/button";
import { Trash, StickyNote, Save, X } from "lucide-react";

interface CourseIdProps {
	courseId: string;
}

const Resume: React.FC<CourseIdProps> = ({ courseId }) => {
	const [resume, setResume] = useState<any>(null);
	const [highlights, setHighlights] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [hoveredHighlight, setHoveredHighlight] = useState<any | null>(null);
	const [hoveredHighlightCoords, setHoveredHighlightCoords] = useState<{
		[id: string]: { top: number; left: number };
	}>({});
	const [showTextarea, setShowTextarea] = useState<{ [id: string]: boolean }>(
		{}
	);
	const [noteContent, setNoteContent] = useState<{ [id: string]: string }>(
		{}
	);

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
		const payload = {
			meta: selection.meta,
			text: selection.text,
			textId: selection.id,
			textClassName: selection.className,
			startContainerText: selection.startContainerText,
			endContainerText: selection.endContainerText,
		};

		try {
			const response = await fetch(`/api/courses/${courseId}/highlight`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json();
			setHighlights([...highlights, data]);
			toast.success("Highlight created");
		} catch (error) {
			console.error("Failed to create highlight", error);
			toast.error("Failed to create highlight");
		}
	};

	const applyHighlights = (text: string, highlights: any[]) => {
		let highlightedText = text;

		highlights.forEach((highlight) => {
			const startTag = `<span id="${highlight.textId}" class="${highlight.textClassName}" onmouseover="this.classList.add('hovered')" onmouseout="this.classList.remove('hovered')">`;
			const endTag = "</span>";
			highlightedText = highlightedText.replace(
				new RegExp(`(${highlight.text})`, "g"),
				`${startTag}$1${endTag}`
			);
		});

		return highlightedText;
	};

	const removeSelection = async (selection: any) => {
		try {
			const response = await fetch(
				`/api/courses/${selection.textId}/highlight/`,
				{
					method: "DELETE",
				}
			);
			const data = await response.json();
			const updatedHighlights = highlights.filter(
				(highlight) => highlight.textId !== selection.textId
			);
			setHighlights(updatedHighlights);
			toast.success("Highlight removed");
		} catch (error) {
			console.error("Failed to remove highlight", error);
			toast.error("Failed to remove highlight");
		}
	};

	const saveNote = async (highlightId: string, content: string) => {
		try {
			const response = await fetch(
				`/api/courses/${highlightId}/highlight-note`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ note: content }),
				}
			);

			const data = await response.json();
			const updatedHighlights = highlights.map((highlight) =>
				highlight.textId === highlightId
					? { ...highlight, note: data }
					: highlight
			);
			setHighlights(updatedHighlights);
			toast.success("Note saved");
		} catch (error) {
			console.error("Failed to save note", error);
			toast.error("Failed to save note");
		}
	};

	useEffect(() => {
		const handleMouseEnter = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.classList?.contains("hovered")) {
				const rect = target.getBoundingClientRect();
				setHoveredHighlightCoords((prevState) => ({
					...prevState,
					[target.id]: {
						top: rect.top + window.scrollY,
						left: rect.left + window.scrollX,
					},
				}));
				setHoveredHighlight(target.id);
			}
		};

		const handleMouseLeave = (event: MouseEvent) => {
			const relatedTarget = event.relatedTarget as HTMLElement;
			if (
				relatedTarget &&
				(relatedTarget.closest(".popover-buttons") ||
					relatedTarget.closest(".textarea-container"))
			) {
				return;
			}
			setHoveredHighlight(null);
		};

		document.addEventListener("mouseenter", handleMouseEnter, true);
		document.addEventListener("mouseleave", handleMouseLeave, true);

		return () => {
			document.removeEventListener("mouseenter", handleMouseEnter, true);
			document.removeEventListener("mouseleave", handleMouseLeave, true);
		};
	}, []);

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold text-center mb-6">Resume</h1>
			<div className="card border rounded-xl p-4 bg-white">
				{loading ? (
					<div className="flex items-center justify-center mt-5">
						<Spinner size="lg" />
					</div>
				) : resume ? (
					<Highlighter
						htmlString={applyHighlights(resume.text, highlights)}
						disablePopover={true}
						onSelection={handleSelection}
					/>
				) : (
					<div className="text-center mt-5">Resume not found</div>
				)}

				{hoveredHighlight &&
					hoveredHighlightCoords[hoveredHighlight] && (
						<div
							className="absolute flex gap-2 pb-5 popover-buttons"
							style={{
								top:
									hoveredHighlightCoords[hoveredHighlight]
										.top - 5,
								left: hoveredHighlightCoords[hoveredHighlight]
									.left,
							}}
						>
							<Button
								size={"sm"}
								onClick={() =>
									removeSelection({
										textId: hoveredHighlight,
									})
								}
							>
								<Trash className="h-4 w-4 mr-2" />
								Remove
							</Button>
							<Button
								size={"sm"}
								onClick={() => {
									const highlight = highlights.find(
										(h) => h.textId === hoveredHighlight
									);
									setNoteContent((prevState) => ({
										...prevState,
										[hoveredHighlight]:
											highlight?.note?.content || "",
									}));
									setShowTextarea((prevState) => ({
										...prevState,
										[hoveredHighlight]: true,
									}));
								}}
							>
								<StickyNote className="h-4 w-4 mr-2" />
								Note
							</Button>
						</div>
					)}

				{showTextarea[hoveredHighlight] &&
					hoveredHighlightCoords[hoveredHighlight] && (
						<div
							className="absolute bg-white shadow rounded p-2 textarea-container z-50"
							style={{
								top:
									hoveredHighlightCoords[hoveredHighlight]
										.top - 40,
								left: hoveredHighlightCoords[hoveredHighlight]
									.left,
							}}
						>
							<textarea
								className="w-full border rounded p-2 mb-2"
								placeholder="Enter your note..."
								value={noteContent[hoveredHighlight] || ""}
								onChange={(e) =>
									setNoteContent((prevState) => ({
										...prevState,
										[hoveredHighlight]: e.target.value,
									}))
								}
							></textarea>
							<div className="flex justify-between gap-2">
								<Button
									size={"sm"}
									onClick={() => {
										setShowTextarea((prevState) => ({
											...prevState,
											[hoveredHighlight]: false,
										}));
										setNoteContent((prevState) => ({
											...prevState,
											[hoveredHighlight]: "",
										}));
									}}
								>
									<X className="h-4 w-4 mr-2" />
									Cancel
								</Button>
								<Button
									size={"sm"}
									onClick={() => {
										saveNote(
											hoveredHighlight,
											noteContent[hoveredHighlight]
										);
									}}
								>
									<Save className="h-4 w-4 mr-2" />
									Save
								</Button>
							</div>
						</div>
					)}
			</div>
		</div>
	);
};

export default Resume;
