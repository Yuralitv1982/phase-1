---
discipline: obsidian
type: MOC
status: 🟡 В производстве
pillars: 7_pillars_enabled
---

# 🗺 Карта дисциплины: obsidian

## 📊 Состояние производства (Анализ и Аудит)
```dataview
TABLE status as "Статус", duration as "Затрачено (мин)", count(file.tasks) as "Задач осталось"
FROM "UTL/obsidian"
WHERE type = "module"
SORT module_id ASC
```

## 🏗 Технологическая цепочка
0. [[obsidian-m0.md]] — Keyboard Ninja (База)
1. [[obsidian-m1.md]] — Фундамент и среда (Fedora/PARA)
2. [[obsidian_M2.md]] — Связи и структура (MOC/Graph)
3. [[obsidian_M3.md]] — Интеграция с Git (Commit/Log)
4. [[obsidian_M4.md]] — Observability (Dataview/Metrics)
5. [[obsidian_M5.md]] — Single-Threaded (Workspace/Backlog)
6. [[obsidian_M6.md]] — Архитектурный мост (Mermaid/Canvas)
7. [[obsidian_M7.md]] — IDE/CLI Bridge (WebStorm)
8. [[obsidian_M8.md]] — 7 Столпов (Менеджмент системы)
9. [[obsidian_M9.md]] — Мастерство (Automation/Archive)
