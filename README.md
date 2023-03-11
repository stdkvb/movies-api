# movies-explorer-api
## О проекте

### Описание
**Веб-приложение «Movies Explorer»** – это дипломный проект, который был разработан в рамках изучения
онлайн-курса [Яндекс.Практикум](https://practicum.yandex.ru/) на освоение профессии «Веб-разработчик».

### Цель
Цель дипломного проекта – закрепление и демонстрацая ранее изученных навыков разработки веб-приложений.
В рамках выполнения этой цели была реализована бекенд-часть приложения.

### Репозиторий
В данном репозитории находится бекенд часть приложения, которая будет активно использоваться в функционировании всего веб-приложения.

### Технологии
- NodeJS
- Express
- MongoDB
- Mongoose
- JavaScript
## Техническая часть

### Адреса
- URL приложения: [https://api.myfilms.nomoredomains.sbs](https://api.myfilms.nomoredomains.sbs)
- IP адрес: 51.250.68.212 

### Команды для работы
1. `npm install` – установить все зависимости.
2. `npm run start` – запустить приложение.
3. `npm run dev` – запустить приложение с динамическим обновлением.
4. `npm run lint` – осуществить проверку на стилизацию кода.

### Эндпоинты
**Auth**
- POST: `/signup` – регистрация.
- POST: `/signin` – авторизация.
- POST: `/signout` – выход из системы.

**User**
- GET: `/users/me` – получить информацию о текущем (авторизованным) пользователе.
- PATCH: `/users/me` – обновить информацию текущего (авторизированного) пользователя.

**Movie**
- GET: `/movies` – получить список всех фильмов.
- POST: `/movies` – создать фильм.
- DELETE: `/movies/[movieID]` – удалить фильм по указанному ID.