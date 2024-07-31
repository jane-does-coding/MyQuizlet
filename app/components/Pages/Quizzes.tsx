import React from "react";
import GridCard from "../GridCard";

const Quizzes = ({ quizzes }: any) => {
	const cards = quizzes;
	/* 
	[
		{
			title: "Medical Prefixes",
			cards: 4,
			author: "Lorem Ipsum",
		},
		{
			title: "Body Systems",
			cards: 12,
			author: "Lorem Ipsum",
		},
		{
			title: "Lego",
			cards: 32,
			author: "Lorem Ipsum",
		},
	];
 */
	return (
		<div className="grid grid-cols-3 w-[90%] mx-auto gap-4">
			{cards.map((card: any) => (
				<GridCard card={card} />
			))}
		</div>
	);
};

export default Quizzes;
