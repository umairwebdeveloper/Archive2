import React, { useRef, useEffect, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface VideoPlayerProps {
	source: {
		type: any;
		sources: { src: string }[];
	};
	options?: Plyr.Options;
	onTimeUpdate?: (time: number) => void;
}

const PlyrVideoPlayer: React.FC<VideoPlayerProps> = ({
	source,
	options,
	onTimeUpdate,
}) => {
	const playerRef = useRef<any>(null);

	useEffect(() => {
		console.log("playerRef", playerRef);
		const player = playerRef.current.plyr
		console.log("player", player);
		if (player) {
			player.on("timeupdate", () => {
				if (onTimeUpdate) {
					onTimeUpdate(player.currentTime);
				}
			});
		}

		return () => {
			if (player) {
				player.off("timeupdate");
			}
		};
	}, [onTimeUpdate]);

	return <Plyr ref={playerRef} source={source} options={options} />;
};

export default PlyrVideoPlayer;
