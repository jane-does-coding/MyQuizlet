"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import GridCard from "../GridCard";
import { useRouter } from "next/navigation";

const Quiz = ({ quiz, quizzes }: any) => {
	const [flippedStates, setFlippedStates] = useState(
		Array(quiz.questions.length).fill(false)
	);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleFlip = (index: number) => {
		const newFlippedStates = [...flippedStates];
		newFlippedStates[index] = !newFlippedStates[index];
		setFlippedStates(newFlippedStates);
	};

	const handlePrevious = () => {
		setCurrentIndex((prev) =>
			prev === 0 ? quiz.questions.length - 1 : prev - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prev) =>
			prev === quiz.questions.length - 1 ? 0 : prev + 1
		);
	};

	const router = useRouter();

	return (
		<div className="flex">
			<div className="w-[65vw] pl-[6rem] pt-[6rem]">
				<h1 className="text-center mx-auto flex items-center justify-center text-neutral-200 mb-6 text-[2rem]">
					{quiz.title}
				</h1>
				<div className=" flex gap-4 items-center justify-center w-[100%] mx-auto mb-6">
					<button
						onClick={() => router.push(`/quizzes/take-quiz/${quiz.id}`)}
						className={
							"transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
						}
					>
						Learn
					</button>
					<button
						onClick={() => router.push(`/quizzes/take-quiz/${quiz.id}`)}
						className={
							"transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
						}
					>
						Quiz
					</button>
					<button
						onClick={() => router.push(`/quizzes/take-quiz/${quiz.id}`)}
						className={
							"transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
						}
					>
						Flshcards
					</button>
				</div>
				<div className="relative mb-8">
					<button
						className="absolute -left-[4rem] top-1/2 transform -translate-y-1/2 bg-yellow-300 text-neutral-800 p-2 h-[3rem] w-[3rem] flex items-center justify-center rounded-full"
						onClick={handlePrevious}
					>
						{"<"}
					</button>
					<button
						className="absolute -right-[4rem] top-1/2 transform -translate-y-1/2 bg-yellow-300 text-neutral-800 p-2 h-[3rem] w-[3rem] flex items-center justify-center rounded-full"
						onClick={handleNext}
					>
						{">"}
					</button>
					<div className="overflow-hidden">
						{quiz.questions.map((question: any, index: number) => (
							<div
								key={index}
								className={`transition-transform duration-500 ${
									index === currentIndex ? "block" : "hidden"
								}`}
							>
								<motion.div
									onClick={() => handleFlip(index)}
									className="cursor-pointer p-4 mb-6 rounded-md relative h-[30vh] w-[100%] mx-auto"
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
							</div>
						))}
					</div>
				</div>
				<table className="w-full mt-8 border-collapse text-neutral-300">
					<thead>
						<tr>
							<th className="border-b border-zinc-700 border-r p-2">
								Question
							</th>
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
			<div className="w-[35vw] ml-[6rem] bg-zinc-900 h-screen flex flex-col py-6 pt-12 gap-4 pr-8">
				{quizzes.map((card: any) => (
					<GridCard card={card} />
				))}
			</div>
		</div>
	);
};

export default Quiz;
