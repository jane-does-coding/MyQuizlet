import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

interface IParams {
	quizId: string;
}

export default async function getUserById(params: IParams) {
	try {
		const user = await prisma.quiz.findMany({
			where: {
				id: params.quizId,
			},
			include: {
				questions: true,
				creator: true,
			},
		});

		console.log(user);

		if (!user) {
			return null;
		}

		return user;
	} catch (err: any) {
		return null;
	}
}
