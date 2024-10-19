// Получение данных пользователя
const urlParams = new URLSearchParams(window.location.search);
const telegramId = urlParams.get('telegram_id');
const telegramUsername = urlParams.get('username');
const telegramName = urlParams.get('name');

// Логика переключения вопросов
let currentQuestionIndex = 0;
const questions = [
  { id: 'platform', type: 'buttons' },
  { id: 'other-platform', type: 'input' },
  { id: 'sphere', type: 'textarea' },
  { id: 'functionality', type: 'textarea' },
  { id: 'budget', type: 'buttons' },
  { id: 'phone', type: 'input' },
  { id: 'review', type: 'review' }
];

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

function showQuestion(index) {
  questions.forEach((question, i) => {
    const questionContainer = document.getElementById(`${question.id}-question`);
    if (i === index) {
      questionContainer.style.display = 'block';
      prevButton.disabled = i === 0;
      nextButton.disabled = false;
    } else {
      questionContainer.style.display = 'none';
    }
  });
}

prevButton.addEventListener('click', () => {
  currentQuestionIndex--;
  showQuestion(currentQuestionIndex);
});

nextButton.addEventListener('click', () => {
  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion.type === 'buttons') {
    const selectedButton = document.querySelector(`.answer-button.selected`);
    if (!selectedButton) {
      alert('Выберите вариант ответа');
      return;
    }
    const selectedValue = selectedButton.dataset.value;
    updateReviewValues(currentQuestion.id, selectedValue);
  } else if (currentQuestion.type === 'input' || currentQuestion.type === 'textarea') {
    const inputValue = document.getElementById(`${currentQuestion.id}-${currentQuestion.type}`).value;
    if (!inputValue.trim()) {
