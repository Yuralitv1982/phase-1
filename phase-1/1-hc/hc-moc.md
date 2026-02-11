---
discipline: hc
type: MOC
status: 🟡 В производстве
pillars: 7_pillars_enabled
---
цикл задач такой ... дрочка комплексные задачи рецепты и готовые блоки... (при этом мы выведем шаблоны работы с позиционированием ... с относительными единицами... с флексом с гридами... ) у нас так же будет стратегия версти и алгоритм верстки... + scss + bem + tailwind//// дальше будет вторая часть специфика архитектура... дальше будет отдельный модуль по производительности...
# 🗺 Карта дисциплины: hc

## 📊 Состояние производства (Анализ и Аудит)
```dataview
TABLE 
    status as "Статус", 
    duration as "Затрачено (мин)", 
    length(filter(file.tasks, (t) => !t.completed)) as "Задач осталось"
FROM "phase-1/1-hc"
WHERE type = "module"
SORT file.name ASC
```

## 🏗 Технологическая цепочка
0. [[hc-m0-0]] — Семантическая Инженерия
1. [[hc-m1]] — CSS Core & Visual Styling
2. [[hc-m2.md]] — Modern Layouts
3. [[hc-m3.md]] — Инфраструктура и Методологии


```dataviewjs
// Карта захвата hc
// Фильтр: папка "1-hc", файлы с "-m", исключая "moc"
let modules = dv.pages('"phase-1/1-hc"')
    .where(p => p.file.name.includes("-m") && !p.file.name.includes("moc"))
    .sort(p => p.file.name, 'asc');

dv.header(2, "🗺 Карта прогресса модулей");

let tableData = [];

for (let m of modules) {
    // Используем lists.where(t => t.task) для гарантии подхвата чекбоксов
    let tasks = m.file.lists.where(t => t.task);
    
    const drawSquares = (match, count) => {
        let filtered = tasks.filter(t => t.text.toLowerCase().includes(match.toLowerCase()));
        let completed = filtered.filter(t => t.completed).length;
        let line = "";
        for (let i = 0; i < count; i++) {
            line += i < completed ? "🟩" : "⬜";
        }
        return line;
    };

    tableData.push([
        m.file.link,
        drawSquares("теория", 1),
        drawSquares("уровень", 5), 
        drawSquares("комплекс", 5)
    ]);
}

dv.table(["Модуль", "Теория", "Дрочка (5 ст.)", "Комплекс"], tableData);
```


```dataviewjs
// --- НАСТРОЙКИ ---
const TARGET_HOURS = 200; // Цель
const KEY = "hc";          // Имя ключа в daily-quest (js:: 60)
// -----------------

// 1. Считаем время
let pages = dv.pages('"0-dayly"');
let totalMin = 0;

for (let p of pages) {
    if (p[KEY]) totalMin += p[KEY];
}

let totalHours = Math.floor(totalMin / 60);
let percent = ((totalHours / TARGET_HOURS) * 100).toFixed(1);

// 2. Рисуем Хедер
dv.header(2, `🚀 hc Architect: ${totalHours} / ${TARGET_HOURS} ч. (${percent}%)`);

// 3. Рисуем Сетку (Оптимизированный рендеринг)
const html = `<div style="display: flex; flex-wrap: wrap; gap: 1px; max-width: 700px;">
${Array.from({length: TARGET_HOURS}).map((_, i) => {
    let color = i < totalHours ? "#46bc46" : "#222"; 
    return `<div style="width: 8px; height: 8px; background: ${color};"></div>`
}).join('')}
</div>`;

dv.paragraph(html);

// 4. Инфо
dv.paragraph(`*Осталось: ${TARGET_HOURS - totalHours} ч.*`);
```


