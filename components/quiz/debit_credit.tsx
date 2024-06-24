import React, { useState } from "react";
import Modal from "./modal";
import DebitList from "./debit-credit/debit-list";
import CreditList from "./debit-credit/credit-list";

interface Entry {
	label: string;
	value: number;
	category: string;
}

interface DebitCreditProps {
	debits: Entry[];
	credits: Entry[];
	totalDebits: number;
	totalCredits: number;
	handleAddDebit: (label: string, value: number, category: string) => void;
	handleAddCredit: (label: string, value: number, category: string) => void;
	handleDeleteDebit: (index: number) => void;
	handleDeleteCredit: (index: number) => void;
	handleDebitChange: (index: number, newValue: number) => void;
	handleCreditChange: (index: number, newValue: number) => void;
}

const DebitCredit: React.FC<DebitCreditProps> = ({
	debits,
	credits,
	totalDebits,
	totalCredits,
	handleAddDebit,
	handleAddCredit,
	handleDeleteDebit,
	handleDeleteCredit,
	handleDebitChange,
	handleCreditChange,
}) => {
	const [isDebitModalOpen, setIsDebitModalOpen] = useState(false);
	const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

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

	return (
		<div>
			<DebitList
				debits={debits}
				totalDebits={totalDebits}
				handleDebitChange={handleDebitChange}
				handleDeleteDebit={handleDeleteDebit}
				openDebitModal={() => setIsDebitModalOpen(true)}
			/>
			<CreditList
				credits={credits}
				totalCredits={totalCredits}
				handleCreditChange={handleCreditChange}
				handleDeleteCredit={handleDeleteCredit}
				openCreditModal={() => setIsCreditModalOpen(true)}
			/>
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
