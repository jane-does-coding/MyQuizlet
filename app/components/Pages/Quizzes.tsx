import React from "react";
import GridCard from "../GridCard";

const Quizzes = () => {
	const cards = [
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

	return (
		<div className="grid grid-cols-3 w-[90%] mx-auto gap-4">
			{cards.map((card) => (
				<GridCard card={card} />
			))}
		</div>
	);
};

export default Quizzes;
