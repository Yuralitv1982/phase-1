
<%*
// 1. Находим файл
const file = tp.file.find_tfile("cycle.md");
if (!file) {
    tR += "⚠️ ОШИБКА: Файл cycle.md не найден.";
} else {
    // 2. Читаем и готовим данные
    const content = await app.vault.read(file);
    const lines = content.split(/\r?\n/);
    
    // Определяем день недели (Вторник = 2 -> ищем "D02")
    const isoDay = moment().isoWeekday();
    const tag = `D0${isoDay}`;

    // 3. Ищем колонку дня
    const headerLine = lines.find(l => l.includes("|") && l.includes(tag));
    
    if (!headerLine) {
        tR += `⚠️ ОШИБКА: Не найдена колонка ${tag} в таблице.`;
    } else {
        const headers = headerLine.split("|").map(h => h.trim());
        const colIdx = headers.indexOf(tag);

        let result = "";

        // 4. Парсим строки
        for (const line of lines) {
            const cleanLine = line.trim();
            // Пропускаем мусор: разделители, заголовок, строку TOTAL
            if (!cleanLine.startsWith("|") || cleanLine.startsWith("+")) continue;
            if (cleanLine.includes("TOTAL") || cleanLine === headerLine.trim()) continue;

            const parts = cleanLine.split("|").map(p => p.trim());
            
            // Если строка короче нужной колонки - пропускаем
            if (parts.length <= colIdx) continue;

            // Берем часы из колонки D02
            const hours = parseFloat(parts[colIdx]);
            
            // Если часов нет или 0 - пропускаем дисциплину
            if (!hours) continue;

            // Имя дисциплины (обычно индекс 1: ["", "1. ENG", "1", ...])
            const rawName = parts[1] || "Task";
            const name = rawName.replace(/^\d+\.\s*/, ""); // Убираем номер "1. "
            // Делаем slug для ссылок
            const slug = name.toLowerCase().replace(/[^a-z0-9а-яё]+/g, "-").replace(/^-|-$/g, "");

            // Считаем минуты (25% теория, 75% практика)
            const totalMin = hours * 60;
            const th = Math.floor(totalMin * 0.25);
            const pr = totalMin - th;

            // 5. Генерируем блок (БЕЗ ТАЙМЕРОВ)
            result += `### ⚔️ [[${slug}-moc|${name}]] (${hours}ч)\n`;
            result += `- [ ] **теория** (${th}м)\n`;
            result += `- [ ] **drill** (${pr}м)\n`;
            result += `- [ ] **комплексные задачи** (${pr}м)\n`;
        }

        if (!result) result = "### 💤 Сегодня по графику отдых.";
        
        // Выводим результат
        tR += result;
    }
}
%>


# 🕹 daily quest | <% tp.date.now("DD.MM.YYYY") %>

## 🌍 глобальный таймер смены
> запустил обсидиан — нажал старт. время пошло.
```simple-time-tracker
{ "id": "global-shift", "name": "глобальный таймер: жизнь уходит" }
```


## 📈 Метрики смены
global-duration:: 0
obsidion-theory:: 0
obsidion-practice:: 0
hc-theory:: 0
hc-practice:: 0
effective-time:: 0
waste-time:: 0

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
