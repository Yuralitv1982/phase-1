// 1. Сначала объяви переменную для кавычек (чтобы парсер не ломался)
// Сделай это ПЕРЕД циклом
const tick = String.fromCharCode(96); 
const b = tick + tick + tick; // Это создает ```

// 2. А это вставь ВНУТРИ цикла, где у тебя есть переменная задачи (например, t)
// t.hours - часы из таблицы
// t.slug - чистое имя файла (например, "js")
// t.disp - отображаемое имя (например, "JS")

const totalMin = t.hours * 60;
const theoryMin = Math.floor(totalMin * 0.25);      // 25% времени
const practiceMin = totalMin - Math.floor(totalMin * 0.25); // 75% времени

// Формируем блок текста
let block = "";

// Заголовок
block += `### ⚔️ [[${t.slug}-moc|${t.disp}]] (${t.hours}ч)\n`;

// Блок ТЕОРИИ
block += `- [ ] **теория** (${theoryMin}м) | [[${t.slug}-theory]]\n`;
block += `${b}simple-time-tracker\n{ "id": "${t.slug}-th", "name": "теория: ${t.disp}" }\n${b}\n`;

// Блок ПРАКТИКИ
block += `- [ ] **практика** (${practiceMin}м) | [[${t.slug}-moc]]\n`;
block += `${b}simple-time-tracker\n{ "id": "${t.slug}-pr", "name": "практика: ${t.disp}" }\n${b}\n\n`;

return block; // Или output += block, смотря как у тебя в цикле<%*
const id = "global-shift";
const name = "глобальный таймер: жизнь уходит";
%>
```simple-time-tracker
{ "id": "<%= id %>", "name": "<%= name %>" }
