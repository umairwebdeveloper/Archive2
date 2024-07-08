"use client";
import React, { useRef, useEffect, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import VideoNote from "./video-note";

interface VideoPlayerProps {
	playbackId: string;
	courseId: string;
	chapterId: string;
	nextChapterId?: string;
	completeOnEnd: boolean;
	title: string;
	videoUrl: any;
}

const VideoPlayer = ({
	playbackId,
	courseId,
	chapterId,
	nextChapterId,
	completeOnEnd,
	title,
	videoUrl,
}: VideoPlayerProps) => {
	const playerRef = useRef<HTMLVideoElement>(null);
	const [currentTime, setCurrentTime] = useState<number>(0);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	};

	useEffect(() => {
		const player = playerRef.current;

		if (player) {
			const plyr = new Plyr(player, {
				controls: [
					"play-large",
					"restart",
					"play",
					"progress",
					"current-time",
					"mute",
					"volume",
					"settings",
					"fullscreen",
					"airplay",
					"download",
					"settings",
				],
			});

			const handleTimeUpdate = () => {
				const currentTime = player.currentTime;
				setCurrentTime(currentTime);
				localStorage.setItem(
					`videoTime_${chapterId}`,
					currentTime.toString()
				);
			};

			const savedTime = localStorage.getItem(`videoTime_${chapterId}`);
			if (savedTime) {
				player.currentTime = parseFloat(savedTime);
			}

			player.addEventListener("timeupdate", handleTimeUpdate);

			return () => {
				player.removeEventListener("timeupdate", handleTimeUpdate);
			};
		}
	}, [chapterId]);

	const seekToTime = (time: number) => {
		if (playerRef.current) {
			playerRef.current.currentTime = time;
			playerRef.current.play();
		}
	};

	return (
		<>
			<h1 className="text-2xl mb-3">{title}</h1>
			<div className="flex">
				<div className="w-3/4 video-player videoPlayerPlyr">
					<video ref={playerRef} controls>
						<source src={videoUrl} type="video/mp4" />
					</video>
				</div>
				<div className="w-1/4">
					<VideoNote
						chapterId={chapterId}
						currentTime={currentTime}
						formatTime={formatTime}
						seekToTime={seekToTime}
					/>
				</div>
			</div>
		</>
	);
};

export default VideoPlayer;
