# Markdown Viewer

Лёгкий статичный просмотрщик документации Markdown для GitHub Pages.

![License](https://img.shields.io/badge/license-MIT-blue)
![No Build](https://img.shields.io/badge/no%20build-required-green)

## Возможности

- 📚 **Динамическая навигация** — боковое меню строится автоматически на основе `.md` файлов в папке `guide/`
- 🌍 **Поддержка локализации** — файлы с суффиксом `_XX` (например, `_RU`, `_ES`) группируются как переводы одного документа
- 🎨 **Светлая и тёмная темы** — переключатель темы с сохранением выбора в `localStorage`
- 🔍 **Поиск** — фильтрация документов по названию в реальном времени
- 💻 **Подсветка синтаксиса** — на базе `highlight.js` с темой GitHub
- 📝 **GitHub Flavored Markdown** — таблицы, списки задач, зачёркивание (через `marked.js`)
- 🔗 **Deep linking** — у каждого документа свой URL-хеш для удобного обмена
- 📱 **Адаптивность** — боковое меню превращается в выезжающую панель на мобильных
- 🔒 **Безопасность** — HTML очищается через DOMPurify
- ⚡ **Без сборки** — чистые HTML/CSS/JS, просто опубликуйте на GitHub

## Структура проекта

```
.
├── index.html              # Главная страница
├── css/
│   └── styles.css          # Все стили (темы, адаптивность)
├── js/
│   └── app.js              # Логика (загрузка, навигация, рендеринг)
├── guide/                  # Папка с .md файлами
│   ├── manifest.json       # Fallback-список файлов
│   ├── 00-getting-started.md
│   ├── 00-getting-started_RU.md
│   ├── 01-installation.md
│   ├── 01-installation_RU.md
│   └── ...
└── README.md
```

## Быстрый старт

### 1. Локальный запуск

Для разработки используйте любой статический сервер:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Откройте [http://localhost:8000](http://localhost:8000) в браузере.

::: warning
Не открывайте `index.html` через `file://` — браузер заблокирует `fetch()` запросы.
:::

### 2. Развёртывание на GitHub Pages

1. Создайте новый репозиторий на GitHub
2. Загрузите все файлы в корень репозитория:
   ```bash
   git clone https://github.com/YOUR_USERNAME/my-docs.git
   cd my-docs
   # скопируйте файлы просмотрщика
   git add .
   git commit -m "Add markdown viewer"
   git push origin main
   ```
3. В настройках репозитория: **Settings → Pages**
4. **Source**: Deploy from a branch
5. **Branch**: `main` / `(root)`
6. Нажмите **Save**

Через 1–2 минуты сайт будет доступен по адресу:
```
https://YOUR_USERNAME.github.io/my-docs/
```

## Соглашение об именовании файлов

Файлы в папке `guide/` должны следовать шаблону:

```
[NN-]slug[_XX].md
```

| Часть | Описание | Пример |
|-------|----------|--------|
| `NN-` | Числовой префикс для сортировки (необязательно) | `00-`, `01-`, `99-` |
| `slug` | Идентификатор документа | `getting-started` |
| `_XX` | Код языка (необязательно) | `_RU`, `_ES`, `_DE` |

### Примеры

| Имя файла | Порядок | Slug | Язык |
|-----------|---------|------|------|
| `intro.md` | 9999 | `intro` | EN (по умолчанию) |
| `intro_RU.md` | 9999 | `intro` | RU |
| `00-getting-started.md` | 0 | `getting-started` | EN |
| `00-getting-started_RU.md` | 0 | `getting-started` | RU |
| `10-advanced/api.md` | 10 | `advanced/api` | EN |

Файлы с `/` в slug группируются под заголовком секции в боковом меню.

## Как это работает

### Загрузка списка файлов

Просмотрщик использует трёхэтапную стратегию:

1. **GitHub Contents API** — при размещении на `*.github.io` запрашивает список файлов через API
2. **`manifest.json`** — если API недоступен (лимиты, локальный запуск), читает JSON-манифест из папки `guide/`
3. **Встроенный fallback** — для разработки

### Группировка локализаций

Файлы с одинаковым slug (но разными языковыми суффиксами) группируются в один элемент навигации. Например:

- `00-getting-started.md` → язык `EN`
- `00-getting-started_RU.md` → язык `RU`

Эти файлы появятся как **один** пункт меню с переключателем языка.

### Определение заголовка

Заголовок документа определяется по:

1. Полю `title` в YAML front matter
2. Первому заголовку `# H1` в файле
3. Slug, преобразованному в заголовок (например, `getting-started` → `Getting Started`)

## Конфигурация

Откройте `js/app.js` и отредактируйте объект `CONFIG` в начале файла:

```javascript
const CONFIG = {
    guidePath: './guide',          // Путь к папке с .md
    manifestFile: 'manifest.json', // Имя файла-манифеста
    defaultLang: 'RU',             // Язык по умолчанию
    defaultLangLabel: 'EN',        // Метка для файлов без суффикса
    github: {
        branch: 'main',            // Ветка для GitHub API
    },
};
```

Подробнее в документации: [Configuration](#/configuration).

## Кастомизация

### Смена цветов

Все цвета определены как CSS-переменные в `css/styles.css`:

```css
:root {
    --accent: #0969da;
    --accent-hover: #0550ae;
    --bg: #ffffff;
    --text: #1f2328;
    /* ... */
}
```

### Смена логотипа и названия

Отредактируйте `index.html`:

```html
<a href="#" class="logo" id="logo">
    <!-- Замените SVG на свой -->
    <span class="logo-text">Моя документация</span>
</a>
```

### Добавление нового языка

1. Создайте файл с суффиксом, например `00-getting-started_ES.md`
2. (Опц.) Добавьте метку в функцию `getLangLabel()` в `app.js`:
   ```javascript
   const labels = {
       // ...
       'ES': 'Español',
   };
   ```

## Обновление манифеста

При добавлении новых файлов обновите `guide/manifest.json`. Это можно сделать автоматически:

```bash
cd guide
ls *.md | jq -R . | jq -s . > manifest.json
```

Или вручную — это просто JSON-массив:

```json
[
  "00-getting-started.md",
  "00-getting-started_RU.md",
  "01-installation.md"
]
```

::: tip
Если сайт размещён на GitHub Pages, манифест можно не обновлять — просмотрщик сам получит список файлов через GitHub API. Манифест нужен только как fallback.
:::

## Технологии

| Библиотека | Назначение | Размер (gzip) |
|------------|-----------|---------------|
| [marked.js](https://marked.js.org/) | Парсинг Markdown → HTML | ~30KB |
| [highlight.js](https://highlightjs.org/) | Подсветка синтаксиса кода | ~50KB |
| [DOMPurify](https://github.com/cure53/DOMPurify) | Очистка HTML от XSS | ~20KB |

Все библиотеки загружаются из CDN (jsDelivr).

## Лицензия

MIT — используйте свободно для любых целей.

## Поддержка

Если возникли вопросы, посмотрите [FAQ](#/faq) или создайте issue в вашем репозитории.
