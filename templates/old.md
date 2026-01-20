<%*
console.log("--- СТАРТ ГЕНЕРАЦИИ DAILY QUEST ---");

// 1. Конфиг дней: d01-d07
const days = ["d07", "d01", "d02", "d03", "d04", "d05", "d06"];
const daytag = days[moment().day()]; 
console.log("Текущий тег дня:", daytag);

// 2. Читаем cycle.md
const cyclefile = tp.file.find_tfile("cycle.md");
if (!cyclefile) {
    console.error("ОШИБКА: Файл cycle.md не найден в корне!");
    throw new Error("cycle.md not found");
}

const content = await app.vault.read(cyclefile);
const lines = content.split("\n");

// 3. Парсим дисциплины
let taskList = "";
let foundCount = 0;

lines.forEach((line) => {
    // Пропускаем мусор (разделители таблицы и заголовки)
    if (!line.includes("|") || line.toLowerCase().includes("discipline") || line.includes("+")) {
        return;
    }

    const parts = line.split("|").map(p => p.trim());
    if (parts.length < 9) return; // Проверка длины строки таблицы

    // d01 = индекс 2, d02 = 3 ... d07 = 8
    const daynum = parseInt(daytag.replace("d0", ""));
    const dayindex = daynum + 1; 
    
    const hours = parts[dayindex];
    
    if (hours && hours !== "0" && hours !== "") {
        // Очистка имени для линков: "5. UTL" -> "utl"
        const cleanName = parts[1]
            .replace(/^\d+\.\s*/, "") // Убираем номер
            .toLowerCase()            // В нижний регистр
            .replace(/\s+/g, "-");    // Пробелы в дефисы
            
        taskList += `- [ ] **${cleanName}** (${hours}ч) | [[${cleanName}-moc]] | [start-timer]\n`;
        foundCount++;
    }
});

if (foundCount === 0) {
    taskList = "*Сегодня выходной по плану. Время для заточки мечей (аудит).*";
}

console.log("Итого задач на сегодня:", foundCount);
%>

# 🕹 daily quest | <% daytag %> | <% tp.date.now("DD.MM.YYYY") %>

## ⚔️ активные квесты (дисциплины дня)
<%- taskList %>

---

## 🐲 boss: backlog (приоритет 100%)
> не закрыл вчера — умри сегодня.
```dataview
task from "" where (status = " " and file.name < "<% tp.date.now("YYYY-MM-DD") %>")
