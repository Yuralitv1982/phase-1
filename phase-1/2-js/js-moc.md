---
discipline: js
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
FROM "js"
WHERE type = "module"
SORT file.name ASC
```

## 🏗 Технологическая цепочка
0. [[js-m0-0]] — Введение и Основы
1. [[js-m1.md]] — Функции и Объекты
2. [[js-m2.md]] — Работа с DOM и События
3. [[js-m3.md]] — Асинхронность и Данные
4. [[js-m4.md]] — Продвинутые Основы и Ошибки
5. [[js-m5.md]] — Модульность и Инструментарий
6. [[js-m6.md]] — Оптимизация и Деплой

```dataviewjs
// Карта захвата JavaScript (v0.1.3)
// Фильтр: папка "js", файлы с "-m", исключая "moc"
let modules = dv.pages('"js"')
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

