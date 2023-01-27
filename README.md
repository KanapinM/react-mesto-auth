# Проект: Место с регистрацией и авторизацией

### Описание:
Проект содержит в себе блоки фотокарточек, добавленные пользователями. Это небольшой аналог популярной социальной сети ин100грам, в которой пользователи и Вы могут делиться фотокарточками, ставить лайки и удалять свои ранее добавленные, если они им перестали нравиться. Вы можете персонализировать свою страничку, указав своё имя и деятельность, а ещё установить автарку.

В проекте реализована регистрация и авторизация с сохранением данных о пользователе.

Все запросы на авторизацию, регистрацию и проверку токена работают через сервис `https://auth.nomoreparties.co`. Остальные запросы, не относящиеся к этой проектной работе могут быть к бэкенду из предыдущих спринтов.

### Какие технологии использовались: 
При работе с проектом использовались флекс-бокс вёрстка, гриды и относительные единицы измерения для обеспечения адаптивного отображения страницы. Функционал в виде увеличения изображения по клику, а также открытия попапов для внесения корректировок информации о пользователе и добавлении карточек реализован с помощью JavaScript. Сборка проекта реализована через webpack.  Добавленная валидация форм не позволяет пользователю ввести некорректные данные. По средствам Api запросов пользователь при входе видит информацию в своем профиле, которую он может редактировать, а так же общий пул фотокарточек, с возможностью добавления новых. Удалять можно только свои карточки, перед удалением всплывает попап повторного подтверждения для исключения непреднамеренных действий.
Для поддержки более старых браузеров и минификации используется Babel и PostCSS соответственно.

Добавлена новая функциональность:
- Регистрация
- Авторизация
- Сохраненение информации о вашей авторизации, что бы при повторной регистрации вам не приходилось заново вводить логин и пароль, но если Вы всё же захотите выйти из своего профиля, то можете воспользоваться кнопкой "Выйти".

### Cтек:
- JavaScript
- webpack
- Babel
- Валидация форм
- API запросы
- html
- CSS
- Flexbox
- Grid
- БЭМ
- SPA (Single Page Application)
- REST API

### Ознакомиться с проектом можно по ссылке ниже: 
https://kanapinm.github.io/mesto/