import React from "react";
import GridCard from "../GridCard";

const Quizzes = ({ quizzes }: any) => {
	const cards = quizzes;

	return (
		<div className="grid grid-cols-3 w-[90%] mx-auto gap-4 pt-[5rem]">
			{cards.map((card: any) => (
				<GridCard card={card} key={card.id} />
			))}
		</div>
	);
};

export default Quizzes;
