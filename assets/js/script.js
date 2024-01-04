const startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    startTimer();
})

const header = document.querySelector('header');

const viewport = document.querySelector('#viewport');

const final = document.querySelector
    ('#final');

let currentQuestion = 0;

let interval;
let totalQuestionsAnswered = 0;
let score = 0;

const yes = document.getElementById('correct');
const no = document.getElementById('incorrect');
const allQuestions = [
    {
        q: "What is JavaScript?",
        a: [
            { text: "A language", correct: true },
            { text: "An application", correct: false },
            { text: "A font", correct: false },
            { text: "A style", correct: false },
        ],
        c: "A language"
    },
    {
        q: "In what order is JavaScript normally executed?",
        a: [
            { text: "Right to left", correct: false },
            { text: "Descending numerically", correct: false },
            { text: "Ascending numerically", correct: false },
            { text: "Top to bottom", correct: true },
        ],
        c: "Top to bottom"
    },
    {
        q: "What punctuation ends a line of JavaScript?",
        a: [
            { text: " : ", correct: false },
            { text: " ; ", correct: true },
            { text: " ! ", correct: false },
            { text: " , ", correct: false },
        ],
        c: " ; "
    },
    {
        q: "When was JavaScript invented?",
        a: [
            { text: "1987", correct: false },
            { text: "1995", correct: true },
            { text: "1999", correct: false },
            { text: "2002", correct: false },
        ],
        c: "1995"
    },
    {
        q: "What is an array?",
        a: [
            { text: "A list of data", correct: false },
            { text: "A list of variables", correct: false },
            { text: "A way to store multiple values with a single variable", correct: true },
            { text: "A cool fish", correct: false },
        ],
        c: "A way to store multiple values with a single variable"
    }]

function startButtonClick(event) {
    const startText = document.createElement("p");
    startText.textContent = 'Try to answer the following JavaScript related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!'
    const startButton = document.getElementById('start');
    header.appendChild(startText);

}

startButton.addEventListener('click', function () {
    buildNextQuestion()
    startButton.remove()
    header.innerHTML = ''
    startTimer()
});

function handleButtonClick(event) {
    console.log(event.target.getAttribute("correctAnswer"))
    if (currentQuestion < allQuestions.length) {
        const answers = document.getElementById("viewport");
        console.log(answers)
        // clear viewport
        viewport.innerHTML = ''
        checkAnswer(this.textContent)
    }
    else {
        viewport.innerHTML = ''
        winner()
    }
}

function startTimer() {
    let counter = 0;

    interval = setInterval(() => {
        // check the page every second for completion of questions
        console.log('Questions complete?');

        counter++;

        if (totalQuestionsAnswered === allQuestions.length) {
            clearInterval(interval)
            endTheGame(counter)
            // stop the timer and call some function that ends the game
        }
        // stop the interval after 60 seconds
        if (counter >= 60) {
            // go back to start page
            clearInterval(interval);
            console.log('out of time')
            endTheGame()
        }
    }, 1000);
}


function endTheGame(counter) {
    // if the user wins - what to display and storing the score "You Win!" 
    // with an input and a button so user can input their initials
    //  with button click save to local storage
    // else the user loses - what do I want to display "Game Over"

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
function checkAnswer(guess) {
    // if answer is true - add to score - display "Correct"
    console.log(guess)
    console.log(allQuestions[currentQuestion - 1].c)
    if (allQuestions[currentQuestion - 1].c === guess) {
        const correctText = document.createElement('p');
        correctText.textContent = 'Correct!';
        correct.appendChild(correctText);
        console.log('Correct!');
        score++;
        console.log(score);
        setTimeout(() => {
            yes.innerText = '';
        }, 1000);
        setTimeout(() => {
            buildNextQuestion();
        }, 1000);

    } else {
        // else answer is false - display "Wrong" - proceed to next question
        const incorrectText = document.createElement('p');
        incorrectText.textContent = 'Wrong!';
        incorrect.appendChild(incorrectText);
        console.log('Wrong!');
        setTimeout(() => {
            no.innerText = '';
        }, 1000);
        setTimeout(() => {
            buildNextQuestion();
        }, 1000);
    }
}

function winner() {
    const winnerText = document.createElement("p");
    winnerText.textContent = 'Congratulations!'
    finalWinner.appendChild(winnerText)
}

startButtonClick();