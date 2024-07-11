"use client";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import { Trash } from "lucide-react";
import "react-quill/dist/quill.snow.css";

interface VideoNoteProps {
	chapterId: string;
	currentTime: number;
	formatTime: (time: number) => string;
	seekToTime: (time: number) => void;
}

const VideoNote = ({
	chapterId,
	currentTime,
	formatTime,
	seekToTime,
}: VideoNoteProps) => {
	const [notes, setNotes] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [noteContent, setNoteContent] = useState("");
	const quillRef = useRef<any>(null);

	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`/api/courses/${chapterId}/video-note`
			);
			const data = await response.json();
			setNotes(data);
		} catch (error) {
			toast.error("Failed to load notes");
		} finally {
			setLoading(false);
		}
	};

	const saveNote = async () => {
		const content = noteContent;
		const time = formatTime(currentTime);

		try {
			const response = await fetch(
				`/api/courses/${chapterId}/video-note`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ content, time }),
				}
			);
			const newNote = await response.json();
			setNotes([...notes, newNote]);
			toast.success("Note saved");
		} catch (error) {
			toast.error("Failed to save note");
		}
	};

	const deleteNote = async (id: string) => {
		try {
			await fetch(`/api/courses/${chapterId}/video-note`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});
			setNotes(notes.filter((note) => note.id !== id));
			toast.success("Note deleted");
		} catch (error) {
			toast.error("Failed to delete note");
		}
	};

	const handleTimeClick = (time: string) => {
		const [minutes, seconds] = time.split(":").map(Number);
		const totalSeconds = minutes * 60 + seconds;
		seekToTime(totalSeconds);
	};

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				[{ list: "ordered" }, { list: "bullet" }],
				["bold", "italic", "underline"],
				["link", "image"],
			],
		},
	};

	return (
		<>
			<div className="mx-0 md:mx-4 border rounded-xl p-3 bg-white">
				<h3 className="font-bold text-lg">Your Notes</h3>
				<div className="py-3">
					<ReactQuill
						ref={quillRef}
						value={noteContent}
						onChange={setNoteContent}
						modules={modules}
						className="mt-1 block w-full rounded shadow-sm bg-sec50 border custom-quill"
					/>
				</div>
				<div className="flex justify-end">
					<Button onClick={saveNote}>
						{formatTime(currentTime)} Save
					</Button>
				</div>
				{/* Notes */}
				<div className="mt-4">
					{loading ? (
						<div className="flex justify-center items-center mt-3">
							<Spinner />
						</div>
					) : (
						notes?.map((note) => (
							<div key={note.id} className="border-b py-2">
								<div className="flex justify-between">
									<div className="max-w-[90%]">
										<span
											className="cursor-pointer font-bold text-sec600 hover:text-blue-600 hover:underline flex items-center gap-2"
											onClick={() =>
												handleTimeClick(note.time)
											}
										>
											<img src="/assets/svg/clock-02.svg" width="20px" alt="clock" />{note.time}
										</span>
										<div
											className="break-words"
											dangerouslySetInnerHTML={{
												__html: note.content,
											}}
										></div>
									</div>
									<div>
										<span
											className="cursor-pointer text-red-500"
											onClick={() => deleteNote(note.id)}
										>
											<img src="/assets/svg/delete-02.svg" width="20px" alt="delete" />
										</span>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default VideoNote;
