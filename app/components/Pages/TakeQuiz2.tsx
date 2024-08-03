"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AnimatedTextWord from "../AnimatedTextWord";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
	[x: string]: any;
	question: string;
	choices: string[];
	correctAnswer: string;
}

const shuffleArray = <T,>(array: T[]): T[] => {
	let shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const createShuffledQuestions = (data: any): Question[] => {
	const shuffledQuestions = shuffleArray(data);

	return shuffledQuestions.map((question: any) => ({
		...question,
		choices: shuffleArray(question.answerChoices),
	}));
};

const TakeQuiz2 = ({
	questions: QuestionsArray,
	title,
}: {
	questions: any;
	title: string;
}) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
	const [score, setScore] = useState(0);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isQuizStarted, setIsQuizStarted] = useState(false);
	const [timerMinutes, setTimerMinutes] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const [isFading, setIsFading] = useState(false);
	const [showAnswers, setShowAnswers] = useState(false);

	const [questions, setQuestions] = useState<Question[]>(
		createShuffledQuestions(QuestionsArray)
	);

	const animations = {
		fadeIn: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3 },
		},
		fadeOut: {
			opacity: 0,
			y: 20,
			transition: { duration: 0.3 },
		},
	};

	const controls = useAnimation();

	useEffect(() => {
		if (isFading) {
			controls.start("fadeOut").then(() => {
				setIsFading(false);
				controls.start("fadeIn");
			});
		} else {
			controls.start("fadeIn");
		}
	}, [currentQuestionIndex, isFading]);

	useEffect(() => {
		setQuestions(createShuffledQuestions(QuestionsArray));
		setCurrentQuestionIndex(0);
		setSelectedAnswers([]);
	}, []);

	const currentQuestion = questions[currentQuestionIndex];
	const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

	const handleAnswerSelect = (choice: string) => {
		const updatedAnswers = [...selectedAnswers];
		updatedAnswers[currentQuestionIndex] = choice;
		setSelectedAnswers(updatedAnswers);
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setIsFading(true);
			setTimeout(() => {
				setCurrentQuestionIndex(currentQuestionIndex + 1);
				setIsFading(false);
			}, 300);
		}
	};

	const handlePrevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setIsFading(true);
			setTimeout(() => {
				setCurrentQuestionIndex(currentQuestionIndex - 1);
				setIsFading(false);
			}, 300);
		}
	};

	const handleSubmit = () => {
		let calculatedScore = 0;
		selectedAnswers.forEach((answer, index) => {
			if (answer === questions[index].answer) {
				calculatedScore += 1;
			}
		});
		setScore(calculatedScore);
		setIsSubmitted(true);
	};

	const handleStartQuiz = () => {
		setIsQuizStarted(true);
		if (timerMinutes > 0) {
			setTimeLeft(timerMinutes * 60);
		}
	};

	useEffect(() => {
		if (timeLeft > 0) {
			const timerId = setInterval(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
			return () => clearInterval(timerId);
		} else if (timeLeft === 0 && timerMinutes > 0) {
			handleSubmit();
		}
	}, [timeLeft]);

	const handleRestartQuiz = () => {
		setIsSubmitted(false);
		setIsQuizStarted(false);
		setShowAnswers(false);
		setCurrentQuestionIndex(0);
		setSelectedAnswers([]);
		setScore(0);
		setQuestions(createShuffledQuestions(QuestionsArray));
	};

	const router = useRouter();

	const QuestionResult = ({
		question,
		userAnswer,
		correctAnswer,
	}: {
		question: any;
		userAnswer: any;
		correctAnswer: any;
	}) => {
		const isCorrect = userAnswer === correctAnswer;
		return (
			<div className="w-full mb-4 p-4 bg-zinc-700 rounded-md text-neutral-200">
				<h3 className="text-[1.25rem]">{question}</h3>
				<p
					className={`text-[1rem] ${
						isCorrect ? "text-neutral-100" : "text-neutral-100"
					}`}
				>
					Your answer: {userAnswer}
				</p>
				{!isCorrect && (
					<p className="text-[1rem] text-yellow-200">
						Correct answer: {correctAnswer}
					</p>
				)}
			</div>
		);
	};

	if (!isQuizStarted) {
		return (
			<div className="w-[100vw] min-h-screen flex items-center justify-center">
				<div className="w-[45vw] min-h-[60vh] bg-zinc-800 mx-auto rounded-[1rem] flex flex-col items-center justify-center px-12">
					<AnimatedTextWord
						text={title}
						className="jura text-[2.5rem] mb-8 text-neutral-200"
					/>

					<div className="mb-8 w-full">
						<AnimatedTextWord
							text="Set Timer (minutes):"
							className="block mx-auto text-center mb-4 text-[1.25rem] text-neutral-200"
						/>
						<select
							id="timer"
							value={timerMinutes}
							className="w-full bg-yellow-100 border-yellow-200 border-[2px] rounded-full px-6 py-3 text-[1rem]"
							onChange={(e) => setTimerMinutes(parseInt(e.target.value))}
						>
							<option value={0}>No Timer</option>
							{Array.from({ length: 90 }, (_, i) => i + 1).map((minute) => (
								<option key={minute} value={minute}>
									{minute}
								</option>
							))}
						</select>
					</div>
					<button
						className="w-full bg-yellow-300 hover:bg-yellow-300/75 rounded-full py-3 text-[1.1rem] mt-4"
						onClick={handleStartQuiz}
					>
						Start Quiz
					</button>
				</div>
			</div>
		);
	}

	if (isSubmitted) {
		return (
			<div
				className={`w-[100vw] min-h-screen flex items-center justify-center ${
					showAnswers ? "pt-[10vh] pb-[5vh]" : ""
				}`}
			>
				<div className="w-[60vw] min-h-[60vh] overflow-auto bg-zinc-800 mx-auto rounded-[1rem] flex flex-col items-center justify-center px-12">
					<h2 className="text-[1.5rem] mb-4 text-neutral-200 mt-6">
						Quiz Completed!
					</h2>
					<p className="text-[1.35rem] text-neutral-200">
						Your score: {score}/{questions.length}
					</p>
					{showAnswers && (
						<div className="w-full mt-4 flex flex-col items-start justify-start">
							{questions.map((question, index) => (
								<QuestionResult
									key={index}
									question={question.questionText}
									userAnswer={selectedAnswers[index]}
									correctAnswer={question.answer}
								/>
							))}
						</div>
					)}
					<div className="w-full flex justify-between gap-4 mt-4 mb-8">
						<button
							onClick={() => setShowAnswers(!showAnswers)}
							className="w-full bg-yellow-300 hover:bg-yellow-300/75 rounded-full py-3 text-[1.1rem]"
						>
							{showAnswers ? "Hide Answers" : "View Answers"}
						</button>
						<button
							onClick={handleRestartQuiz}
							className="w-full bg-yellow-300 hover:bg-yellow-300/75 rounded-full py-3 text-[1.1rem]"
						>
							Restart
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-[100vw] h-screen flex items-center justify-center">
			<div className="w-[50vw] min-h-[40vh] bg-zinc-800 mx-auto rounded-[1rem] flex flex-col">
				<div className="w-[90%] mx-auto flex items-center justify-center gap-4 mt-8">
					<Progress
						value={((currentQuestionIndex + 1) / questions.length) * 100}
					/>
					<p className="flex items-center justify-center text-neutral-100">{`${
						currentQuestionIndex + 1
					}/${questions.length}`}</p>
				</div>
				{timerMinutes > 0 && (
					<div className="w-[90%] mx-auto flex items-center justify-center mt-4">
						<p className="text-[1rem]">
							Time left:{" "}
							{`${Math.floor(timeLeft / 60)}:${
								timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60
							}`}
						</p>
					</div>
				)}
				<h2 className="w-[90%] jura mx-auto mt-6 text-[1.3rem] pb-6 border-b-[1px] border-neutral-200">
					<motion.div
						variants={animations}
						initial="fadeIn"
						animate={controls}
						className="text-neutral-200"
					>
						{currentQuestion.questionText}
					</motion.div>
				</h2>
				<div className="w-[90%] mx-auto">
					<RadioGroup
						onValueChange={(value) => handleAnswerSelect(value)}
						className="my-6 mb-12"
						value={selectedAnswers[currentQuestionIndex] || ""}
					>
						{currentQuestion.choices.map((choice, index) => (
							<motion.div
								key={index}
								variants={animations}
								initial="fadeIn"
								animate={controls}
								className="flex space-x-3 items-center justify-start"
							>
								<RadioGroupItem value={choice} id={choice} className="" />
								<Label
									htmlFor={choice}
									className="jura text-[1.25rem] my-2 text-neutral-200"
								>
									{choice}
								</Label>
							</motion.div>
						))}
					</RadioGroup>
				</div>
				<div className="w-[90%] mx-auto mt-auto mb-6 flex justify-between gap-4">
					<button
						onClick={handlePrevQuestion}
						disabled={currentQuestionIndex === 0}
						className="w-full bg-yellow-300 hover:bg-yellow-300/75 rounded-full py-3 text-[1.1rem] flex items-center justify-center gap-2"
					>
						<IoIosArrowBack size={24} />
						Previous
					</button>
					{currentQuestionIndex < questions.length - 1 ? (
						<button
							onClick={handleNextQuestion}
							className="w-full bg-yellow-300 hover:bg-yellow-300/75 rounded-full py-3 text-[1.1rem] flex items-center justify-center gap-2"
						>
							Next
							<IoIosArrowForward size={24} />
						</button>
					) : (
						<button
							onClick={handleSubmit}
							className="w-full bg-yellow-300 hover:bg-yellow-300/75 rounded-full py-3 text-[1.1rem]"
						>
							Submit
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default TakeQuiz2;
