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
const allQuestions = [
    {
        q: "What is JavaScript?",
        a: [
            { text: "A language"},
            { text: "An application"},
            { text: "A font"},
            { text: "A style"},
        ],
        c: "A language"
    },
    {
        q: "In what order is JavaScript normally executed?",
        a: [
            { text: "Right to left"},
            { text: "Descending numerically"},
            { text: "Ascending numerically"},
            { text: "Top to bottom"},
        ],
        c: "Top to bottom"
    },
    {
        q: "What punctuation ends a line of JavaScript?",
        a: [
            { text: " : "},
            { text: " ; "},
            { text: " ! "},
            { text: " , "},
        ],
        c: " ; "
    },
    {
        q: "When was JavaScript invented?",
        a: [
            { text: "1987"},
            { text: "1995"},
            { text: "1999"},
            { text: "2002"},
        ],
        c: "1995"
    },
    {
        q: "What is an array?",
        a: [
            { text: "A list of data"},
            { text: "A list of variables"},
            { text: "A way to store multiple values with a single variable"},
            { text: "A cool fish"},
        ],
        c: "A way to store multiple values with a single variable"
    }]

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
    console.log(event.target.getAttribute("correctAnswer"))
    if (currentQuestion < allQuestions.length) {
        const answers = document.getElementById("viewport");
        console.log(answers)
        // clear viewport
        viewport.innerHTML = ''
        checkAnswer(this.textContent)
    }
}

function startTimer() {
    // let counter = 0;

    interval = setInterval(() => {
        // check the page every second for completion of questions
        console.log('Questions complete?');

        counter++;

        if (totalQuestionsAnswered === allQuestions.length) {
            // stop the timer and call some function that ends the game
            clearInterval(interval)
            endTheGame(counter)

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
                console.log("Out of time");
            }
            endTheGame()
        }
    }, 1000);
}


function endTheGame(counter) {
    // if the user wins - what to display and storing the score "You Win!" 
    if (totalQuestionsAnswered === 5) {
        
        // with an input and a button so user can input their initials
        //  with button click save to local storage
        // else the user loses - what do I want to display "Game Over"

    }
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

function winner() {
    const winnerText = document.createElement("p");
    winnerText.textContent = 'Congratulations!'
    finalWinner.appendChild(winnerText)
}

startButtonClick();