// pages/index.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "./modal";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Entry {
	label: string;
	value: number;
	category: string;
}

interface DebitCreditProps {
	answerDebitAmount: string;
	answerCreditAmount: string;
	answerCredits: Entry[];
	answerDebits: Entry[];
	questionID: any;
	onChildFunctionCall: (questionID: any) => void;
}

const DebitCredit: React.FC<DebitCreditProps> = ({
	answerDebitAmount,
	answerCreditAmount,
	answerCredits,
	answerDebits,
	questionID,
	onChildFunctionCall,
}) => {
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
				{ label: "Bills", value: 0 },
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
		// if (totalCredits + value > totalDebits) {
		// 	toast.error("Total credits cannot exceed total debits.");
		// 	return;
		// }
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
		// const updatedTotalCredits =
		// 	totalCredits - newCredits[index].value + newValue;

		// if (updatedTotalCredits > totalDebits) {
		// 	toast.error("Total credits cannot exceed total debits.");
		// 	return;
		// }

		newCredits[index].value = newValue;
		setCredits(newCredits);
	};

	function matchLists(list1: any, list2: any): boolean {
		 const isMatch = list1.every((obj1: any) =>
				list2.some(
					(obj2: any) =>
						obj1.label === obj2.label &&
						obj1.value === obj2.value &&
						obj1.category === obj2.category
				)
			);

		console.log(isMatch, list1, list2);
		return isMatch;
	}


	const handleCheckTotals = () => {
		if (
			totalDebits === parseFloat(answerDebitAmount) &&
			totalCredits === parseFloat(answerCreditAmount) &&
			matchLists(debits, answerDebits) &&
			matchLists(credits, answerCredits)
		) {
			toast.success("Your answer is correct!");
		} else {
			toast.error(
				"Your answer is incorrect. Please check your entries and try again."
			);
		}
		onChildFunctionCall(questionID);
	};

	return (
		<div className="">
			<Toaster />
			<div className="flex flex-col w-full mx-auto border mb-4 rounded-lg">
				<h3 className="text-xl font-bold w-full p-3 bg-prim100">
					Debits
				</h3>
				<div className="bg-white w-full h-full">
					<ul className="mt-3 px-3">
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
							onClick={() => setIsDebitModalOpen(true)}
							className="px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded"
						>
							Add Item
						</button>
					</div>
					<div className="mt-4 bg-sec50 p-4">
						<strong>Total:</strong> {totalDebits}
					</div>
				</div>
			</div>

			<div className="flex flex-col w-full mx-auto border mb-4 rounded-lg">
				<h3 className="text-xl font-bold w-full p-3 bg-prim100">
					Credits
				</h3>
				<div className="bg-white w-full h-full">
					<ul className="mt-3 px-3">
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
							onClick={() => setIsCreditModalOpen(true)}
							className="px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded"
						>
							Add Item
						</button>
					</div>
					<div className="mt-4 bg-sec50 p-4">
						<strong>Total:</strong> {totalCredits}
					</div>
				</div>
			</div>
			<hr className="mb-3" />
			<div className="flex justify-start">
				<Button onClick={handleCheckTotals}>Check Answer</Button>
			</div>

			<Modal
				isOpen={isDebitModalOpen}
				onClose={() => setIsDebitModalOpen(false)}
				onSubmit={(label, value, category) =>
					handleAddDebit(label, value, category)
				}
				predefinedValues={predefinedDebitValues}
			/>
			<Modal
				isOpen={isCreditModalOpen}
				onClose={() => setIsCreditModalOpen(false)}
				onSubmit={(label, value, category) =>
					handleAddCredit(label, value, category)
				}
				predefinedValues={predefinedCreditValues}
			/>
		</div>
	);
};

export default DebitCredit;
