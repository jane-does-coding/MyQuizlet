"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Quiz = ({ quiz }: any) => {
	const [flippedStates, setFlippedStates] = useState(
		Array(quiz.questions.length).fill(false)
	);

	const handleFlip = (index: number) => {
		const newFlippedStates = [...flippedStates];
		newFlippedStates[index] = !newFlippedStates[index];
		setFlippedStates(newFlippedStates);
	};

	return (
		<div className="">
			{quiz.questions.map((question: any, index: number) => (
				<motion.div
					key={index}
					onClick={() => handleFlip(index)}
					className="cursor-pointer p-4 mb-6 rounded-md relative h-[30vh] w-[60vw]"
					initial={{ rotateY: 0 }}
					animate={{ rotateY: flippedStates[index] ? 180 : 0 }}
					transition={{ duration: 0.6 }}
					style={{
						transformStyle: "preserve-3d",
					}}
				>
					<div
						className={`absolute inset-0 flex items-center justify-center p-4 rounded-md bg-zinc-700 text-neutral-200`}
						style={{
							backfaceVisibility: "hidden",
						}}
					>
						{question.questionText}
					</div>
					<div
						className={`absolute inset-0 flex items-center justify-center p-4 rounded-md bg-zinc-700 text-neutral-200`}
						style={{
							backfaceVisibility: "hidden",
							transform: "rotateY(180deg)",
						}}
					>
						{question.answer}
					</div>
				</motion.div>
			))}
			<table className="w-full mt-8 border-collapse text-neutral-300">
				<thead>
					<tr>
						<th className="border-b border-zinc-700 border-r p-2">Question</th>
						<th className="border-b border-zinc-700 p-2">Answer</th>
					</tr>
				</thead>
				<tbody>
					{quiz.questions.map((question: any, index: number) => (
						<tr key={index}>
							<td className="border-b border-zinc-700 border-r p-2 w-1/2">
								{question.questionText}
							</td>
							<td className="border-b border-zinc-700 p-2 w-1/2">
								{question.answer}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Quiz;
