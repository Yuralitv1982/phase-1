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

