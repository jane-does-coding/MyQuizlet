import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: any) {
	const body = await req.json();
	const { title, description, questions } = body;
	const currentUser: any = await getCurrentUser();

	try {
		const newQuiz = await prisma.quiz.create({
			data: {
				/* 				creator: currentUser,
				 */ creatorId: currentUser.id,
				title,
				description,
				questions: {
					create: questions.map((q: any) => ({
						questionText: q.questionText,
						answer: q.answer,
						answerChoices: q.answerChoices,
					})),
				},
			},
		});

		return NextResponse.json(newQuiz);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to create quiz" },
			{ status: 500 }
		);
	}
}
