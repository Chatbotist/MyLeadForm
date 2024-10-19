// Инициализация Telegram Web App
Telegram.WebApp.onEvent('mainButtonClicked', function() {
  saveAndSendUserData();
});
// Установка цвета фона в зависимости от темы пользователя
Telegram.WebApp.setBackgroundColor(Telegram.WebApp.colorScheme === 'dark' ? '#000000' : '#ffffff');

// Получение данных пользователя
const { user_id, username, first_name } = Telegram.WebApp.initDataUnsafe;

// Обработка события отправки формы
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  saveAndSendUserData();
});

async function saveAndSendUserData() {
  // Получение данных из формы
  const platform = document.querySelector('input[name="platform"]:checked')?.value;
  const botPurpose = document.getElementById('bot-purpose').value;
  const botFeatures = document.getElementById('bot-features').value;
  const budget = document.querySelector('input[name="budget"]:checked')?.value;
  const phoneNumber = document.getElementById('phone-number').value;

  // Проверка заполнения всех полей
  if (!platform || !botPurpose || !botFeatures || !budget || !phoneNumber) {
    Telegram.WebApp.showPopup({
      title: 'Ошибка',
      message: 'Пожалуйста, заполните все обязательные поля.'
    });
    return;
  }

  try {
    // Отправка данных по API Telegram
    const response = await fetch('/api/addUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ telegramId: user_id, username, name: first_name, platform, botPurpose, botFeatures, budget, phoneNumber })
    });

    if (response.ok) {
      Telegram.WebApp.showPopup({
        title: 'Успех',
        message: 'Данные успешно отправлены!'
      });
      Telegram.WebApp.close();
    } else {
      const error = await response.json();
      Telegram.WebApp.showPopup({
        title: 'Ошибка',
        message: `Ошибка: ${error.error}`
      });
    }
  } catch (error) {
    Telegram.WebApp.showPopup({
      title: 'Ошибка',
      message: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.'
    });
    console.error('Ошибка при отправке данных:', error);
  }
}

// Открытие приложения на весь экран
Telegram.WebApp.expand();

// Включение подтверждения закрытия
Telegram.WebApp.enableClosingConfirmation();
