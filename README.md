laba 3 - Гульчак Дар'я МІТ-21 
Хід роботи:
Створення нової гілки:
   - Відкрити термінал у VS Code, створити нову гілку Lab_3.
   - Перевірити статус гілки в VS Code або командою git status в gitbash , і перейти на нову гілку командою git checkout -b Lab_3.
Додавання нових сторінок:
Основна сторінка: Додати посилання на сторінку налаштувань (setting.html) та на сторінку формул (formula.html). Впровадити навігацію між цими сторінками.
Сторінка налаштувань (setting.html):
     - Додати заголовки settings, setting-name.
     - Додати кнопки Discard, Save, Create Formula.
     - Додати поле для введення Title з плейсхолдером setting-name.
     - Створити empty state з текстом "Oopsie, seems that you have no formulas yet" та кнопкою + з підписом "Create your first formula!".
     - Додати секцію для відображення формул з таблицею 2x3 та двома формулами, які містять назву "BTC increase each 2 sec for T-Shirts". Додати іконки для редагування та видалення.
   - Сторінка формул (formula.html):
     - Додати заголовки settings, setting-name, formula-name.
     - Додати кнопки Discard, Save.
     - Додати поле для введення Title з плейсхолдером formula-name.
     - Додати секцію Formula settings, а також секції Add collections та Add products відповідно до макету з Figma. Впровадити поля для введення та кастомні чекбокси.
   3. Оформлення за допомогою CSS:
   - Додати іконки та фото з Figma до папки ресурсів.
   - Створити змінні для кольорів у файлі CSS.
   - Створити стилі для нових шрифтів, кнопок, полів з формулами.
   - Зробити активними посилання для навігації між сторінками.
Збереження та завершення роботи:
   - Виконати коміт змін в VSCode або командою git commit -m "Lab_3 complete" в gitbash.
   - Створити pull request для об'єднання змін у головну гілку.

Перелік кроків для творення сторінки формул:
Створення HTML-файлу:
    - Відкрийте текстовий редактор (наприклад, VS Code).
    - Створіть новий файл з розширенням .html і збережіть його під іменем, formula.html.
Базова структура HTML:
    - Додайте до файлу базову структуру HTML ( за допомогою Emmet !+tab)
Підключення шрифтів Google Fonts:
    - Додайте у <head> секцію для підключення шрифтів.
Підключення CSS файлів:
    - З папки assets підключіть файли reset.css і styles.css в <head>.
Створення контейнера для вмісту:
    - Додайте в <body> тег <div> з класом container, який буде містити весь контент:
Створення заголовку сторінки:
    - В межах контейнера додайте <header> з класом header де буде  навігація та кнопки керування
Створення навігаційного меню:
    - Всередині <header> додайте тег <nav> з класом header-nav та список <ul> з посиланнями на вкладки.
Додавання кнопок керування:
    - Після навігації додайте блок з кнопками:
    html     <div class="header-controls">         <button class="btn-secondary btn" aria-controls="discard">Discard</button>         <button class="btn-primary btn disabled" aria-controls="save">Save</button>     </div>    
Створення поля для вводу заголовку:
    - Додайте поле вводу заголовку під заголовком сторінки:
    html     <div class="formula-title-field input-field">         <span class="input-label body-lg">Title</span>         <input type="text" class="input body-md" placeholder="formula-name">     </div>    
Основний вміст сторінки:
    - Створіть основний блок для вмісту, що складається з налаштувань формули та колекцій:
    html     <div class="formula-main">         <!-- Налаштування формули -->         <div class="formula-settings formula-column">             <!-- Карточка налаштувань -->         </div>         <!-- Додавання колекцій -->         <div class="formula-collections formula-column">             <!-- Карточка колекцій -->         </div>     </div>    
Створення карточок налаштувань:
    - Додайте блоки налаштувань формули, пошуку криптовалют, колекцій та продуктів:
    html     <div class="formula-settings-card">         <!-- Заголовок карточки -->         <div class="formula-heading">             <h2 class="heading-lg">Formula settings</h2>             <span class="formula-heading-icon">                 <img src="./assets/icon-question.svg" alt="question">             </span>         </div>         <!-- Поле вводу формули -->         <div class="input-field">             <span class="input-label body-lg">Formula</span>             <input type="text" class="input body-md" placeholder="X * Y">             <p class="input-description body-md">                 X - cryptocurrency price, Y - product price             </p>         </div>         <!-- Інші поля та елементи -->     </div>    
Додавання пошукових полів і результатів:
    - Створіть пошукові поля з результатами, використовуючи класи для стилізації:
    html     <div class="search-card" aria-controls="search-crypto">         <div class="input-field input-field-search">             <img class="input-field-search-icon" src="./assets/icon-search.svg" alt="search-icon">             <input type="text" class="input body-md search-input" placeholder="Search">             <p class="input-description search-input-description body-md">Select crypto from the list or search the one you need</p>         </div>         <!-- Результати пошуку -->         <div class="search-results">             <div class="search-result">                 <img src="./assets/image-placeholder.jpg" alt="image-placeholder" class="search-result-icon">                 <span class="search-result-name body-md-b">Bitcoin</span>             </div>             <!-- Інші результати -->         </div>         <button class="search-btn-save btn btn-primary">Save</button>     </div>    
Завершальні елементи:
    - Додайте фінальні елементи, такі як кнопки збереження/відміни у відповідні місця.
Перевірка правильності структури:
    - Переконайтеся, що структура HTML відповідає вашим вимогам і немає незакритих тегів.
Тестування і запуск:
    - Відкрийте створений файл у браузері та перевірте, як він виглядає та функціонує.
