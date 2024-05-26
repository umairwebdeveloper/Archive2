import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface VideoPlayerProps {
	source: {
		type: string;
		sources: { src: string; }[];
	};
	options?: Plyr.Options;
}

const PlyrVideoPlayer: React.FC<VideoPlayerProps> = ({ source, options }) => {
	return <Plyr source={source} options={options} />;
};

export default PlyrVideoPlayer;
