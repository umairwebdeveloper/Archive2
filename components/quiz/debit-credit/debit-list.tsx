// components/DebitList.tsx
import React from "react";
import { X } from "lucide-react";

interface Entry {
	label: string;
	value: number;
	category: string;
}

interface DebitListProps {
	debits: Entry[];
	totalDebits: number;
	handleDebitChange: (index: number, newValue: number) => void;
	handleDeleteDebit: (index: number) => void;
	openDebitModal: () => void;
}

const DebitList: React.FC<DebitListProps> = ({
	debits,
	totalDebits,
	handleDebitChange,
	handleDeleteDebit,
	openDebitModal,
}) => {
	return (
		<div className="flex flex-col w-full mx-auto">
			<h3 className="text-xl font-bold border w-full p-3">Debits</h3>
			<div className="bg-white mb-4 border w-full h-full">
				<ul className="mt-4 p-4">
					{debits.map((debit, index) => (
						<li
							key={index}
							className="border rounded shadow-sm mb-3 p-2 flex justify-between items-center"
						>
							<span>
								{debit.label} ({debit.category}):{" "}
							</span>
							<input
								type="number"
								value={debit.value}
								placeholder="Enter value"
								onChange={(e) =>
									handleDebitChange(
										index,
										parseFloat(e.target.value)
									)
								}
								className="border p-1 w-20"
							/>
							<span
								className="text-red-500 hover:text-red-700 cursor-pointer"
								onClick={() => handleDeleteDebit(index)}
							>
								<X />
							</span>
						</li>
					))}
				</ul>
				<div className="flex justify-center">
					<button
						type="button"
						onClick={openDebitModal}
						className="px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded"
					>
						Add Item
					</button>
				</div>
				<div className="mt-4 border-t p-4">
					<strong>Total:</strong> €{totalDebits}
				</div>
			</div>
		</div>
	);
};

export default DebitList;
