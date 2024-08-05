import React from "react";
import SignOutBtn from "./SignOutBtn";

const Navbar = ({ currentUser }: any) => {
	return (
		<div className="flex items-center justify-center fixed w-full md:w-[80vw] md:ml-[10vw] text-neutral-200 bg-zinc-700 border-2 border-yellow-200/50 px-8 py-3 top-4 rounded-full gap-12">
			{/* 	<a href="/">Home</a>
			<a href="/">Quizzes</a> */}
			<a href="/" className="text-neutral-200 py-1">
				Home
			</a>
			<a href="/" className="text-neutral-200 py-1">
				Quizzes
			</a>
			<a href="/" className="text-neutral-200 py-1">
				Profile
			</a>
			{currentUser ? (
				<>
					<a href="/" className="text-neutral-200 py-1">
						Login
					</a>
					<a href="/" className="text-neutral-200 py-1">
						Register
					</a>
				</>
			) : (
				<>
					<SignOutBtn />
				</>
			)}
		</div>
	);
};

export default Navbar;
