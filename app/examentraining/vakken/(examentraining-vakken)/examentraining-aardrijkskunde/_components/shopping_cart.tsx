"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { checkout } from "@/lib/checkout";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Sample data structure
interface Subject {
	id: string;
	name: string;
	price: number;
	category: string;
}

const ShoppingCart: React.FC = () => {
	const [cartData, setCartData] = useState<{
		allSubjects: boolean;
		level: string | undefined;
		subjects: Subject[];
	} | null>(null);

	const router = useRouter();

	useEffect(() => {
		const storedData = localStorage.getItem("selectedSubjectsWithLevel");
		if (storedData) {
			setCartData(JSON.parse(storedData));
		}
	}, []);

	const removeSubject = (subjectId: string) => {
		if (cartData) {
			const updatedSubjects = cartData.subjects.filter(
				(subject) => subject.id !== subjectId
			);
			const updatedCartData = {
				...cartData,
				allSubjects: false,
				subjects: updatedSubjects,
			};
			setCartData(updatedCartData);
			localStorage.setItem(
				"selectedSubjectsWithLevel",
				JSON.stringify(updatedCartData)
			);
		}
	};

	const removeAllSubjects = () => {
		const updatedCartData: any = {
			...cartData,
			allSubjects: false,
			subjects: [],
		};
		setCartData(updatedCartData);
		localStorage.setItem(
			"selectedSubjectsWithLevel",
			JSON.stringify(updatedCartData)
		);
	};

	if (!cartData) {
		return (
			<div className="flex justify-center mt-4">
				<Spinner size="lg" />
			</div>
		);
	}

	const { allSubjects, level, subjects } = cartData;
	const totalPrice = allSubjects
		? 180
		: subjects.reduce((acc, subject) => acc + subject.price, 0);


    const handleSubmit = async (priceAmount: any) => {
		const stripe = await loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
		);
		if (!stripe) {
			return;
		}
		try {
            // subjects is an array of objects, need subject names to string
            let subjectNames = "";
            subjects.forEach((subject) => {
                subjectNames += `${subject.name}, `;
            });

			const response = await axios.post("/api/stripe", {
				priceAmount: priceAmount,
                level: level,
                subjectNames: subjectNames,
			});
			const data = response.data;
			console.log(data);
			if (!data.ok) throw new Error("Something went wrong");

			await stripe.redirectToCheckout({
				sessionId: data.result.id,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-2/3 mx-auto p-4">
			<div className="flex justify-start mb-4">
				<button
					onClick={() => router.back()}
					className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
				>
					Back
				</button>
			</div>
			<h2 className="text-2xl font-bold mb-4 text-center">
				Shopping Cart
			</h2>
			<div className="flex justify-between">
				<div className="w-2/3 h-full">
					<div className="bg-white rounded-xl border p-6">
						{allSubjects ? (
							<>
								<table className="min-w-full bg-white text-start">
									<thead>
										<tr className="border-b">
											<th className="py-2 text-start"></th>
											<th className="py-2 text-start">
												Product
											</th>
											<th className="py-2 text-start">
												Price
											</th>
											<th className="py-2 text-start">
												Number
											</th>
											<th className="py-2 text-start">
												Subtotal
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b">
											<td className="py-2">
												<span
													onClick={removeAllSubjects}
													className="cursor-pointer text-red-500 hover:text-red-700"
												>
													<X />
												</span>
											</td>
											<td className="py-2">
												All Subjects in {level}
											</td>
											<td className="py-2">€180.00</td>
											<td className="py-2"></td>
											<td className="py-2">€180.00</td>
										</tr>
									</tbody>
								</table>
							</>
						) : subjects.length > 0 ? (
							<table className="min-w-full bg-white text-start">
								<thead>
									<tr className="border-b">
										<th className="py-2 text-start"></th>
										<th className="py-2 text-start">
											Product
										</th>
										<th className="py-2 text-start">
											Price
										</th>
										<th className="py-2 text-start">
											Number
										</th>
										<th className="py-2 text-start">
											Subtotal
										</th>
									</tr>
								</thead>
								<tbody>
									{subjects.map((subject) => (
										<tr
											key={subject.id}
											className="border-b"
										>
											<td className="py-2">
												<span
													onClick={() =>
														removeSubject(
															subject.id
														)
													}
													className="cursor-pointer text-red-500 hover:text-red-700"
												>
													<X />
												</span>
											</td>
											<td className="py-2">
												{subject.name} -{" "}
												{cartData?.level}
											</td>
											<td className="py-2">
												€{subject.price.toFixed(2)}
											</td>
											<td className="py-2"></td>
											<td className="py-2">
												€{subject.price.toFixed(2)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="flex flex-col justify-center items-center h-full">
								<p className="text-center">No products found</p>
							</div>
						)}
					</div>
					{/* <div className="p-6 border rounded-lg mt-4">
						
					</div> */}
				</div>
				<div className="w-1/3 bg-white rounded-xl border p-6 ml-4">
					<h3 className="text-lg font-bold mb-4 text-start">
						Shopping cart totals
					</h3>
					<div className="text-gray-500 font-bold mb-4">
						<p className="flex justify-between mb-3">
							<span>Subtotal</span>{" "}
							<span>€{totalPrice.toFixed(2)}</span>
						</p>
						<p className="flex justify-between mb-3">
							<span>BTW</span> <span>€0.00</span>
						</p>
						<p className="flex justify-between mb-3">
							<span>Total</span>{" "}
							<span>€{totalPrice.toFixed(2)}</span>
						</p>
					</div>
					<div>
						<Button
							className="w-full"
							disabled={totalPrice === 0}
							onClick={() => handleSubmit(totalPrice)}
						>
							Continue to checkout
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
