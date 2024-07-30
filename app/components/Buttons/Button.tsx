import React from "react";

const Button = ({ text, onClick, disabled, secondary }: any) => {
	return (
		<button
			className={` transition  rounded-md px-4 py-2
            ${
							secondary
								? "bg-neutral-800 hover:bg-neutral-700 text-black"
								: "bg-yellow-400 hover:bg-yellow-300 text-neutral-900"
						}
            `}
		>
			{text}
		</button>
	);
};

export default Button;
