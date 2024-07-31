import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
	const body = await req.json();
	const { title, description, questions } = body;

	try {
		const newQuiz = await prisma.quiz.create({
			data: {
				title,
				description,
				questions: {
					create: questions.map((q) => ({
						questionText: q.questionText,
						answer: q.answer,
						answerChoices: q.answerChoices,
					})),
				},
			},
		});

		return NextResponse.json(newQuiz);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create quiz" },
			{ status: 500 }
		);
	}
}
