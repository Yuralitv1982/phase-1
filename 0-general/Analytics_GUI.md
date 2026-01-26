
```dataviewjs
```
```dataviewjs
const calendarData = {
    year: 2026,
    colors: {
        green: ["#e7f1e7", "#c2e5c2", "#85d285", "#46bc46", "#2d812d"],
    },
    entries: []
}

for (let page of dv.pages('"0-dayly"')) {
    let dailyMinutes = 0;
    
    // Суммируем чистую работу
    Object.entries(page).forEach(([key, value]) => {
        if (key.endsWith("-theory") || key.endsWith("-practice")) {
            dailyMinutes += (Number(value) || 0);
        }
    });

    if (dailyMinutes === 0) continue;

    // Пять уровней интенсивности (1-5)
    let intensity = 0;
    if (dailyMinutes < 60) intensity = 1;
    else if (dailyMinutes < 180) intensity = 2;
    else if (dailyMinutes < 300) intensity = 3;
    else if (dailyMinutes < 480) intensity = 4;
    else intensity = 5;

    calendarData.entries.push({
        date: page.file.name,
        intensity: intensity,
        content: "" // Оставляем пустым, чтобы не растягивать ячейки
    })
}

renderHeatmapCalendar(this.container, calendarData)
```
```dataviewjs

```


```dataviewjs
// 1. Собираем данные (последние 7 дней)
const pages = dv.pages('"0-dayly"').sort(p => p.file.name, 'desc').limit(7).array().reverse();

let results = [];
for (let p of pages) {
    // Чистая работа (сумма полей из метаданных)
    let eff = Object.entries(p)
        .filter(([k]) => k.endsWith("-theory") || k.endsWith("-practice"))
        .reduce((s, [k, v]) => s + (Number(v) || 0), 0);

    // Wall Clock (парсим таймер из текста файла)
    const content = await dv.io.load(p.file.path);
    const timerMatch = content.match(/```simple-time-tracker\s*([\s\S]*?)\s*```/);
    let wall = 0;
    if (timerMatch) {
        try {
            const data = JSON.parse(timerMatch[1]);
            let ms = data.entries?.reduce((acc, e) => acc + (new Date(e.endTime) - new Date(e.startTime)), 0) || 0;
            wall = Math.floor(ms / 1000 / 60);
        } catch(e) {}
    }
    results.push({ date: p.file.name, eff, wall });
}

// 2. Рисуем SVG-график (без внешних зависимостей)
const width = 600;
const height = 250;
const padding = 40;
const maxVal = Math.max(...results.map(r => Math.max(r.eff, r.wall)), 1);

const getX = (i) => padding + (i * (width - padding * 2) / (results.length - 1));
const getY = (val) => height - padding - (val / maxVal * (height - padding * 2));

const pointsEff = results.map((r, i) => `${getX(i)},${getY(r.eff)}`).join(" ");
const pointsWall = results.map((r, i) => `${getX(i)},${getY(r.wall)}`).join(" ");

dv.el("div", `
<svg viewBox="0 0 ${width} ${height}" style="background: #1e1e1e; border-radius: 12px; border: 1px solid #333;">
    <line x1="${padding}" y1="${height-padding}" x2="${width-padding}" y2="${height-padding}" stroke="#444" />
    <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height-padding}" stroke="#444" />
    
    <polyline fill="none" stroke="#4dabf7" stroke-width="3" stroke-linecap="round" points="${pointsWall}" />
    
    <polyline fill="none" stroke="#46bc46" stroke-width="3" stroke-linecap="round" points="${pointsEff}" />
    
    ${results.map((r, i) => `<text x="${getX(i)}" y="${height-10}" fill="#888" font-size="10" text-anchor="middle">${r.date.split('-').slice(1).join('.')}</text>`).join("")}
</svg>
`);

// 3. Таблица для контроля (чтобы видеть цифры, если график не нарисовал линии)
dv.table(["Дата", "Работа (мин)", "Смена (мин)", "КПД"], 
    results.map(r => [
        r.date, 
        r.eff, 
        r.wall, 
        (r.wall > 0 ? ((r.eff / r.wall) * 100).toFixed(1) : 0) + "%"
    ])
);
```