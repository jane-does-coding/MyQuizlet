import getCurrentUser from "@/app/actions/getCurrentUser";
import getQuizById from "@/app/actions/getQuizById";
import Quiz from "@/app/components/Pages/Quiz";
import React from "react";

const page = async (props: any) => {
	const { params } = props;
	const quiz = await getQuizById(params);
	const currentUser = await getCurrentUser();

	if (!quiz) return "idk";

	console.log(quiz);

	return (
		<div>
			<Quiz quiz={quiz} currentUser={currentUser} />
		</div>
	);
};

export default page;
