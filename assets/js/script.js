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
    const startText = document.createElement("p");
    startText.textContent = 'Try to answer the following JavaScript related questions within the time limit. Keep in mind that incorrect answers will penalize your time by five seconds!'
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
    if (currentQuestion <= allQuestions.length) {
        const answers = document.getElementById("viewport");
        console.log('answers: ' + answers)
        // clear viewport
        viewport.innerHTML = ''
        checkAnswer(this.textContent)
    }
}

function startTimer() {
    // let counter = 0;

    interval = setInterval(() => {
        // check the page every second for completion of questions
        counter++;
        console.log('counter: ' + counter);
        if (totalQuestionsAnswered === allQuestions.length) {
            // stop the timer and call some function that ends the game
            // clearInterval(interval)
            console.log('intervals: ' + interval)
            console.log('timer counter: ' + counter)
            function endTheGame() {
                const loserText = document.getElementById(gameOver);
                loserText.textContent = 'Game Over!'
                gameOver.appendChild(loserText)
            }

        }
        // stop the interval after 50 seconds
        if (counter = 50) {
            // clearInterval(interval);
            function countDown(num) {
                for (var i = num; i > 0; i--) {
                    console.log(i);
                    if (i === 1) {
                        break;
                    }
                }
                console.log("Counter has reached 50 - Out of Time");
            }
            function endTheGame() {
                const loserText = document.getElementById(gameOver);
                loserText.textContent = 'Game Over!'
                gameOver.appendChild(loserText)
            }
        }
    }, 1000);
}

function buildNextQuestion() {
if (currentQuestion < allQuestions.length){
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
    } else if (totalQuestionsAnswered === 5) {
            function winner() {
                const winnerText = document.getElementById(gameOver);
                winnerText.textContent = 'Congratulations!'
                gameOver.appendChild(winnerText)
            }
            // with an input and a button so user can input their initials
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
    
            submitButton.addEventListener("click", function () {
                let init = inputField.value;
                let final = score;
    
                let data = {
                    initials: init,
                    score: final
                };
                localStorage.setItem("scoreData", JSON.stringify(data));
            });
    } else {
        // else answer is false - display "Wrong" - proceed to next question
        const incorrectText = document.createElement('p');
        incorrectText.textContent = 'Wrong!';
        incorrect.appendChild(incorrectText);
        console.log('Wrong!');
        totalQuestionsAnswered++;
        console.log(totalQuestionsAnswered)
        counter = counter + 5
        console.log(counter)
        setTimeout(() => {
            no.innerText = '';
        }, 1000);
        setTimeout(() => {
            buildNextQuestion();
        }, 1000);
    }
}
displayScoresButton.addEventListener('click', function() {
    const storedScores = localStorage.getItem('scoreData');
    if (storedScores) {
        const scores = JSON.parse(storedScores);
        const displayScores = document.createElement('p');
        displayScores.textContent = scores;
        winners.appendChild(displayScores);
        console.log('Stored Scores: ' + scores);
    } else {
        const displayScores = document.createElement('p');
        displayScores.textContent = 'No high scores found';
        winners.appendChild(displayScores);
    }
})

startButtonClick();