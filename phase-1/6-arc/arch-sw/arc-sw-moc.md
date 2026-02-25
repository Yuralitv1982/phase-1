---
discipline: dc
type: MOC
status: 🟡 В производстве
pillars: 7_pillars_enabled
---

# 🗺 Карта дисциплины: js

## 📊 Состояние производства (Анализ и Аудит)
```dataview
TABLE 
    status as "Статус", 
    duration as "Затрачено (мин)", 
    length(filter(file.tasks, (t) => !t.completed)) as "Задач осталось"
FROM "phase-1/dc"
WHERE type = "module"
SORT file.name ASC
```

## 🏗 Технологическая цепочка
0. [[arch-sw-m0-0]] — 
1. [[-m1.md]] — 
2. [[-m2.md]] — 
3. [[-m3.md]] — 
4. [[-m4.md]] — 
5. [[-m5.md]] — 
6. [[-m6.md]] — 

```dataviewjs
// Карта захвата JavaScript (v0.1.3)
// Фильтр: папка "dc", файлы с "-m", исключая "moc"
let modules = dv.pages('"phase-1/dc"')
    .where(p => p.file.name.includes("-m") && !p.file.name.includes("moc"))
    .sort(p => p.file.name, 'asc');

dv.header(2, "🗺 Карта прогресса модулей");

let tableData = [];

for (let m of modules) {
    let tasks = m.file.tasks;
    
    // Функция отрисовки: ищет ключевые слова в чекбоксах файла модуля
    const drawSquares = (match, count) => {
        let filtered = tasks.filter(t => t.text.toLowerCase().includes(match));
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
        drawSquares("уровень", 5), // Твоя 5-ступенчатая "дрочка"
        drawSquares("комплекс", 5) // 5 комплексных задач
    ]);
}

dv.table(["Модуль", "Теория", "Дрочка (5 ст.)", "Комплекс"], tableData);
```


```dataviewjs
// --- НАСТРОЙКИ ---
const TARGET_HOURS = 200; // Цель
const KEY = "arc";          // Имя ключа в daily-quest (js:: 60)
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
dv.header(2, `🚀 ${KEY} progress: ${totalHours} / ${TARGET_HOURS} ч. (${percent}%)`);

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


[[phase-1 [[map]]]]
