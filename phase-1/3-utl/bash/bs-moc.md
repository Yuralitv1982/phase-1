---
discipline: dbs
type: MOC
status: 🟡 В производстве
pillars: 7_pillars_enabled
---

# 🗺 Карта дисциплины: dc

## 📊 Состояние производства (Анализ и Аудит)
```dataview
TABLE 
    status as "Статус", 
    duration as "Затрачено (мин)", 
    length(filter(file.tasks, (t) => !t.completed)) as "Задач осталось"
FROM "phase-1/3-utl/bash"
WHERE type = "module"
SORT file.name ASC
```

## 🏗 Технологическая цепочка

0. [[bs-m1-crib]] — Введение в Командную
1. [[-m2.md]] — 
2. [[-m3.md]] — 
3. [[-m4.md]] — 
4. [[-m5.md]] — 
5. [[-m6.md]] — 

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


[[phase-1 [[map]]]]
