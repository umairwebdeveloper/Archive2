// components/CreditList.tsx
import React from "react";
import { X } from "lucide-react";

interface Entry {
	label: string;
	value: number;
	category: string;
}

interface CreditListProps {
	credits: Entry[];
	totalCredits: number;
	handleCreditChange: (index: number, newValue: number) => void;
	handleDeleteCredit: (index: number) => void;
	openCreditModal: () => void;
}

const CreditList: React.FC<CreditListProps> = ({
	credits,
	totalCredits,
	handleCreditChange,
	handleDeleteCredit,
	openCreditModal,
}) => {
	return (
		<div className="flex flex-col w-full mx-auto">
			<h3 className="text-xl font-bold border w-full p-3">Credits</h3>
			<div className="bg-white mb-4 border w-full h-full">
				<ul className="mt-4 p-4">
					{credits.map((credit, index) => (
						<li
							key={index}
							className="border rounded shadow-sm mb-3 p-2 flex justify-between items-center"
						>
							<span>
								{credit.label} ({credit.category}):{" "}
							</span>
							<input
								type="number"
								value={credit.value}
								onChange={(e) =>
									handleCreditChange(
										index,
										parseFloat(e.target.value)
									)
								}
								className="border p-1 w-20"
							/>
							<span
								className="text-red-500 hover:text-red-700 cursor-pointer"
								onClick={() => handleDeleteCredit(index)}
							>
								<X />
							</span>
						</li>
					))}
				</ul>
				<div className="flex justify-center">
					<button
						type="button"
						onClick={openCreditModal}
						className="px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded"
					>
						Add Item
					</button>
				</div>
				<div className="mt-4 border-t p-4">
					<strong>Total:</strong> €{totalCredits}
				</div>
			</div>
		</div>
	);
};

export default CreditList;
