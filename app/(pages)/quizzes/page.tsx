import getQuizzes from "@/app/actions/getQuizzes";
import Quizzes from "@/app/components/Pages/Quizzes";
import React from "react";

const page = async () => {
	const quizzes = await getQuizzes();
	console.log(quizzes);
	return (
		<div>
			<br />
			<Quizzes />
		</div>
	);
};

export default page;
