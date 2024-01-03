const startButton = document.getElementById('start');
startButton.addEventListener('click', function(){
    startTimer();
})

const header = document.querySelector('header');

const viewport = document.querySelector('#viewport');

const final = document.querySelector
('#final');

let currentQuestion = 0;

const allQuestions = [
    {
        q: "What is JavaScript?",
        a: [
            { text: "A language", correct: true },
            { text: "An application", correct: false },
            { text: "A font", correct: false },
            { text: "A style", correct: false },
        ]
    },
    {
        q: "In what order is JavaScript executed?",
        a: [
            { text: "Right to left", correct: false },
            { text: "Descending numerically", correct: false },
            { text: "Ascending numerically", correct: false },
            { text: "Top to bottom", correct: true },
        ]
    },
    {
        q: "What punctuation ends a line of JavaScript?",
        a: [
            { text: " : ", correct: false },
            { text: " ; ", correct: true },
            { text: " ! ", correct: false },
            { text: " , ", correct: false },
        ]
    },
    {
        q: "When was JavaScript invented?",
        a: [
            { text: "1987", correct: false },
            { text: "1995", correct: true },
            { text: "1999", correct: false },
            { text: "2002", correct: false },
        ]
    },
    {
        q: "What is an array?",
        a: [
            { text: "A list of data", correct: false },
            { text: "A list of variables", correct: false },
            { text: "A way to store multiple values with a single variable", correct: true },
            { text: "A cool fish", correct: false },
        ]
    }]

function startButtonClick(event) {
    const startText = document.createElement("p");
    startText.textContent = 'Try to answer the following JavaScript related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!'
    const startButton = document.getElementById('start');
    header.appendChild(startText);
    startButton.addEventListener('click', function(){   
        buildNextQuestion()
        startButton.remove()
        header.innerHTML = ''
    });
}

function handleButtonClick(event) {
    console.log(event.target.getAttribute("correctAnswer"))
    if (currentQuestion < allQuestions.length) {
        const answers = document.getElementById("viewport");
        console.log(answers)
         // clear viewport
        viewport.innerHTML = ''
        buildNextQuestion()
//wrong answer?
        // subtract ten seconds
    }
    else { 
        viewport.innerHTML =''
        winner()
}
}
// run out of time?

function startTimer() {
    let counter = 0;

    const interval = setInterval(()=> {
    // check the page every second for completion of questions
    console.log('Questions complete?');

    counter++;

    if (counter >= 60) {
        // stop the interval after 60 seconds
        clearInterval(interval);
        console.log('Out of Time! Game Over!')
    }
}, 1000);
}

function buildNextQuestion() {
    const currentQuestionObj = allQuestions[currentQuestion]
    const questionText = currentQuestionObj.q
    currentQuestion++


    const pTag = document.createElement("p");
    pTag.textContent = questionText
    viewport.appendChild(pTag)

    const buttons = currentQuestionObj.a.map(function (obj) {
        const btn = document.createElement("button");
        btn.textContent = obj.text
        btn.setAttribute("correctAnswer", obj.correct)
        btn.addEventListener("click", handleButtonClick)
        viewport.appendChild(btn)
    })
}

function winner(){
    const winnerText = document.createElement("p");
    winnerText.textContent = 'Congratulations!'
    finalWinner.appendChild(winnerText)
}
startButtonClick();