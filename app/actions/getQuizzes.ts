import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getQuizzes() {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return null;
		}

		const quizzes = await prisma.quiz.findMany({
			include: {
				questions: true,
			},
		});

		if (!quizzes) {
			return null;
		}

		return quizzes;
	} catch (err: any) {
		return null;
	}
}
