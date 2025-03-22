
let currentQuestionIndex = 0;
let score = 0;
let timerValue = 30;
let quizData = [];

const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const startButton = document.getElementById('start-button');
const welcomeContainer = document.getElementById('welcome-container');
const quizContainer = document.getElementById('quiz-container');

function loadQuizData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            quizData = data;
        });
}

function startQuiz() {
    
    welcomeContainer.style.display = 'none';
     quizContainer.style.display = 'block';

   
    displayQuestion();
    startTimer();
}

startButton.onclick = startQuiz;

function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = option;
        input.id = 'option' + index;

        const label = document.createElement('label');
        label.setAttribute('for', 'option' + index);
        label.textContent = option;

        const div = document.createElement('div');
        div.appendChild(input);
        div.appendChild(label);
        optionsContainer.appendChild(div);
    });

    nextButton.style.display = 'none';
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) return;

    const currentQuestion = quizData[currentQuestionIndex];

    if (selectedOption.value === currentQuestion.correctAnswer) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }

    
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = 'block';
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
};

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timerValue <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        } else {
            timerElement.textContent = `Time: ${timerValue}`;
            timerValue--;
        }
    }, 1000);
}

function endQuiz() {
    alert(`Quiz finished! Your score is: ${score}`);
}

optionsContainer.addEventListener('change', checkAnswer);


loadQuizData();
