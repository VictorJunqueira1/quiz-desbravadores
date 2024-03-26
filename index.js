// DEFININDO AS VARIÁVEIS

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;

const questionContainer = document.getElementById('questionContainer');
const answersContainer = document.getElementById('answersContainer');
const nextQuestionButton = document.getElementById('nextQuestion');
const resultContainer = document.getElementById('resultContainer');
const correctAnswersCountSpan = document.getElementById('correctAnswersCount');
const incorrectAnswersCountSpan = document.getElementById('incorrectAnswersCount');
const restartQuizButton = document.getElementById('restartQuiz');

// MOSTRAR RESULTADO

function showResults() {
    questionContainer.style.display = 'none';
    answersContainer.style.display = 'none';
    nextQuestionButton.style.display = 'none';
    resultContainer.style.display = 'block';
    correctAnswersCountSpan.innerHTML = correctAnswersCount;
    incorrectAnswersCountSpan.innerHTML = incorrectAnswersCount;

    correctAnswersCountSpan.innerHTML = correctAnswersCount;
    incorrectAnswersCountSpan.innerHTML = incorrectAnswersCount;

    // CALCULAR PORCENTAGEM
    const percentage = (correctAnswersCount / questions.length) * 100;
    const percentageDisplay = document.createElement('p');
    percentageDisplay.innerHTML = `Porcentagem de acertos: ${percentage.toFixed(2)}%`;
    percentageDisplay.classList.add('text-lg', 'font-semibold', 'text-center', 'mt-4');

    // REMOVENDO PORCENTAGEM ANTERIOR
    const existingPercentageDisplay = document.querySelector('#resultContainer p:last-child');
    if (existingPercentageDisplay) {
        resultContainer.removeChild(existingPercentageDisplay);
    }

    resultContainer.appendChild(percentageDisplay);
}

// CARREGAR QUESTÃO

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = currentQuestion.question;
    answersContainer.innerHTML = '';

    currentQuestion.answer.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerHTML = answer.option;
        button.classList.add('bg-blue-300', 'hover:bg-blue-500', 'w-full', 'text-black', 'font-bold', 'py-2', 'px-4', 'rounded-md', 'my-2', 'transition-all', 'duration-300');
        button.onclick = () => handleAnswerClick(answer.correct);
        answersContainer.appendChild(button);
    });
}

// ARMAZENAR QUESTÕES CORRETAS E INCORRETAS

function handleAnswerClick(isCorrect) {
    if (isCorrect) {
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }
    currentQuestionIndex++;
    loadQuestion();
}

// AVANÇAR E REINICIAR

nextQuestionButton.addEventListener('click', loadQuestion);
restartQuizButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    resultContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    answersContainer.style.display = 'block';
    nextQuestionButton.style.display = 'flex';
    loadQuestion();
});

loadQuestion();