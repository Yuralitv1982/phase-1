# 🕹 Daily Quest | <% tp.date.now("YYYY-MM-DD") %>

## ⚔️ Боевая Задача (Plan)
*План подтянут из cycle.md. Если 0 — отдыхай.*
<%*
// Читаем cycle.md и ищем колонку сегодняшнего дня
const cycleFile = tp.file.find_tfile("cycle.md");
let planOutput = "";
if (cycleFile) {
    const content = await app.vault.read(cycleFile);
    const dayIndex = moment().isoWeekday(); // 1 (Пн) - 7 (Вс)
    // Парсим таблицу (упрощенно ищем строки с цифрами в нужном столбце)
    // Это визуальная подсказка, робот сам скажет "Сегодня JS"
    const lines = content.split("\n").filter(l => l.includes("|"));
    const todayPlan = lines.filter(l => {
        const parts = l.split("|");
        // Проверяем, есть ли флаг (1, 2, 3) в колонке дня
        return parts[dayIndex+1] && parts[dayIndex+1].trim().match(/\d/);
    });
    
    if (todayPlan.length > 0) {
        todayPlan.forEach(l => {
            let name = l.split("|")[1].trim(); // Имя дисциплины
            planOutput += `- [ ] **${name}**\n`;
        });
    } else {
        planOutput = "> 🎉 Сегодня выходной!";
    }
}
tR += planOutput;
%>

## ⏱ Телеметрия (Fact)
*Впиши минуты в скобки. Это единственное место ввода.*
- **Shift** (general time): [shift:: 0]
- **JS** (Node.js): [js:: 0]
- **ENG** (English): [eng:: 0]
- **HC** (Health/Gym): [hc:: 0]
- **PRJ** (Project): [prj:: 0]

## 📝 Быстрые заметки / Коммит
-

```dataviewjs
const p = dv.current();

// --- 1. УМНЫЙ ПАРСЕР (Чистит мусор) ---
const getNum = (val) => {
    if (!val) return 0;
    if (Array.isArray(val)) return Number(val[0]) || 0;
    return Number(val) || 0;
};

// --- 2. ДИНАМИЧЕСКИЙ СБОР ДАННЫХ ---
let shift = getNum(p.shift);
let work = 0;
let details = []; // Сюда соберем список того, что ты делал

// Список полей, которые НЕ являются работой
const ignore = ["file", "shift", "tags", "aliases", "position"];

// Пробегаем по ВСЕМ полям заметки автоматически
for (let [key, val] of Object.entries(p)) {
    // Если поле не в игнор-листе и содержит цифру
    if (!ignore.includes(key)) {
        let minutes = getNum(val);
        if (minutes > 0) {
            work += minutes;
            // Добавляем в детализацию для таблицы
            details.push([
                key.toUpperCase(), 
                Math.floor(minutes/60) + "ч " + (minutes%60) + "м", 
                minutes
            ]);
        }
    }
}

// --- 3. РАСЧЕТ И ВИЗУАЛИЗАЦИЯ ---
if (shift > 0) {
    const waste = shift - work;
    const kpi = ((work / shift) * 100).toFixed(0);
    
    // Цвет
    let color = "#e06c75"; 
    if (kpi >= 50) color = "#e5c07b"; 
    if (kpi >= 80) color = "#46bc46";

    // 1. Заголовок
    dv.header(2, "💀 КПД: " + kpi + "%");

    // 2. График (Bar)
    let bar = `<div style='display: flex; width: 100%; height: 25px; background: #333; border-radius: 4px; overflow: hidden; margin-bottom: 15px;'>
        <div style='width: ${kpi}%; background: ${color}; display: flex; align-items: center; justify-content: center; color: #1e1e1e; font-weight: bold; font-size: 12px;'>WORK</div>
        <div style='width: ${100 - kpi}%; background: #9c27b0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;'>WASTE</div>
    </div>`;
    dv.paragraph(bar);

    // 3. Динамическая Таблица (Строится сама из того, что нашла)
    // Добавляем строки "Унитаз" и "Смена" к найденным дисциплинам
    
    // Считаем % вклада каждой дисциплины в смену
    details = details.map(row => [...row, ((row[2]/shift)*100).toFixed(0) + "%"]);
    
    // Докидываем итоги
    details.push(["🔴 WASTE", Math.floor(waste/60) + "ч " + (waste%60) + "м", (100 - kpi) + "%"]);
    details.push(["⚫ SHIFT", Math.floor(shift/60) + "ч " + (shift%60) + "м", "100%"]);

    // Рисуем (Убираем сырые минуты из отображения)
    dv.table(["Дисциплина", "Время", "Вклад"], details.map(r => [r[0], r[1], r[3]]));

} else {
    dv.paragraph("⚠️ **Shift = 0**. Впиши время смены, чтобы движок проснулся.");
}
```