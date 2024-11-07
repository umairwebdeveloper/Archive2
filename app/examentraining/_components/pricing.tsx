"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type PricingCardProps = {
	title: string;
	priceMonthly: string;
	priceYearly: string;
	features: string[];
	isPopular?: boolean;
	isYearly: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({
	title,
	priceMonthly,
	priceYearly,
	features,
	isPopular,
	isYearly,
}) => (
	<div
		className={`p-6 m-4 bg-white rounded-lg shadow-md ${
			isPopular ? "border-2 border-sec800 relative" : ""
		}`}
	>
		{isPopular && (
			<span
				className="px-3 py-1 text-sm text-white text-center bg-sec800 rounded-full absolute"
				style={{ top: "-4%", left: "35%" }}
			>
				Popular
			</span>
		)}
		<h3 className="mb-4 text-2xl font-semibold">{title}</h3>
		<p className="mb-4 text-4xl font-bold">
			{isYearly ? priceYearly : priceMonthly}
		</p>
		<ul className="mb-6 space-y-2">
			{features.map((feature, index) => (
				<li key={index} className="flex items-center">
					<svg
						className="w-5 h-5 mr-2 text-green-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 13l4 4L19 7"
						></path>
					</svg>
					{feature}
				</li>
			))}
		</ul>
		<Button>Choose Plan</Button>
	</div>
);

const PricingCards: React.FC = () => {
	const [isYearly, setIsYearly] = useState(false);

	const pricingOptions = [
		{
			title: "Basic",
			priceMonthly: "$9/mo",
			priceYearly: "$90/yr",
			features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
		},
		{
			title: "Standard",
			priceMonthly: "$19/mo",
			priceYearly: "$190/yr",
			features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
			isPopular: true,
		},
		{
			title: "Premium",
			priceMonthly: "$29/mo",
			priceYearly: "$290/yr",
			features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
		},
	];

	return (
		<div className="container p-6 mb-8">
			<h1 className="text-2xl font-bold text-center mb-3">
				Our Pricing Plans
			</h1>
			<div className="flex justify-center mb-3">
				<label className="flex items-center">
					<span className="mr-2 text-lg">Monthly</span>
					<input
						type="checkbox"
						className="toggle-checkbox"
						checked={isYearly}
						onChange={() => setIsYearly(!isYearly)}
					/>
					<span className="ml-2 text-lg">Yearly</span>
				</label>
			</div>
			<div className="w-8/12 mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
					{pricingOptions.map((option) => (
						<PricingCard
							key={option.title}
							{...option}
							isYearly={isYearly}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default PricingCards;
