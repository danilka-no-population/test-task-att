# Ekskursii.by — Лендинг экскурсии «Тысячелетний Брест и Брестская крепость»

Адаптивный лендинг, свёрстанный по макету Figma на HTML5, SCSS и нативном JavaScript. Сборка на Vite.

Сайт доступен по ссылке https://test-task-att.vercel.app/ (Произведен deploy в сервисе Vercel)

## Стек

- HTML5 (семантические теги, БЭМ-нейминг)
- SCSS (модульная архитектура: variables / mixins / base / blocks)
- Vite (сборщик и dev-сервер)
- Vanilla JavaScript (без jQuery и UI-фреймворков)
- [flatpickr](https://flatpickr.js.org/) — календарь для полей дат

## Структура проекта

```
.
├── index.html              # Главная HTML-страница
├── package.json
├── vite.config.js
├── public/
│   └── images/             # Изображения (логотипы, фото, иконки)
└── src/
    ├── styles/
    │   ├── main.scss       # Точка входа стилей
    │   ├── _variables.scss # Цвета, брейкпоинты, токены
    │   ├── _mixins.scss    # Миксины (медиа-запросы, focus, reset)
    │   ├── _base.scss      # Базовые стили и сброс
    │   ├── _header.scss    # Шапка + бургер-меню
    │   ├── _hero.scss      # Первый экран
    │   ├── _schedule.scss  # Расписание + форма + карточки
    │   ├── _reviews.scss   # Отзывы + слайдер
    │   └── _footer.scss    # Подвал
    └── scripts/
        └── main.js         # JS-логика: бургер, скролл, слайдер, форма, календарь
```

## Запуск проекта

### 1. Установить зависимости

```bash
npm install
```

### 2. Запустить dev-сервер (http://localhost:3000)

```bash
npm run dev
```

### 3. Собрать production-версию в папку `dist/`

```bash
npm run build
```

### 4. Посмотреть собранную версию локально

```bash
npm run preview
```