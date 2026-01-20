
<%*
// --- 1. ПАРСИНГ CYCLE.MD (Templater) ---
const file = tp.file.find_tfile("cycle.md");
let result = "";

if (!file) {
    result = "⚠️ ОШИБКА: Файл cycle.md не найден.";
} else {
    const content = await app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const isoDay = moment().isoWeekday();
    const tag = `D0${isoDay}`;

    const headerLine = lines.find(l => l.includes("|") && l.includes(tag));
    
    if (!headerLine) {
        result = `### 💤 Сегодня задач по графику ${tag} не найдено.`;
    } else {
        const headers = headerLine.split("|").map(h => h.trim());
        const colIdx = headers.indexOf(tag);
        let tasks = "";

        for (const line of lines) {
            const cleanLine = line.trim();
            if (!cleanLine.startsWith("|") || cleanLine.startsWith("+")) continue;
            if (cleanLine.includes("TOTAL") || cleanLine === headerLine.trim()) continue;

            const parts = cleanLine.split("|").map(p => p.trim());
            if (parts.length <= colIdx) continue;

            const hours = parseFloat(parts[colIdx]);
            if (!hours || isNaN(hours)) continue;

            const rawName = parts[1] || "Task";
            const name = rawName.replace(/^\d+\.\s*/, ""); 
            const slug = name.toLowerCase().replace(/[^a-z0-9а-яё]+/g, "-").replace(/^-|-$/g, "");

            const totalMin = hours * 60;
            const th = Math.floor(totalMin * 0.25);
            const pr = totalMin - th;

            tasks += `### ⚔️ [[${slug}-moc|${name}]] (${hours}ч)\n`;
            tasks += `${name.toLowerCase().replace(/\s+/g, "-")}-theory:: 0\n`;
            tasks += `${name.toLowerCase().replace(/\s+/g, "-")}-practice:: 0\n`;
            tasks += `- [ ] **теория** (${th}м)\n`;
            tasks += `- [ ] **практика** (${pr}м)\n\n`;
        }
        result = tasks || "### 💤 Сегодня отдых.";
    }
}
tR += result;
%>

# 🕹 daily quest | <% tp.date.now("DD.MM.YYYY") %>

## 🌍 глобальный таймер смены
```simple-time-tracker
{ "id": "global-shift", "name": "глобальный таймер" }
# 🕹 daily quest | <% tp.date.now("DD.MM.YYYY") %>

## 🌍 глобальный таймер смены
> запустил обсидиан — нажал старт. время пошло.
```simple-time-tracker
{ "id": "global-shift", "name": "глобальный таймер: жизнь уходит" }
```


## 📈 Метрики смены

```dataviewjs
// 1. Берем данные текущего файла
const p = dv.current();

// 2. Фильтруем все поля, которые мы создали для задач
const entries = Object.entries(p);
const theory = entries.filter(([k]) => k.endsWith("-theory")).reduce((s, [k, v]) => s + (Number(v) || 0), 0);
const practice = entries.filter(([k]) => k.endsWith("-practice")).reduce((s, [k, v]) => s + (Number(v) || 0), 0);

// 3. Итоговые цифры
const effective = theory + practice;
const global = p["global-duration"] || 0;
const waste = Math.max(0, global - effective);
const efficiency = global > 0 ? ((effective / global) * 100).toFixed(1) : 0;

// 4. Вывод списком (как ты любишь, без таблиц)
dv.list([
    `🔹 **Общая смена (Global):** ${global} мин`,
    `🔹 **Чистая работа (Effective):** ${effective} мин (Теория: ${theory} | Практика: ${practice})`,
    `🔹 **Потери (Waste):** ${waste} мин`,
    `🚀 **КПД:** ${efficiency}%`
]);
```
## 🐲 BOSS: BACKLOG (Приоритет 100%)
> Не закрыл вчера — умри сегодня.

```dataviewjs
// Блок BOSS: TIME LAG (v0.1.3-stable)
let pages = dv.pages('"dayly"').where(p => p.file.day && p.file.day < dv.date('today'));
let totalDebtMin = 0;

for (let p of pages) {
    let plannedMin = (p["planned-total-hours"] || 0) * 60;
    // Считаем все поля, заканчивающиеся на -theory и -practice
    let fields = Object.keys(p).filter(k => k.endsWith("-theory") || k.endsWith("-practice"));
    let effectiveMin = fields.reduce((sum, k) => sum + (Number(p[k]) || 0), 0);
    
    let diff = plannedMin - effectiveMin;
    if (diff > 0) totalDebtMin += diff;
}

if (totalDebtMin > 0) {
    let hours = Math.floor(totalDebtMin / 60);
    let mins = totalDebtMin % 60;
    let daysDelayed = (totalDebtMin / 480).toFixed(1); // 480 мин = 8ч рабочий день

    dv.header(2, "🐲 BOSS: TIME LAG");
    dv.paragraph(`🔴 **Суммарный недокол:** ${hours}ч ${mins}м`);
    dv.paragraph(`⚠️ **Сдвиг дедлайна:** Твой оффер Architect отодвинулся на **${daysDelayed} дня(ей)**.`);
} else {
    dv.paragraph("✅ **Core optimized:** Долгов нет. Система в идеальном состоянии.");
}
```




```dataviewjs
const current = dv.current();
// Считаем эффективное время прямо здесь для точности
const fields = Object.keys(current).filter(k => k.endsWith("-theory") || k.endsWith("-practice"));
const actual = fields.reduce((sum, k) => sum + (Number(current[k]) || 0), 0);

const plannedHours = current["planned-total-hours"] || 10; 
const plannedMin = plannedHours * 60;
const delta = plannedMin - actual;

dv.header(2, "⚖️ Вердикт системы");

if (delta <= 0) {
    dv.paragraph("✅ **План выполнен.** Красава, Архитектор.");
} else {
    const h = Math.floor(delta / 60);
    const m = delta % 60;
    dv.paragraph(`🔴 **НЕДОКОЛ:** Ты задолжал **${h}ч ${m}м**.`);
    dv.paragraph(`> [ ] 💸 **ДОЛГ:** Отработать за ${current.file.name} #debt`);
}

```

