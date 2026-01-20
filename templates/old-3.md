<%*
// --- Формируем список дисциплин для текущего дня
const isoDay = moment().isoWeekday(); // 1..7
const expectedTag = `D0${isoDay}`;

let file = tp.file.find_tfile("cycle.md");
if (!file) {
  const files = app.vault.getFiles().filter(f => f.name.toLowerCase() === "cycle.md");
  file = files.length ? files[0] : null;
}

let staticTaskList = "*ERROR: cycle.md not found*";
if (file) {
  const txt = await app.vault.read(file);
  const lines = txt.split(/\r?\n/);
  let headerIdx = lines.findIndex(l => /\|.*D0[1-7].*/i.test(l));
  if (headerIdx === -1) headerIdx = lines.findIndex(l => l.includes("|"));
  if (headerIdx !== -1) {
    const headerParts = lines[headerIdx].split("|").map(p => p.trim().toUpperCase());
    let dayIndex = headerParts.findIndex(p => p === expectedTag);
    if (dayIndex === -1) dayIndex = 2 + (isoDay - 1);

    const tasks = [];
    for (let i = headerIdx + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith("+") || !line.startsWith("|")) continue;
      if (/TOTAL/i.test(line)) continue;
      const parts = line.split("|").map(p => p.trim());
      if (parts.length <= dayIndex) continue;
      const rawHours = (parts[dayIndex] || "").replace(/[^\d.]/g, "");
      const hours = rawHours === "" ? NaN : parseFloat(rawHours);
      if (isNaN(hours) || hours <= 0) continue;
      const discCell = parts[1] || parts[0] || "unnamed";
      const slug = discCell.replace(/^\d+\.\s*/, "").trim().toLowerCase()
        .replace(/[^a-z0-9а-яё]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      tasks.push({ disp: discCell, slug, hours });
    }

    if (tasks.length === 0) {
      staticTaskList = "*Сегодня задач нет.*";
    } else {
      staticTaskList = tasks.map(t => `- [ ] **${t.disp}** (${t.hours}ч) | [[${t.slug}-moc]]`).join("\n");
    }
  } else {
    staticTaskList = "*ERROR: table header not found in cycle.md*";
  }
}

// --- Формируем блок таймера как строку (без EJS внутри fenced block)
const timerId = "global-shift";
const timerName = "глобальный таймер: жизнь уходит";
const timerBlock = "```simple-time-tracker\n{ \"id\": \"" + timerId + "\", \"name\": \"" + timerName + "\" }\n```";

%>

# 🕹 daily quest | <% tp.date.now("DD.MM.YYYY") %>

## 🌍 глобальный таймер смены

<%- timerBlock %>

## ⚔️ активные квесты (дисциплины дня)

<%- staticTaskList %>


## 📈 Метрики смены
global-duration:: 17
obsidion-theory:: 5
obsidion-practice:: 7
hc-theory:: 0
hc-practice:: 0
effective-time:: 12
waste-time:: 5

## 🐲 BOSS: BACKLOG (Приоритет 100%)
> Не закрыл вчера — умри сегодня.

```dataview
task
where !completed 
where file.name < this.file.name
sort file.name asc
```



## ⚖️ Вердикт системы (Live) 
```dataviewjs
// 1. Получаем данные из текущего файла
const current = dv.current();
const actual = current["effective-time"] || 0;

// 2. Ищем план в этом же файле (мы его туда записывали при генерации)
// Если в файле нет поля 'planned-time', можно вытащить его из метаданных или оставить заглушку
const plannedHours = current["planned-total-hours"] || 10; // пример для субботы
const plannedMin = plannedHours * 60;

const delta = plannedMin - actual;

dv.header(2, "⚖️ Вердикт системы");

if (delta <= 0) {
    dv.paragraph("✅ **План выполнен.** Ты отработал норму. Долгов нет. Красава, Архитектор.");
} else {
    const hours = Math.floor(delta / 60);
    const mins = delta % 60;
    
    dv.paragraph(`🔴 **ОБНАРУЖЕН НЕДОКОЛ:** Ты задолжал системе **${hours}ч ${mins}м**.`);
    dv.paragraph(`> [ ] 💸 **ДОЛГ:** Отработать ${hours}ч ${mins}м за ${current.file.name} #debt`);
    
    dv.paragraph("---");
    dv.paragraph("Этот долг теперь будет преследовать тебя в секции BOSS: BACKLOG, пока ты не поставишь галочку.");
}

