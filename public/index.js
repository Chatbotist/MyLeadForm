// Обработка события отправки формы
const form = document.getElementById('survey-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  sendSurveyData();
});

async function sendSurveyData() {
  // Получение данных из формы
  const platform = document.querySelector('input[name="platform"]:checked')?.value;
  const botPurpose = document.getElementById('bot-purpose').value;
  const botFeatures = document.getElementById('bot-features').value;
  const budget = document.querySelector('input[name="budget"]:checked')?.value;
  const phoneNumber = document.getElementById('phone-number').value;

  // Проверка заполнения всех полей
  if (!validateForm()) {
    return;
  }

  try {
    // Отправка данных на сервер
    const response = await fetch('/api/sendSurveyData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ platform, botPurpose, botFeatures, budget, phoneNumber })
    });

    if (response.ok) {
      alert('Данные успешно отправлены!');
      form.reset();
    } else {
      const error = await response.json();
      alert(`Ошибка: ${error.error}`);
    }
  } catch (error) {
    alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
    console.error('Ошибка при отправке данных:', error);
  }
}

function validateForm() {
  // Получение данных из формы
  const platform = document.querySelector('input[name="platform"]:checked');
  const botPurpose = document.getElementById('bot-purpose');
  const botFeatures = document.getElementById('bot-features');
  const budget = document.querySelector('input[name="budget"]:checked');
  const phoneNumber = document.getElementById('phone-number');

  // Проверка заполнения всех полей
  if (!platform || !botPurpose.value || !botFeatures.value || !budget || !phoneNumber.value) {
    return false;
  }

  return true;
}
