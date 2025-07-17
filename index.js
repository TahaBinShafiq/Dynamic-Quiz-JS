let questions = [];

function getData() {
    fetch("https://the-trivia-api.com/v2/questions").then(res => res.json()).then((res) => {
        questions = res;
        console.log(questions)
    })
}
getData();

const mcqQuestion = document.getElementById("question");
const input = document.getElementById("input");
const btn = document.getElementById("btn");

let increamentQuestion = 0;
let score = 0;
let answered = false;


function showQuestions() {

    let selected = document.querySelector('input[name="option"]:checked');
    if (increamentQuestion !== 0) {
        if (selected === null || selected.value === '') {
            alert("Please select this option");
            return;
        }

        const userAnswer = selected.value;
        const correctAnswer = questions[increamentQuestion - 1].correctAnswer;
        console.log(correctAnswer)
        console.log(userAnswer)

        if (userAnswer === correctAnswer) {
            score++;
        }

    }

    if (increamentQuestion === questions.length) {
        mcqQuestion.innerHTML = `Your Score is: ${score} out of ${questions.length}`;
        input.innerHTML = '';
        btn.innerHTML = "Restart Quiz";
        btn.onclick = restartQuiz;
        return;
    }

    let options = [...questions[increamentQuestion].incorrectAnswers, questions[increamentQuestion].correctAnswer]
    console.log(questions[increamentQuestion].correctAnswer);
    options.sort(() => Math.random() - 0.5);

    mcqQuestion.innerHTML = questions[increamentQuestion].question.text;
    btn.innerHTML = "Next"
    input.innerHTML = ""

    btn.style.display = "block";
    options.map((element) => {
        input.innerHTML += `<div onclick="stylingAnswer(this)" class="option-div"> <input type="radio"  name="option" value="${element}" id="${element}" onchange="btn.style.display='block'">
        <label for="${element}">${element}</label> </div>`
        console.log(element)
    })

    increamentQuestion++

    if (questions.length === increamentQuestion) {
        btn.innerHTML = "Check Result"
    }
}


function restartQuiz() {
    score = 0;
    increamentQuestion = 0;
    btn.onclick = showQuestions;
    showQuestions();
}

function stylingAnswer(selectedDiv) {
    var allOptions = document.querySelectorAll(".option-div");

    for (var i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.remove("active");
    }
    selectedDiv.classList.add("active");

    selectedDiv.querySelector("input[type=radio]").checked = true;

    btn.style.display = 'block';
}

