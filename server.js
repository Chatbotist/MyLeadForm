const express = require('express');
const path = require('path');
const { getUserDataByTelegramId, addUserData, updateUserData, sendMessageToChannel, BOT_TOKEN, CHANNEL_ID } = require('./utils');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/getUserDataByTelegramId', async (req, res) => {
  const { telegram_id } = req.query;
  try {
    const userData = await getUserDataByTelegramId(telegram_id);
    res.json({ data: userData });
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    if (error.message === 'Пользователь не найден') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
  }
});

app.post('/api/addUserData', async (req, res) => {
  const { telegramId, username, name } = req.body;
  try {
    const userData = await addUserData(telegramId, username, name);
    res.status(201).json(userData);
  } catch (error) {
    console.error('Ошибка при добавлении данных пользователя:', error);
    if (error.message === 'Пользователь с таким telegram_id уже существует') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Ошибка при добавлении данных пользователя' });
  }
});

app.post('/api/updateUserData', async (req, res) => {
  const { item_id, data } = req.body;
  try {
    const updatedData = await updateUserData(item_id, data);
    res.json(updatedData);
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' });
  }
});

app.post('/api/sendMessageToChannel', async (req, res) => {
  const { message, telegramId } = req.body;
  try {
    const response = await sendMessageToChannel(message, telegramId);
    res.json(response);
  } catch (error) {
    console.error('Ошибка при отправке сообщения в канал:', error);
    if (error.message === 'Пользователь не подписан на канал') {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: 'Ошибка при отправке сообщения в канал' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
