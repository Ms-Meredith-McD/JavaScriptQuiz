const viewport = document.querySelector('#viewport')

let currentQuestion = 0

const allQuestions = [
{
    q: "What is JavaScript?",
    a: [
    {text: "A language", correct: true },
    {text: "An application", correct: false },
    {text: "A font", correct: false },
    {text: "A style", correct: false },
    ]
},
{
    q: "In what order is JavaScript executed?",
    a: [
    {text: "Right to left", correct: false },
    {text: "Descending numerically", correct: false },
    {text: "Ascending numerically", correct: false },
    {text: "Top to bottom", correct: true },
    ]
},
{
    q: "What punctuation ends a line of JavaScript?",
    a: [
    {text: " : ", correct: false },
    {text: " ; ", correct: true },
    {text: " ! ", correct: false },
    {text: " , ", correct: false },
    ]
},
{
    q: "What is an array?",
    a: [
    {text: "A list of data", correct: false },
    {text: "A list of variables", correct: false },
    {text: "A way to store multiple values with a single variable", correct: true },
    {text: "A cool fish", correct: false },
    ]
}]