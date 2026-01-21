
## 🔥 Карта активности (Heatmap) 
```dataviewjs
const calendarData = {
    year: 2026, // Текущий год
    colors: {    // Цветовая схема (зеленая, как на GitHub)
        green: ["#e7f1e7", "#c2e5c2", "#85d285", "#46bc46", "#2d812d"],
    },
    entries: []
}

// 1. Собираем данные из папки dayly
for (let page of dv.pages('"dayly"').where(p => p["effective-time"])) {
    // Преобразуем минуты в интенсивность (0-5)
    // Например: <60м = 1, <180м = 2, <300м = 3, <480м = 4, >480м = 5
    let time = page["effective-time"];
    let intensity = 0;
    
    if (time > 0 && time < 60) intensity = 1;
    else if (time >= 60 && time < 180) intensity = 2;
    else if (time >= 180 && time < 300) intensity = 3;
    else if (time >= 300 && time < 480) intensity = 4;
    else if (time >= 480) intensity = 5;

    calendarData.entries.push({
        date: page.file.name, // Файл должен называться YYYY-MM-DD
        intensity: intensity,
        content: await dv.span(`**${time}м** работы`), // Подсказка при наведении
    })
}

renderHeatmapCalendar(this.container, calendarData)
```




```tracker
searchType: dvField
searchTarget: effective-duration, waste-time
folder: /
datasetName: Работа, Ебловатость
line:
    title: Динамика Смены (мин)
    yAxisLabel: Минуты
    lineColor: blue, red
    showLegend: true
    
```
    
#### 2. График: Общий налет часов (Bar Chart)
*Визуализация того, сколько ты вообще провел времени в системе.*


```tracker
searchType: dvField
searchTarget: global-duration
folder: /
summary:
    template: "Всего в кресле за месяц: {{sum()}} мин"
bar:
    title: Часы в системе
    yAxisLabel: Минуты
    barColor: #4caf50

```    
   

### 1.stacked bar chart (теория vs практика)

```tracker
searchType: dvField
searchTarget: obsidion-theory, obsidion-practice
folder: /
datasetName: теория, практика
bar:
    title: распределение нагрузки 
    barColor: "#4dabf7, #228be6"
    yAxisLabel: минуты
```


### 2. Heatmap (дисциплина) 

```tracker
searchType: dvField
searchTarget: effective-time
folder: /
month: 
	startWeekOn: 'mon'
	color: green
	headerMonthColor: orange
```

##  Bullet Graph
```tracker
searchType: dvField
searchTarget: effective-time
folder: /
datasetName: "Факт"
bullet:
  title: "Bullet"
  value: "{{sum()}}"
  range: 0, 300, 600
  rangeColor: ["#ffc107", "#8bc34a", "#4caf50"]
  markerValue: 600
  orientation: horizontal
```
