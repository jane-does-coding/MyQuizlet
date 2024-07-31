"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateQuiz = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [questions, setQuestions] = useState([
		{ questionText: "", answer: "", answerChoices: ["", "", "", ""] },
	]);

	const router = useRouter();

	const addQuestion = () => {
		setQuestions([
			...questions,
			{ questionText: "", answer: "", answerChoices: ["", "", "", ""] },
		]);
	};

	const handleQuestionChange = (index, field, value) => {
		const newQuestions = [...questions];
		newQuestions[index][field] = value;
		setQuestions(newQuestions);
	};

	const handleAnswerChoiceChange = (qIndex, cIndex, value) => {
		const newQuestions = [...questions];
		newQuestions[qIndex].answerChoices[cIndex] = value;
		setQuestions(newQuestions);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("/api/create-quiz", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description, questions }),
		});
		if (response.ok) {
			alert("Quiz created successfully!");
		} else {
			alert("Failed to create quiz.");
		}
	};

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="w-full md:w-[50vw] h-auto bg-zinc-800 rounded-xl">
				<h1 className="mx-auto text-white text-center flex items-center justify-center text-[2rem] mt-6 mb-6">
					<img
						src="/avatar.png"
						className="w-[50px] h-[50px] rounded-full object-cover mr-4"
						alt="Profile Avatar"
					/>
					Create a New Quiz
				</h1>
				<div className="w-full border-t-2 border-zinc-900 mb-auto">
					<form onSubmit={handleSubmit}>
						<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
							<label htmlFor="title" className="text-neutral-400">
								Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
								required
							/>
						</div>
						<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
							<label htmlFor="description" className="text-neutral-400">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
								required
							></textarea>
						</div>
						{questions.map((question, qIndex) => (
							<div key={qIndex} className="border-t-2 border-zinc-900">
								<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
									<label
										htmlFor={`question-${qIndex}`}
										className="text-neutral-400"
									>
										Question {qIndex + 1}
									</label>
									<input
										type="text"
										id={`question-${qIndex}`}
										name={`question-${qIndex}`}
										value={question.questionText}
										onChange={(e) =>
											handleQuestionChange(
												qIndex,
												"questionText",
												e.target.value
											)
										}
										className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
										required
									/>
								</div>
								<div className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6">
									<label
										htmlFor={`answer-${qIndex}`}
										className="text-neutral-400"
									>
										Answer
									</label>
									<input
										type="text"
										id={`answer-${qIndex}`}
										name={`answer-${qIndex}`}
										value={question.answer}
										onChange={(e) =>
											handleQuestionChange(qIndex, "answer", e.target.value)
										}
										className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
										required
									/>
								</div>
								{question.answerChoices.map((choice, cIndex) => (
									<div
										className="flex items-center pb-4 pt-4 w-[90%] mx-auto gap-6"
										key={cIndex}
									>
										<label
											htmlFor={`choice-${qIndex}-${cIndex}`}
											className="text-neutral-400"
										>
											Choice {cIndex + 1}
										</label>
										<input
											type="text"
											id={`choice-${qIndex}-${cIndex}`}
											name={`choice-${qIndex}-${cIndex}`}
											value={choice}
											onChange={(e) =>
												handleAnswerChoiceChange(qIndex, cIndex, e.target.value)
											}
											className="text-neutral-200 bg-zinc-700 rounded-md px-2 py-1 w-full"
											required
										/>
									</div>
								))}
							</div>
						))}
						<div className="flex gap-4 w-[90%] mx-auto mt-auto">
							<button
								type="button"
								onClick={addQuestion}
								className="transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
							>
								Add Question
							</button>
							<button
								type="submit"
								className="transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
							>
								Create Quiz
							</button>
							<button
								type="button"
								className="transition rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-300/75 text-neutral-900 w-full"
								onClick={() => router.push("/")}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateQuiz;
