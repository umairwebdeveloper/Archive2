// components/Modal.tsx
import React, { FC, useState } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (label: string, value: number, category: string) => void;
	predefinedValues: {
		category: string;
		values: { label: string; value: number }[];
	}[];
}

const Modal: FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	predefinedValues,
}) => {
	const [selectedCategory, setSelectedCategory] = useState(
		predefinedValues[0].category
	);
	const [searchQuery, setSearchQuery] = useState("");

	const handleValueClick = (
		label: string,
		value: number,
		category: string
	) => {
		onSubmit(label, value, category);
		onClose();
	};

	if (!isOpen) return null;

	const filteredValues = predefinedValues
		.find((item) => item.category === selectedCategory)
		?.values.filter((valueItem) =>
			valueItem.label.toLowerCase().includes(searchQuery.toLowerCase())
		);

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-4 rounded shadow-lg w-3/4 max-w-2xl">
				<h2 className="text-xl mb-4">Select</h2>
				<div className="flex mb-4">
					{predefinedValues.map((item) => (
						<button
							key={item.category}
							onClick={() => setSelectedCategory(item.category)}
							className={`px-4 py-2 ${
								item.category === selectedCategory
									? "bg-gray-700 text-white"
									: "bg-gray-300"
							} rounded mr-2`}
						>
							{item.category}
						</button>
					))}
				</div>
				<input
					type="text"
					placeholder="Search..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full px-4 py-2 mb-4 border rounded"
				/>
				<div className="grid grid-cols-5 gap-4 mb-4">
					{filteredValues?.map((valueItem, valueIndex) => (
						<button
							key={valueIndex}
							onClick={() =>
								handleValueClick(
									valueItem.label,
									valueItem.value,
									selectedCategory
								)
							}
							className="px-4 py-2 bg-gray-500 text-white rounded"
						>
							{valueItem.label}
						</button>
					))}
				</div>
				<div className="flex justify-end mt-4">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
