import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

interface IParams {
	userId: string;
}

export default async function getUserById(params: IParams) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: params.userId,
			},
			include: {
				quizzes: true,
			},
		});

		/* 		console.log(user);
		 */
		if (!user) {
			return null;
		}

		return user;
	} catch (err: any) {
		return null;
	}
}
