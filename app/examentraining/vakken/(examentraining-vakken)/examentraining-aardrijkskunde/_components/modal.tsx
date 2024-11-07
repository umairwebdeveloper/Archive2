// components/Modal.tsx
import React, { FC } from "react";

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
	const handleValueClick = (
		label: string,
		value: number,
		category: string
	) => {
		onSubmit(label, value, category);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<h2 className="text-xl mb-4">Select</h2>
				{predefinedValues.map((item, index) => (
					<div key={index}>
						<h3 className="text-lg font-semibold mb-2">
							{item.category}
						</h3>
						<div className="grid grid-cols-5 gap-4 mb-4">
							{item.values.map((valueItem, valueIndex) => (
								<button
									key={valueIndex}
									onClick={() =>
										handleValueClick(
                                            valueItem.label,
											valueItem.value,
											item.category
										)
									}
									className="px-4 py-2 bg-gray-500 text-white rounded"
								>
									{valueItem.label}
								</button>
							))}
						</div>
					</div>
				))}
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
