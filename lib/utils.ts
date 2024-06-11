import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const parseXPath = (
	content: string,
	xpath: string
): ChildNode | null => {
	const domParser = new DOMParser();
	const doc = domParser.parseFromString(content, "text/html");
	const steps = xpath.slice(1).split("/");
	let currentNode: any | null = doc.body;

	for (let step of steps) {
		if (!currentNode) break;
		if (step.includes("text()")) {
			currentNode = currentNode.childNodes[0];
		} else if (step.includes("p")) {
			const index = parseInt(step.match(/\[(\d+)\]/)?.[1] || "1", 10) - 1;
			currentNode = currentNode.getElementsByTagName("p")[index];
		}
	}

	return currentNode;
};

export const wrapSelectedText = (
	content: string,
	startMeta: { start: string; startOffset: number },
	endMeta: { end: string; endOffset: number },
	className: string,
	id: string
): string => {
	const domParser = new DOMParser();
	const doc = domParser.parseFromString(content, "text/html");

	const startNode = parseXPath(content, startMeta.start);
	const endNode = parseXPath(content, endMeta.end);

	if (!startNode || !endNode) return content;

	const startOffset = startMeta.startOffset;
	const endOffset = endMeta.endOffset;

	const startText = startNode.textContent?.slice(0, startOffset) || "";
	const selectedText =
		startNode.textContent?.slice(startOffset, endOffset) || "";
	const endText = endNode.textContent?.slice(endOffset) || "";

	const span = doc.createElement("span");
	span.className = className;
	span.id = id;
	span.textContent = selectedText;

	const wrappedContent = `${startText}${span.outerHTML}${endText}`;
	startNode.textContent = wrappedContent;

	return doc.body.innerHTML;
};
