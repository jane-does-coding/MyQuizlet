import getCurrentUser from "@/app/actions/getCurrentUser";
import getQuizById from "@/app/actions/getQuizById";
import Quiz from "@/app/components/Pages/Quiz";
import TakeQuiz from "@/app/components/Pages/TakeQuiz";
import React from "react";

const page = async (props: any) => {
	const { params } = props;
	const quiz = await getQuizById(params);
	const currentUser = await getCurrentUser();

	if (!quiz) return "idk";

	console.log(quiz);

	return (
		<div>
			<TakeQuiz questions={quiz.questions} title={quiz.title} />
		</div>
	);
};

export default page;