const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const CHANNEL_ID = '@your_channel_username';

let users = []; // Временное хранение данных пользователей

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/getUserDataByTelegramId', (req, res) => {
  const { telegram_id } = req.query;
  const userData = users.find(user => user.telegram_id === parseInt(telegram_id));
  if (userData) {
    res.json({ data: userData });
  } else {
    res.status(404).json({ error: 'Пользователь не найден' });
  }
});

app.post('/api/addUserData', (req, res) => {
  const { telegramId, username, name, platform, botPurpose, botFeatures, budget, phoneNumber } = req.body;

  // Проверяем, есть ли пользователь с таким Telegram ID
  const existingUser = users.find(user => user.telegram_id === telegramId);
  if (existingUser) {
    return res.status(400).json({ error: 'Пользователь с таким telegram_id уже существует' });
  }

  // Создание сообщения для отправки в Telegram-канал
  const message = `
Новая заявка на чат-бота:
Платформа: ${platform}
Сфера: ${botPurpose}
Функционал и особенности: ${botFeatures}
Бюджет: ${budget}
Номер телефона: ${phoneNumber}
Пользователь: @${username} (ID: ${telegramId})
`;

  // Отправка сообщения в Telegram-канал
  sendMessageToChannel(message);

  // Сохранение данных пользователя
  const newUser = { telegram_id: telegramId, username, name, platform, botPurpose, botFeatures, budget, phoneNumber };
  users.push(newUser);

  res.status(201).json(newUser);
});

async function sendMessageToChannel(message) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHANNEL_ID,
        text: message
      })
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке сообщения в канал');
    }
  } catch (error) {
    console.error('Ошибка при отправке сообщения в канал:', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
