"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ProgressContextType = {
	progressId: string;
	title: string;
	setProgressId: (id: string) => void;
	setTitle: (title: string) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
	undefined
);

export const useProgress = () => {
	const context = useContext(ProgressContext);
	if (!context) {
		throw new Error("useProgress must be used within a ProgressProvider");
	}
	return context;
};

type ProgressProviderProps = {
	children: ReactNode;
};

export const ProgressProvider: React.FC<ProgressProviderProps> = ({
	children,
}) => {
	const [progressId, setProgressId] = useState<string>("");
	const [title, setTitle] = useState<string>("");

	return (
		<ProgressContext.Provider
			value={{ progressId, title, setProgressId, setTitle }}
		>
			{children}
		</ProgressContext.Provider>
	);
};
