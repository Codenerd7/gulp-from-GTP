### Основные возможности сборки Gulp-GTP:

1. **Автоматическая компиляция и обновление страницы:**
   - Сборка автоматически компилирует файлы Pug в HTML, Sass в CSS и JavaScript, обновляя страницу браузера при внесении изменений.

2. **Оптимизация изображений:**
   - Встроенные задачи для оптимизации изображений помогут уменьшить их размер, улучшая производительность загрузки страниц.

3. **Создание SVG спрайтов:**
   - Позволяет объединять несколько SVG-иконок в один спрайт, что делает управление иконками в проекте более удобным.

4. **Минификация файлов:**
   - Есть возможность минифицировать HTML, CSS и JavaScript файлы для оптимизации размера и ускорения загрузки страниц.

5. **Конфигурируемость:**
   - Легко настраиваемые пути к файлам и другие параметры сборки, чтобы они соответствовали вашим потребностям.

6. **Поддержка методологии БЭМ:**
   - Структура проекта и нейминг файлов организованы в соответствии с методологией БЭМ, что облегчает разработку и поддержку.

Эти возможности позволяют ускорить процесс разработки, улучшить производительность и упростить поддержку вашего веб-проекта.



# Документация к сборке Gulp-GTP

## Установка

Прежде чем начать использовать сборку, убедитесь, что у вас установлен Node.js и npm. Затем выполните следующие шаги:

1. Склонируйте репозиторий сборки или создайте новый проект.
2. Перейдите в корневую папку проекта.
3. Установите зависимости, выполнив команду:

gulp-gtp/
│
├── dist/ # Каталог сборки
│ ├── css/ # Стили
│ ├── fonts/ # Шрифты
│ ├── img/ # Изображения
│ └── js/ # JavaScript файлы
│
├── src/ # Исходные файлы проекта
│ ├── assets/ # Ресурсы проекта
│ │ ├── fonts/ # Шрифты
│ │ ├── images/ # Изображения
│ │ ├── scripts/ # JavaScript файлы
|	|	|	└──	main.js
│ │ └── index.js # Основной файл JavaScript
│ │
│ ├── blocks/ # Блоки Pug и Sass
│ │   └── block-name/
│ │     ├── block-name.pug
│ │     ├── block-name.sass
│ │     └── block-name.js
│ ├── layouts/ # Макеты Pug
│ │   └── layout.pug
│ ├── pages/ # Страницы Pug
|	|	├── about.pug
|	|	├── index.pug
|	|	└── 404.pug
│ ├── sprites/ # Иконки SVG для спрайтов
|	|	└── icons/
|	|		└── icon.svg
│ └── utils/ # Вспомогательные файлы Pug
│
├── .babelrc # Конфигурация Babel
├── .eslintrc.json # Конфигурация ESLint
├── gulpfile.js # Файл настроек Gulp
├── package.json # Файл зависимостей проекта
└── webpack.config.js # Конфигурация Webpack


## Команды сборки

### 1. **Установка зависимостей**

   - **Команда**: `npm install`
   - **Описание**: Устанавливает все необходимые зависимости для работы сборки.

### 2. **Запуск сервера разработки**

   - **Команда**: `npm start` или `gulp`
   - **Описание**: Запускает сервер разработки с автоматическим обновлением страницы браузера при внесении изменений.

### 3. **Сборка проекта без минификации**

   - **Команда**: `npm run build` или `gulp build`
   - **Описание**: Выполняет сборку проекта без минификации файлов в каталоге `dist`.

### 4. **Сборка проекта с последующей минификацией**

   - **Команда**: `npm run build:minify`
   - **Описание**: Выполняет сборку проекта с последующей минификацией файлов для уменьшения размера и улучшения производительности.

### 5. **Очистка каталога сборки**

   - **Команда**: `npm run clean` или `gulp clean`
   - **Описание**: Удаляет каталог сборки `dist`, подготавливая среду для новой сборки проекта.

## Пользовательские настройки

Вы можете настроить пути к файлам и другие параметры в файлах gulpfile.js и webpack.config.js в соответствии с вашими потребностями.

## Рекомендации по разработке

- Используйте блоки Pug и Sass для организации кода вашего проекта.
- Храните все статические ресурсы (изображения, шрифты и т. д.) в каталоге assets.
- Используйте SVG для иконок и создавайте спрайты с помощью gulp-svg-sprite.
- Соблюдайте стандарты написания кода и проводите статический анализ с помощью ESLint.



