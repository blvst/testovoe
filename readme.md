# README

### Установка всех неоходимых модулей
```npm i```

### Запуск с отслеживанием изменений
```npm run start```

### Сборка для production
```npm run build```

### Структура папок и файлов
```
├── app/                       # Исходники
│   ├── components/            # Блоки
│   │   └── block/             # Блок
│   │       ├── block.pug      # Разметка блока
│   │       ├── block.js       # Скрипт блока
│   │       └── block.pcss     # Стили блока
│   ├── pages/                 # Страницы
│   │   └── index.pug          # Разметка страницы
│   ├── icons/                 # Иконки
│   │   ├── svg/               # SVG иконки для генерации векторного спрайта
│   │   └── png/               # PNG иконки для генерации растрового спрайта
│   ├── static/                # Статические файлы для копирования в dist
│   ├── js/                    # Скрипты
│   │   └── app.js             # Главный скрипт
│   └── styles/                # Стили
│       ├── helpers/           # Помощники
│       │   ├── fonts.pcss     # Подключение шрифтов
│       │   ├── sprites.pcss   # Переменные с размерами SVG иконок (автосборка)
│       │   └── variables.pcss # Переменные
│       ├── app.pcss           # Главный стилевой файл
│       └── base.pcss          # Стили страницы
├── build/                     # Сборка (автогенерация)
│   ├── assets/                # Подключаемые ресурсы
│   │   ├── fonts/             # Шрифты
│   │   ├── images/            # Изображения
│   │   ├── build.js           # Скрипты
│   │   └── build.css          # Стили
│   └── index.html             # Страница
├── .babelrc                   # Конфигурация проверки Babel
├── .browserlistrc             # Список версий браузеров для Autoprefixer
├── .eslintrc                  # Конфигурация проверки JavaScript в ESLint
├── .gitignore                 # Список исключённых файлов из Git
├── .stylelintrc               # Конфигурация проверки CSS в CSSLint
├── .eslintrc                  # Конфигурация проверки JavaScript в ESLint
├── gulpfile.babel.js          # Файл для запуска Gulp.js
├── package.json               # Список модулей и прочей информации
├── postcss.cofig.js           # Конфигурация postcss (пустой файл)
├── readme.md                  # Документация шаблона
└── webpack.config.js          # Конфигурация Webpack
