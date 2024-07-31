import React from "react";
import GridCard from "../GridCard";

const Quizzes = () => {
	return (
		<div className="grid grid-cols-3 w-[90%] mx-auto gap-4">
			<GridCard />
			<GridCard />
			<GridCard />
			<GridCard />
		</div>
	);
};

export default Quizzes;
