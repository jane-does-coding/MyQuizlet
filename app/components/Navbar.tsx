import React from "react";

const Navbar = ({ currentUser }: any) => {
	return (
		<div className="flex fixed w-full md:w-[80vw] md:ml-[10vw] text-neutral-200 bg-zinc-700 border-2 border-yellow-200/50 px-8 py-2 top-4 rounded-full">
			{/* 	<a href="/">Home</a>
			<a href="/">Quizzes</a> */}
			<a href="/">Home</a>
			<a href="/">Quizzes</a>
			<a href="/">Profile</a>
		</div>
	);
};

export default Navbar;
