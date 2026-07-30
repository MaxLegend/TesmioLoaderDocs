/* ==========================================================================
   Markdown Viewer — Конфигурация и логика
   ========================================================================== */

const CONFIG = {
    // Путь к папке с .md файлами (относительно корня сайта)
    guidePath: './guide',

    // Имя файла-манифеста (fallback если GitHub API недоступен)
    manifestFile: 'manifest.json',

    // Язык интерфейса по умолчанию
    defaultLang: 'RU',

    // Имя файла без языкового суффикса считается "дефолтным" (английским)
    defaultLangLabel: 'EN',

    // Параметры GitHub API (авто-определение по URL)
    github: {
        owner: null,   // Авто-определение: username из URL GitHub Pages
        repo: null,    // Авто-определение: имя репозитория
        branch: 'main',
    },

    // Количество файлов для кэширования заголовков
    maxCache: 50,
};

/* ==========================================================================
   Состояние приложения
   ========================================================================== */
const state = {
    docs: [],           // Список документов [{ slug, order, title, langs: {code: filename} }]
    currentSlug: null,  // Текущий открытый документ
    currentLang: null,  // Текущий язык
    cache: new Map(),   // Кэш: filename -> { title, html }
    githubBasePath: '', // Базовый путь для ссылок на GitHub
};

/* ==========================================================================
   Утилиты
   ========================================================================== */

/**
 * Определяет базовый путь сайта (для GitHub Pages project pages)
 * Например: https://user.github.io/repo/ -> '/repo/'
 */
function getBasePath() {
    const path = window.location.pathname;
    // Если это GitHub Pages project page (не user.github.io)
    if (path && path !== '/' && !path.endsWith('.html')) {
        const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
        // Если это не корень домена
        if (cleanPath && cleanPath !== '') {
            return cleanPath + '/';
        }
    }
    return './';
}

/**
 * Авто-определение информации о GitHub репозитории из URL
 * Поддерживает:
 *   - https://username.github.io/repo-name/...
 *   - https://username.github.io/...  (user pages, repo = username)
 */
function detectGitHubRepo() {
    const host = window.location.hostname;
    const path = window.location.pathname;

    if (!host.endsWith('github.io')) {
        return null;
    }

    const match = host.match(/^([^.]+)\.github\.io$/);
    if (!match) {
        return null;
    }

    const owner = match[1];
    const pathParts = path.split('/').filter(Boolean);

    // Если есть путь после домена — это project page
    if (pathParts.length > 0) {
        return {
            owner: owner,
            repo: pathParts[0],
            basePath: '/' + pathParts[0] + '/',
        };
    }

    // Иначе это user/organization page (repo = username)
    return {
        owner: owner,
        repo: owner,
        basePath: '/',
    };
}

/**
 * Парсит имя .md файла и извлекает:
 *   - order: числовой префикс для сортировки (например "00", "01")
 *   - slug:  уникальный идентификатор документа (например "getting-started")
 *   - lang:  код языка или null (например "RU", "ES", или null для дефолтного)
 *
 * Поддерживаемые форматы:
 *   00-getting-started.md          -> { order: 0,  slug: "getting-started", lang: null }
 *   00-getting-started_RU.md       -> { order: 0,  slug: "getting-started", lang: "RU" }
 *   getting-started.md             -> { order: 99, slug: "getting-started", lang: null }
 *   getting-started_RU.md          -> { order: 99, slug: "getting-started", lang: "RU" }
 *   10-advanced/api-guide.md       -> { order: 10, slug: "advanced/api-guide", lang: null }
 */
function parseFilename(filename) {
    // Убираем расширение .md
    if (!filename.toLowerCase().endsWith('.md')) {
        return null;
    }
    let name = filename.slice(0, -3);

    // Извлекаем языковой суффикс: _XX в конце (где XX — 2 заглавные буквы)
    let lang = null;
    const langMatch = name.match(/_([A-Z]{2})$/);
    if (langMatch) {
        lang = langMatch[1];
        name = name.slice(0, -3); // убираем "_XX"
    }

    // Извлекаем числовой префикс для сортировки
    let order = 9999;
    const orderMatch = name.match(/^(\d+)[-_.]/);
    if (orderMatch) {
        order = parseInt(orderMatch[1], 10);
        name = name.slice(orderMatch[0].length);
    }

    return {
        order: order,
        slug: name,
        lang: lang,
        filename: filename,
    };
}

/**
 * Превращает slug в человекочитаемый заголовок (запасной вариант,
 * если не удалось извлечь H1 из содержимого файла).
 * "getting-started" -> "Getting Started"
 * "advanced/api-guide" -> "Api Guide"
 */
function slugToTitle(slug) {
    const lastPart = slug.split('/').pop();
    return lastPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Получает человекочитаемое название языка по коду
 */
function getLangLabel(langCode) {
    const labels = {
        'EN': 'English',
        'RU': 'Русский',
        'ES': 'Español',
        'DE': 'Deutsch',
        'FR': 'Français',
        'IT': 'Italiano',
        'PT': 'Português',
        'ZH': '中文',
        'JA': '日本語',
        'KO': '한국어',
        'UK': 'Українська',
        'PL': 'Polski',
        'TR': 'Türkçe',
        'AR': 'العربية',
        'HI': 'हिन्दी',
    };
    return labels[langCode] || langCode;
}

/**
 * Извлекает первый заголовок H1 из Markdown
 */
function extractTitleFromMarkdown(mdContent) {
    // Пробуем найти # Заголовок
    const h1Match = mdContent.match(/^#\s+(.+?)\s*$/m);
    if (h1Match) {
        return h1Match[1].trim();
    }
    // Пробуем найти заголовок в YAML front matter
    const frontMatterMatch = mdContent.match(/^---[\s\S]*?title:\s*["']?([^"'\n]+?)["']?\s*$/m);
    if (frontMatterMatch) {
        return frontMatterMatch[1].trim();
    }
    return null;
}

/**
 * Удаляет YAML front matter из Markdown
 */
function stripFrontMatter(mdContent) {
    return mdContent.replace(/^---[\s\S]*?---\s*\n/, '');
}

/**
 * Генерирует slug для якорей из текста заголовка
 */
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s\u0400-\u04FF-]/g, '')  // оставляем буквы (вкл. кириллицу), цифры, дефис
        .replace(/\s+/g, '-');
}

/* ==========================================================================
   Загрузка списка файлов
   ========================================================================== */

/**
 * Пытается получить список .md файлов через GitHub Contents API.
 * Возвращает массив имён файлов или null при ошибке.
 */
async function fetchFilesViaGithubApi() {
    const gh = detectGitHubRepo();
    if (!gh) {
        console.log('[GitHub API] Не на github.io — пропуск');
        return null;
    }

    const apiUrl = `https://api.github.com/repos/${gh.owner}/${gh.repo}/contents/${CONFIG.guidePath.replace(/^\.\//, '')}?ref=${CONFIG.github.branch}`;

    try {
        console.log('[GitHub API] Запрос:', apiUrl);
        const response = await fetch(apiUrl, {
            headers: { 'Accept': 'application/vnd.github+json' },
        });

        if (!response.ok) {
            // Попробуем ветку master, если main не сработала
            if (CONFIG.github.branch === 'main') {
                CONFIG.github.branch = 'master';
                return fetchFilesViaGithubApi();
            }
            console.warn('[GitHub API] Ошибка:', response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            console.warn('[GitHub API] Некорректный ответ');
            return null;
        }

        const files = data
            .filter(item => item.type === 'file' && item.name.endsWith('.md'))
            .map(item => item.name);

        console.log('[GitHub API] Найдено файлов:', files.length);
        state.githubBasePath = `https://github.com/${gh.owner}/${gh.repo}/tree/${CONFIG.github.branch}/${CONFIG.guidePath.replace(/^\.\//, '')}`;
        return files;
    } catch (err) {
        console.warn('[GitHub API] Исключение:', err);
        return null;
    }
}

/**
 * Получает список .md файлов из локального manifest.json.
 * manifest.json должен иметь формат: ["file1.md", "file2.md", ...]
 * или { "files": ["file1.md", "file2.md"] }
 */
async function fetchFilesViaManifest() {
    const manifestUrl = `${CONFIG.guidePath}/${CONFIG.manifestFile}`;
    try {
        console.log('[Manifest] Запрос:', manifestUrl);
        const response = await fetch(manifestUrl);
        if (!response.ok) {
            console.warn('[Manifest] Ошибка:', response.status);
            return null;
        }
        const data = await response.json();
        const files = Array.isArray(data) ? data : (data.files || []);
        console.log('[Manifest] Найдено файлов:', files.length);
        return files;
    } catch (err) {
        console.warn('[Manifest] Исключение:', err);
        return null;
    }
}

/**
 * Основная функция: получает список файлов всеми доступными способами.
 * Стратегия:
 *   1. Пробуем GitHub API (если на github.io)
 *   2. Fallback: manifest.json в папке guide/
 *   3. Fallback: hardcoded список (последний шанс)
 */
async function fetchFileList() {
    // Способ 1: GitHub API
    let files = await fetchFilesViaGithubApi();

    // Способ 2: manifest.json
    if (!files || files.length === 0) {
        files = await fetchFilesViaManifest();
    }

    // Способ 3: встроенный fallback (для локальной разработки без сервера)
    if (!files || files.length === 0) {
        console.warn('[Fallback] Не удалось получить список файлов. Использую встроенный список.');
        files = [
            '00-getting-started.md',
            '00-getting-started_RU.md',
            '01-installation.md',
            '01-installation_RU.md',
            '02-configuration.md',
            '02-configuration_RU.md',
            '03-features.md',
            '03-features_RU.md',
            '04-faq.md',
            '04-faq_RU.md',
        ];
    }

    return files;
}

/* ==========================================================================
   Построение индекса документов
   ========================================================================== */

/**
 * Из массива имён файлов строит индекс документов.
 * Группирует локализованные варианты по общему slug.
 *
 * Возвращает массив объектов:
 *   {
 *     order: 0,
 *     slug: "getting-started",
 *     title: "Getting Started",
 *     langs: { "EN": "00-getting-started.md", "RU": "00-getting-started_RU.md" }
 *   }
 */
async function buildDocIndex(fileList) {
    const groups = new Map();

    for (const filename of fileList) {
        const parsed = parseFilename(filename);
        if (!parsed) continue;

        const groupKey = `${parsed.order}__${parsed.slug}`;
        if (!groups.has(groupKey)) {
            groups.set(groupKey, {
                order: parsed.order,
                slug: parsed.slug,
                title: slugToTitle(parsed.slug),  // временный заголовок
                langs: {},
            });
        }

        const langCode = parsed.lang || CONFIG.defaultLangLabel;
        groups.get(groupKey).langs[langCode] = filename;
    }

    // Сортируем по order, затем по slug
    let docs = Array.from(groups.values());
    docs.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.slug.localeCompare(b.slug);
    });

    // Пробуем извлечь заголовки из файлов (только для первого языка каждого документа)
    // Делаем это лениво: загружаем только метаданные
    for (const doc of docs) {
        // Определяем приоритетный язык для получения заголовка
        const priorityLangs = [CONFIG.defaultLang, CONFIG.defaultLangLabel, ...Object.keys(doc.langs)];
        let titleFound = false;

        for (const lang of priorityLangs) {
            if (titleFound) break;
            if (!doc.langs[lang]) continue;

            try {
                // Загружаем только первые ~2000 символов, чтобы получить H1
                const url = `${CONFIG.guidePath}/${doc.langs[lang]}`;
                const response = await fetch(url);
                if (!response.ok) continue;

                const text = await response.text();
                const title = extractTitleFromMarkdown(text);
                if (title) {
                    doc.title = title;
                    titleFound = true;
                    // Кэшируем содержимое для будущего использования
                    state.cache.set(doc.langs[lang], { title: title, content: null });
                }
            } catch (err) {
                console.warn(`[Title] Не удалось загрузить ${doc.langs[lang]}:`, err);
            }
        }
    }

    return docs;
}

/* ==========================================================================
   Рендеринг навигации
   ========================================================================== */

function renderNav() {
    const nav = document.getElementById('nav');

    if (!state.docs || state.docs.length === 0) {
        nav.innerHTML = `
            <div class="nav-empty">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span>Документация не найдена.<br>Добавьте .md файлы в папку guide/</span>
            </div>
        `;
        return;
    }

    // Группируем по prefix (если slug содержит /, то берём первую часть)
    const groups = new Map();
    for (const doc of state.docs) {
        const parts = doc.slug.split('/');
        const group = parts.length > 1 ? parts[0] : null;

        if (group) {
            if (!groups.has(group)) {
                groups.set(group, []);
            }
            groups.get(group).push(doc);
        } else {
            if (!groups.has('_root')) {
                groups.set('_root', []);
            }
            groups.get('_root').push(doc);
        }
    }

    let html = '';

    // Сначала рендерим "корневые" документы (без группы)
    if (groups.has('_root')) {
        html += groups.get('_root').map(doc => renderNavItem(doc)).join('');
        groups.delete('_root');
    }

    // Затем рендерим группы
    for (const [groupName, docs] of groups) {
        const groupTitle = slugToTitle(groupName);
        html += `<div class="nav-group">`;
        html += `<div class="nav-group-title">${escapeHtml(groupTitle)}</div>`;
        html += docs.map(doc => renderNavItem(doc)).join('');
        html += `</div>`;
    }

    nav.innerHTML = html;

    // Назначаем обработчики кликов
    nav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Если кликнули на язык — переключаем язык
            const langBtn = e.target.closest('.nav-lang');
            if (langBtn) {
                e.stopPropagation();
                const slug = item.dataset.slug;
                const lang = langBtn.dataset.lang;
                openDoc(slug, lang);
                return;
            }
            // Иначе открываем документ (в текущем/дефолтном языке)
            const slug = item.dataset.slug;
            const preferredLang = state.currentLang || CONFIG.defaultLang;
            const doc = state.docs.find(d => d.slug === slug);
            if (doc) {
                const lang = doc.langs[preferredLang] ? preferredLang : Object.keys(doc.langs)[0];
                openDoc(slug, lang);
            }
        });
    });
}

function renderNavItem(doc) {
    const isActive = state.currentSlug === doc.slug;
    const langs = Object.keys(doc.langs).sort((a, b) => {
        // Дефолтный язык первый
        if (a === CONFIG.defaultLang) return -1;
        if (b === CONFIG.defaultLang) return 1;
        if (a === CONFIG.defaultLangLabel) return -1;
        if (b === CONFIG.defaultLangLabel) return 1;
        return a.localeCompare(b);
    });

    const langsHtml = langs.length > 1 ? `
        <div class="nav-item-langs">
            ${langs.map(lang => `
                <span class="nav-lang ${state.currentLang === lang && isActive ? 'active' : ''}" 
                      data-lang="${lang}" 
                      title="${escapeHtml(getLangLabel(lang))}">${escapeHtml(lang)}</span>
            `).join('')}
        </div>
    ` : '';

    return `
        <div class="nav-item ${isActive ? 'active' : ''}" data-slug="${escapeHtml(doc.slug)}">
            <span class="nav-item-title">${escapeHtml(doc.title)}</span>
            ${langsHtml}
        </div>
    `;
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ==========================================================================
   Загрузка и рендеринг документа
   ========================================================================== */

async function loadDocument(slug, lang) {
    const doc = state.docs.find(d => d.slug === slug);
    if (!doc) {
        showError(`Документ "${escapeHtml(slug)}" не найден.`);
        return;
    }

    const filename = doc.langs[lang];
    if (!filename) {
        // Если запрошенного языка нет — берём первый доступный
        const availableLangs = Object.keys(doc.langs);
        if (availableLangs.length === 0) {
            showError('У этого документа нет доступных версий.');
            return;
        }
        lang = availableLangs[0];
    }

    state.currentSlug = slug;
    state.currentLang = lang;

    // Обновляем URL hash для deep linking
    const hash = `#/${slug}${lang && lang !== CONFIG.defaultLangLabel ? `/${lang}` : ''}`;
    if (window.location.hash !== hash) {
        history.replaceState(null, '', hash);
    }

    // Показываем индикатор загрузки
    const contentInner = document.getElementById('contentInner');
    contentInner.innerHTML = `
        <div class="content-loading">
            <div class="spinner"></div>
            <p>Загрузка документа...</p>
        </div>
    `;

    // Прокручиваем наверх
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Загружаем содержимое файла
    const url = `${CONFIG.guidePath}/${filename}`;
    let mdContent;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        mdContent = await response.text();
    } catch (err) {
        showError(`Не удалось загрузить файл <code>${escapeHtml(filename)}</code>.<br><br>${escapeHtml(err.message)}`);
        return;
    }

    // Удаляем YAML front matter
    mdContent = stripFrontMatter(mdContent);

    // Рендерим в HTML
    let html;
    try {
        // Настраиваем marked
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                gfm: true,          // GitHub Flavored Markdown
                breaks: true,       // Переносы строк -> <br>
                headerIds: true,
                mangle: false,
            });
            html = marked.parse(mdContent);
        } else {
            // Fallback: простой текстовый рендер
            html = `<pre>${escapeHtml(mdContent)}</pre>`;
        }

        // Обрабатываем контейнеры ::: tip ::: warning ::: danger :::
        html = processCallouts(html);

        // Очищаем от опасного HTML
        if (typeof DOMPurify !== 'undefined') {
            html = DOMPurify.sanitize(html, {
                ADD_ATTR: ['target', 'id', 'class'],
                ADD_TAGS: ['svg', 'path', 'line', 'circle', 'polyline'],
            });
        }

        // Добавляем якорные ссылки к заголовкам
        html = addAnchorLinks(html);
    } catch (err) {
        showError(`Ошибка рендеринга: ${escapeHtml(err.message)}`);
        return;
    }

    // Рендерим финальный HTML
    const langs = Object.keys(doc.langs).sort((a, b) => {
        if (a === CONFIG.defaultLang) return -1;
        if (b === CONFIG.defaultLang) return 1;
        if (a === CONFIG.defaultLangLabel) return -1;
        if (b === CONFIG.defaultLangLabel) return 1;
        return a.localeCompare(b);
    });

    const langSwitcherHtml = langs.length > 1 ? `
        <div class="doc-langs">
            <span class="doc-langs-label">Язык:</span>
            ${langs.map(l => `
                <button class="doc-lang-btn ${l === lang ? 'active' : ''}" 
                        data-lang="${escapeHtml(l)}"
                        onclick="openDoc('${escapeHtml(slug)}', '${escapeHtml(l)}')">
                    ${escapeHtml(l)}
                </button>
            `).join('')}
        </div>
    ` : '';

    contentInner.innerHTML = `
        <div class="doc-header">
            <div></div>
            ${langSwitcherHtml}
        </div>
        <div class="markdown-body">${html}</div>
    `;

    // Применяем подсветку синтаксиса
    if (typeof hljs !== 'undefined') {
        contentInner.querySelectorAll('pre code').forEach(block => {
            try {
                hljs.highlightElement(block);
            } catch (err) {
                console.warn('[Highlight] Ошибка:', err);
            }
        });
    }

    // Обрабатываем клики по внутренним ссылкам (для якорей)
    contentInner.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href.length <= 1) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', window.location.pathname + window.location.search + href);
            }
        });
    });

    // Делаем относительные ссылки на .md файлы кликабельными внутри документации
    contentInner.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
        if (href.endsWith('.md') || /\.md(#|$)/.test(href)) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const cleanHref = href.replace(/\.md.*$/, '');
                const targetSlug = cleanHref.replace(/^\.\//, '').replace(/^\//, '');
                const targetDoc = state.docs.find(d => d.slug === targetSlug || d.slug.endsWith('/' + targetSlug));
                if (targetDoc) {
                    const lang = targetDoc.langs[state.currentLang] ? state.currentLang : Object.keys(targetDoc.langs)[0];
                    openDoc(targetDoc.slug, lang);
                }
            });
        }
    });

    // Обновляем активный пункт меню
    updateActiveNavItem();

    // На мобильных — закрываем боковое меню
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
}

/**
 * Превращает ::: tip / ::: warning / ::: danger в красивые блоки-уведомления
 */
function processCallouts(html) {
    // Шаблон: ::: type\n... контент ...\n:::
    const calloutRegex = /:::\s*(tip|warning|danger|info|note)\s*\n([\s\S]*?):::/g;

    const typeMap = {
        'tip': 'callout',
        'info': 'callout',
        'note': 'callout',
        'warning': 'callout callout-warning',
        'danger': 'callout callout-danger',
    };

    const titleMap = {
        'tip': '💡 Подсказка',
        'info': 'ℹ️ Информация',
        'note': '📝 Заметка',
        'warning': '⚠️ Внимание',
        'danger': '🔴 Опасность',
    };

    return html.replace(calloutRegex, (match, type, content) => {
        const cssClass = typeMap[type] || 'callout';
        const title = titleMap[type] || 'Уведомление';
        return `<div class="${cssClass}"><div class="callout-title">${title}</div>${content.trim()}</div>`;
    });
}

/**
 * Добавляет якорные ссылки (🔗) к заголовкам
 */
function addAnchorLinks(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = slugify(heading.textContent);
        }
        const anchor = doc.createElement('a');
        anchor.className = 'anchor';
        anchor.href = '#' + heading.id;
        anchor.setAttribute('aria-label', 'Ссылка на этот раздел');
        anchor.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
        heading.insertBefore(anchor, heading.firstChild);
    });

    return doc.querySelector('div').innerHTML;
}

function showError(message) {
    const contentInner = document.getElementById('contentInner');
    contentInner.innerHTML = `
        <div class="content-error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>${message}</div>
        </div>
    `;
}

function updateActiveNavItem() {
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.slug === state.currentSlug) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/* ==========================================================================
   Публичный API для открытия документов (вызывается из HTML)
   ========================================================================== */

window.openDoc = function(slug, lang) {
    loadDocument(slug, lang);
};

/* ==========================================================================
   Поиск
   ========================================================================== */

function setupSearch() {
    const input = document.getElementById('searchInput');
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        document.querySelectorAll('.nav-item').forEach(item => {
            const title = item.querySelector('.nav-item-title').textContent.toLowerCase();
            const slug = (item.dataset.slug || '').toLowerCase();

            if (!query || title.includes(query) || slug.includes(query)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Скрываем пустые группы
        document.querySelectorAll('.nav-group').forEach(group => {
            const visibleItems = group.querySelectorAll('.nav-item:not(.hidden)');
            group.style.display = visibleItems.length === 0 ? 'none' : '';
        });
    });
}

/* ==========================================================================
   Управление темой
   ========================================================================== */

function setupTheme() {
    const toggle = document.getElementById('themeToggle');
    const hljsTheme = document.getElementById('hljs-theme');
    const savedTheme = localStorage.getItem('md-viewer-theme');

    // Применяем сохранённую тему или системную
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = current === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('md-viewer-theme', newTheme);
    });

    function applyTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        // Меняем тему highlight.js
        if (hljsTheme) {
            hljsTheme.href = t === 'dark'
                ? 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css'
                : 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css';
        }
    }
}

/* ==========================================================================
   Управление мобильным меню
   ========================================================================== */

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeSidebar);

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    window.closeSidebar = closeSidebar;
}

/* ==========================================================================
   Обработка URL hash для deep linking
   ========================================================================== */

function parseUrlHash() {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return null;

    const parts = hash.split('/');
    if (parts.length === 0) return null;

    // Формат: #/slug/lang  или  #/slug
    const slug = decodeURIComponent(parts[0]);
    const lang = parts.length > 1 ? parts[1] : null;

    return { slug, lang };
}

window.addEventListener('hashchange', () => {
    const parsed = parseUrlHash();
    if (parsed && parsed.slug !== state.currentSlug) {
        loadDocument(parsed.slug, parsed.lang);
    }
});

/* ==========================================================================
   Инициализация
   ========================================================================== */

async function init() {
    // Настройка темы и меню (синхронно, быстро)
    setupTheme();
    setupMobileMenu();
    setupSearch();

    // Показываем ссылку на GitHub (если применимо)
    const gh = detectGitHubRepo();
    if (gh) {
        const githubLink = document.getElementById('githubLink');
        githubLink.href = `https://github.com/${gh.owner}/${gh.repo}`;
        githubLink.style.display = 'inline-flex';
    }

    // Загружаем список файлов и строим индекс
    const fileList = await fetchFileList();
    state.docs = await buildDocIndex(fileList);

    // Рендерим навигацию
    renderNav();

    // Определяем, какой документ открыть первым
    const parsed = parseUrlHash();
    if (parsed && state.docs.find(d => d.slug === parsed.slug)) {
        // Открываем по URL hash
        loadDocument(parsed.slug, parsed.lang);
    } else if (state.docs.length > 0) {
        // Открываем первый документ
        const first = state.docs[0];
        const preferredLang = first.langs[CONFIG.defaultLang] ? CONFIG.defaultLang : Object.keys(first.langs)[0];
        loadDocument(first.slug, preferredLang);
    } else {
        showError('Не найдено ни одного .md файла в папке guide/.');
    }
}

// Запускаем после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
