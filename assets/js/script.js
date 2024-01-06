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
let counter = 0;
let gameOver = false
let scoreData;
let isScoreDisplayed = false;

const yes = document.getElementById('correct');
const no = document.getElementById('incorrect');
const displayScoresButton = document.getElementById('highscore');

const allQuestions = [
    {
        q: "What is JavaScript?",
        a: [
            { text: "A language" },
            { text: "An application" },
            { text: "A font" },
            { text: "A style" },
        ],
        c: "A language"
    },
    {
        q: "In what order is JavaScript normally executed?",
        a: [
            { text: "Right to left" },
            { text: "Descending numerically" },
            { text: "Ascending numerically" },
            { text: "Top to bottom" },
        ],
        c: "Top to bottom"
    },
    {
        q: "What punctuation ends a line of JavaScript?",
        a: [
            { text: " : " },
            { text: " ; " },
            { text: " ! " },
            { text: " , " },
        ],
        c: " ; "
    },
    {
        q: "When was JavaScript invented?",
        a: [
            { text: "1987" },
            { text: "1995" },
            { text: "1999" },
            { text: "2002" },
        ],
        c: "1995"
    },
    {
        q: "What is an array?",
        a: [
            { text: "A list of data" },
            { text: "A list of variables" },
            { text: "A way to store multiple values with a single variable" },
            { text: "A cool fish" },
        ],
        c: "A way to store multiple values with a single variable"
    }
]
console.log('Number of Questions: ' + allQuestions.length)
function startButtonClick(event) {
    const header = document.querySelector('header')
    const startText = document.createElement("p");
    const currentHigh = document.getElementById('span')
    startText.textContent = 'Try to answer the following JavaScript related questions within the time limit. Keep in mind that incorrect answers will penalize your time by three seconds!'
    const startButton = document.getElementById('start');
    header.appendChild(startText);
    gameOver = false;
}

startButton.addEventListener('click', function () {
    buildNextQuestion()
    startButton.remove()
    startTimer()
    displayScoresButton.remove()

});

function handleButtonClick(event) {
    if (currentQuestion <= allQuestions.length) {
        const answers = document.getElementById("viewport");
        console.log('answers: ' + answers)
        // clear viewport
        viewport.innerHTML = ''
        checkAnswer(this.textContent)
    }
}

function startTimer() {
    // returning a function tells javascript to not progress beyond where the function is called

    interval = setInterval(() => {
        if (gameOver) {
            clearInterval(interval)
        } else {
            // check the page every second for completion of questions
            counter++;
            console.log('counter: ' + counter);
            console.log(totalQuestionsAnswered + "|" + allQuestions.length)
            if (totalQuestionsAnswered === allQuestions.length) {
                gameOver = true
                // stop the timer and call some function that ends the game
                console.log('intervals: ' + interval)
                console.log('timer counter: ' + counter)
                clearInterval(interval)
                return endTheGame(true)
            } else {
                // stop the interval after 50 seconds
                if (counter >= 50) {
                    gameOver = true
                    clearInterval(interval);
                    return endTheGame(false)
                }
            }
        }
    }, 1000);
}

function endTheGame(isWinner) {
    const gameOver = document.getElementById("gameOver");
    gameOver.textContent = 'Game Over!'
    if (isWinner) winner()
}

function buildNextQuestion() {
    if (currentQuestion < allQuestions.length) {
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
}

function winner() {
    console.log("winner function")
    const winnerText = document.getElementById('gameOver');
    winnerText.textContent = 'Congratulations!'

    let inputContainer = document.getElementById("initials");
    let inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Enter your initials");

    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";

    inputContainer.appendChild(inputField);
    inputContainer.appendChild(submitButton);
    console.log()
    console.log('score: ' + score)
    console.log(inputField)

    submitButton.addEventListener("click", function () {
        let data = {
            initials: inputField.value,
            score: score
        };
        localStorage.setItem("scoreData", JSON.stringify(data));
    }
    )
}


function checkAnswer(guess) {
    // if answer is true - add to score - display "Correct"
    console.log(allQuestions[currentQuestion - 1].c)
    if (allQuestions[currentQuestion - 1].c === guess) {
        const correctText = document.createElement('p');
        correctText.textContent = 'Correct!';
        correct.appendChild(correctText);
        console.log('Correct!');
        score++;
        totalQuestionsAnswered++;
        console.log('Total Questions Answered: ' + totalQuestionsAnswered)
        console.log('Score: ' + score);
        setTimeout(() => {
            yes.innerText = '';
        }, 1000);
        setTimeout(() => {
            buildNextQuestion();
        }, 1000);
    } else if (totalQuestionsAnswered === allQuestions.length) {
        winner()
        // with an input and a button so user can input their initials

    } else {
        // else answer is false - display "Wrong" - proceed to next question
        const incorrectText = document.createElement('p');
        incorrectText.textContent = 'Wrong!';
        incorrect.appendChild(incorrectText);
        console.log('Wrong!');
        totalQuestionsAnswered++;
        console.log(totalQuestionsAnswered)
        counter = counter + 3
        console.log(counter)
        setTimeout(() => {
            no.innerText = '';
        }, 1000);
        setTimeout(() => {
            buildNextQuestion();
        }, 1000);
    }
}

displayScoresButton.addEventListener('click', function () {
    const storedScores = localStorage.getItem('scoreData');

    if (storedScores) {
        const scores = JSON.parse(storedScores);

        // Check if the score is already displayed
        if (!isScoreDisplayed) {
            const displayScores = document.createElement('span');
            displayScores.textContent = ` Highscore: ${scores.initials} ${scores.score}`;
            displayScoresButton.parentNode.insertBefore(displayScores, displayScoresButton.nextSibling);

            // Update the state to indicate that the score is displayed
            isScoreDisplayed = true;
        }

        displayScoresButton.style.display = 'none';
        console.log('Stored Scores: ' + scores);
    } else {
        const displayScores = document.createElement('span');
        displayScoresButton.style.display = 'none';
        displayScores.textContent = ' Highscores: No high scores found';
        displayScoresButton.parentNode.insertBefore(displayScores, displayScoresButton.nextSibling);
    }
});
// Create the button element
var reloadButton = document.createElement('button');
reloadButton.textContent = 'Reload';

// Add event listener to the button
reloadButton.addEventListener('click', function () {
    // Reload the page
    location.reload();
});

// Append the button to the document body or any other desired element
document.getElementById('reload').appendChild(reloadButton);

startButtonClick();