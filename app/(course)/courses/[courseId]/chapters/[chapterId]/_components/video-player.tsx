"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import PlyrVideoPlayer from "@/components/video/video-player";

import { cn } from "@/lib/utils";

interface VideoPlayerProps {
	playbackId: string;
	courseId: string;
	chapterId: string;
	nextChapterId?: string;
	completeOnEnd: boolean;
	title: string;
	videoUrl: string;
}

export const VideoPlayer = ({
	playbackId,
	courseId,
	chapterId,
	nextChapterId,
	completeOnEnd,
	title,
	videoUrl,
}: VideoPlayerProps) => {
	const [isReady, setIsReady] = useState(false);
	const router = useRouter();

	const onEnd = async () => {
		try {
			if (completeOnEnd) {
				await axios.put(
					`/api/courses/${courseId}/chapters/${chapterId}/progress`,
					{
						isCompleted: true,
					}
				);

				toast.success("Progress updated");
				router.refresh();

				if (nextChapterId) {
					router.push(
						`/courses/${courseId}/chapters/${nextChapterId}`
					);
				}
			}
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<>
			<h1 className="text-2xl mb-3">{title}</h1>

			<div className="relative aspect-video">
				{!isReady && (
					<div className="absolute inset-0 flex items-center justify-center bg-slate-800">
						<Loader2 className="h-8 w-8 animate-spin text-secondary" />
					</div>
				)}

				<PlyrVideoPlayer
					source={{
						type: "video",
						sources: [
							{
								src: videoUrl,
							},
						],
					}}
				/>
			</div>
		</>
	);
};
