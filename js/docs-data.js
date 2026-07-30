/* ==========================================================================
   Автогенерированный файл — встроенные MD-документы.
   НЕ РЕДАКТИРУЙТЕ ВРУЧНУЮ — пересоздайте: python embed.py
   ========================================================================== */

const EMBEDDED_DOCS = {
    "00-getting-started.md": `[English](00-getting-started.md) | [Русский](00-getting-started_RU.md)

# Introduction

This is a plain-language guide for players, not modders. If you just want to
turn features on, tweak a number, and see it in the game, start here. The
\`docs/\` folder next to this one explains *how* everything works internally;
this folder only explains *what to click and what to type*.

## 1. What this actually is

\`tesmioloader\` is a small program that starts the game for you and, while it
is starting, adds extra features to it — new resources, new deposits, new
buildings, and so on. **It does not change any file the game came with.**
Everything it adds either lives in memory while the game runs, or is written
into \`media_soviet\\workshop_wip\\\`, the same folder the game already uses for
your own unpublished Workshop items. Steam's "verify integrity of game files"
will not complain and will not undo anything.

Each feature is a separate **plugin** — a \`.dll\` file in the \`plugins\`
folder, with one settings file (\`.ini\`) sitting right next to it. You can
turn each plugin on or off independently, and you can edit its \`.ini\` to
change what it does, without touching anything else.

## 2. The two folders you need to know

\`\`\`
tesmioloader\\build\\tesmiolauncher.exe   <- you run this, not SOVIET64.exe
tesmioloader\\build\\tesmioloader.ini     <- master switch, per-plugin on/off
tesmioloader\\build\\plugins\\*.ini        <- one settings file per feature
tesmioloader\\build\\tesmioloader.log     <- what happened last time you played
\`\`\`

Everything you will ever need to open is inside \`tesmioloader\\build\\\`. You
never need to touch anything under \`tesmioloader\\src\\\`, \`tesmioloader\\tools\\\`
or \`tesmioloader\\ghidra\\\` — those are for the people building the loader
itself.

## 3. Starting the game

1. Make sure Steam is running (the launcher starts the real game underneath,
   it does not replace Steam).
2. Run \`tesmioloader\\build\\tesmiolauncher.exe\`.
3. A window opens showing the game path it found, and a checkbox for every
   plugin in the \`plugins\` folder. If the path is wrong, click **Browse** and
   point it at the folder that has \`SOVIET64.exe\` in it.
4. Tick the plugins you want active this session, untick the ones you don't.
5. Click the button that starts the game.

The launcher remembers your choice: it writes a \`[plugins]\` section into
\`tesmioloader.ini\` with one line per plugin, \`name=1\` for on and \`name=0\` for
off. You can also edit that section by hand in a text editor if you prefer —
see step 5 below.

**If the game won't start at all**, the fastest thing to try is unticking
every plugin (or setting \`plugins=0\` at the top of \`tesmioloader.ini\`) and
starting again. If that works, one plugin is the problem — re-enable them one
at a time to find out which, and check \`tesmioloader.log\` for the last few
lines before it stopped.

## 4. Changing a setting

Every plugin's behaviour is controlled by its \`.ini\` file. To change
anything described in the other guides in this folder:

1. **Close the game first.** The loader reads each \`.ini\` when the game
   starts; it does not notice a file changing while the game is running.
2. Open the file — e.g. \`tesmioloader\\build\\plugins\\resources.ini\` — in
   Notepad or any plain text editor.
3. Find the line you want (they're all commented, so read the text above the
   line you're changing if you're not sure what it does).
4. Change the value after the \`=\` sign. Leave everything else alone.
5. Save the file **as UTF-8 without a BOM**. Windows' own Notepad does this
   correctly if you just pick "UTF-8" (not "UTF-8 with BOM") in the save
   dialog's encoding dropdown. **Do not use PowerShell's \`-Encoding UTF8\` to
   write these files** — it silently adds a BOM, which breaks the file's
   \`[section]\` headers and every setting in it quietly falls back to its
   default. This has bitten people before.
6. Start the game again through \`tesmiolauncher.exe\`.

A line starting with \`;\` is a comment — the game ignores it. To try one of
the ready-made examples in a file (there are several, e.g. a nickel deposit
or a sand deposit), delete the \`;\` at the start of each of its lines.

## 5. Turning a whole plugin on or off

Two equivalent ways:

- **From the launcher window** — tick or untick its checkbox before
  starting the game. This is the easiest way and does not require opening
  any file.
- **By hand** — open \`tesmioloader\\build\\tesmioloader.ini\`, find the
  \`[plugins]\` section at the bottom, and change the plugin's line to \`=0\`
  (off) or \`=1\` (on). Save it the same UTF-8-without-BOM way as above.

Turning a plugin off does not delete anything it already put in your save —
a building it added stays built, a resource already sitting in a warehouse
stays there. It only stops the plugin from doing anything *new*. Deleting the
plugin's \`.dll\` from the \`plugins\` folder is the permanent version of "off".

## 6. Reading the log

\`tesmioloader\\build\\tesmioloader.log\` is a plain text file, overwritten every
time you start the game. It is the only way to see whether something
actually worked, rather than just "the game didn't crash". Every plugin
guide in this folder tells you which words to look for.

Open it with Notepad. If it's long, use Ctrl+F and search for the plugin's
name, or for a specific word the guide told you to look for (e.g. \`deplete\`,
\`battery\`, \`price\`, \`demand\`).

## 7. Before you experiment: back up your save

Several plugins change things that live **inside your save file** — a new
resource, a new citizen need, a mine running down, a building added to the
map. These are not always safe to switch on and off again on an existing
city. Each guide in this folder says explicitly whether the feature it
covers is safe to toggle freely or not; when in doubt:

1. Go to your save folder (in-game: Load Game screen shows you the save
   name; the files live under your Documents / game user folder in
   \`save\\<number> - <name>\\\`).
2. Copy that whole folder somewhere else before you try anything new.
3. If a change goes wrong, close the game, delete the modified save folder,
   and put your copy back.

This single habit is the difference between "that didn't work, let me
adjust a number" and "I lost my city".

## 8. What's in this folder

| Guide | What it lets you do |
|---|---|
| [01-resources](01-resources.md) | Add a brand-new tradeable good (like a new ore or product) |
| [02-deposits](02-deposits.md) | Add a new kind of mineable deposit, paintable on the map |
| [03-depletion](03-depletion.md) | Make mines actually run out of ore over time |
| [04-accumulator](04-accumulator.md) | Build a battery that stores spare electricity |
| [05-needs](05-needs.md) | Give citizens a new thing to shop for |
| [06-walking](06-walking.md) | Change how far citizens will walk or drive |
| [07-buildings](07-buildings.md) | Add a whole new building by cloning an existing one |

Read a guide's own warnings before turning its plugin on — a couple of them
(resources, needs, depletion) touch the save file in ways that are not
always reversible on a city you already care about.
`,
    "00-getting-started_RU.md": `[English](00-getting-started.md) | [Русский](00-getting-started_RU.md)

# Введение

Это инструкция не для тех, кто пишет моды, а для тех, кто
просто хочет включить нужные функции, поменять пару цифр в настройках и
увидеть результат в игре. Папка \`docs/\` рядом с этой объясняет, *как всё
устроено внутри*; эта папка объясняет только, *что куда нажимать и что
писать*.

## 1. Что это вообще такое

\`tesmioloader\` — небольшая программа, которая запускает игру за вас и, пока
она запускается, добавляет в неё дополнительные возможности: новые ресурсы,
новые месторождения, новые здания и так далее. **Она не изменяет ни одного
файла, который поставляется с игрой.** Всё, что она добавляет, либо живёт в
памяти, пока игра работает, либо записывается в
\`media_soviet\\workshop_wip\\\` — ту же папку, которую сама игра использует для
ваших собственных неопубликованных предметов мастерской. Проверка
целостности файлов в Steam ничего не найдёт и ничего не откатит.

Каждая функция — это отдельный **плагин**: файл \`.dll\` в папке \`plugins\`, а
рядом с ним — один файл настроек (\`.ini\`). Каждый плагин можно включать и
выключать отдельно от остальных, а его \`.ini\` можно редактировать, не трогая
ничего другого.

## 2. Две папки, которые нужно знать

\`\`\`
tesmioloader\\build\\tesmiolauncher.exe   <- запускаете именно это, а не SOVIET64.exe
tesmioloader\\build\\tesmioloader.ini     <- главный переключатель, вкл/выкл плагинов
tesmioloader\\build\\plugins\\*.ini        <- по одному файлу настроек на функцию
tesmioloader\\build\\tesmioloader.log     <- что произошло в прошлый запуск
\`\`\`

Всё, что вам когда-либо понадобится открыть, лежит внутри
\`tesmioloader\\build\\\`. Папки \`tesmioloader\\src\\\`, \`tesmioloader\\tools\\\` и
\`tesmioloader\\ghidra\\\` трогать не нужно — это для тех, кто собирает сам
загрузчик из исходников.

## 3. Запуск игры

1. Убедитесь, что запущен Steam (лаунчер запускает настоящую игру поверх
   него, а не вместо него).
2. Запустите \`tesmioloader\\build\\tesmiolauncher.exe\`.
3. Откроется окно с найденным путём к игре и галочкой для каждого плагина из
   папки \`plugins\`. Если путь неверный — нажмите **Browse** и укажите папку,
   где лежит \`SOVIET64.exe\`.
4. Отметьте галочками нужные на эту сессию плагины, снимите галочки с
   ненужных.
5. Нажмите кнопку запуска игры.

Лаунчер запоминает выбор: он записывает секцию \`[plugins]\` в
\`tesmioloader.ini\`, по одной строке на плагин — \`имя=1\` значит включён,
\`имя=0\` значит выключен. Эту секцию можно точно так же отредактировать
вручную в текстовом редакторе — см. пункт 5 ниже.

**Если игра вообще не запускается**, быстрее всего снять все галочки (или
поставить \`plugins=0\` в самом верху \`tesmioloader.ini\`) и попробовать снова.
Если так заработало — проблема в одном из плагинов; включайте их по одному,
чтобы найти виновника, и смотрите последние строки \`tesmioloader.log\` перед
остановкой.

## 4. Изменение настройки

Поведением каждого плагина управляет его \`.ini\`-файл. Чтобы поменять что-то
из описанного в других инструкциях этой папки:

1. **Сначала закройте игру.** Загрузчик читает каждый \`.ini\` при старте игры
   и не замечает изменений файла, пока игра уже запущена.
2. Откройте нужный файл — например,
   \`tesmioloader\\build\\plugins\\resources.ini\` — в Блокноте или любом
   текстовом редакторе.
3. Найдите нужную строку (все они с комментариями — если не уверены, что
   делает строка, прочитайте текст над ней).
4. Измените значение после знака \`=\`. Остальное не трогайте.
5. Сохраните файл **в кодировке UTF-8 без BOM**. Стандартный Блокнот Windows
   делает это правильно, если в выпадающем списке кодировки при сохранении
   выбрать просто «UTF-8» (не «UTF-8 с BOM»). **Не сохраняйте эти файлы через
   PowerShell с \`-Encoding UTF8\`** — он незаметно добавляет BOM, из-за чего
   заголовки секций \`[section]\` перестают распознаваться и все настройки в
   файле тихо откатываются к значениям по умолчанию. Это уже случалось.
6. Запустите игру заново через \`tesmiolauncher.exe\`.

Строка, начинающаяся с \`;\`, — это комментарий, игра её игнорирует. Чтобы
попробовать один из готовых примеров в файле (их несколько, например
месторождение никеля или песка), уберите \`;\` в начале каждой его строки.

## 5. Включение и выключение плагина целиком

Два равнозначных способа:

- **Через окно лаунчера** — поставьте или снимите галочку перед запуском
  игры. Это самый простой способ, файлы открывать не нужно.
- **Вручную** — откройте \`tesmioloader\\build\\tesmioloader.ini\`, найдите
  секцию \`[plugins]\` внизу файла и измените строку нужного плагина на \`=0\`
  (выключен) или \`=1\` (включён). Сохраните так же, в UTF-8 без BOM.

Выключение плагина не удаляет то, что он уже добавил в ваше сохранение:
построенное здание останется построенным, ресурс на складе останется на
складе. Плагин просто перестаёт делать что-то *новое*. Полностью убрать
плагин — значит удалить его \`.dll\` из папки \`plugins\`.

## 6. Как читать лог

\`tesmioloader\\build\\tesmioloader.log\` — обычный текстовый файл,
перезаписываемый при каждом запуске игры. Это единственный способ увидеть,
что что-то действительно сработало, а не просто «игра не вылетела». Каждая
инструкция в этой папке подсказывает, какие слова там искать.

Открывайте его Блокнотом. Если файл длинный, используйте Ctrl+F и ищите
название плагина или конкретное слово, которое указано в инструкции
(например, \`deplete\`, \`battery\`, \`price\`, \`demand\`).

## 7. Перед экспериментами — сделайте резервную копию сохранения

Некоторые плагины меняют то, что хранится **прямо внутри файла
сохранения**: новый ресурс, новая потребность у жителей, исчерпание
месторождения, добавленное на карту здание. Не все такие изменения безопасно
включать и выключать обратно на уже существующем городе. Каждая инструкция в
этой папке прямо говорит, безопасно ли свободно переключать описанную
функцию. Если сомневаетесь:

1. Зайдите в папку с сохранениями (в игре на экране загрузки видно название
   сохранения; файлы лежат в вашей папке Документы / пользовательской папке
   игры, в \`save\\<номер> - <имя>\\\`).
2. Скопируйте всю эту папку куда-нибудь ещё, прежде чем пробовать что-то
   новое.
3. Если что-то пошло не так — закройте игру, удалите изменённую папку
   сохранения и верните на место свою копию.

Эта единственная привычка — разница между «не сработало, поправлю цифру» и
«я потерял свой город».

## 8. Что есть в этой папке

| Инструкция | Что позволяет сделать |
|---|---|
| [01-resources](01-resources_RU.md) | Добавить новый товар для торговли (например, новую руду или продукт) |
| [02-deposits](02-deposits_RU.md) | Добавить новый тип месторождения, которое можно рисовать на карте |
| [03-depletion](03-depletion_RU.md) | Сделать так, чтобы шахты действительно исчерпывали руду со временем |
| [04-accumulator](04-accumulator_RU.md) | Построить аккумулятор, который запасает лишнее электричество |
| [05-needs](05-needs_RU.md) | Дать жителям новый товар, за которым они будут ходить в магазин |
| [06-walking](06-walking_RU.md) | Изменить, как далеко жители готовы ходить пешком или ехать на машине |
| [07-buildings](07-buildings_RU.md) | Добавить целое новое здание, склонировав существующее |

Перед включением плагина прочитайте предупреждения в его инструкции — у
некоторых (resources, needs, depletion) изменения затрагивают файл
сохранения способом, который не всегда можно отменить на городе, который вам
дорог.
`,
    "01-resources.md": `[English](01-resources.md) | [Русский](01-resources_RU.md)

# Resources

New to this? Read [00-getting-started](00-getting-started.md) first — it
explains where the files are and how to apply a change.

## What this plugin does

It lets you add brand-new resources — things like ores, materials or
products — that don't exist in the base game. Every mod resource here
(copper ore, copper concentrate, raw copper, copper, furniture, medicine,
gas, sand, clay, glass) was added exactly this way, by adding a few lines to
one file.

A new resource gets its own name, its own display caption, and its own
appearance when carried by trucks and trains — but it borrows all of that
appearance from an existing resource you pick as a **template**. You don't
model anything; you clone and rename.

## ⚠️ Before you touch this: save compatibility

**Adding or removing a resource from the list changes the save format.** A
save you made with 9 mod resources declared will not load if you remove one
and try to open it again, and a stock (unmodified) save will not load once
you've added any. If you want to experiment, do it on a **new game** or a
**copy of a save**, not your main city. See
[00-getting-started, step 7](00-getting-started.md#7-before-you-experiment-back-up-your-save).

## How to add a resource, step by step

1. Close the game.
2. Open \`tesmioloader\\build\\plugins\\resources.ini\`.
3. Under the \`[list]\` section, add a line:

   \`\`\`ini
   my_resource = template_resource, Display Name
   \`\`\`

   - \`my_resource\` — the internal name. Lowercase, no spaces; this is also
     what you'll type in a building's recipe later if you ever add a
     building that uses it (see [07-buildings](07-buildings.md)).
   - \`template_resource\` — an **existing** resource whose look and transport
     type you're cloning. Good picks:
     - \`rawiron\`, \`bauxite\` — bulk/loose cargo (shows as a heap on the truck)
     - \`steel\`, \`aluminium\` — "open" cargo (shows as neat stacked units)
     - \`oil\` — liquid
     - \`eletronics\` — small covered cargo with **no truck-bed model at all**,
       the simplest option if you don't care how it looks on a truck, only
       that it exists and can be bought/sold/stored
   - \`Display Name\` — what shows up in menus and the trade window. Optional;
     leave it out to keep the template's own name.

   Example, a new "textiles" good that looks like electronics on a truck:

   \`\`\`ini
   textiles = eletronics, Textiles
   \`\`\`

4. If your resource needs an icon (most panels want one), drop a 48×48 PNG
   at \`tesmioloader\\vfs\\media_soviet\\resources\\my_resource.png\` — only
   resources cloned from \`eletronics\`/\`clothes\`/\`food\` need this, because
   those templates have no cargo model to fall back on for an icon either.
5. Save the file (UTF-8, no BOM — see the getting-started guide).
6. Start the game through \`tesmiolauncher.exe\` with \`resources\` ticked.
7. Open \`tesmioloader.log\` and search for your resource's name — you should
   see it get resolved/injected. If the file also grew past 63 total
   resources, you'll see a line like \`resource array moved ... capacity NN
   records\` the first time you load a world that session; that's expected,
   not an error.

## Giving it a price

**The game does not store a price per resource — it calculates one**, every
time the economy updates, by looking for a building whose recipe produces
that resource and adding up what the ingredients cost. This has one
consequence that surprises people: **a resource nothing produces is priced
at 0.00, no matter what you do**, until you either give it a producing
building or force a price by hand.

Two sections in the same file let you override this:

\`\`\`ini
[base_price]
; my_ore = 6.0, 5.0        ; rouble, dollar — an INPUT to the price calculation
                            ; use this on a raw material (an ore, not a
                            ; finished good) — it makes everything made FROM
                            ; it more expensive too. On its own this does
                            ; NOT give the resource a non-zero price.

[price]
; my_finished_good = 260.0, 300.0   ; the FINAL price, forced after the
                                     ; game computes its own. This is what
                                     ; actually fixes a resource stuck at
                                     ; 0.00 — use it on anything nothing in
                                     ; the game produces.
\`\`\`

Rule of thumb: if you also added a building (via
[07-buildings](07-buildings.md)) whose \`$PRODUCTION\` line makes this
resource, you don't need \`[price]\` at all — the chain prices it
automatically, the same way copper prices itself once it has a full
mine → smelter → refinery chain. If nothing produces it, uncomment a line in
\`[price]\`.

To watch this happen, set \`price_report = 1\` in the \`[resources]\` section
(it already is, by default) and load a save. \`tesmioloader.log\` prints a
line per resource per price recompute:

\`\`\`
price     my_resource               0.00 RUB       0.00 USD   base 0.00 / 0.00   kind 0
\`\`\`

\`0.00\` means "nothing in the game currently produces this" — not a bug, just
the fact the price sections above exist to fix.

## Settings you probably don't need to touch

| Setting | What it is |
|---|---|
| \`hook\` | Whether the plugin is watching resource lookups at all. Leave at \`2\`. |
| \`resource_capacity\` | How much room to reserve for resources. Leave at \`0\` — the plugin works this out from \`[list]\` automatically. |
| \`price_hook\` | Turns the whole pricing feature above on/off. Leave at \`1\` unless you want \`[base_price]\`/\`[price]\` to do nothing. |
| \`price_report\` | Prints the price table to the log. Turn to \`0\` once you've checked the numbers you care about — it runs on every price recompute. |

## Troubleshooting

- **Game won't start after adding resources** — double-check your \`[list]\`
  line has a valid template name (spelled exactly like an existing resource)
  and that the file saved without a BOM.
- **A resource shows 0.00 everywhere in the trade window** — see "Giving it
  a price" above; either give it a producing building or a \`[price]\` line.
- **A save from before you added resources won't load, or vice versa** —
  that's the save-format warning above, not a bug. Use a separate save for
  testing.
`,
    "01-resources_RU.md": `[English](01-resources.md) | [Русский](01-resources_RU.md)

# Resources

Впервые здесь? Сначала прочитайте
[00-getting-started](00-getting-started_RU.md) — там объясняется, где лежат
файлы и как применить изменение.

## Что делает этот плагин

Он позволяет добавлять совершенно новые ресурсы — руды, материалы, товары —
которых нет в оригинальной игре. Все модовые ресурсы в этом проекте (медная
руда, концентрат медной руды, черновая медь, медь, мебель, лекарства, газ,
песок, глина, стекло) добавлены именно так — несколькими строками в одном
файле.

Новый ресурс получает своё имя, свою подпись и свой внешний вид при перевозке
грузовиками и поездами — но весь этот внешний вид он заимствует у уже
существующего ресурса, который вы выбираете в качестве **шаблона**. Вы ничего
не моделируете — вы клонируете и переименовываете.

## ⚠️ Прежде чем трогать это: совместимость сохранений

**Добавление или удаление ресурса из списка меняет формат сохранения.**
Сохранение, сделанное с 9 объявленными модовыми ресурсами, не загрузится,
если один из них убрать, а обычное (немодифицированное) сохранение перестанет
загружаться, как только вы что-то добавите. Если хотите поэкспериментировать
— делайте это на **новой игре** или **копии сохранения**, а не на основном
городе. См.
[00-getting-started, пункт 7](00-getting-started_RU.md#7-перед-экспериментами--сделайте-резервную-копию-сохранения).

## Как добавить ресурс, шаг за шагом

1. Закройте игру.
2. Откройте \`tesmioloader\\build\\plugins\\resources.ini\`.
3. В секции \`[list]\` добавьте строку:

   \`\`\`ini
   my_resource = template_resource, Отображаемое имя
   \`\`\`

   - \`my_resource\` — внутреннее имя. Строчными буквами, без пробелов; это же
     имя вы будете использовать в рецепте здания, если позже добавите
     здание, которое его использует (см. [07-buildings](07-buildings_RU.md)).
   - \`template_resource\` — **существующий** ресурс, чей внешний вид и тип
     перевозки вы клонируете. Хорошие варианты:
     - \`rawiron\`, \`bauxite\` — сыпучий груз (на грузовике выглядит кучей)
     - \`steel\`, \`aluminium\` — «открытый» груз (аккуратно сложенные штабели)
     - \`oil\` — жидкость
     - \`eletronics\` — небольшой закрытый груз, у которого **вообще нет
       модели в кузове грузовика** — самый простой вариант, если внешний вид
       на грузовике не важен, а важно только, чтобы ресурс существовал и его
       можно было покупать/продавать/хранить
   - \`Отображаемое имя\` — то, что видно в меню и в окне торговли.
     Необязательно; если не указать — останется имя шаблона.

   Пример — новый ресурс «текстиль», который на грузовике выглядит как
   электроника:

   \`\`\`ini
   textiles = eletronics, Textiles
   \`\`\`

4. Если ресурсу нужна иконка (для большинства панелей она нужна), положите
   PNG 48×48 в
   \`tesmioloader\\vfs\\media_soviet\\resources\\my_resource.png\` — это нужно
   только ресурсам, склонированным из \`eletronics\`/\`clothes\`/\`food\`, потому
   что у этих шаблонов нет и модели груза, откуда иконку можно было бы взять.
5. Сохраните файл (UTF-8 без BOM — см. стартовую инструкцию).
6. Запустите игру через \`tesmiolauncher.exe\` с отмеченным плагином
   \`resources\`.
7. Откройте \`tesmioloader.log\` и найдите там имя вашего ресурса — вы должны
   увидеть, что оно распозналось и подставилось. Если из-за файла общее
   число ресурсов превысило 63, при первой загрузке карты за сессию вы
   увидите строку вроде \`resource array moved ... capacity NN records\` — это
   ожидаемо, а не ошибка.

## Как назначить ресурсу цену

**Игра не хранит цену для каждого ресурса — она её вычисляет** при каждом
обновлении экономики, ища здание, чей рецепт производит этот ресурс, и
складывая стоимость его ингредиентов. Отсюда неожиданное для многих
следствие: **ресурс, который никто не производит, всегда стоит 0.00**, пока
вы либо не добавите производящее его здание, либо не зададите цену вручную.

Для этого в том же файле есть две секции:

\`\`\`ini
[base_price]
; my_ore = 6.0, 5.0        ; рубли, доллары — это ВХОДНОЕ значение для расчёта
                            ; цены. Используйте на сырье (руде, а не готовом
                            ; товаре) — это удорожает и всё, что из него
                            ; сделано. Само по себе НЕ поднимает цену
                            ; ресурса выше нуля.

[price]
; my_finished_good = 260.0, 300.0   ; ИТОГОВАЯ цена, принудительно
                                     ; выставляемая после того, как игра
                                     ; вычислит свою. Именно это на самом
                                     ; деле лечит ресурс, застрявший на
                                     ; 0.00, — используйте для всего, что в
                                     ; игре никто не производит.
\`\`\`

Правило простое: если вы также добавили здание (через
[07-buildings](07-buildings_RU.md)), в чьей строке \`$PRODUCTION\` производится
этот ресурс, секция \`[price]\` вообще не нужна — цепочка сама назначит цену,
точно так же, как медь сама получает цену, когда есть полная цепочка
шахта → плавильня → рафинирование. Если же ресурс никто не производит —
раскомментируйте строку в \`[price]\`.

Чтобы это увидеть, поставьте \`price_report = 1\` в секции \`[resources]\` (по
умолчанию уже так) и загрузите сохранение. \`tesmioloader.log\` будет печатать
по строке на ресурс при каждом пересчёте цены:

\`\`\`
price     my_resource               0.00 RUB       0.00 USD   base 0.00 / 0.00   kind 0
\`\`\`

\`0.00\` означает «сейчас в игре никто это не производит» — не баг, а именно
то, что и лечится разделами выше.

## Настройки, которые обычно трогать не нужно

| Настройка | Что это |
|---|---|
| \`hook\` | Отслеживает ли плагин поиск ресурсов вообще. Оставьте \`2\`. |
| \`resource_capacity\` | Сколько места резервировать под ресурсы. Оставьте \`0\` — плагин сам вычислит нужное из \`[list]\`. |
| \`price_hook\` | Включает/выключает всю функцию ценообразования выше. Оставьте \`1\`, иначе \`[base_price]\`/\`[price]\` не будут работать. |
| \`price_report\` | Печатает таблицу цен в лог. Выключите (\`0\`), когда проверите нужные цифры — иначе пишет при каждом пересчёте. |

## Решение проблем

- **Игра не запускается после добавления ресурсов** — проверьте, что в
  строке \`[list]\` указано точное имя существующего шаблона и что файл
  сохранён без BOM.
- **Ресурс везде показывает 0.00 в окне торговли** — см. раздел «Как
  назначить ресурсу цену» выше: либо дайте ему производящее здание, либо
  строку в \`[price]\`.
- **Старое сохранение (до добавления ресурсов) не грузится, или наоборот** —
  это то самое предупреждение про формат сохранения, а не ошибка.
  Используйте отдельное сохранение для тестов.
`,
    "02-deposits.md": `[English](02-deposits.md) | [Русский](02-deposits_RU.md)

# Deposits

New to this? Read [00-getting-started](00-getting-started.md) first.

## What this plugin does

It teaches the game a new kind of ore/mineral deposit — something a mine can
search for, find, and produce from — with its own icon on the minimap and
its own paintbrush in the terrain editor. Copper ore, sand, clay and gas all
work this way in this project.

A deposit type needs three things to be usable in-game, and this plugin
gives you all three from one \`.ini\` section:

1. A \`$TYPE_MINE_...\` token you can put in a mine's \`building.ini\` (only
   relevant if you're also building a new mine via
   [07-buildings](07-buildings.md) — the base game's own mines already use
   the base game's own tokens).
2. A place on the map where the deposit's richness is actually stored — a
   hidden "resource map" image under the terrain.
3. A minimap button/overlay and an editor brush, so you (or anyone playing
   the map) can see and paint where the deposit is.

## How to add a deposit, step by step

1. Close the game.
2. Open \`tesmioloader\\build\\plugins\\deposits.ini\`.
3. Add a new section, one per deposit:

   \`\`\`ini
   [my_ore]
   token         = $TYPE_MINE_MYORE
   type          = 14
   map           = auto
   radius        = ore
   icon          = my_ore
   minimap       = 1
   editor        = myore
   \`\`\`

   - \`token\` — pick a name, always starting \`$TYPE_MINE_\`. This is what a
     mine's \`building.ini\` will say to search for this deposit.
   - \`type\` — any unused number from 10 to 127. Look at the other sections
     in the file and pick one nobody else is using.
   - \`map\` — leave this as \`auto\` unless you have a specific reason not to.
     It picks an unused spot for you automatically, in a fresh map the
     plugin creates just for your new deposits — you don't have to think
     about channels or textures at all. (\`terrain\` is a special option for a
     deposit that should visibly scar the ground when mined, like a gravel
     or sand pit — see the note in the \`.ini\` file's comments if you want
     that look.)
   - \`radius\` — how far a mine searches to find this deposit. Use one of
     the words \`ore\`, \`oil\`, \`bauxite\`, \`gravel\`, \`wood\`, \`water\`,
     \`watersurface\` to copy a vanilla mine's search distance (\`ore\` is a
     sensible default, shared by iron/coal/uranium). **Don't skip this** —
     without it, mines report a garbage quality number.
   - \`icon\` — the name of a resource (from \`resources.ini\`, see
     [01-resources](01-resources.md)) whose icon to show on the minimap
     button. Leave it out for no icon.
   - \`minimap\` — \`1\` to get a minimap button, \`0\` for none.
   - \`editor\` — a short name (7 characters max) for the paint/erase brush in
     the map editor's Resources tab. Leave it out if you don't want to be
     able to paint this deposit by hand.

4. If you want a mine that actually uses this deposit, either edit an
   existing mine's \`building.ini\` to add your \`$TYPE_MINE_...\` token, or
   declare a whole new mine building — see
   [07-buildings](07-buildings.md).
5. Save the file (UTF-8, no BOM) and start the game with \`deposits\` ticked.

## You have to paint it before a mine can find anything

**A new deposit map starts completely empty.** Unlike iron, coal or bauxite
— which every official map already has painted somewhere — your new deposit
exists nowhere on the terrain until you put it there yourself.

1. In-game, open the **terrain editor**.
2. Go to the tab your brush appears in — the **Resources** tab for a normal
   deposit, or the **Rocks** tab if you used \`map = terrain\`.
3. Find your deposit's paint tool (its icon, or a placeholder if you didn't
   add art for it) and paint an area on the map, the same way you'd paint
   iron or bauxite.
4. Build a mine on the painted area with the right \`$TYPE_MINE_...\` token in
   its \`building.ini\`. Check its info window — it should show a real
   "quality of source" number, not a huge negative number.
5. Save and reload the map, and check the paint is still there. This is the
   one part of the feature that only shows up after a real save/reload, not
   just while playing — the deposit's texture is written to disk on save,
   the same way the game's own resource maps are.

## Settings reference

| Field | Meaning |
|---|---|
| \`token\` | The \`$TYPE_MINE_...\` word used in a mine's \`building.ini\`. |
| \`type\` | A unique number ≥10 identifying this deposit to the engine. |
| \`map\` | Where the richness data lives. \`auto\` is almost always right. |
| \`component\` | Only needed if you picked a specific \`map\` by hand instead of \`auto\`. |
| \`building_type\` | \`7\` = mine (default, almost always what you want); \`92\` = water well. |
| \`radius\` | Search distance — use \`ore\`, \`oil\`, \`bauxite\`, \`gravel\`, \`wood\`, \`water\`, \`watersurface\`, or a number of your own. |
| \`icon\` | Which resource's icon to borrow for the minimap button. |
| \`minimap\` | \`1\`/\`0\` — minimap button and overlay layer. |
| \`editor\` | Short name for the paintbrush; leave out for no brush. |
| \`deplete\` | Advanced — see [03-depletion](03-depletion.md); leave alone unless you're also using that plugin and want this deposit to behave differently from the rest. |

Plugin-wide switches at the top of the file (\`code_patch\`, \`minimap\`,
\`editor\` under \`[deposits]\`) turn the whole feature on/off; leave them at \`1\`
unless you're troubleshooting.

## Troubleshooting

- **Mine shows quality of source as a huge negative number** — you forgot
  \`radius\`, or misspelled the word. Fix it and rebuild/reload.
- **Nothing to paint, or the paintbrush isn't there** — check \`editor = \`
  is set and is 7 characters or fewer; longer names are silently dropped
  (check the log for a line saying so).
- **Deposit disappeared after reloading a save** — this generally means the
  save was made *before* the deposit type existed in your \`.ini\`, or the
  plugin was off when you saved. Deposits declared here need the plugin
  active every time you play that save.
- **A commented-out \`[nickel]\` example** already sits in the file if you
  want to see a second deposit working side by side with copper — just
  remove the leading \`;\` from each of its lines.
`,
    "02-deposits_RU.md": `[English](02-deposits.md) | [Русский](02-deposits_RU.md)

# Deposits

Впервые здесь? Сначала прочитайте
[00-getting-started](00-getting-started_RU.md).

## Что делает этот плагин

Он «объясняет» игре новый тип месторождения руды/минерала — то, что шахта
может искать, находить и добывать, — со своей иконкой на миникарте и своей
кистью в редакторе местности. Медная руда, песок, глина и газ в этом проекте
устроены именно так.

Чтобы тип месторождения заработал в игре, нужны три вещи, и этот плагин даёт
все три из одной секции \`.ini\`:

1. Токен \`$TYPE_MINE_...\`, который можно указать в \`building.ini\` шахты
   (актуально, только если вы также строите новую шахту через
   [07-buildings](07-buildings_RU.md) — собственные шахты базовой игры уже
   используют собственные токены базовой игры).
2. Место на карте, где реально хранится насыщенность месторождения — скрытое
   изображение «карты ресурсов» под текстурой местности.
3. Кнопка/слой на миникарте и кисть в редакторе, чтобы вы (или любой игрок
   на этой карте) могли видеть и рисовать, где находится месторождение.

## Как добавить месторождение, шаг за шагом

1. Закройте игру.
2. Откройте \`tesmioloader\\build\\plugins\\deposits.ini\`.
3. Добавьте новую секцию, по одной на месторождение:

   \`\`\`ini
   [my_ore]
   token         = $TYPE_MINE_MYORE
   type          = 14
   map           = auto
   radius        = ore
   icon          = my_ore
   minimap       = 1
   editor        = myore
   \`\`\`

   - \`token\` — придумайте имя, всегда начинающееся с \`$TYPE_MINE_\`. Именно
     это будет указано в \`building.ini\` шахты, чтобы она искала это
     месторождение.
   - \`type\` — любое неиспользуемое число от 10 до 127. Посмотрите на другие
     секции в файле и выберите то, что ещё никто не занял.
   - \`map\` — оставьте \`auto\`, если нет особой причины иначе. Плагин сам
     подберёт свободное место, в новой карте, которую он создаёт
     специально под ваши новые месторождения — вообще не нужно думать о
     каналах или текстурах. (\`terrain\` — особый вариант для месторождения,
     которое должно визуально «выедать» землю при добыче, как карьер гравия
     или песка — см. комментарии в самом файле, если хотите такой эффект.)
   - \`radius\` — на каком расстоянии шахта ищет это месторождение. Укажите
     одно из слов \`ore\`, \`oil\`, \`bauxite\`, \`gravel\`, \`wood\`, \`water\`,
     \`watersurface\`, чтобы скопировать дальность поиска обычной шахты
     (\`ore\` — разумное значение по умолчанию, общее для железа, угля и
     урана). **Не пропускайте это поле** — без него шахты будут показывать
     бессмысленное значение качества.
   - \`icon\` — имя ресурса (из \`resources.ini\`, см.
     [01-resources](01-resources_RU.md)), чью иконку показать на кнопке
     миникарты. Оставьте пустым, если иконка не нужна.
   - \`minimap\` — \`1\` для кнопки на миникарте, \`0\` — без неё.
   - \`editor\` — короткое имя (максимум 7 символов) для кисти
     рисования/стирания на вкладке «Resources» редактора карты. Оставьте
     пустым, если рисовать вручную не нужно.

4. Если хотите, чтобы шахта реально использовала это месторождение — либо
   отредактируйте \`building.ini\` существующей шахты, добавив свой токен
   \`$TYPE_MINE_...\`, либо объявите совершенно новое здание шахты — см.
   [07-buildings](07-buildings_RU.md).
5. Сохраните файл (UTF-8 без BOM) и запустите игру с отмеченным плагином
   \`deposits\`.

## Месторождение нужно нарисовать, прежде чем шахта что-то найдёт

**Новая карта месторождения изначально полностью пуста.** В отличие от
железа, угля или бокситов — они уже нарисованы где-то на каждой официальной
карте — ваше новое месторождение не существует нигде на местности, пока вы
сами его туда не поместите.

1. В игре откройте **редактор местности**.
2. Перейдите на вкладку, где появилась ваша кисть — **Resources** для
   обычного месторождения, или **Rocks**, если вы указали \`map = terrain\`.
3. Найдите инструмент рисования вашего месторождения (его иконку, либо
   заглушку, если своей иконки вы не добавляли) и закрасьте область на
   карте — так же, как рисуете железо или бокситы.
4. Постройте шахту на закрашенной области с нужным токеном
   \`$TYPE_MINE_...\` в её \`building.ini\`. Проверьте её окно информации — там
   должно быть реальное значение «качества источника», а не огромное
   отрицательное число.
5. Сохранитесь и перезагрузите карту, проверьте, что рисунок остался на
   месте. Это единственная часть функции, которая проявляется только после
   реального сохранения/загрузки, а не просто во время игры — текстура
   месторождения записывается на диск при сохранении, точно так же, как
   собственные карты ресурсов игры.

## Справочник настроек

| Поле | Значение |
|---|---|
| \`token\` | Слово \`$TYPE_MINE_...\`, используемое в \`building.ini\` шахты. |
| \`type\` | Уникальное число ≥10, которым движок отличает это месторождение. |
| \`map\` | Где хранятся данные о насыщенности. Почти всегда правильно \`auto\`. |
| \`component\` | Нужно только если вы вручную указали конкретный \`map\` вместо \`auto\`. |
| \`building_type\` | \`7\` = шахта (по умолчанию, почти всегда то, что нужно); \`92\` = скважина. |
| \`radius\` | Дальность поиска — используйте \`ore\`, \`oil\`, \`bauxite\`, \`gravel\`, \`wood\`, \`water\`, \`watersurface\`, либо своё число. |
| \`icon\` | Иконку какого ресурса взять для кнопки на миникарте. |
| \`minimap\` | \`1\`/\`0\` — кнопка и слой на миникарте. |
| \`editor\` | Короткое имя кисти; оставьте пустым, чтобы без кисти. |
| \`deplete\` | Продвинутая настройка — см. [03-depletion](03-depletion_RU.md); не трогайте, если не используете этот плагин и не хотите особого поведения для этого месторождения. |

Общие переключатели вверху файла (\`code_patch\`, \`minimap\`, \`editor\` в
секции \`[deposits]\`) включают/выключают всю функцию целиком; оставьте их
равными \`1\`, если не занимаетесь диагностикой проблем.

## Решение проблем

- **Шахта показывает огромное отрицательное число качества источника** — вы
  забыли \`radius\` или ошиблись в написании слова. Исправьте и
  перестройте/перезагрузите.
- **Нечем рисовать, или кисти нет** — проверьте, что \`editor =\` задан и не
  длиннее 7 символов; более длинные имена молча отбрасываются (в логе будет
  об этом строка).
- **Месторождение исчезло после загрузки сохранения** — обычно это значит,
  что сохранение было сделано *до* того, как тип месторождения появился в
  вашем \`.ini\`, либо плагин был выключен при сохранении. Объявленные здесь
  месторождения требуют, чтобы плагин был включён при каждой игре с этим
  сохранением.
- **Закомментированный пример \`[nickel]\`** уже есть в файле, если хотите
  увидеть второе месторождение, работающее одновременно с медью — просто
  уберите \`;\` в начале каждой его строки.
`,
    "03-depletion.md": `[English](03-depletion.md) | [Русский](03-depletion_RU.md)

# Depletion

New to this? Read [00-getting-started](00-getting-started.md) first.

## What this plugin does

In the base game, a mine checks how rich its deposit is *once*, the moment
it's built, and then produces at that same rate forever — the deposit itself
never gets smaller. This plugin changes that: a working mine now spends down
its deposit as it produces, its "quality of source" drops as the deposit
runs low, and — because the plugin is draining the same map the minimap
shows you — you can watch the coloured patch under a mine physically shrink
over time.

This applies to the base game's own deposits (oil, iron, coal, uranium,
bauxite, gravel) and to anything added through
[02-deposits](02-deposits.md), like copper.

## ⚠️ Read this before you turn it on

**This plugin writes into the terrain itself, and the terrain is part of
your save.** Once a mine has eaten into a deposit, that's saved permanently
— turning \`enabled\` back to \`0\` afterwards does not restore what was
already mined. It doesn't break your save (the file still loads fine
either way), it just means the depletion that already happened stays
happened. **Test this on a copy of a save**, not the city you've spent 40
hours on, until you're happy with your settings.

## How to turn it on

1. Close the game.
2. Open \`tesmioloader\\build\\plugins\\depletion.ini\`.
3. Make sure \`enabled = 1\`.
4. Set \`tonnes_per_texel\` — this is the one number that decides how long
   deposits last. Bigger number = deposits last longer. Start with the
   default (\`1200\`) and adjust after watching a real mine for a while (see
   "Watching it work" below).
5. Check the \`vanilla = \` line — it lists which of the base game's own
   deposits deplete: \`oil,iron,coal,uranium,bauxite,gravel\`. Remove a name
   to leave that one infinite, like the base game. Anything you added via
   [02-deposits](02-deposits.md) always depletes; give a deposit its own
   \`deplete = 0\` in \`deposits.ini\` if you want to exempt just that one.
6. Save (UTF-8, no BOM) and start the game with \`depletion\` ticked.

## Watching it work

Because deposits normally take a very long time to run down, the plugin can
print progress so you can actually see it happening instead of taking it on
faith:

1. Set \`log_seconds = 60\` (this is the default).
2. Play with a mine already built, or build a new one.
3. Open \`tesmioloader.log\` and search for \`deplete\`. You'll see a line per
   mine, every 60 real seconds, like:

   \`\`\`
   deplete  coal mine: 99.86% left, 258926 of 259289 t, quality 0.686
   \`\`\`

4. Watch that percentage over a few in-game days. If it barely moves and
   you want mines to run out faster, **lower** \`tonnes_per_texel\`; if it's
   dropping too fast, **raise** it.
5. The mine's own info window also gets a new row once you rebuild/reopen
   it: **"Deposit remaining: 251.4 kt / 259.3 kt (96.9 %)"** — that's the
   \`panel = 1\` setting doing its job, and you can change the label with
   \`panel_caption\`.

## Gravel is different from every other deposit

Every other deposit lives in an invisible data layer under the terrain.
**Gravel does not** — gravel richness is read straight from the terrain's
own ground texture, the same layer the map editor's rock brush paints. That
means depleting a gravel pit **visibly wears the ground texture away** under
it as it's mined — which is exactly what you'd expect from a real gravel
pit, but it's worth knowing it looks different from a coal mine slowly
fading on the minimap.

Because a gravel deposit's search area is much smaller than an ore mine's,
it needs a much bigger \`tonnes_per_texel\` to last a comparable time — that's
why the \`vanilla = \` line gives gravel its own number after a colon
(\`gravel:30000\`) instead of sharing the general setting.

## Settings reference

| Setting | What it does |
|---|---|
| \`enabled\` | \`0\` turns the whole plugin off. |
| \`tonnes_per_texel\` | The main balance knob — how much ore one map "pixel" is worth. Bigger = deposits last longer. |
| \`vanilla\` | Which base-game deposits deplete: any of \`oil,iron,coal,uranium,bauxite,gravel\`, or \`all\`, or \`none\`. Add \`:number\` after a name for its own rate. |
| \`flush_seconds\` | How often the drained-down map is written back (visual/save only — production itself is always calculated live). Leave at default. |
| \`log_seconds\` | How often progress lines print to the log. \`0\` to silence them once you're done calibrating. |
| \`panel\` | \`1\` adds the "Deposit remaining" row to a mine's info window. |
| \`panel_caption\` | The text of that row's label. Keep it plain ASCII (no Cyrillic) — it's read through an API that mangles anything past basic English letters. |

## Troubleshooting

- **Nothing seems to be depleting** — check \`enabled = 1\`, and give it more
  real time; at the default rate a mine holds years of in-game output, so
  short test sessions won't show much movement. Turn \`log_seconds\` down to
  see it sooner.
- **A gravel pit visibly digs into the ground** — that's correct, not a
  bug; see the section above.
- **You changed your mind and want the old infinite deposits back** — set
  \`enabled = 0\`. Deposits already mined down stay mined down; new deposits
  and undepleted ones behave like vanilla again from that point on.
`,
    "03-depletion_RU.md": `[English](03-depletion.md) | [Русский](03-depletion_RU.md)

# Depletion

Впервые здесь? Сначала прочитайте
[00-getting-started](00-getting-started_RU.md).

## Что делает этот плагин

В оригинальной игре шахта проверяет насыщенность своего месторождения только
*один раз* — в момент постройки — и после этого добывает с тем же темпом
вечно; само месторождение никогда не уменьшается. Этот плагин меняет такое
поведение: работающая шахта теперь реально расходует своё месторождение по
мере добычи, «качество источника» падает по мере истощения, и — поскольку
плагин выкачивает ту же самую карту, что показывает миникарта — вы можете
буквально наблюдать, как цветное пятно под шахтой со временем уменьшается.

Это касается как собственных месторождений базовой игры (нефть, железо,
уголь, уран, бокситы, гравий), так и всего, что добавлено через
[02-deposits](02-deposits_RU.md), например меди.

## ⚠️ Прочитайте это перед включением

**Плагин записывает изменения прямо в текстуру местности, а местность —
часть вашего сохранения.** Как только шахта «выела» кусок месторождения, это
сохраняется навсегда — возврат \`enabled\` обратно в \`0\` не восстанавливает уже
добытое. Сохранение при этом не ломается (файл загружается нормально в любом
случае), просто уже произошедшее истощение остаётся произошедшим.
**Тестируйте на копии сохранения**, а не на городе, в который вложено 40
часов, пока не будете довольны настройками.

## Как включить

1. Закройте игру.
2. Откройте \`tesmioloader\\build\\plugins\\depletion.ini\`.
3. Убедитесь, что \`enabled = 1\`.
4. Задайте \`tonnes_per_texel\` — это единственное число, определяющее, как
   долго хватит месторождений. Больше число = месторождения служат дольше.
   Начните со значения по умолчанию (\`1200\`) и подкорректируйте после того,
   как понаблюдаете за реальной шахтой (см. «Как это увидеть» ниже).
5. Проверьте строку \`vanilla = \` — в ней перечислено, какие месторождения
   базовой игры исчерпываются: \`oil,iron,coal,uranium,bauxite,gravel\`.
   Уберите имя, чтобы это месторождение осталось бесконечным, как в
   оригинале. Всё, что вы добавили через
   [02-deposits](02-deposits_RU.md), исчерпывается всегда; чтобы исключить
   именно его, задайте \`deplete = 0\` в его секции в \`deposits.ini\`.
6. Сохраните (UTF-8 без BOM) и запустите игру с отмеченным плагином
   \`depletion\`.

## Как это увидеть

Поскольку в обычном темпе месторождения истощаются очень долго, плагин может
печатать прогресс, чтобы вы видели процесс, а не верили на слово:

1. Задайте \`log_seconds = 60\` (это значение по умолчанию).
2. Играйте с уже построенной шахтой либо постройте новую.
3. Откройте \`tesmioloader.log\` и найдите там \`deplete\`. Вы увидите строку по
   каждой шахте раз в 60 реальных секунд, например:

   \`\`\`
   deplete  coal mine: 99.86% left, 258926 of 259289 t, quality 0.686
   \`\`\`

4. Понаблюдайте за этим процентом несколько игровых дней. Если он почти не
   меняется, а вы хотите, чтобы месторождения заканчивались быстрее —
   **уменьшите** \`tonnes_per_texel\`; если падает слишком быстро —
   **увеличьте**.
5. В собственном окне информации шахты тоже появится новая строка после
   перестройки/повторного открытия окна: **«Deposit remaining: 251.4 kt /
   259.3 kt (96.9 %)»** — это работает настройка \`panel = 1\`, а подпись
   можно поменять через \`panel_caption\`.

## Гравий устроен иначе, чем остальные месторождения

Все остальные месторождения хранятся в невидимом слое данных под текстурой
местности. **Гравий — нет**: его насыщенность читается прямо из собственной
текстуры земли, того же слоя, который красит кисть камня в редакторе карты.
Это значит, что истощение карьера гравия **буквально стирает текстуру земли**
под ним по мере добычи — именно то, чего и ждёшь от настоящего карьера, но
стоит знать, что выглядит это иначе, чем медленно тускнеющее пятно угольной
шахты на миникарте.

Поскольку область поиска у гравия намного меньше, чем у обычной рудной
шахты, ему нужен намного больший \`tonnes_per_texel\`, чтобы служить сравнимое
время — поэтому в строке \`vanilla = \` у гравия своё число после двоеточия
(\`gravel:30000\`), а не общая настройка.

## Справочник настроек

| Настройка | Что делает |
|---|---|
| \`enabled\` | \`0\` полностью выключает плагин. |
| \`tonnes_per_texel\` | Главный регулятор баланса — сколько руды стоит один «пиксель» карты. Больше = месторождения служат дольше. |
| \`vanilla\` | Какие месторождения базовой игры исчерпываются: любые из \`oil,iron,coal,uranium,bauxite,gravel\`, либо \`all\`, либо \`none\`. Добавьте \`:число\` после имени для собственного темпа. |
| \`flush_seconds\` | Как часто выработанная карта записывается обратно (влияет только на визуал/сохранение — сама добыча всегда считается непрерывно). Оставьте по умолчанию. |
| \`log_seconds\` | Как часто в лог печатается прогресс. \`0\`, чтобы отключить после калибровки. |
| \`panel\` | \`1\` добавляет строку «Deposit remaining» в окно информации шахты. |
| \`panel_caption\` | Текст подписи этой строки. Используйте только латиницу (без кириллицы) — значение читается через API, которое портит всё, кроме базовых английских букв. |

## Решение проблем

- **Кажется, ничего не истощается** — проверьте \`enabled = 1\` и дайте
  больше реального времени; при значениях по умолчанию шахты хватает на
  годы игрового времени, так что за короткую тестовую сессию заметных
  изменений не будет. Уменьшите \`log_seconds\`, чтобы увидеть эффект раньше.
- **Карьер гравия визуально выедает землю** — это правильно, не баг, см.
  раздел выше.
- **Передумали и хотите вернуть бесконечные месторождения** — поставьте
  \`enabled = 0\`. Уже выработанные месторождения останутся выработанными;
  новые и нетронутые с этого момента снова ведут себя как в оригинале.
`,
    "04-accumulator.md": `[English](04-accumulator.md) | [Русский](04-accumulator_RU.md)

# Accumulator

New to this? Read [00-getting-started](00-getting-started.md) first.

## What this plugin does

It adds a working **battery building** to the game — a "Stationary
Accumulator" that soaks up spare electricity while the grid has plenty, and
feeds it back out during a shortage, the way a real grid-scale battery
would. Nothing like this exists in the base game.

The building itself is already included:
\`media_soviet\\workshop_wip\\9100000005\`. You don't need to write anything to
try it — build it in-game like any other building, connect it to your power
grid, and the plugin does the rest automatically while the game runs.

## How to use it

1. Make sure \`accumulator\` is ticked in the launcher (or \`accumulator=1\` in
   \`tesmioloader.ini\`).
2. Start the game, load or start a save with an electric grid.
3. Find and build **Stationary Accumulator** the same way you'd build any
   other electrical building, and connect it to your grid.
4. That's it. While your grid has spare generation, the battery charges;
   its info window shows a **Charge: X / 5000 (Y %)** row so you can watch
   it fill.
5. During a real shortage (not enough power plants for demand), the battery
   discharges back into the grid automatically, up to its discharge limit.

No \`.ini\` editing is required for basic use — the settings below are for
tuning how aggressively it charges/discharges, not for turning the feature
on.

## Tuning how it behaves

Open \`tesmioloader\\build\\plugins\\accumulator.ini\` (close the game first, as
always):

- **\`charge_rate\`** — how fast the battery fills, in storage units/second.
  Default \`60\`, roughly "one coal power plant's worth of spare generation."
  This exists because an empty battery would otherwise out-bid an entire
  town for electricity the moment it's connected — raise it to fill faster,
  lower it to be gentler on the rest of your grid while it tops up.
- **\`discharge_rate\`** — a **ceiling**, not a guaranteed drain rate: the
  battery only ever discharges into an actual shortage. Raise it to let the
  battery cover a bigger outage; lower it to make a full battery's charge
  last longer during a long shortage.
- **\`min_capacity\`** — how big a building's electric storage has to be
  before the plugin treats it as "a battery" rather than an ordinary grid
  node's incidental buffer. Leave this alone unless you're building your
  own custom battery building and it isn't being recognised.
- **\`panel\`** and **\`panel_caption\`** — the "Charge: X / Y" row on the
  building's window. Turn \`panel\` to \`0\` if you don't want it.
- **\`gauges\`** — fixes the two power dials on the battery's own window,
  which otherwise misreport it as having "no power supply" even while it's
  charging fine (a battery is a dead end on the wire, so the game's normal
  way of measuring current doesn't see it). Leave at \`1\`.

## What's confirmed working, and what isn't yet

Being upfront about this because it matters for expectations: **charging is
confirmed working in a real game.** Discharging into a real shortage, and
surviving a save/reload while charged, are implemented the same way but have
not yet been watched happening in an actual playthrough. If you try it and
something looks wrong during a real power shortage, that's useful
information — see the diagnostics below.

## Watching it work / diagnosing problems

Two things in the \`.ini\` exist purely to help you see what's happening:

- **\`log_seconds = 30\`** (default) prints one line per battery to
  \`tesmioloader.log\` every 30 real seconds:

  \`\`\`
  battery    4210.5 / 5000 (84.2 %)  in +0.417  out +0.000  this tick
             (59.87 / 0.00 per second, dt 0.00697)
  \`\`\`

  \`in\` / \`out\` tell you whether it's currently charging, discharging, or
  sitting idle — this is the fastest way to confirm the battery is actually
  doing something.

- **\`trace = 1\`** (default) prints a more detailed trace of what's
  happening to the buildings wired to the battery, useful if a substation
  fed by the battery isn't lighting up the way you'd expect. If you're not
  chasing a problem, you can set this to \`0\` to keep the log shorter.

Set both to \`0\` once you've confirmed things work the way you want and
don't need the extra log lines any more.

## Troubleshooting

- **Battery never seems to charge** — check your grid actually has spare
  generation beyond what's currently being consumed; the battery only takes
  what would otherwise go unused, throttled by \`charge_rate\`.
- **A substation fed only by a battery says "no power" even though the
  battery is full** — this is a known rough edge in how electricity
  quality/voltage propagates from a battery specifically (not from a power
  plant); it's actively being worked on. Check \`tesmioloader.log\` for
  \`battery\` and \`trace\` lines when this happens, since that trace exists
  specifically to diagnose it.
- **Want to remove the feature** — untick \`accumulator\` in the launcher, or
  delete \`accumulator.dll\`. The building you already placed stays standing
  and keeps whatever charge it had (it's an ordinary storage saved with the
  world), it simply stops charging or discharging automatically.
`,
    "04-accumulator_RU.md": `[English](04-accumulator.md) | [Русский](04-accumulator_RU.md)

# Accumulator

Впервые здесь? Сначала прочитайте
[00-getting-started](00-getting-started_RU.md).

## Что делает этот плагин

Он добавляет в игру рабочее **здание-аккумулятор** — «Stationary
Accumulator» («Стационарный аккумулятор»), который забирает излишки
электричества, пока в сети есть запас, и отдаёт их обратно во время
дефицита — так, как это делал бы настоящий сетевой накопитель энергии.
Ничего подобного в базовой игре нет.

Само здание уже включено в проект:
\`media_soviet\\workshop_wip\\9100000005\`. Ничего писать не нужно, чтобы его
попробовать — постройте его в игре как любое другое здание, подключите к
своей электросети, а всё остальное плагин делает автоматически, пока игра
работает.

## Как этим пользоваться

1. Убедитесь, что в лаунчере отмечен \`accumulator\` (или в
   \`tesmioloader.ini\` стоит \`accumulator=1\`).
2. Запустите игру, загрузите или начните сохранение с электросетью.
3. Найдите и постройте **Stationary Accumulator** так же, как любое другое
   электрическое здание, и подключите его к своей сети.
4. Всё. Пока в сети есть запас генерации, аккумулятор заряжается; в его окне
   информации появляется строка **Charge: X / 5000 (Y %)**, по которой
   видно, как он заполняется.
5. Во время реального дефицита (электростанций не хватает на спрос)
   аккумулятор автоматически отдаёт заряд обратно в сеть, вплоть до предела
   разряда.

Для базового использования редактировать \`.ini\` не нужно — настройки ниже
регулируют, насколько активно он заряжается/разряжается, а не включают
функцию как таковую.

## Настройка поведения

Откройте \`tesmioloader\\build\\plugins\\accumulator.ini\` (как всегда, сначала
закрыв игру):

- **\`charge_rate\`** — насколько быстро аккумулятор заполняется, в единицах
  хранилища в секунду. По умолчанию \`60\`, примерно «запас генерации одной
  угольной электростанции». Это ограничение нужно потому, что пустой
  аккумулятор иначе перебил бы ставку целого города на электричество в тот
  же момент, как его подключат — увеличьте, чтобы заряжался быстрее,
  уменьшите, чтобы мягче забирать у остальной сети, пока он заполняется.
- **\`discharge_rate\`** — это **потолок**, а не гарантированная скорость
  разряда: аккумулятор отдаёт заряд только при реальном дефиците.
  Увеличьте, чтобы аккумулятор мог покрыть более крупное отключение;
  уменьшите, чтобы полного заряда хватало дольше при долгом дефиците.
- **\`min_capacity\`** — насколько большим должно быть электрическое хранилище
  здания, чтобы плагин считал его «аккумулятором», а не обычным буфером
  узла сети. Не трогайте, если только вы не строите собственное здание-
  аккумулятор и оно не распознаётся.
- **\`panel\`** и **\`panel_caption\`** — строка «Charge: X / Y» в окне здания.
  Поставьте \`panel = 0\`, если она не нужна.
- **\`gauges\`** — исправляет два индикатора мощности в окне аккумулятора,
  которые иначе неверно показывают «нет электропитания», даже когда он
  прекрасно заряжается (аккумулятор — тупиковая точка провода, поэтому
  обычный способ игры измерять ток его не видит). Оставьте \`1\`.

## Что уже подтверждено, а что ещё нет

Говорим об этом прямо, потому что это важно для ожиданий: **зарядка
подтверждена работающей в реальной игре.** Разрядка при реальном дефиците и
сохранение заряда через сохранение/загрузку реализованы тем же способом, но
ещё не были замечены в реальном прохождении. Если вы попробуете и во время
настоящего дефицита электричества что-то пойдёт не так — это полезная
информация, см. диагностику ниже.

## Как это увидеть / диагностика проблем

Два параметра в \`.ini\` существуют исключительно для того, чтобы вы видели,
что происходит:

- **\`log_seconds = 30\`** (по умолчанию) печатает по строке на каждый
  аккумулятор в \`tesmioloader.log\` раз в 30 реальных секунд:

  \`\`\`
  battery    4210.5 / 5000 (84.2 %)  in +0.417  out +0.000  this tick
             (59.87 / 0.00 per second, dt 0.00697)
  \`\`\`

  \`in\` / \`out\` показывают, заряжается ли он сейчас, разряжается, или
  бездействует — это самый быстрый способ убедиться, что аккумулятор
  действительно что-то делает.

- **\`trace = 1\`** (по умолчанию) печатает более подробную трассировку того,
  что происходит со зданиями, подключёнными к аккумулятору — полезно, если
  подстанция, питаемая от аккумулятора, не «загорается» так, как вы
  ожидали. Если проблему вы не ищете, можно поставить \`0\`, чтобы лог был
  короче.

Обнулите оба параметра, когда убедитесь, что всё работает как нужно, и
лишние строки в логе больше не нужны.

## Решение проблем

- **Аккумулятор вроде бы не заряжается** — проверьте, что в сети
  действительно есть запас генерации сверх текущего потребления;
  аккумулятор забирает только то, что иначе осталось бы неиспользованным, с
  ограничением через \`charge_rate\`.
- **Подстанция, питаемая только от аккумулятора, показывает «нет питания»,
  хотя аккумулятор полон** — это известная шероховатость в том, как
  качество/напряжение электричества распространяется именно от
  аккумулятора (а не от электростанции); над этим сейчас работают. Ищите в
  \`tesmioloader.log\` строки \`battery\` и \`trace\`, когда это случается — эта
  трассировка существует специально для диагностики такой ситуации.
- **Хотите убрать функцию** — снимите галочку с \`accumulator\` в лаунчере
  или удалите \`accumulator.dll\`. Уже построенное здание останется стоять и
  сохранит свой заряд (это обычное хранилище, сохраняемое вместе с миром),
  просто перестанет заряжаться и разряжаться автоматически.
`,
    "05-needs.md": `[English](05-needs.md) | [Русский](05-needs_RU.md)

# Needs

New to this? Read [00-getting-started](00-getting-started.md) first. This
plugin works closely with [01-resources](01-resources.md) (to create the
good itself) and, for a good sold in its own dedicated shop, with
[07-buildings](07-buildings.md) (to create that shop). Read this guide
first, it explains the concepts the other two build on.

## What this plugin does

The base game has four things citizens shop for: food, clothes, electronics
and (in some buildings) alcohol/medicine-like specials. This plugin adds a
**fifth** — citizens will start wanting a resource of your choice, shops
will stock it, and trucks/trains will need to keep it supplied, exactly like
the base four.

Two ready-made examples ship with this project:

- **Furniture** — a department-store good, sold alongside electronics in
  every big shop that already sells electronics.
- **Medicine** — sold only in a dedicated **Pharmacy** building (see
  [07-buildings](07-buildings.md)), nowhere else.

## The one concept you need: the "donor"

Every new need is defined as a copy of an **existing** citizen demand — a
**donor**. You don't invent shopping behaviour from scratch; you clone an
existing one (say, "wants electronics") and just change what resource it
asks for, how much, how often, and how unhappy going without it makes
someone. The donor also decides *which shops* end up selling your new good:
whatever shops already sell the donor's resource are where a slot gets added
for yours, automatically — unless you say \`category = none\`, which means
"nowhere automatically, I'll build a dedicated shop myself."

## How to add a new department-store-style good, step by step

Use this path if you want your good sold alongside existing categories, like
furniture next to electronics.

1. Close the game.
2. Declare the resource itself in \`resources.ini\` first — see
   [01-resources](01-resources.md). Clone it from \`eletronics\` if you don't
   care about a truck-bed appearance, or from a bulkier template if you do.
3. Open \`tesmioloader\\build\\plugins\\needs.ini\` and add a line under
   \`[list]\`:

   \`\`\`ini
   my_good = eletronics, 1.0, advanced, 0.35, 0.010
   \`\`\`

   Reading it left to right:
   - \`my_good\` — the resource name from step 2.
   - \`eletronics\` — the **donor**. Use \`food\` or \`meat\` for a grocery-shaped
     good, \`clothes\` or \`eletronics\` for a department-store good.
   - \`1.0\` — how much of it citizens want, relative to how much of the
     donor they want. \`1.0\` means "as much as electronics."
   - \`advanced\` — which kind of shop stocks it. \`auto\` (leave this column
     out) puts it wherever the donor's own resource already goes; naming
     \`advanced\` narrows it to big department stores only, \`medium\` to
     smaller ones, and so on. See the comments in the file for the full
     list.
   - \`0.35\` — the **chance**, 0 to 1, that any given citizen picks this need
     up on a given planning cycle. This is what decouples "wants furniture"
     from "wants electronics today" — without it, a citizen only wants your
     good exactly when they also want the donor. \`0.35\` means roughly a
     third of citizens take it up per cycle.
   - \`0.010\` — how much unhappiness one cycle of going without it costs,
     0 to 1. \`0\` (or leaving it out) means it's tracked but doesn't affect
     mood. Compare: the base game itself takes about \`0.035\` off for
     clothes shortages; start small (\`0.005\`–\`0.02\`) for a comfort good.
4. Provide a 48×48 PNG icon at
   \`tesmioloader\\vfs\\media_soviet\\resources\\my_good.png\` if the resource
   doesn't already have cargo geometry to fall back on (anything cloned
   from \`eletronics\`, \`clothes\` or \`food\` needs this).
5. Save (UTF-8, no BOM) and start the game with \`needs\` and \`resources\`
   both ticked.

## How to add a good sold only in its own dedicated shop

Use this path for something like medicine, sold in a pharmacy and nowhere
else.

1. Do steps 1–2 and 4–5 above, but in step 3 set the category to \`none\`:

   \`\`\`ini
   medicine = eletronics, 0.5, none, 0.30, 0.008
   \`\`\`

   \`none\` means "citizens want this, but don't add it to any existing
   shop's shelf — I'm building it a shop of its own."
2. Build that dedicated shop through [07-buildings](07-buildings.md) — it
   needs a \`$STORAGE_SPECIAL\` line naming your resource. The pharmacy
   example in \`buildings.ini\` shows exactly this.

## ⚠️ Save compatibility

Adding a need adds a storage slot to every shop that stocks its donor, and
that slot list is part of the save. **Test on a copy of a save**, the same
caution as [01-resources](01-resources.md) — see
[00-getting-started, step 7](00-getting-started.md#7-before-you-experiment-back-up-your-save).

## Settings reference

The \`[list]\` line format, in full:

\`\`\`
resource = donor[, factor[, category[, chance[, unhappiness]]]]
\`\`\`

Every field after \`donor\` is optional and has a sensible default (see the
comments in the \`.ini\` for exact defaults).

| \`[needs]\` setting | What it does |
|---|---|
| \`enabled\` | \`0\` turns the whole plugin off. |
| \`demand\` | \`1\` makes citizens actually want the goods. Turn off to only stock shops without changing citizen behaviour. |
| \`storage\` | \`1\` adds shelf space to shops. Turn off if you're stocking shelves some other way. |
| \`max_demands\` | How many things a citizen can want at once — capped at \`7\` by the game itself, can't be raised. |
| \`when_full\` | \`skip\` (default) — a citizen who already has 7 demands waits for room; \`replace\` — swaps in your need for the donor's for one cycle. |
| \`probe\` | Diagnostics — dumps citizens' demand lists and shop storage details to the log. Leave on until you've confirmed shops are stocked correctly, then it's safe to turn off. |
| \`log_seconds\` | How often a summary line prints. \`0\` to silence. |

## Watching it work

1. Set \`probe = 1\` (default).
2. Load a save and check \`tesmioloader.log\` for lines about your resource —
   whether it was found in citizens' demand lists and in the shop storages
   it should have landed in.
3. In-game, check a department store (for a \`category\` other than \`none\`)
   or your dedicated shop (for \`none\`) actually has a shelf for the good,
   that a truck brings it, and that the shelf slowly empties as customers
   arrive.

## Troubleshooting

- **Citizens never seem to want it** — check \`demand = 1\`, and remember
  \`chance\` limits how many citizens take it up per cycle; a low chance
  looks like "nobody wants it" over a short session.
- **The good never appears on a shelf** — check \`storage = 1\`, and that the
  category you picked actually matches shops that sell the donor (the log
  warns if you named a category the donor's shops don't use).
- **Citizens want it but it's never in the store, and the store never
  seems to restock** — the store may simply not be *known* to sell it from
  the citizens' point of view (a documented rough edge — see the project's
  own notes on this). Try switching the shop to a wider \`$STORAGE_DEMAND_*\`
  category as described in the pharmacy example's comments in
  \`buildings.ini\`.
`,
    "05-needs_RU.md": `[English](05-needs.md) | [Русский](05-needs_RU.md)

# Needs

Впервые здесь? Сначала прочитайте
[00-getting-started](00-getting-started_RU.md). Этот плагин тесно связан с
[01-resources](01-resources_RU.md) (создаёт сам товар) и, для товара,
продаваемого в отдельном специализированном магазине — с
[07-buildings](07-buildings_RU.md) (создаёт этот магазин). Сначала прочитайте
именно эту инструкцию — она объясняет понятия, на которых строятся две
другие.

## Что делает этот плагин

В базовой игре жители покупают четыре вещи: еду, одежду, электронику и (в
некоторых зданиях) особые товары вроде алкоголя. Этот плагин добавляет
**пятую** — жители начинают хотеть выбранный вами ресурс, магазины начинают
его продавать, а грузовики/поезда должны будут его подвозить — точно так
же, как эти четыре базовых.

В проекте уже есть два готовых примера:

- **Мебель** — товар для универмага, продаётся рядом с электроникой в
  каждом крупном магазине, который уже продаёт электронику.
- **Лекарства** — продаются только в отдельном здании **аптеки** (см.
  [07-buildings](07-buildings_RU.md)) и больше нигде.

## Единственное понятие, которое нужно понять: «донор»

Каждая новая потребность определяется как копия **уже существующей**
потребности жителя — **донора**. Вы не изобретаете покупательское поведение
с нуля — вы клонируете существующее (например, «хочет электронику») и
просто меняете, какой ресурс оно запрашивает, в каком количестве, как часто
и насколько человек расстраивается, если не может это получить. Донор также
определяет, *в каких магазинах* окажется ваш новый товар: слот для него
автоматически добавляется во все магазины, которые уже продают ресурс
донора, — если только вы не укажете \`category = none\`, что означает
«нигде автоматически, магазин я построю сам».

## Как добавить товар для универмага, шаг за шагом

Используйте этот способ, если хотите, чтобы товар продавался вместе с
существующими категориями — как мебель рядом с электроникой.

1. Закройте игру.
2. Сначала объявите сам ресурс в \`resources.ini\` — см.
   [01-resources](01-resources_RU.md). Клонируйте его из \`eletronics\`, если
   внешний вид в кузове грузовика не важен, либо из более объёмного шаблона,
   если важен.
3. Откройте \`tesmioloader\\build\\plugins\\needs.ini\` и добавьте строку в
   \`[list]\`:

   \`\`\`ini
   my_good = eletronics, 1.0, advanced, 0.35, 0.010
   \`\`\`

   Читаем слева направо:
   - \`my_good\` — имя ресурса из шага 2.
   - \`eletronics\` — **донор**. Используйте \`food\` или \`meat\` для товара
     «продуктового» типа, \`clothes\` или \`eletronics\` — для товара
     универмага.
   - \`1.0\` — сколько его хотят жители относительно того, сколько они хотят
     донора. \`1.0\` значит «столько же, сколько электроники».
   - \`advanced\` — какой тип магазина его продаёт. \`auto\` (пропустить эту
     колонку) — там же, где уже продаётся ресурс донора; указание
     \`advanced\` сужает до крупных универмагов, \`medium\` — до магазинов
     поменьше, и так далее. Полный список — в комментариях самого файла.
   - \`0.35\` — **вероятность**, от 0 до 1, что конкретный житель захочет это
     на данном цикле планирования. Именно это отвязывает «хочет мебель» от
     «сегодня хочет электронику» — без этого параметра житель хочет ваш
     товар ровно тогда же, когда хочет донора. \`0.35\` означает, что
     примерно треть жителей берёт эту потребность за цикл.
   - \`0.010\` — насколько падает счастье за один цикл без этого товара, от 0
     до 1. \`0\` (или отсутствие значения) означает, что потребность
     учитывается, но на настроение не влияет. Для сравнения: сама базовая
     игра снимает около \`0.035\` за нехватку одежды; для товара «для
     комфорта» начните с малого (\`0.005\`–\`0.02\`).
4. Добавьте иконку 48×48 PNG по пути
   \`tesmioloader\\vfs\\media_soviet\\resources\\my_good.png\`, если у ресурса
   нет собственной модели груза, на которую можно опереться (это нужно
   всему, склонированному из \`eletronics\`, \`clothes\` или \`food\`).
5. Сохраните (UTF-8 без BOM) и запустите игру с отмеченными плагинами
   \`needs\` и \`resources\`.

## Как добавить товар, продающийся только в отдельном специализированном магазине

Этот способ — для товара вроде лекарств, продающихся только в аптеке.

1. Выполните шаги 1–2 и 4–5 выше, но на шаге 3 укажите категорию \`none\`:

   \`\`\`ini
   medicine = eletronics, 0.5, none, 0.30, 0.008
   \`\`\`

   \`none\` означает «жители хотят это, но не добавлять на полку ни одного
   существующего магазина — я построю для этого отдельный магазин».
2. Постройте этот отдельный магазин через
   [07-buildings](07-buildings_RU.md) — ему нужна строка
   \`$STORAGE_SPECIAL\` с именем вашего ресурса. Пример аптеки в
   \`buildings.ini\` показывает это в точности.

## ⚠️ Совместимость сохранений

Добавление потребности добавляет слот хранилища в каждый магазин, который
продаёт её донора, а список слотов — часть сохранения. **Тестируйте на копии
сохранения**, та же осторожность, что и в
[01-resources](01-resources_RU.md) — см.
[00-getting-started, пункт 7](00-getting-started_RU.md#7-перед-экспериментами--сделайте-резервную-копию-сохранения).

## Справочник настроек

Полный формат строки в \`[list]\`:

\`\`\`
resource = donor[, factor[, category[, chance[, unhappiness]]]]
\`\`\`

Каждое поле после \`donor\` необязательно и имеет разумное значение по
умолчанию (точные значения — в комментариях самого \`.ini\`).

| Настройка \`[needs]\` | Что делает |
|---|---|
| \`enabled\` | \`0\` полностью выключает плагин. |
| \`demand\` | \`1\` заставляет жителей реально хотеть товар. Выключите, чтобы только заполнить полки, не меняя поведение жителей. |
| \`storage\` | \`1\` добавляет место на полке в магазинах. Выключите, если заполняете полки другим способом. |
| \`max_demands\` | Сколько всего вещей житель может хотеть одновременно — жёстко ограничено игрой числом \`7\`, поднять нельзя. |
| \`when_full\` | \`skip\` (по умолчанию) — житель с уже 7 потребностями ждёт места; \`replace\` — на один цикл подменяет донора вашей потребностью. |
| \`probe\` | Диагностика — выводит в лог списки потребностей жителей и подробности хранилищ магазинов. Держите включённым, пока не убедитесь, что магазины заполняются правильно, затем можно выключить. |
| \`log_seconds\` | Как часто печатается сводная строка. \`0\`, чтобы отключить. |

## Как это увидеть

1. Задайте \`probe = 1\` (по умолчанию).
2. Загрузите сохранение и посмотрите в \`tesmioloader.log\` строки про ваш
   ресурс — нашёлся ли он в списках потребностей жителей и в хранилищах
   магазинов, куда должен был попасть.
3. В игре проверьте, что в универмаге (для \`category\`, отличной от \`none\`)
   или в вашем отдельном магазине (для \`none\`) действительно есть полка под
   товар, что грузовик его подвозит и что полка постепенно пустеет по мере
   прихода покупателей.

## Решение проблем

- **Жители вроде бы никогда его не хотят** — проверьте \`demand = 1\` и
  помните, что \`chance\` ограничивает, сколько жителей берут потребность за
  цикл; низкая вероятность за короткую сессию выглядит как «никому не
  нужно».
- **Товар никогда не появляется на полке** — проверьте \`storage = 1\` и что
  выбранная категория действительно соответствует магазинам, продающим
  донора (лог предупредит, если вы указали категорию, которую магазины
  донора не используют).
- **Жители хотят товар, но его никогда нет в магазине, и магазин будто не
  пополняется** — возможно, магазин просто «не считается» продающим его с
  точки зрения жителей (задокументированная шероховатость — см. собственные
  заметки проекта об этом). Попробуйте переключить магазин на более широкую
  категорию \`$STORAGE_DEMAND_*\`, как описано в комментариях к примеру
  аптеки в \`buildings.ini\`.
`,
    "06-walking.md": `[English](06-walking.md) | [Русский](06-walking_RU.md)

# Walking

New to this? Read [00-getting-started](00-getting-started.md) first.

## What this plugin does

By default, a citizen will only walk up to 480 metres (measured along
roads/footpaths, not a straight line) to a shop, a job, or a service, and
will only drive up to 2500 metres between home, work and parking. Beyond
that distance, the game simply doesn't consider a building "reachable" —
it's not a difficulty setting, it's a hard cutoff. This plugin lets you
raise (or lower) both numbers.

This is the simplest plugin to use: four numbers, no hooks into the
economy, no save-format changes.

## How to use it

1. Close the game.
2. Open \`tesmioloader\\build\\plugins\\walking.ini\`.
3. Change \`distance\` (walking, metres) and/or \`car_distance\` (driving,
   metres) to what you want. The base game's own values are \`1000\` and
   \`2500\` respectively in this file already (raised from vanilla's 480/2500
   — lower \`distance\` back to \`480\` if you want the original limit).
4. Leave \`regen_on_load = 1\` if you're applying this to a **city you
   already have built** — see below for why.
5. Save (UTF-8, no BOM) and start the game with \`walking\` ticked.

## Why \`regen_on_load\` matters

Which buildings a citizen can walk to isn't recalculated on the fly — it's
worked out once and stored with each building, as part of your save. That
means:

- **New construction** always uses whatever \`distance\` is set to when
  it's built — no extra step needed.
- **A city you already had before changing the setting** keeps its *old*
  connections until something recalculates them. \`regen_on_load = 1\`
  makes that recalculation happen automatically every time you load that
  save — it costs a few extra seconds on the loading screen for a big
  city, once per load, and after that citizens in your existing town use
  the new distance too.

If you'd rather have fast loads and don't mind that the new distance only
affects things you build from now on, set \`regen_on_load = 0\`.

## Settings reference

| Setting | What it does |
|---|---|
| \`enabled\` | \`0\` turns the plugin off entirely and restores vanilla behaviour. |
| \`distance\` | Max walking distance, in metres. \`0\` removes the limit entirely (works, but can make placing buildings slow in a large city, since the game then has to search the whole road network); the plugin refuses anything above \`20000\`. |
| \`car_distance\` | Max driving distance for citizens with a car, same units. Raise it alongside \`distance\` if you want cars to stay meaningfully longer-range — at equal values a car buys nothing over walking. |
| \`regen_on_load\` | \`1\` rebuilds every walking/parking connection when a save loads, so an existing city picks up the new limit immediately. \`0\` = only new construction gets it. |
| \`probe\` | Diagnostics only — logs what the patch found before writing anything. Leave at \`0\` unless troubleshooting after a game update. |

## What's confirmed, and one known rough edge

The actual walking/driving behaviour — which buildings a citizen is willing
to use — is confirmed working: citizens do use shops and workplaces past the
old 480 m limit, and \`regen_on_load\` does rebuild connections on an existing
city.

**One thing is not yet fixed**: the in-game overlay button that highlights a
building's walking distance on the map (for visually checking coverage)
draws its own, separate calculation and has historically shown the old
distance even when citizens were already using the new one. If the overlay
looks wrong but citizens are clearly reaching farther buildings in practice,
trust the citizens, not the overlay — this is a display quirk, not a sign
the setting didn't apply.

## Troubleshooting

- **Nothing seems to have changed on an existing city** — check
  \`regen_on_load = 1\` and that you actually reloaded the save after
  changing the setting (not just kept playing in the same session).
- **Placing buildings got noticeably slower** — you likely set \`distance\`
  very high or to \`0\` on a large, built-up city; the search cost grows with
  the limit. Lower it back down.
- **The walking-distance overlay button still shows the old radius** — see
  the note above; it's a known display-only issue, separate from actual
  citizen behaviour.
`,
    "06-walking_RU.md": `[English](06-walking.md) | [Русский](06-walking_RU.md)

# Walking

Впервые здесь? Сначала прочитайте
[00-getting-started](00-getting-started_RU.md).

## Что делает этот плагин

По умолчанию житель готов пройти пешком не более 480 метров (по дороге/
тропинке, а не по прямой) до магазина, работы или услуги, и проехать на
машине не более 2500 метров между домом, работой и парковкой. За этими
пределами игра просто не считает здание «достижимым» — это не настройка
сложности, а жёсткое ограничение. Этот плагин позволяет поднять (или
понизить) оба числа.

Это самый простой в использовании плагин: четыре числа, никакого вмешательства
в экономику, никаких изменений формата сохранения.

## Как этим пользоваться

1. Закройте игру.
2. Откройте \`tesmioloader\\build\\plugins\\walking.ini\`.
3. Измените \`distance\` (пешком, в метрах) и/или \`car_distance\` (на машине,
   в метрах) на нужные значения. В этом файле уже стоят \`1000\` и \`2500\`
   соответственно (подняты с оригинальных 480/2500 — верните \`distance\`
   обратно к \`480\`, если хотите оригинальный лимит).
4. Оставьте \`regen_on_load = 1\`, если применяете это к **уже построенному
   городу** — почему это важно, см. ниже.
5. Сохраните (UTF-8 без BOM) и запустите игру с отмеченным плагином
   \`walking\`.

## Почему важен \`regen_on_load\`

То, до каких зданий житель может дойти, не пересчитывается на лету — это
вычисляется один раз и хранится при каждом здании как часть сохранения. Это
значит:

- **Новая застройка** всегда использует то значение \`distance\`, которое
  было на момент постройки — дополнительных действий не требуется.
- **Город, который у вас уже был до изменения настройки**, сохраняет свои
  *старые* связи, пока что-то их не пересчитает. \`regen_on_load = 1\`
  заставляет этот пересчёт происходить автоматически при каждой загрузке
  этого сохранения — на экране загрузки крупного города это стоит
  несколько дополнительных секунд, один раз за загрузку, а после этого
  жители в вашем существующем городе тоже используют новую дистанцию.

Если вам важнее быстрая загрузка и вы не против, что новая дистанция
коснётся только того, что вы построите с этого момента — поставьте
\`regen_on_load = 0\`.

## Справочник настроек

| Настройка | Что делает |
|---|---|
| \`enabled\` | \`0\` полностью выключает плагин и возвращает оригинальное поведение. |
| \`distance\` | Максимальная дистанция ходьбы, в метрах. \`0\` полностью убирает ограничение (работает, но может замедлить размещение зданий в крупном городе, так как игре придётся обыскивать всю дорожную сеть целиком); плагин отказывается принимать значения выше \`20000\`. |
| \`car_distance\` | Максимальная дистанция поездки для жителей с машиной, те же единицы. Поднимайте вместе с \`distance\`, если хотите, чтобы машина оставалась заметно более дальнобойным вариантом — при равных значениях машина не даёт преимущества перед ходьбой. |
| \`regen_on_load\` | \`1\` пересчитывает все связи ходьбы/парковки при загрузке сохранения, так что существующий город сразу получает новый лимит. \`0\` = получает только новая застройка. |
| \`probe\` | Только диагностика — записывает в лог, что нашёл патч, прежде чем что-либо менять. Оставьте \`0\`, если не занимаетесь поиском проблем после обновления игры. |

## Что подтверждено, и одна известная шероховатость

Само поведение ходьбы/вождения — какие здания житель готов использовать —
подтверждено работающим: жители действительно пользуются магазинами и
рабочими местами за пределами старого лимита в 480 м, и \`regen_on_load\`
действительно пересчитывает связи в уже существующем городе.

**Одна вещь пока не исправлена**: кнопка-оверлей в игре, подсвечивающая на
карте дальность ходьбы от здания (для визуальной проверки покрытия), считает
это отдельно, по-своему, и исторически показывала старую дистанцию, даже
когда жители уже пользовались новой. Если оверлей выглядит неверно, но
жители явно доходят до более дальних зданий на практике — доверяйте
жителям, а не оверлею: это особенность отображения, а не признак того, что
настройка не применилась.

## Решение проблем

- **В существующем городе как будто ничего не изменилось** — проверьте
  \`regen_on_load = 1\` и что вы действительно перезагрузили сохранение после
  изменения настройки (а не просто продолжили играть в той же сессии).
- **Размещение зданий заметно замедлилось** — вы, вероятно, поставили
  \`distance\` очень большим или \`0\` на крупном застроенном городе; стоимость
  поиска растёт вместе с лимитом. Уменьшите значение обратно.
- **Кнопка дальности ходьбы всё ещё показывает старый радиус** — см.
  примечание выше; это известная особенность только отображения, не
  связанная с реальным поведением жителей.
`,
    "07-buildings.md": `[English](07-buildings.md) | [Русский](07-buildings_RU.md)

# Buildings

New to this? Read [00-getting-started](00-getting-started.md) first. This
plugin often pairs with [01-resources](01-resources.md) (to define what the
building makes or sells) and [05-needs](05-needs.md) (to make citizens want
what it sells).

## What this plugin does

It lets you add a whole new building — with its own name, description, and
economy — **without any 3D modelling or programming.** You pick an existing
building as a starting point (a "donor"), write a handful of lines saying
what's different about yours, and the plugin assembles a complete, working
Workshop item out of it automatically, every time the game starts.

Two examples ship with this project: a **Pharmacy** (a clothes shop, reused
as a shop that sells only medicine) and a **Pharmaceutical Plant** (a fabric
factory, reused with a different recipe). Both are in
\`tesmioloader\\build\\plugins\\buildings.ini\` already, fully working, as
templates to copy from.

This is also the safest plugin in the whole project to experiment with: it
doesn't patch the game's code or memory at all, and it doesn't touch any
file the game shipped with. It only writes new folders under
\`media_soviet\\workshop_wip\\\`, the same place your own unpublished Workshop
items already live.

## The one rule: match the donor to the shape you want

Pick a donor whose **physical shape and behaviour** already matches what you
want — its mesh, its conveyor/vehicle points, its animations are all reused
as-is. A mine wants another mine as a donor, a shop wants another shop, a
factory wants another factory. You're not allowed to reshape the building,
only to relabel it and rewrite its economy (what it produces, consumes,
stores, costs, and is called). Donor buildings live under
\`media_soviet\\buildings_types\\\` — browse that folder to see what's
available and what each one looks like in-game.

## How to add a building, step by step

1. Close the game.
2. Open \`tesmioloader\\build\\plugins\\buildings.ini\`.
3. Add a new section. Here's a minimal one, changing only the recipe of a
   donor shop:

   \`\`\`ini
   [my_shop]
   id     = 9100000020
   donor  = shop_clothes
   object = MyShop
   name   = My Little Shop
   desc   = Sells my_good and nothing else.

   line   = $TYPE_SHOP
   line   = $STORAGE_SPECIAL RESOURCE_TRANSPORT_COVERED 8 my_good
   \`\`\`

   - \`id\` — a unique number. Stick to the \`91000000xx\` range this project
     already uses, to stay clear of real Steam Workshop item IDs.
   - \`donor\` — the folder name under \`media_soviet\\buildings_types\\\` to
     clone. Look at the pharmacy (\`donor = shop_clothes\`) and pharmaceutical
     plant (\`donor = fabric_factory\`) examples already in the file for two
     working starting points.
   - \`object\` — a name for the item's own subfolder. Defaults to the
     section name if you leave it out.
   - \`name\` — what shows up in the build menu.
   - \`desc\` — the Workshop description. Repeat this line as many times as
     you want, one line of text each.
   - \`line\` — **the important part.** Each one is a real line straight out
     of a \`building.ini\` file, copied in verbatim. Everything the donor
     already declares stays as-is *unless* one of your \`line\` entries
     replaces it (see below).

4. Save (UTF-8, no BOM) and start the game with \`buildings\` ticked. The
   plugin writes the new item's folder before the game even starts reading
   files, so it's there from the very first load.
5. Find your building in the in-game build menu, in the same construction
   category as its donor.

## What a \`line\` replaces, and what it leaves alone

The donor's whole \`building.ini\` is copied over first, line by line.
Writing a \`line =\` only removes the donor's version of that **same**
setting — everything else in the donor stays untouched (its connections,
construction cost, fire points, water/sewage requirements, and so on).

Four groups of tokens replace *each other as a group*, not just
line-for-line:

| Group | What it means in practice |
|---|---|
| \`$NAME\` / \`$NAME_STR\` | Declaring either replaces both — you can't keep the donor's name and only change its internal id. |
| Any \`$TYPE_*\` | Only one type can be in effect — declaring a new one fully replaces the donor's (e.g. turning a shop into a factory). |
| Any \`$STORAGE*\` plus \`$RESOURCE_VISUALIZATION\` | Storages are numbered from zero, so redeclaring any of them re-numbers all of them — don't declare just one and expect the others to shift correctly. |
| \`$PRODUCTION\`, \`$CONSUMPTION\`, \`$CONSUMPTION_PER_SECOND\` | A recipe goes in as a whole set — declare all the lines for your new recipe together, as the pharmaceutical plant example does. |

Two settings, \`$PRODUCTION_SEWAGE_POLLUTION\` and
\`$CONSUMPTION_WATER_REQUIRED_QUALITY\`, are **not** part of the recipe group
and survive a new recipe untouched — you don't need to restate them.

\`strip = $SOME_TOKEN\` removes a donor line without putting anything back, if
you just want something gone rather than replaced.

## Two ways to build something new

**A. Same shape, different goods** (like the pharmacy) — pick a shop/plant
donor, keep its \`$TYPE_*\`, and only replace the \`$STORAGE*\` or recipe lines.
This is the simplest and safest kind of change.

**B. Same shape, different purpose** (like turning a shop into a factory,
or vice versa) — replace the \`$TYPE_*\` line too, plus whatever storage and
recipe lines that new type needs. Look closely at a real donor of the type
you're switching *to* for what it normally declares, and copy the shape of
those lines rather than guessing.

## Settings reference

| \`[buildings]\` setting | What it does |
|---|---|
| \`enabled\` | \`0\` unloads the plugin — folders already written stay on disk and the game keeps loading them; delete the folders by hand to remove the buildings entirely. |
| \`out\` | Where generated items go. Leave this alone. |
| \`always\` | \`0\` (default) only rewrites a building's folder when you've actually changed its section, the generator, or the donor. \`1\` rewrites everything on every launch — slower, only useful while actively iterating on assets. |
| \`verbose\` | \`1\` logs every single file copied and every donor line dropped — useful for understanding exactly why a building came out the way it did. |

## Troubleshooting

- **My changes to a section don't seem to show up in-game** — the plugin
  only rewrites a folder when something changed; if you edited a file the
  generator reads *indirectly* rather than the section itself, set
  \`always = 1\` once to force a full rewrite, then set it back to \`0\`.
- **A building.ini line I expected to survive is gone** — check whether it
  belongs to one of the four "replaces as a group" families above; if so,
  restate the parts you want to keep alongside your new line.
- **The game logs a building.ini error** — this plugin writes nothing but
  a text file per building, so the error is almost always a \`line =\` that
  isn't valid \`building.ini\` syntax, or a \`$TYPE_*\`/\`$STORAGE*\` combination
  the donor's mesh doesn't actually support (e.g. a storage index beyond
  what the donor has yards for). Compare against a real donor's own file
  under \`media_soviet\\buildings_types\\<donor>\\building.ini\`.
- **An id collides with something already in \`workshop_wip\`** — the plugin
  refuses to touch any folder that doesn't already carry its own
  \`tesmioloader.stamp\` marker, specifically so it never overwrites a real
  Workshop subscription or hand-made item. Pick a different \`id\`.
`,
    "07-buildings_RU.md": `[English](07-buildings.md) | [Русский](07-buildings_RU.md)

# Buildings 

Впервые здесь? Сначала прочитайте
[00-getting-started](00-getting-started_RU.md). Этот плагин часто работает
в паре с [01-resources](01-resources_RU.md) (определяет, что здание
производит или продаёт) и [05-needs](05-needs_RU.md) (заставляет жителей
хотеть то, что оно продаёт).

## Что делает этот плагин

Он позволяет добавить совершенно новое здание — со своим названием,
описанием и экономикой — **без какого-либо 3D-моделирования или
программирования.** Вы выбираете существующее здание как основу
(«донора»), пишете несколько строк о том, чем отличается ваше, и плагин
автоматически собирает из этого полноценный рабочий предмет мастерской,
каждый раз при запуске игры.

В проекте уже есть два примера: **аптека** (магазин одежды, переиспользован
как магазин, продающий только лекарства) и **фармацевтический завод**
(текстильная фабрика, переиспользована с другим рецептом). Оба уже есть в
\`tesmioloader\\build\\plugins\\buildings.ini\`, полностью рабочие — как шаблоны,
с которых можно копировать.

Это ещё и самый безопасный плагин проекта для экспериментов: он вообще не
патчит код или память игры и не трогает ни одного файла, поставляемого с
игрой. Он только записывает новые папки в \`media_soviet\\workshop_wip\\\` — то
же место, где уже живут ваши собственные неопубликованные предметы
мастерской.

## Единственное правило: подбирайте донора под нужную «форму»

Выбирайте донора, чья **физическая форма и поведение** уже соответствуют
тому, что вам нужно — его модель, точки конвейера/подъезда транспорта,
анимации переиспользуются как есть. Шахте нужен донор-шахта, магазину —
донор-магазин, заводу — донор-завод. Изменить форму здания нельзя, можно
только переименовать его и переписать его экономику (что оно производит,
потребляет, хранит, сколько стоит и как называется). Здания-доноры лежат в
\`media_soviet\\buildings_types\\\` — просмотрите эту папку, чтобы увидеть, что
доступно и как каждое выглядит в игре.

## Как добавить здание, шаг за шагом

1. Закройте игру.
2. Откройте \`tesmioloader\\build\\plugins\\buildings.ini\`.
3. Добавьте новую секцию. Вот минимальный пример, меняющий только рецепт
   донора-магазина:

   \`\`\`ini
   [my_shop]
   id     = 9100000020
   donor  = shop_clothes
   object = MyShop
   name   = My Little Shop
   desc   = Sells my_good and nothing else.

   line   = $TYPE_SHOP
   line   = $STORAGE_SPECIAL RESOURCE_TRANSPORT_COVERED 8 my_good
   \`\`\`

   - \`id\` — уникальное число. Держитесь диапазона \`91000000xx\`, который уже
     использует этот проект, чтобы не пересекаться с реальными ID предметов
     Steam Workshop.
   - \`donor\` — имя папки в \`media_soviet\\buildings_types\\\`, которую нужно
     клонировать. Посмотрите на примеры аптеки (\`donor = shop_clothes\`) и
     фармацевтического завода (\`donor = fabric_factory\`), уже имеющиеся в
     файле, как на две рабочие отправные точки.
   - \`object\` — имя собственной подпапки предмета. Если не указать, берётся
     имя секции.
   - \`name\` — то, что показывается в меню строительства.
   - \`desc\` — описание в мастерской. Повторяйте эту строку сколько угодно
     раз, по одной строке текста на каждую.
   - \`line\` — **самая важная часть.** Каждая такая строка — это реальная
     строка прямо из файла \`building.ini\`, копируемая дословно. Всё, что
     донор уже объявляет, остаётся как есть, *если только* одна из ваших
     строк \`line\` не заменяет это (см. ниже).

4. Сохраните (UTF-8 без BOM) и запустите игру с отмеченным плагином
   \`buildings\`. Плагин записывает папку нового предмета ещё до того, как
   игра начинает читать свои файлы, поэтому предмет доступен с самой первой
   загрузки.
5. Найдите своё здание в игровом меню строительства, в той же категории,
   что и у его донора.

## Что заменяет \`line\`, а что оставляет как есть

Весь \`building.ini\` донора сначала копируется целиком, строка за строкой.
Написание \`line =\` убирает только версию **этой же** настройки из донора —
всё остальное у донора остаётся нетронутым (его связи, стоимость постройки,
точки пожаротушения, требования по воде/канализации и так далее).

Четыре группы токенов заменяют друг друга *целиком, как группа*, а не
построчно:

| Группа | Что это значит на практике |
|---|---|
| \`$NAME\` / \`$NAME_STR\` | Объявление любого из них заменяет оба сразу — нельзя оставить имя донора и поменять только его внутренний id. |
| Любой \`$TYPE_*\` | В силе может быть только один тип — объявление нового полностью заменяет тип донора (например, превращение магазина в завод). |
| Любой \`$STORAGE*\` плюс \`$RESOURCE_VISUALIZATION\` | Хранилища нумеруются с нуля, поэтому повторное объявление любого из них перенумеровывает все — нельзя объявить только одно и ожидать, что остальные корректно сдвинутся. |
| \`$PRODUCTION\`, \`$CONSUMPTION\`, \`$CONSUMPTION_PER_SECOND\` | Рецепт задаётся целиком, как набор — объявляйте все строки нового рецепта вместе, как в примере фармацевтического завода. |

Две настройки, \`$PRODUCTION_SEWAGE_POLLUTION\` и
\`$CONSUMPTION_WATER_REQUIRED_QUALITY\`, **не входят** в группу рецепта и
переживают новый рецепт нетронутыми — повторно указывать их не нужно.

\`strip = $SOME_TOKEN\` убирает строку донора, ничего не подставляя взамен —
если что-то просто нужно убрать, а не заменить.

## Два способа создать что-то новое

**А. Та же форма, другой товар** (как аптека) — берёте донора-магазин/завод,
оставляете его \`$TYPE_*\` и заменяете только строки \`$STORAGE*\` или рецепт.
Это самый простой и безопасный вид изменения.

**Б. Та же форма, другое назначение** (например, превратить магазин в
завод или наоборот) — заменяете также строку \`$TYPE_*\`, плюс все строки
хранилища и рецепта, которые нужны новому типу. Внимательно посмотрите на
реального донора того типа, *в который* вы превращаете здание — что он
обычно объявляет, — и копируйте форму этих строк, а не угадывайте.

## Справочник настроек

| Настройка \`[buildings]\` | Что делает |
|---|---|
| \`enabled\` | \`0\` выгружает плагин — уже записанные папки остаются на диске, и игра продолжает их загружать; чтобы полностью убрать здания, удалите папки вручную. |
| \`out\` | Куда попадают сгенерированные предметы. Не трогайте. |
| \`always\` | \`0\` (по умолчанию) перезаписывает папку здания, только когда реально изменилась его секция, генератор или файл донора. \`1\` перезаписывает всё при каждом запуске — медленнее, полезно только при активной доработке ассетов. |
| \`verbose\` | \`1\` логирует каждый скопированный файл и каждую отброшенную строку донора — полезно, чтобы точно понять, почему здание получилось именно таким. |

## Решение проблем

- **Изменения в секции как будто не отражаются в игре** — плагин
  перезаписывает папку, только если что-то изменилось; если вы
  отредактировали файл, который генератор читает *косвенно*, а не саму
  секцию, один раз поставьте \`always = 1\`, чтобы принудительно всё
  перезаписать, затем верните обратно \`0\`.
- **Строка building.ini, которую я ожидал сохранить, пропала** —
  проверьте, не относится ли она к одной из четырёх «заменяющих группой»
  семей выше; если да, повторите нужные части вместе с вашей новой строкой.
- **Игра пишет в лог ошибку building.ini** — этот плагин не создаёт ничего,
  кроме текстового файла на каждое здание, поэтому ошибка почти всегда —
  это \`line =\` с неверным синтаксисом \`building.ini\`, либо комбинация
  \`$TYPE_*\`/\`$STORAGE*\`, которую модель донора реально не поддерживает
  (например, индекс хранилища за пределами того, что у донора есть
  дворов). Сравните с настоящим файлом донора в
  \`media_soviet\\buildings_types\\<donor>\\building.ini\`.
- **id совпадает с чем-то уже существующим в \`workshop_wip\`** — плагин
  отказывается трогать любую папку, в которой ещё нет собственной метки
  \`tesmioloader.stamp\`, специально чтобы никогда не перезаписать настоящую
  подписку из мастерской или сделанный вручную предмет. Выберите другой
  \`id\`.
`,
};

const EMBEDDED_FILE_LIST = [
    "00-getting-started.md",
    "00-getting-started_RU.md",
    "01-resources.md",
    "01-resources_RU.md",
    "02-deposits.md",
    "02-deposits_RU.md",
    "03-depletion.md",
    "03-depletion_RU.md",
    "04-accumulator.md",
    "04-accumulator_RU.md",
    "05-needs.md",
    "05-needs_RU.md",
    "06-walking.md",
    "06-walking_RU.md",
    "07-buildings.md",
    "07-buildings_RU.md"
];

/* Заголовки навигации (из H1 .md файлов + titles.json) */
const EMBEDDED_NAV_TITLES = {
    "resources": {
        "EN": "Resources",
        "RU": "Resources"
    },
    "buildings": {
        "EN": "Buildings",
        "RU": "Buildings"
    },
    "accumulator": {
        "EN": "Accumulator",
        "RU": "Accumulator"
    },
    "deposits": {
        "EN": "Deposits",
        "RU": "Deposits"
    },
    "introduction": {
        "EN": "Introduction"
    },
    "walking": {
        "EN": "Walking",
        "RU": "Walking"
    },
    "needs": {
        "EN": "Needs",
        "RU": "Needs"
    },
    "getting-started": {
        "EN": "Introduction",
        "RU": "Введение"
    },
    "depletion": {
        "EN": "Depletion",
        "RU": "Depletion"
    }
};

/* Применяем кастомные заголовки */
if (typeof CONFIG !== "undefined") {
    if (!CONFIG.navTitles) CONFIG.navTitles = {};
    Object.assign(CONFIG.navTitles, EMBEDDED_NAV_TITLES);
}
