// components/Timer.tsx
import React, { useState, useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";

const Timer: React.FC = () => {
	const [time, setTime] = useState<number>(5400); // 1 hour 30 minutes in seconds
	const [isActive, setIsActive] = useState<boolean>(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isActive) {
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
			}, 1000);
		} else {
			if (intervalRef.current) clearInterval(intervalRef.current);
		}
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isActive]);

	const toggleStartPause = () => {
		setIsActive(!isActive);
	};

	const formatTime = (seconds: number) => {
		const getMinutes = `0${Math.floor((seconds % 3600) / 60)}`.slice(-2);
		const getSeconds = `0${seconds % 60}`.slice(-2);
		const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
		return `${getHours}:${getMinutes}:${getSeconds}`;
	};

	return (
		<div className="flex items-center gap-12">
			<div className="flex">
				<button
					className="px-6 py-2 rounded-full border border-sec600 flex items-center gap-3"
					onClick={toggleStartPause}
				>
					{isActive ? (
						<>
							<Pause /> Pause
						</>
					) : (
						<>
							<Play /> Start
						</>
					)}
				</button>
			</div>
			<div className="flex items-center bg-white p-3 rounded-2xl gap-3 ">
				<div>
					<img
						src="/assets/svg/clock-timer.svg"
                        className=""
						width="44px"
                        height="44px"
						alt="clock-logo"
					/>
				</div>
				<div>
					<h3 className="text-3xl font-semibold">
						{formatTime(time)}
					</h3>
					<p className="text-right">Time left</p>
				</div>
			</div>
		</div>
	);
};

export default Timer;
