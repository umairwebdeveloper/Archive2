"use client";
// pages/index.tsx
import React, { useState, useEffect } from "react";
import Modal from "./modal";

interface Entry {
	label: string;
	value: number;
	category: string;
}

const DebitCredit: React.FC = () => {
	const [debits, setDebits] = useState<Entry[]>([]);
	const [credits, setCredits] = useState<Entry[]>([]);
	const [isDebitModalOpen, setIsDebitModalOpen] = useState(false);
	const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
	const [totalDebits, setTotalDebits] = useState(0);
	const [totalCredits, setTotalCredits] = useState(0);

	const predefinedDebitValues = [
		{
			category: "Fixed Assets",
			values: [
				{ label: "Land", value: 0 },
				{ label: "Buildings", value: 0 },
				{ label: "Machinery", value: 0 },
				{ label: "Vehicles", value: 0 },
				{ label: "Furniture", value: 0 },
				{ label: "IT Equipment", value: 0 },
				{ label: "Plant Equipment", value: 0 },
				{ label: "Leasehold Improvements", value: 0 },
				{ label: "Tools", value: 0 },
				{ label: "Intangible Assets", value: 0 },
			],
		},
		{
			category: "Current Assets",
			values: [
				{ label: "Cash", value: 0 },
				{ label: "Accounts Receivable", value: 0 },
				{ label: "Inventory", value: 0 },
				{ label: "Prepaid Expenses", value: 0 },
				{ label: "Marketable Securities", value: 0 },
				{ label: "Loans", value: 0 },
				{ label: "Advances", value: 0 },
				{ label: "Supplies", value: 0 },
				{ label: "Deposits", value: 0 },
				{ label: "Accrued Income", value: 0 },
			],
		},
	];

	const predefinedCreditValues = [
		{
			category: "Liabilities",
			values: [
				{ label: "Accounts Payable", value: 0 },
				{ label: "Loans", value: 0 },
				{ label: "Accrued Expenses", value: 0 },
				{ label: "Taxes Payable", value: 0 },
				{ label: "Wages", value: 0 },
				{ label: "Interest", value: 0 },
				{ label: "Deferred Revenue", value: 0 },
				{ label: "Interest Payable", value: 0 },
				{ label: "Long-term Debt", value: 0 },
				{ label: "bills", value: 0 },
			],
		},
		{
			category: "Equity",
			values: [
				{ label: "Common Stock", value: 0 },
				{ label: "Preferred Stock", value: 0 },
				{ label: "Retained Earnings", value: 0 },
				{ label: "Treasury Stock", value: 0 },
				{ label: "Equity Reserves", value: 0 },
			],
		},
	];

	useEffect(() => {
		setTotalDebits(debits.reduce((acc, debit) => acc + debit.value, 0));
		setTotalCredits(credits.reduce((acc, credit) => acc + credit.value, 0));
	}, [debits, credits]);

	const handleAddDebit = (label: string, value: number, category: string) => {
		setDebits([...debits, { label, value, category }]);
	};

	const handleAddCredit = (
		label: string,
		value: number,
		category: string
	) => {
		setCredits([...credits, { label, value, category }]);
	};


	const handleDeleteDebit = (index: number) => {
		setDebits(debits.filter((_, i) => i !== index));
	};

	const handleDeleteCredit = (index: number) => {
		setCredits(credits.filter((_, i) => i !== index));
	};

	const handleDebitChange = (index: number, newValue: number) => {
		const newDebits = [...debits];
		newDebits[index].value = newValue;
		setDebits(newDebits);
	};

	const handleCreditChange = (index: number, newValue: number) => {
		const newCredits = [...credits];
		newCredits[index].value = newValue;
		setCredits(newCredits);
	};

	return (
		<div className="p-4 container">
			<div className="flex justify-between w-2/3 mx-auto border-b">
				<h3 className="text-xl font-bold border w-full p-3">Debet</h3>
				<h3 className="text-xl font-bold border w-full p-3">Credit</h3>
			</div>
			<div className="flex justify-between w-2/3 mx-auto">
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
								<button
									onClick={() => handleDeleteDebit(index)}
									className="px-2 py-1 bg-red-500 text-white rounded"
								>
									Delete
								</button>
							</li>
						))}
					</ul>
					<div className="flex justify-center">
						<button
							onClick={() => setIsDebitModalOpen(true)}
							className="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded"
						>
							Add Item
						</button>
					</div>
					<div className="mt-4 border-t p-4">
						<strong>Total:</strong> {totalDebits}
					</div>
				</div>

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
								<button
									onClick={() => handleDeleteCredit(index)}
									className="px-2 py-1 bg-red-500 text-white rounded"
								>
									Delete
								</button>
							</li>
						))}
					</ul>
					<div className="flex justify-center">
						<button
							onClick={() => setIsCreditModalOpen(true)}
							className="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded"
						>
							Add Item
						</button>
					</div>
					<div className="mt-4 border-t p-4">
						<strong>Total:</strong> {totalCredits}
					</div>
				</div>
			</div>

			<Modal
				isOpen={isDebitModalOpen}
				onClose={() => setIsDebitModalOpen(false)}
				onSubmit={handleAddDebit}
				predefinedValues={predefinedDebitValues}
			/>
			<Modal
				isOpen={isCreditModalOpen}
				onClose={() => setIsCreditModalOpen(false)}
				onSubmit={handleAddCredit}
				predefinedValues={predefinedCreditValues}
			/>
		</div>
	);
};

export default DebitCredit;
