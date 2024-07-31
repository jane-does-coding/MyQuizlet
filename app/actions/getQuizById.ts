import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

interface IParams {
	quizId: string;
}

export default async function getQuizById(params: IParams) {
	try {
		const currentUser = await getCurrentUser();
		const { quizId } = params;

		if (!currentUser) {
			return null;
		}

		const quiz = await prisma.quiz.findUnique({
			where: {
				id: quizId,
			},
			include: {
				questions: true,
			},
		});

		if (!quiz) {
			return null;
		}

		return quiz;
	} catch (err: any) {
		return null;
	}
}
