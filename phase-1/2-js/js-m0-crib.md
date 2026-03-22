# 🛠 JS Architecture: Type Conversion & Logic Patterns
# Version: 1.2.0 | Standard: Explicit IF/ELSE Law

---

## 1. Шаблоны явного преобразования (Explicit Conversion)
> Рекомендуемый стандарт для проекта "Titan".

* **В Number (Число):**
    * Из строки: `Number("10")` или `parseInt("10px", 10)`
    * Из Boolean: `Number(true)` -> 1, `Number(false)` -> 0
    * Из null: `Number(null)` -> 0
    * Из undefined: `Number(undefined)` -> NaN
* **В String (Строка):**
    * Из числа: `String(42)` или `(42).toString()`
    * Из Boolean: `String(true)` -> "true"
    * Из null/undef: `String(null)` -> "null"
* **В Boolean (Логика):**
    * `Boolean(val)` или `!!val` (Раджеш одобряет оба, но первый — явнее)
[[js-m0-d1]]
---

## 2. Логические операторы (Short-circuit & Coalescing)

* **|| (ИЛИ) — Поиск первой истины:**
    * `const name = input || "Guest";` 
    * (Пропускает всё "falsy": 0, "", null)
* **&& (И) — Выполнение по условию:**
    * `isReady && console.log("Go");` 
    * (Выполнит правую часть, если левая — true)
* **?? (Нулевое слияние) — Защита данных:**
    * `const count = input ?? 10;` 
    * (Пропускает ТОЛЬКО null/undefined. 0 и "" остаются нетронутыми)

---

## 3. Управляющие конструкции (Conditionals)

* **IF / ELSE (Золотой стандарт):**
    ```javascript
    if (condition) {
        // Основной код
    } else if (other) {
        // Запасной вариант
    } else {
        // Обработка ошибок
    }
    ```
* **SWITCH (Множественный выбор):**
    ```javascript
    switch (value) {
        case 1:
            // код
            break; // Обязателен!
        default:
            // если ничего не подошло
    }
    ```
* **Тернарный оператор (Для простых веток):**
    * `const res = (val > 0) ? 'Ok' : 'Fail';`

---

## 4. Все циклы (Loops)

* **Классический FOR (По индексам):**
    ```javascript
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
    ```
* **FOR...OF (Для значений массива):**
    ```javascript
    for (const item of items) {
        console.log(item);
    }
    ```
* **FOR...IN (Для свойств объекта):**
    ```javascript
    for (const key in object) {
        console.log(key, object[key]);
    }
    ```
* **WHILE (Цикл по условию):**
    ```javascript
    while (status === 'wait') {
        // выполняем, пока верно
    }
    ```
Технический регламент: in vs of
Проблема в том, что в английском эти предлоги звучат похоже, но в JS они отвечают за разные слои данных.
1. for...in — Инспекция чертежа (INside)
Этот цикл лезет внутрь структуры объекта. Его задача — перечислить названия всех «комнат» (ключей/свойств).
    Что он видит: Ключи (name, age, index).
    Для чего: Для Объектов {}.
    Мнемоника: «Что IN (внутри) этого объекта? Какие у него есть названия свойств?».

2. for...of — Инспекция груза (OF the collection)
Этот цикл идет по самому конвейеру и достает содержимое. Ему плевать на индексы, ему нужны сами «детали».
    Что он видит: Значения ("yura", 42, "node").
    Для чего: Для Массивов [] и строк.
    Мнемоника: «Дай мне каждый элемент OF (из) этой пачки».
---

## 5. Список "Falsy" (Ложные значения)
> В JS всего 6 значений, которые в IF всегда дадут FALSE:
1. `false`
2. `0` (ноль)
3. `""` (пустая строка)
4. `null`
5. `undefined`
6. `NaN` (ошибка вычислений)
*Всё остальное — TRUE.*

1. Правило для Массива (Array)
JavaScript

if (Array.isArray(data) && data.length > 0)

    Array.isArray(data) — гарантирует, что это НЕ строка, НЕ null и НЕ обычный объект.

    .length > 0 — гарантирует, что он не пустой.
    .length === 0 гарантирует что он пустой
    
    
if (Array.isArray(a) && a.length === 0) {
    // 1. Убедились, что это массив.
    // 2. Убедились, что в нем ноль элементов.
}

2. Правило для Объекта (Object)
JavaScript

if (data && data.constructor === Object && Object.keys(data).length > 0)

if (a && a.constructor === Object && Object.keys(a).length === 0) {
    // 1. Убедились, что 'a' не null/undefined.
    // 2. Убедились, что это именно базовый объект {}.
    // 3. Убедились, что ключей внутри нет.
}
