// components/JourneyCards.tsx
import React from "react";

const JourneyCards: React.FC = () => {
	const technologyAcquisitions = [
		{
			id: 1,
			title: "EPT AI App",
			description:
				"Answers come quickly with the custom eptAI app, featuring an intuitive UI, and streamlined navigation. Integrates directly with community forum questions and includes the handy 'ask ept a question' feature.",
			imageUrl:
				"https://www.orientsoftware.com/Themes/Content/Images/blog/2024-08-27/ai-apps-for-android-thumbnail.jpg",
		},
		{
			id: 2,
			title: "Automatic drafts for support tickets",
			description:
				"Integration with platforms like HubSpot and Zendesk streamlines your support workflow, providing teams with draft answers pre-populated in the ticketing interface.",
			imageUrl:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_Y1Xx3Hj1TjZXdgTJskXQMRTj2W0Qx4nKA&s",
		},
		{
			id: 3,
			title: "Direct Chat",
			description:
				"Enhance your team's efficiency with immediate support through direct communication channels like Slack, Email, and APIs—positioned right where your knowledge workers operate.",
			imageUrl:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB-0CO5hCjxRPa5OwIcMT_1iXtAcfAZ9WJpQ&s",
		},
	];

	return (
		<div className="bg-gr1 py-10">
			<h2 className="text-2xl md:text-3xl text-center font-semibold text-gray-800 mb-2">
				One platform for all stages
				<br /> of the user journey
			</h2>
			<p className="text-center mb-10">
				operations, serving as a versatile co-pilot within the
				applications your team already relies on, or through our bespoke
				eptAI application.
				<br /> It's like having an expert assistant in Slack,
				Salesforce, or wherever you work,
				<br /> ready to guide and enhance every interaction.
			</p>
			<div className="container mx-auto p-6 grid grid-cols-1 gap-6 md:grid-cols-3">
				{technologyAcquisitions.map((item) => (
					<div
						key={item.id}
						className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
					>
						<a>
							<img
								className="rounded-t-lg w-full"
								src={item.imageUrl}
								alt={item.title}
							/>
						</a>
						<div className="p-5">
							<a href="#">
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{item.title}
								</h5>
							</a>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{item.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default JourneyCards;
