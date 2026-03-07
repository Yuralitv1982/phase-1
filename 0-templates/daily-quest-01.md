# 🕹 Daily Quest | <% tp.date.now("YYYY-MM-DD") %>

<%*
// --- ГЕНЕРАТОР СПИСКОВ (ENGINE v2.1 Strict) ---
const cycleFile = tp.file.find_tfile("cycle.md");
let planList = "";
let factList = "";

if (cycleFile) {
    const content = await app.vault.read(cycleFile);
    const dayIndex = moment().isoWeekday(); // 1..7
    
    const lines = content.split("\n");
    const todayRows = lines.filter(l => {
        // 1. Строка должна быть частью таблицы
        if (!l.includes("|")) return false;
        
        // 2. ЧЕРНЫЙ СПИСОК (Фильтруем заголовки и итоги)
        if (l.includes("DISCIPLINE")) return false;
        if (l.includes("TOTAL")) return false;
        if (l.includes("---")) return false;
        
        // 3. Проверяем, есть ли задача на сегодня (цифра в колонке)
        const parts = l.split("|");
        return parts[dayIndex+1] && parts[dayIndex+1].trim().match(/\d/);
    });
    
    if (todayRows.length > 0) {
        todayRows.forEach(l => {
            // Имя: "1. ENG"
            let rawName = l.split("|")[1].trim();
            // Ключ: "eng" (убираем "1. " и точки)
            let key = rawName.replace(/^\d+\.\s*/, "").replace(/\./g, "").trim().toLowerCase(); 
            
            // Формируем чистые списки
            planList += `- [ ] **${rawName}**\n`;
            factList += `- **${rawName}**: [${key}:: 0]\n`;
        });
    } else {
        planList = "> 🎉 Сегодня выходной (по плану)!";
        factList = "> Впиши задачи вручную, если работаешь.";
    }
} else {
    planList = "⚠️ Файл cycle.md не найден!";
}
%>
## ⚔️ Боевая Задача (Plan)
<%* tR += planList %>

## ⏱ Телеметрия (Fact)
*Впиши минуты цифрой:*
- **SHIFT** (Смена): [shift:: 300]
<%* tR += factList %>

## 📝 Быстрые заметки / Коммит
-

```dataviewjs
// --- СКРИПТ АНАЛИТИКИ (ВНИЗУ) ---
const p = dv.current();

// 1. УМНЫЙ ПАРСЕР
const getNum = (val) => {
    if (!val) return 0;
    if (Array.isArray(val)) return Number(val[0]) || 0;
    return Number(val) || 0;
};

// 2. СБОР ДАННЫХ
let shift = getNum(p.shift);
let work = 0;
let details = []; 
// Игнор-лист для полей, которые не являются работой
const ignore = ["file", "shift", "tags", "aliases", "position", "created", "cssclasses", "tasks"];

for (let [key, val] of Object.entries(p)) {
    if (!ignore.includes(key)) {
        let minutes = getNum(val);
        if (minutes > 0) {
            work += minutes;
            details.push([
                key.toUpperCase(), 
                Math.floor(minutes/60) + "ч " + (minutes%60) + "м", 
                minutes
            ]);
        }
    }
}

// 3. ВИЗУАЛИЗАЦИЯ
if (shift > 0) {
    const waste = shift - work;
    const kpi = ((work / shift) * 100).toFixed(0);
    
    let color = "#e06c75"; 
    if (kpi >= 50) color = "#e5c07b"; 
    if (kpi >= 80) color = "#46bc46";

    dv.header(2, "💀 КПД: " + kpi + "%");

    let bar = `<div style='display: flex; width: 100%; height: 25px; background: #333; border-radius: 4px; overflow: hidden; margin-bottom: 15px;'>
        <div style='width: ${kpi}%; background: ${color}; display: flex; align-items: center; justify-content: center; color: #1e1e1e; font-weight: bold; font-size: 12px;'>WORK</div>
        <div style='width: ${100 - kpi}%; background: #9c27b0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;'>WASTE</div>
    </div>`;
    dv.paragraph(bar);
    
    // Вклад в %
    details = details.map(row => [...row, ((row[2]/shift)*100).toFixed(0) + "%"]);
    details.push(["🔴 WASTE", Math.floor(waste/60) + "ч " + (waste%60) + "м", (100 - kpi) + "%"]);
    details.push(["⚫ SHIFT", Math.floor(shift/60) + "ч " + (shift%60) + "м", "100%"]);

    dv.table(["Дисциплина", "Время", "Вклад"], details.map(r => [r[0], r[1], r[3]]));

} else {
    dv.paragraph("⚠️ **Shift = 0**. Впиши время смены, чтобы увидеть расчет.");
}

```

## 🔄 Дрилы и Повторения (Spaced Repetition)
*Динамический пул задач, требующих отработки именно сегодня.*

```dataview
LIST "🎯 " + active_drill + choice(rep_count < 7, " | 🔨 Дрочка: " + rep_count + "/7", " | 🧠 Поддержка: шаг " + sr_step)
FROM "phase-1"
WHERE type = "module" AND next_review <= date(today)
SORT next_review ASC
```
