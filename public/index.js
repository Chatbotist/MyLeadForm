<!DOCTYPE html>
<html>
<head>
  <title>Заявка на чат-бота</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class="container">
    <h2>Заявка на чат-бота</h2>
    <form id="survey-form">
      <div class="question">
        <h3>Для какой платформы нужен чат-бот?</h3>
        <div class="options">
          <label><input type="radio" name="platform" value="Telegram" required> Telegram</label>
          <label><input type="radio" name="platform" value="Вконтакте" required> Вконтакте</label>
          <label><input type="radio" name="platform" value="Instagram" required> Instagram</label>
          <label><input type="radio" name="platform" value="WhatsApp" required> WhatsApp</label>
          <label><input type="radio" name="platform" value="Viber" required> Viber</label>
          <label><input type="radio" name="platform" value="Avito" required> Avito</label>
          <label><input type="radio" name="platform" value="Discord" required> Discord</label>
          <label><input type="radio" name="platform" value="Сайт" required> Сайт</label>
          <label><input type="radio" name="platform" value="Другое" required> Другое</label>
        </div>
      </div>
      <div class="question">
        <h3>Для какой сферы нужен чат-бот?</h3>
        <input type="text" class="input-field" id="bot-purpose" required>
      </div>
      <div class="question">
        <h3>Какой функционал и особенности должны быть в боте?</h3>
        <textarea class="input-field" id="bot-features" required></textarea>
      </div>
      <div class="question">
        <h3>Какой бюджет вы планируете выделить на разработку?</h3>
        <div class="options">
          <label><input type="radio" name="budget" value="15000-30000" required> 15 000 - 30 000</label>
          <label><input type="radio" name="budget" value="30000-60000" required> 30 000 - 60 000</label>
          <label><input type="radio" name="budget" value="60000-120000" required> 60 000 - 120 000</label>
          <label><input type="radio" name="budget" value="over120000" required> от 120 000</label>
        </div>
      </div>
      <div class="question">
        <h3>Введите ваш номер телефона</h3>
        <input type="tel" class="input-field" id="phone-number" required>
      </div>
      <div class="buttons">
        <button type="submit" class="submit-btn">Отправить</button>
      </div>
    </form>
  </div>
  <script src="index.js"></script>
</body>
</html>
