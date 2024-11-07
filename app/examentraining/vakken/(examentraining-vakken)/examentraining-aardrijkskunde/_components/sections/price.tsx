import { Check } from "lucide-react";

const Price = () => {
	const pricingPlans = [
		{
			name: "Starter",
			price: 29,
			description:
				"Best option for personal use & for your next project.",
			features: [
				"Individual configuration",
				"No setup, or hidden fees",
				"Team size: 1 developer",
				"Premium support: 6 months",
				"Free updates: 6 months",
			],
			active: false,
		},
		{
			name: "Professional",
			price: 49,
			description: "Suitable for teams with advanced requirements.",
			features: [
				"Custom configuration",
				"No setup, or hidden fees",
				"Team size: up to 5 developers",
				"Premium support: 12 months",
				"Free updates: 12 months",
			],
			active: true, // Mark this as active
		},
		{
			name: "Enterprise",
			price: 99,
			description: "Best for large teams and organizations.",
			features: [
				"Advanced configuration",
				"No setup, or hidden fees",
				"Unlimited team size",
				"Premium support: 24 months",
				"Free updates: 24 months",
			],
			active: false,
		},
	];

	return (
		<div className="container">
			<h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 my-10">
				Pricing
			</h2>
			<div className="bg-white dark:bg-gray-900">
				<div className="mx-auto max-w-screen-xl lg:px-6">
					<div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
						{pricingPlans.map((plan, index) => (
							<div
								key={index}
								className={`flex flex-col p-6 mx-auto max-w-lg text-center bg-white rounded-lg border border-gray-100 dark:border-gray-600 xl:p-8 ${
									plan.active
										? "bg-green-100 dark:bg-green-900"
										: "bg-white dark:bg-gray-800"
								}`}
							>
								<h3 className="mb-4 text-2xl font-semibold">
									{plan.name}
								</h3>
								<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
									{plan.description}
								</p>
								<div className="flex justify-center items-baseline my-8">
									<span className="mr-2 text-5xl font-extrabold">
										${plan.price}
									</span>
									<span className="text-gray-500 dark:text-gray-400">
										/month
									</span>
								</div>
								<ul
									role="list"
									className="mb-8 space-y-4 text-left"
								>
									{plan.features.map((feature, idx) => (
										<li
											key={idx}
											className="flex items-center space-x-3"
										>
											<Check />
											<span>{feature}</span>
										</li>
									))}
								</ul>
								<a
									href="#"
									className="text-white bg-gr hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								>
									Get started
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Price;
