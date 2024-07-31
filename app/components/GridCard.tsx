import React from "react";

const GridCard = ({ card }: any) => {
	return (
		<a
			href={`/quizzes/${card.id}`}
			className="w-full bg-zinc-800 rounded-md py-4 pb-6 px-4 hover:border-yellow-200 border-b-4 border-zinc-800 transition cursor-pointer"
		>
			<h2 className="text-neutral-100 mb-3 text-[1.25rem]">{card.title}</h2>
			<span className="bg-yellow-300 text-neutral-800 px-2 py-[1px] rounded-full text-sm">
				{card.questions.length} questions
			</span>
			<div className="flex gap-2 items-center justify-start mt-6">
				<img
					src="/avatar.png"
					className="w-[25px] h-[25px] object-cover rounded-full"
					alt=""
				/>
				<h2 className="text-neutral-300 text-sm">{card.author}</h2>
			</div>
		</a>
	);
};

export default GridCard;
