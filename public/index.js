// Инициализация Telegram Web App
Telegram.WebApp.init();

// Установка цвета фона в зависимости от темы пользователя
document.body.style.backgroundColor = Telegram.WebApp.colorScheme === 'dark' ? '#000000' : '#ffffff';

// Получение данных пользователя
const { user_id, username, first_name } = Telegram.WebApp.initDataUnsafe;

// Обработка событий клика на кнопки
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');

let currentQuestion = 0;
const questions = document.querySelectorAll('.question');

backBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    questions[currentQuestion].style.display = 'none';
    currentQuestion--;
    questions[currentQuestion].style.display = 'block';
  }
});

nextBtn.addEventListener('click', () => {
  // Проверка заполнения текущего вопроса
  const currentQuestionEl = questions[currentQuestion];
  const inputs = currentQuestionEl.querySelectorAll('input, textarea');
  let valid = true;
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      valid = false;
    }
  });

  if (valid) {
    currentQuestionEl.style.display = 'none';
    currentQuestion++;
    if (currentQuestion < questions.length) {
      questions[currentQuestion].style.display = 'block';
    } else {
      // Отображение итогового экрана
      displaySummary();
    }
  } else {
    alert('Пожалуйста, заполните все обязательные поля.');
  }
});

function displaySummary() {
  // Получение данных из формы
  const platformRadio = document.querySelector('input[name="platform"]:checked');
  const botPurpose = document.getElementById('bot-purpose').value;
  const botFeatures = document.getElementById('bot-features').value;
  const budgetRadio = document.querySelector('input[name="budget"]:checked');
  const phoneNumber = document.getElementById('phone-number').value;

  // Вывод данных на экран
  const summaryContainer = document.createElement('div');
  summaryContainer.innerHTML = `
    <h2>Заявка на чат-бота</h2>
    <p>Платформа: ${platformRadio ? platformRadio.value : 'Не выбрано'}</p>
    <p>Сфера: ${botPurpose}</p>
    <p>Функционал и особенности: ${botFeatures}</p>
    <p>Бюджет: ${budgetRadio ? budgetRadio.value : 'Не выбрано'}</p>
    <p>Номер телефона: ${phoneNumber}</p>
    <div class="buttons">
      <button id="edit-btn">Редактировать</button>
      <button id="submit-btn">Отправить</button>
    </div>
  `;
  document.body.innerHTML = '';
  document.body.appendChild(summaryContainer);

  // Обработка событий клика на кнопки
  const editBtn = document.getElementById('edit-btn');
  const submitBtn = document.getElementById('submit-btn');

  editBtn.addEventListener('click', () => {
    // Очистка введенных данных и переход к первому вопросу
    questions.forEach((question) => {
      question.style.display = 'none';
    });
    questions[0].style.display = 'block';
    currentQuestion = 0;
  });

  submitBtn.addEventListener('click', async () => {
    try {
      // Отправка данных по API Telegram
      const response = await fetch('/api/addUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ telegramId: user_id, username, name: first_name, platform: platformRadio.value, botPurpose, botFeatures, budget: budgetRadio.value, phoneNumber })
      });

      if (response.ok) {
        alert('Данные успешно отправлены!');
        Telegram.WebApp.close();
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.error}`);
      }
    } catch (error) {
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
      console.error('Ошибка при отправке данных:', error);
    }
  });
}

// Открытие приложения на весь экран
Telegram.WebApp.expand();

// Включение вертикальной прокрутки
Telegram.WebApp.enableVerticalSwipes();

// Включение подтверждения закрытия
Telegram.WebApp.enableClosingConfirmation();
