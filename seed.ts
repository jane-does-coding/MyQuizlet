const quizzes = [
	{
		title: "Italian Cuisine Quiz",
		description: "Test your knowledge on classic Italian dishes.",
		questions: [
			{
				text: "What is the main ingredient in Spaghetti Carbonara's sauce?",
				choices: [
					{ text: "Tomato", isCorrect: false },
					{ text: "Eggs and cheese", isCorrect: true },
					{ text: "Cream", isCorrect: false },
					{ text: "Pesto", isCorrect: false },
				],
			},
			{
				text: "Which pasta is used in Chicken Alfredo?",
				choices: [
					{ text: "Spaghetti", isCorrect: false },
					{ text: "Penne", isCorrect: false },
					{ text: "Fettuccine", isCorrect: true },
					{ text: "Linguine", isCorrect: false },
				],
			},
			{
				text: "What is a key ingredient in a Margherita Pizza?",
				choices: [
					{ text: "Pepperoni", isCorrect: false },
					{ text: "Mozzarella", isCorrect: true },
					{ text: "Ham", isCorrect: false },
					{ text: "Anchovies", isCorrect: false },
				],
			},
			// Add more questions as needed...
		],
	},
	{
		title: "Dessert Quiz",
		description: "How well do you know classic desserts?",
		questions: [
			{
				text: "What is a key ingredient in Tiramisu?",
				choices: [
					{ text: "Chocolate", isCorrect: false },
					{ text: "Mascarpone cheese", isCorrect: true },
					{ text: "Pecans", isCorrect: false },
					{ text: "Apples", isCorrect: false },
				],
			},
			{
				text: "What is the primary flavor in Lemon Bars?",
				choices: [
					{ text: "Vanilla", isCorrect: false },
					{ text: "Cinnamon", isCorrect: false },
					{ text: "Lemon", isCorrect: true },
					{ text: "Almond", isCorrect: false },
				],
			},
			{
				text: "Which fruit is used in Peach Cobbler?",
				choices: [
					{ text: "Peach", isCorrect: true },
					{ text: "Apple", isCorrect: false },
					{ text: "Berry", isCorrect: false },
					{ text: "Banana", isCorrect: false },
				],
			},
			// Add more questions as needed...
		],
	},
	// Add more quizzes as needed...
];

// Example code to insert quizzes into the database
async function main() {
	for (const quiz of quizzes) {
		const createdQuiz = await prisma.quiz.create({
			data: {
				title: quiz.title,
				description: quiz.description,
				questions: {
					create: quiz.questions.map((question) => ({
						text: question.text,
						choices: {
							create: question.choices.map((choice) => ({
								text: choice.text,
								isCorrect: choice.isCorrect,
							})),
						},
					})),
				},
			},
		});
		console.log(`Created quiz: ${createdQuiz.title}`);
	}
}
