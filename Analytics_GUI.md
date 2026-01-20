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
