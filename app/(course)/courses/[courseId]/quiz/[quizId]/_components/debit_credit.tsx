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
    // Fetch totals from localStorage by questionID
    const storedTotals = localStorage.getItem(`question_total_${questionID}`);
    const storedData = localStorage.getItem(`entries_${questionID}`);
    if (storedTotals) {
      const { totalDebits: storedDebits, totalCredits: storedCredits } =
        JSON.parse(storedTotals);
      setTotalDebits(storedDebits);
      setTotalCredits(storedCredits);
    }
    if (storedData) {
        const { debits: savedDebits, credits: savedCredits } =
            JSON.parse(storedData);
        setDebits(savedDebits || []);
        setCredits(savedCredits || []);
    }

  }, [questionID]); // Run only when questionID changes

  useEffect(() => {
    // Update totals whenever debits or credits change
    const updatedTotalDebits = debits.reduce(
      (acc, debit) => acc + debit.value,
      0
    );
    const updatedTotalCredits = credits.reduce(
      (acc, credit) => acc + credit.value,
      0
    );

    if (updatedTotalDebits !== totalDebits) setTotalDebits(updatedTotalDebits);
    if (updatedTotalCredits !== totalCredits)
      setTotalCredits(updatedTotalCredits);
  }, [debits, credits]); // Recalculate totals only when debits or credits change

  const updateLocalStorage = (
      key: string,
      debits: Entry[],
      credits: Entry[]
  ) => {
      const data = { debits, credits };
      localStorage.setItem(key, JSON.stringify(data));
  };

  const handleAddDebit = (label: string, value: number, category: string) => {
      const updatedDebits = [...debits, { label, value, category }];
      setDebits(updatedDebits);
      updateLocalStorage(`entries_${questionID}`, updatedDebits, credits);
  };

  const handleAddCredit = (label: string, value: number, category: string) => {
      const updatedCredits = [...credits, { label, value, category }];
      setCredits(updatedCredits);
      updateLocalStorage(`entries_${questionID}`, debits, updatedCredits);
  };

  const handleDeleteDebit = (index: number) => {
      const updatedDebits = debits.filter((_, i) => i !== index);
      setDebits(updatedDebits);
      updateLocalStorage(`entries_${questionID}`, updatedDebits, credits);
  };

  const handleDeleteCredit = (index: number) => {
      const updatedCredits = credits.filter((_, i) => i !== index);
      setCredits(updatedCredits);
      updateLocalStorage(`entries_${questionID}`, debits, updatedCredits);
  };

  const handleDebitChange = (index: number, newValue: number) => {
      const updatedDebits = [...debits];
      updatedDebits[index].value = newValue;
      setDebits(updatedDebits);
      updateLocalStorage(`entries_${questionID}`, updatedDebits, credits);
  };

  const handleCreditChange = (index: number, newValue: number) => {
      const updatedCredits = [...credits];
      updatedCredits[index].value = newValue;
      setCredits(updatedCredits);
      updateLocalStorage(`entries_${questionID}`, debits, updatedCredits);
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
    if (debits.length === 0 && credits.length === 0) {
      toast.error("Please add some entries before checking your answer.");
      return;
    }
    const totals = {
      totalDebits,
      totalCredits,
    };
    localStorage.setItem(
      `question_total_${questionID}`,
      JSON.stringify(totals)
    );
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
        <h3 className="text-xl font-bold w-full p-3 bg-prim100">Debits</h3>
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
                    handleDebitChange(index, parseFloat(e.target.value))
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
        <h3 className="text-xl font-bold w-full p-3 bg-prim100">Credits</h3>
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
                    handleCreditChange(index, parseFloat(e.target.value))
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
