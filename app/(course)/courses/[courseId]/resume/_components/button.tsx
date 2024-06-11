import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export const MyPopoverChildren: React.FC<{
	selection: any;
	removeSelection: (selection: any) => void;
	updateSelection: (id: string, updatedSelection: any) => void;
}> = ({ selection, removeSelection, updateSelection }) => {
	const [showNote, setShowNote] = useState(false);
	const [note, setNote] = useState("");

	const handleCustomRemove = async () => {
		console.log("Removing highlight", selection);
		try {
			const response = await fetch(
				`/api/courses/${selection.id}/highlight`,
				{
					method: "DELETE",
				}
			);
			const data = await response.json();
			removeSelection(selection);
			console.log("Highlight removed", data);
			toast.success("Highlight removed");
		} catch (error) {
			console.error("Failed to remove highlight", error);
			toast.error("Failed to remove highlight");
		}
	};

	const handleNoteButtonClick = () => {
		setShowNote(!showNote);
	};

	const handleSaveNote = async () => {
		console.log("Saving note", note);
		try {
			const response = await fetch(`/api/courses/${selection.id}/highlight-note`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ note: note}),
			});
			const data = await response.json();
			console.log("Note saved", data);
			toast.success("Note saved");
		} catch (error) {
			console.error("Failed to save note", error);
			toast.error("Failed to save note");
		}
	};

	return (
		<div className="flex flex-col gap-2">
			{!showNote && (
				<div className="flex gap-2">
					<Button size={"sm"} onClick={handleCustomRemove}>
						Remove
					</Button>
					<Button size={"sm"} onClick={handleNoteButtonClick}>
						Note
					</Button>
				</div>
			)}
			{showNote && (
				<div className="bg-white shadow rounded p-2 z-auto">
					<textarea
						className="w-full border rounded p-2 mb-2"
						placeholder="Enter your note..."
						value={note}
						onChange={(e) => setNote(e.target.value)}
					></textarea>
					<div className="flex justify-end gap-2">
						<Button size={"sm"} onClick={() => setShowNote(false)}>
							Cancel
						</Button>
						<Button size={"sm"} onClick={handleSaveNote}>
							Save
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
