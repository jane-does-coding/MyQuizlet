import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
	const body = await req.json();
	const { id, email, name, password, username } = body;

	let hashedPassword;
	if (password) {
		hashedPassword = await bcrypt.hash(password, 12);
	}

	const updatedUser = await prisma.user.update({
		where: { id },
		data: {
			email,
			name,
			username,
			...(hashedPassword && { hashedPassword }),
		},
	});

	return NextResponse.json(updatedUser);
}
