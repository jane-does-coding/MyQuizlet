"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutBtn = () => {
	return (
		<div>
			<button onClick={() => signOut()}>Signout</button>
		</div>
	);
};

export default SignOutBtn;
