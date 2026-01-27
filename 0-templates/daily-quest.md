глобальный цикл 
	начал сессию запустил таймер
	закончил сессию таймер стоп 
	коммит 
	просмотр аналитики
микроциклы 
	каждая дисциплина так же запуск таймера
	закончил - зафиксировал время (пока в duration модуля складываем)
	(дальлше будем фиксировать общее время дисциплины в файле moc)
	сделал коммит дисциплины 
	перерыв 5-10 мин
	продолжаем..... 


## 🕹 daily quest | <% tp.date.now("DD.MM.YYYY") %>

## 🌍 глобальный таймер смены
```simple-time-tracker
{ "id": "global-shift", "name": "глобальный таймер" }
# 🕹 daily quest | <% tp.date.now("DD.MM.YYYY") %>

## 🌍 глобальный таймер смены
> запустил обсидиан — нажал старт. время пошло.
```simple-time-tracker
{ "id": "global-shift", "name": "глобальный таймер: жизнь уходит" }
```



<%*
// --- 1. ПАРСИНГ CYCLE.MD С АВТО-ТАЙМЕРАМИ ---
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

            // Генерируем блок дисциплины с инлайновыми полями и таймерами
            tasks += `### ⚔️ [[${slug}-moc|${name}]] (${hours}ч)\n`;
            tasks += `${slug}-theory:: 0\n`;
            tasks += `${slug}-practice:: 0\n\n`;
            
            tasks += `#### 📚 Теория (${th}м)\n`;
            //tasks += "```simple-time-tracker\n"; 
            //tasks += `{ "id": "${slug}-th-${tp.date.now("YYYYMMDD")}", "name": "${name} Theory" }\n`;
            //tasks += "```\n";
            
            tasks += `#### 🛠 Практика (${pr}м)\n`;
            // tasks += "```simple-time-tracker\n";
            //tasks += `{ "id": "${slug}-pr-${tp.date.now("YYYYMMDD")}", "name": "${name} Practice" }\n`;
            //tasks += "```\n\n";
            tasks += `---\n\n`;
        }
        result = tasks || "### 💤 Сегодня отдых.";
    }
}
tR += result;
%>

 ```dataviewjs
// 1. Читаем время из ЕДИНСТВЕННОГО глобального таймера
const content = await dv.io.load(dv.current().file.path);
const timerMatch = content.match(/```simple-time-tracker\s*([\s\S]*?)\s*```/);
let globalMin = 0;

if (timerMatch) {
    try {
        const data = JSON.parse(timerMatch[1]);
        let ms = 0;
        if (data.entries) {
            data.entries.forEach(e => {
                if (e.startTime && e.endTime) ms += (new Date(e.endTime) - new Date(e.startTime));
            });
        }
        globalMin = Math.floor(ms / 1000 / 60);
    } catch (e) {}
}

// 2. Читаем РУЧНЫЕ данные из полей заметки
const p = dv.current();
const fields = Object.entries(p);
// Суммируем всё, что ты ввел в поля вида 'название-theory' или 'название-practice'
const effectiveMin = fields
    .filter(([k]) => k.endsWith("-theory") || k.endsWith("-practice"))
    .reduce((s, [k, v]) => s + (Number(v) || 0), 0);

// 3. Константы и расчеты
const isoDay = moment().isoWeekday(); 
const ruleMin = (isoDay >= 6) ? 600 : 300; 
const waste = Math.max(0, globalMin - effectiveMin);
const efficiency = globalMin > 0 ? ((effectiveMin / globalMin) * 100).toFixed(1) : 0;

// 4. Твой список
dv.header(3, "📊 Анализ потока");
dv.list([
    `🕰 **Wall Clock:** \`${globalMin}\` мин (из таймера)`,
    `🚀 **Чистая работа:** \`${effectiveMin}\` мин (твои ручные данные)`,
    `🔴 **Потери (Waste):** \`${waste}\` мин`,
    `📈 **КПД:** \`${efficiency}%\``
]);
```
