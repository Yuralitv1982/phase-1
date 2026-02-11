```dataviewjs
// ==========================================================
// 🛡 ANALYTICS GUI v2.0 (Dynamic & Hybrid)
// ==========================================================

// --- НАСТРОЙКИ ---
const MASTERY_GOAL = 1000; // Цель часов для мастерства
const IGNORE_FIELDS = ["file", "shift", "tags", "aliases", "position", "created", "cssclasses"];
const YEAR = 2026;

// --- 1. ПАРСЕР CYCLE.MD (Достаем недельный план) ---
let weeklyTargets = {};
try {
    const cycleFile = app.vault.getAbstractFileByPath("cycle.md");
    if (cycleFile) {
        const content = await app.vault.read(cycleFile);
        const lines = content.split("\n");
        lines.forEach(line => {
            if (line.includes("|") && line.match(/\d+\./)) {
                const parts = line.split("|").filter(s => s.trim() !== "");
                if (parts.length >= 8) {
                    const nameMatch = parts[0].match(/[A-Z]+/);
                    const hours = parseInt(parts[parts.length - 1]); 
                    if (nameMatch && hours) {
                        weeklyTargets[nameMatch[0].toLowerCase()] = hours;
                    }
                }
            }
        });
    }
} catch (e) { console.log("Cycle parse error", e); }

// --- 2. СБОР ДАННЫХ (HYBRID ENGINE) ---
const pages = dv.pages('"0-dayly"').sort(p => p.file.name);
let history = []; 
let disciplines = {}; 

const getNum = (val) => {
    if (Array.isArray(val)) return Number(val[0]) || 0;
    return Number(val) || 0;
};

async function getShift(p) {
    let s = getNum(p.shift);
    if (s > 0) return s;
    const content = await dv.io.load(p.file.path);
    const match = content.match(/```simple-time-tracker\s*([\s\S]*?)\s*```/);
    if (match) {
        try {
            const d = JSON.parse(match[1]);
            let ms = d.entries?.reduce((acc, e) => acc + (new Date(e.endTime) - new Date(e.startTime)), 0) || 0;
            return Math.floor(ms / 60000);
        } catch(e) {}
    }
    return 0;
}

for (let p of pages) {
    let dailyWork = 0;
    let isThisWeek = moment(p.file.name).isoWeek() === moment().isoWeek();
    
    for (let [key, val] of Object.entries(p)) {
        if (IGNORE_FIELDS.includes(key) || key.startsWith("file")) continue;
        
        let discName = key;
        let mins = getNum(val);
        
        if (key.endsWith("-theory") || key.endsWith("-practice")) {
            discName = key.split("-")[0]; 
        }
        
        if (mins > 0) {
            discName = discName.toLowerCase();
            if (!disciplines[discName]) disciplines[discName] = { total: 0, week: 0 };
            disciplines[discName].total += mins;
            if (isThisWeek) disciplines[discName].week += mins;
            dailyWork += mins;
        }
    }
    
    let shift = await getShift(p);
    history.push({ date: p.file.name, work: dailyWork, shift: shift });
}

// ==========================================================
// 📊 БЛОК 1: ГРАФИК КПД (Последние 14 дней)
// ==========================================================
const recent = history.slice(-14);
if (recent.length > 0) {
    const width = 650, height = 180, pad = 25;
    const maxVal = Math.max(...recent.map(r => Math.max(r.work, r.shift)), 60);
    
    const getX = (i) => pad + (i * (width - pad * 2) / (recent.length - 1 || 1));
    const getY = (v) => height - pad - (v / maxVal * (height - pad * 2));
    
    const lineWork = recent.map((r, i) => `${getX(i)},${getY(r.work)}`).join(" ");
    const lineShift = recent.map((r, i) => `${getX(i)},${getY(r.shift)}`).join(" ");

    dv.header(2, "⚡ Динамика КПД (14 дней)");
    dv.el("div", `<svg viewBox="0 0 ${width} ${height}" style="background:#1a1a1a; border-radius:8px; border:1px solid #333;">
        <line x1="${pad}" y1="${height-pad}" x2="${width-pad}" y2="${height-pad}" stroke="#444" />
        <polyline points="${lineShift}" fill="none" stroke="#2d5e86" stroke-width="2" stroke-dasharray="4" />
        <polyline points="${lineWork}" fill="none" stroke="#46bc46" stroke-width="3" />
        ${recent.map((r,i) => `<circle cx="${getX(i)}" cy="${getY(r.work)}" r="3" fill="#46bc46"/>`).join("")}
    </svg>`);
}

// ==========================================================
// 🔥 БЛОК 2: HEATMAP (Год)
// ==========================================================
dv.header(2, "🔥 Интенсивность");
const calendarData = {
    year: YEAR,
    colors: { green: ["#162b16", "#1d4f1d", "#2f7a2f", "#46bc46", "#6eff6e"] },
    entries: history.map(h => ({
        date: h.date,
        intensity: h.work < 60 ? 1 : h.work < 180 ? 2 : h.work < 300 ? 3 : h.work < 480 ? 4 : 5,
        content: ""
    }))
};
renderHeatmapCalendar(this.container, calendarData);


```


```dataviewjs
// ==========================================================
// 🛡 ANALYTICS GUI v4.2 (CLEAN VERSION)
// ==========================================================

// --- НАСТРОЙКИ ---
const DAILY_FOLDER = "0-dayly"; 
const CYCLE_FILE_NAME = "cycle.md";

// 🛑 ЧЕРНЫЙ СПИСОК (То, что точно НЕ является дисциплиной)
const IGNORE_FIELDS = [
    "file", "shift", "tags", "aliases", "position", "created", "cssclasses", 
    "tasks", "outlinks", "inlinks", "cover", "status", "type",
    // Твой мусор:
    "global-duration", "obsidion", "effective-time", "waste-time", "global-shift",
    "total", "debt", "start-time", "end-time", "mood"
];

// --- 1. СБОР ФАКТА ---
let stats = {}; 
let debugLog = [];

const getNum = (val) => {
    if (Array.isArray(val)) return Number(val[0]) || 0;
    return Number(val) || 0;
};

let pages = dv.pages(`"${DAILY_FOLDER}"`).sort(p => p.file.name);
debugLog.push(`📂 Файлов: ${pages.length}`);

for (let p of pages) {
    let isThisWeek = moment(p.file.name).isoWeek() === moment().isoWeek();
    
    for (let [key, val] of Object.entries(p)) {
        // 1. Пропускаем всё из черного списка
        if (IGNORE_FIELDS.includes(key.toLowerCase()) || key.startsWith("file")) continue;
        
        // 2. Чистим ключ (js-theory -> js)
        let cleanKey = key.toLowerCase();
        if (cleanKey.endsWith("-theory") || cleanKey.endsWith("-practice")) {
            cleanKey = cleanKey.split("-")[0];
        }

        // 3. Если после чистки ключ снова в черном списке - пропускаем
        if (IGNORE_FIELDS.includes(cleanKey)) continue;
        
        let mins = getNum(val);
        if (mins > 0) {
            if (!stats[cleanKey]) stats[cleanKey] = { total: 0, week: 0 };
            stats[cleanKey].total += mins;
            if (isThisWeek) stats[cleanKey].week += mins;
        }
    }
}

// --- 2. ПОПЫТКА НАЙТИ ПЛАН ---
let targets = {};
const cycleFile = app.vault.getFiles().find(f => f.name === CYCLE_FILE_NAME);

if (cycleFile) {
    const content = await app.vault.read(cycleFile);
    content.split("\n").forEach(line => {
        if (line.includes("|") && line.match(/\d+\./)) {
            const parts = line.split("|");
            if (parts.length < 3) return;

            let rawName = parts[1].trim(); 
            let name = rawName.replace(/^\d+\.\s*/, "").toLowerCase();
            
            let totalPart = parts[parts.length - 1].trim(); 
            if (totalPart === "") totalPart = parts[parts.length - 2].trim();
            
            let hours = parseInt(totalPart) || 0;
            if (name && hours > 0) {
                targets[name] = hours;
            }
        }
    });
}

// --- 3. РЕНДЕР ТАБЛИЦЫ ---
dv.header(2, "🏆 Дисциплины");

let tableRows = [];
let grandTotal = 0;

let allKeys = new Set([...Object.keys(stats), ...Object.keys(targets)]);

for (let key of allKeys) {
    let d = stats[key] || { total: 0, week: 0 };
    let plan = targets[key] || 0;
    
    grandTotal += d.total;

    let totalH = (d.total / 60).toFixed(1);
    let weekH = (d.week / 60).toFixed(1);
    
    let status = "";
    if (plan > 0) {
        let progress = d.week / 60;
        if (progress >= plan) status = `🟢 ${weekH} / ${plan}`;
        else if (progress > 0) status = `🟡 ${weekH} / ${plan}`;
        else status = `⚪️ ${weekH} / ${plan}`;
    } else {
        status = `🔘 ${weekH} / --`;
    }

    tableRows.push([key.toUpperCase(), totalH + " ч", status]);
}

tableRows.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
tableRows.push(["---", "---", "---"]);
tableRows.push(["**∑ TOTAL**", `**${(grandTotal / 60).toFixed(1)} ч**`, ""]);

dv.table(["Дисциплина", "Всего (Accum)", "Неделя (Факт / План)"], tableRows);
```


```dataviewjs
// ==========================================================
// 📊 MASTERY HISTOGRAM (Standalone Version)
// ==========================================================

// --- НАСТРОЙКИ ---
const DAILY_FOLDER = "0-dayly"; 
const MASTERY_LIMIT = 300; // Цель в часах

// Поля, которые мы игнорируем (не дисциплины)
const IGNORE = ["file", "shift", "tags", "aliases", "position", "created", "cssclasses", "tasks", "outlinks", "inlinks", "total (h)"];

// --- 1. СБОР ДАННЫХ ---
let stats = {};
let totalAccumulatedMin = 0;

const getNum = (val) => Array.isArray(val) ? Number(val[0]) || 0 : Number(val) || 0;

// Собираем ВСЕ файлы из папки отчетов
let pages = dv.pages(`"${DAILY_FOLDER}"`);

for (let p of pages) {
    for (let [key, val] of Object.entries(p)) {
        let cleanKey = key.toLowerCase();
        
        // Маппинг: js-theory/js-practice -> js
        if (cleanKey.endsWith("-theory") || cleanKey.endsWith("-practice")) {
            cleanKey = cleanKey.split("-")[0];
        }

        // Фильтр мусора
        if (IGNORE.includes(cleanKey) || key.startsWith("file")) continue;

        let mins = getNum(val);
        if (mins > 0) {
            if (!stats[cleanKey]) stats[cleanKey] = 0;
            stats[cleanKey] += mins;
            totalAccumulatedMin += mins;
        }
    }
}

// --- 2. СОРТИРОВКА И ПРЕДСТАВЛЕНИЕ ---
// Превращаем в массив и сортируем по убыванию времени
let sortedEntries = Object.entries(stats).sort((a, b) => b[1] - a[1]);

// --- 3. РЕНДЕР ГИСТОГРАММЫ ---
dv.header(2, `🏆 гистограмма успеваемости(${MASTERY_LIMIT}ч)`);

let html = `<div style="display: flex; flex-direction: column; gap: 15px; background: #111; padding: 20px; border-radius: 12px; border: 1px solid #333; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">`;

for (let [name, mins] of sortedEntries) {
    let hours = mins / 60;
    let pct = Math.min((hours / MASTERY_LIMIT) * 100, 100).toFixed(1);
    
    // Цвет: золотистый, если цель близка или достигнута
    let barColor = hours >= MASTERY_LIMIT ? "#f7df1e" : "#e5c07b";
    let glow = hours >= MASTERY_LIMIT ? "0 0 12px #f7df1e88" : "none";

    html += `
    <div style="margin-bottom: 5px;">
        <div style="display:flex; justify-content:space-between; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 6px;">
            <span style="font-weight:bold; color: #ddd; text-transform: uppercase;">${name}</span>
            <span style="color: #aaa;">${hours.toFixed(1)} / ${MASTERY_LIMIT} ч</span>
        </div>
        <div style="width: 100%; background: #222; height: 16px; border-radius: 4px; border: 1px solid #333; overflow: hidden; position: relative;">
            <div style="width: ${pct}%; background: ${barColor}; height: 100%; box-shadow: ${glow}; transition: width 0.8s ease-in-out;"></div>
            <div style="position: absolute; right: 8px; top: 0; font-size: 10px; line-height: 16px; color: rgba(255,255,255,0.5); font-weight: bold;">${pct}%</div>
        </div>
    </div>`;
}

// Подвал с общим итогом
html += `
    <div style="margin-top: 15px; border-top: 1px solid #444; padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #888; font-size: 12px; font-style: italic;">Накоплено во всех дисциплинах</span>
        <span style="font-size: 18px; font-weight: bold; color: #eee; font-family: monospace;">∑ ${(totalAccumulatedMin/60).toFixed(1)} h</span>
    </div>
</div>`;

dv.paragraph(html);
```

```dataviewjs
// ==========================================================
// 🟢 WEEKLY TACTICAL GRID (40H)
// ==========================================================

// --- НАСТРОЙКИ ---
const DAILY_FOLDER = "0-dayly"; 
const WEEK_GOAL = 40; // Цель часов на неделю

// 🛑 ЧЕРНЫЙ СПИСОК (Фильтр мусора)
const IGNORE_FIELDS = [
    "file", "shift", "tags", "aliases", "position", "created", "cssclasses", 
    "tasks", "outlinks", "inlinks", "cover", "status", "type",
    "global-duration", "obsidion", "effective-time", "waste-time", "global-shift",
    "total", "debt", "start-time", "end-time", "mood", "total (h)"
];

// --- 1. СЧИТАЕМ ЧАСЫ ЗА НЕДЕЛЮ ---
let weeklyTotalMin = 0;

// Хелпер для получения цифр
const getNum = (val) => {
    if (Array.isArray(val)) return Number(val[0]) || 0;
    return Number(val) || 0;
};

let pages = dv.pages(`"${DAILY_FOLDER}"`);

for (let p of pages) {
    // Проверяем, относится ли файл к ТЕКУЩЕЙ НЕДЕЛЕ
    if (moment(p.file.name).isoWeek() !== moment().isoWeek()) continue;
    if (moment(p.file.name).year() !== moment().year()) continue;

    for (let [key, val] of Object.entries(p)) {
        // Фильтруем системные поля и мусор
        let cleanKey = key.toLowerCase();
        if (cleanKey.endsWith("-theory") || cleanKey.endsWith("-practice")) cleanKey = cleanKey.split("-")[0];
        
        if (IGNORE_FIELDS.includes(cleanKey) || key.startsWith("file")) continue;
        
        let mins = getNum(val);
        if (mins > 0) weeklyTotalMin += mins;
    }
}

// --- 2. РИСУЕМ ГРИД (HTML) ---
let currentHours = weeklyTotalMin / 60;
let filledSquares = Math.floor(currentHours);
if (filledSquares > WEEK_GOAL) filledSquares = WEEK_GOAL; // Не вылезаем за рамки

let percent = ((currentHours / WEEK_GOAL) * 100).toFixed(1);

// Генерируем 40 квадратов
let squaresHTML = "";
for (let i = 0; i < WEEK_GOAL; i++) {
    let color = (i < filledSquares) ? "#46bc46" : "#333"; // Зеленый vs Темно-серый
    squaresHTML += `<div style="width:14px; height:14px; background:${color}; margin:2px; border-radius:2px;"></div>`;
}

// Выводим блок
dv.paragraph(`
<div style="background: #161616; padding: 15px; border-radius: 8px; border: 1px solid #333; max-width: 300px;">
    <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-weight:bold; color:#eee; font-size: 14px;">
        <span>🟢 WEEKLY TACTICS</span>
        <span style="color: #46bc46;">${currentHours.toFixed(1)} / ${WEEK_GOAL} ч (${percent}%)</span>
    </div>
    
    <div style="display: flex; flex-wrap: wrap;">
        ${squaresHTML}
    </div>
</div>
`);
```

```dataviewjs
// ==========================================================
// 🔵 YEARLY STRATEGIC GRID v2.0 (MAXI SCALE)
// ==========================================================

// --- НАСТРОЙКИ ---
const DAILY_FOLDER = "0-dayly"; 
const YEAR_GOAL = 2080; 
const CURRENT_YEAR = 2026;

const IGNORE_FIELDS = [
    "file", "shift", "tags", "aliases", "position", "created", "cssclasses", 
    "tasks", "outlinks", "inlinks", "cover", "status", "type",
    "global-duration", "obsidion", "effective-time", "waste-time", "global-shift",
    "total", "debt", "start-time", "end-time", "mood", "total (h)"
];

// --- 1. СБОР ДАННЫХ ---
let yearlyTotalMin = 0;
const getNum = (val) => Array.isArray(val) ? Number(val[0]) || 0 : Number(val) || 0;

let pages = dv.pages(`"${DAILY_FOLDER}"`);
for (let p of pages) {
    if (moment(p.file.name).year() !== CURRENT_YEAR) continue;
    for (let [key, val] of Object.entries(p)) {
        let cleanKey = key.toLowerCase();
        if (cleanKey.endsWith("-theory") || cleanKey.endsWith("-practice")) cleanKey = cleanKey.split("-")[0];
        if (IGNORE_FIELDS.includes(cleanKey) || key.startsWith("file")) continue;
        let mins = getNum(val);
        if (mins > 0) yearlyTotalMin += mins;
    }
}

// --- 2. РЕНДЕР (УВЕЛИЧЕННЫЙ МАСШТАБ) ---
let currentHours = yearlyTotalMin / 60;
let filledSquares = Math.floor(currentHours);
if (filledSquares > YEAR_GOAL) filledSquares = YEAR_GOAL;
let percent = ((currentHours / YEAR_GOAL) * 100).toFixed(1);

let gridArray = new Array(YEAR_GOAL);
for (let i = 0; i < YEAR_GOAL; i++) {
    // Используем 10px для масштаба 2.5x
    let color = (i < filledSquares) ? "#2d72d9" : "#222"; 
    gridArray[i] = `<div style="width:10px; height:10px; background:${color}; margin:1px; border-radius:1px; flex-shrink: 0;"></div>`;
}

dv.paragraph(`
<div style="background: #111; padding: 20px; border-radius: 12px; border: 1px solid #333; width: 100%;">
    <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-weight:bold; color:#eee; font-size: 16px; font-family: monospace;">
        <span>🔵 YEARLY STRATEGY</span>
        <span style="color: #2d72d9;">${currentHours.toFixed(1)} / ${YEAR_GOAL} ч (${percent}%)</span>
    </div>
    
    <div style="display: flex; flex-wrap: wrap; justify-content: flex-start; align-content: flex-start; gap: 0px;">
        ${gridArray.join("")}
    </div>
</div>
`);



```



