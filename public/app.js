document.addEventListener('DOMContentLoaded', () => {
  // Получение данных пользователя из параметров URL
  const urlParams = new URLSearchParams(window.location.search);
  const tgWebAppData = JSON.parse(urlParams.get('tgWebAppData') || '{}');
  const { user, query_id } = tgWebAppData;
  const { id: telegramId, first_name: telegramName, username: telegramUsername } = user || {};

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
      if (selectedValue === 'other') {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
      } else {
        currentQuestionIndex += 2;
        showQuestion(currentQuestionIndex);
      }
    } else if (currentQuestion.type === 'input' || currentQuestion.type === 'textarea') {
      const inputValue = document.getElementById(`${currentQuestion.id}-${currentQuestion.type}`).value;
      if (!inputValue.trim()) {
        alert(`Заполните поле "${currentQuestion.id}"`);
        return;
      }
      updateReviewValues(currentQuestion.id, inputValue);
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
  });

  editButton.addEventListener('click', () => {
    document.getElementById('review-question').style.display = 'none';
    showQuestion(currentQuestionIndex);
  });

  submitButton.addEventListener('click', () => {
    // Отправка данных
    const formData = {
      telegram_id: telegramId,
      username: telegramUsername,
      name: telegramName,
      platform: urlParams.get('platform'),
      otherPlatform: urlParams.get('other-platform'),
      sphere: urlParams.get('sphere'),
      functionality: urlParams.get('functionality'),
      budget: urlParams.get('budget'),
      phone: urlParams.get('phone'),
      query_id
    };

    // Здесь должен быть код для отправки данных
    console.log('Отправлено:', formData);
  });

  // Обработка выбора платформы
  document.querySelectorAll('.answer-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const selectedButton = document.querySelector('.answer-button.selected');
      if (selectedButton) {
        selectedButton.classList.remove('selected');
      }
      event.target.classList.add('selected');
      const selectedValue = event.target.dataset.value;
      updateReviewValues('platform', selectedValue);
      if (selectedValue === 'other') {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
      } else {
        currentQuestionIndex += 2;
        showQuestion(currentQuestionIndex);
      }
    });
  });

  // Обработка выбора бюджета
  document.querySelectorAll('#budget-question .answer-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const selectedButton = document.querySelector('#budget-question .answer-button.selected');
      if (selectedButton) {
        selectedButton.classList.remove('selected');
      }
      event.target.classList.add('selected');
      const selectedValue = event.target.dataset.value;
      updateReviewValues('budget', selectedValue);
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    });
  });

  // Функция для обновления данных в review-контейнере
  function updateReviewValues(field, value) {
    urlParams.set(field, value);
    document.getElementById(`${field}-value`).textContent = value;
  }
});
