import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const Faq = () => {
	const [openItem, setOpenItem] = useState<number | null>(null);

	const toggleItem = (id: number) => {
		setOpenItem((prevItem) => (prevItem === id ? null : id));
	};

	const faqs = [
		{
			id: 1,
			question:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, massa, viverra tempus, pulvinar ullamcorper odio. Amet non enim, orci ut vivamus pellentesque sed sit nam.",
		},
		{
			id: 2,
			question:
				"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices?",
			answer: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce nec nisl sed libero efficitur blandit.",
		},
		{
			id: 3,
			question: "Curabitur aliquet quam id dui posuere blandit?",
			answer: "Curabitur aliquet quam id dui posuere blandit. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
		},
	];

	return (
		<div className="container bg-[rgb(250,250,250)] py-3 mt-5 rounded">
			<h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 mt-10 mb-4">
				Veelgestelde vragen
			</h2>
			
			<div id="accordion-collapse">
				{faqs.map((faq) => (
					<div key={faq.id} className="border rounded-3xl mb-4">
						<h2 id={`accordion-collapse-heading-${faq.id}`}>
							<button
								type="button"
								onClick={() => toggleItem(faq.id)}
								className={`${
									openItem === faq.id
										? "bg-gray-100 rounded-t-3xl"
										: "rounded-3xl"
								} flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 hover:bg-gray-100 gap-3`}
								aria-expanded={openItem === faq.id}
								aria-controls={`accordion-collapse-body-${faq.id}`}
							>
								<span>{faq.question}</span>
								{openItem === faq.id ? (
									<Minus className="w-6 h-6" />
								) : (
									<Plus className="w-6 h-6" />
								)}
							</button>
						</h2>
						<div
							id={`accordion-collapse-body-${faq.id}`}
							className={`${
								openItem === faq.id ? "block" : "hidden"
							} p-5 dark:border-gray-700 dark:bg-gray-900`}
							aria-labelledby={`accordion-collapse-heading-${faq.id}`}
						>
							<p className="mb-2 text-gray-500 dark:text-gray-400">
								{faq.answer}
							</p>
							<p className="text-gray-500 dark:text-gray-400">
								Check out this guide to learn how to{" "}
								<a
									href="#"
									className="text-blue-600 dark:text-blue-500 hover:underline"
								>
									get started
								</a>
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Faq;
