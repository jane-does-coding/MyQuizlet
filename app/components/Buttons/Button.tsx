"use client";
import React from "react";

const Button = ({ text, onClick, disabled, wide, secondary }: any) => {
	return (
		<button
			className={`transition rounded-md px-4 py-2 ${
				secondary
					? "bg-zinc-800 hover:bg-zinc-700 text-black"
					: "bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900"
			} ${wide ? "w-full" : "w-fit"} ${
				disabled ? "cursor-not-allowed opacity-50" : ""
			}`}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
