// 1. ArraySum: Массив [5, 15, 20]. Посчитай сумму всех элементов через цикл for.
// TODO:

const arrOne = [5, 15, 20]
let result = 0;
for (let i = 0; i < arrOne.length; i++) {
    result += arrOne[i];
    // console.log(result);
}
console.log(result);

// 2. FilterNegative: Из массива [10, -5, 20, -30] выбери только положительные числа.
// (Записывай их в новый массив через .push())
// TODO:
const arrTwo = [10, -5, 20, -30]
const arrResult = []

for (let i = 0; i < arrTwo.length; i++) {
    if ((arrTwo[i]) > 0) {

        arrResult.push(arrTwo[i]);
    }
}
console.log(arrResult);
// 3. FindIndex: Дан массив ["start", "process", "end"]. Найди индекс слова "process".
// TODO:
const arrThree = ["start", "process", "end"]

for (let i = 0; i < arrThree.length; i++) {
    if (arrThree[i] === 'process') {
        console.log('index', i);
    }
}


// 4. StringRepeat: Выведи в консоль слово "Error" 5 раз, используя цикл while.
// TODO:

let index = 1
while (index <= 5) {
    console.log('error')
    index++;
}

// 5. ObjectSum: Дан массив [{price: 100}, {price: 200}]. Посчитай общую сумму цен.

// TODO:
const arrFour = [{price: 100}, {price: 200}, {price: 300}, {price: 500}];
let sumPrice = 0;
for (let i = 0; i < arrFour.length; i++) {
    sumPrice += arrFour[i].price;
}

console.log(sumPrice)// Фокус: Ветвление и чистый код без «лапши».


// AgeCheck: Если возраст 18-60 — «Работать», иначе — «Отдыхать».
//
const age = 25;
console.log(
    (age >= 18 && age <= 60) ? 'work !' : 'hollyday'
)

// MinMax: Дано 3 числа. Найди максимальное через if/else.
//

let a = 8
let b = 1
let c = 5

if (a < b) {
    a = b;
}
if (a < c) {
    // console.log(a)
    // console.log(c)
    a = c;
    // console.log('result', a)
}
console.log(a)


//TernaryItem: Через тернарку: если count > 0, строка "В наличии", иначе "Нет".
//
const count = 0;
console.log((count > 0) ? 'в наличии' : 'нет')
//GuardAccess: Функция проверки: если нет токена — return, если нет прав — return, иначе — «Welcome».
//
const token = true;
const permission = true;
console.log(
    (!(token && permission)) ? 'return' : 'Welcome'
)
// !token || !permission

// DefaultValue: Присвой переменной значение из input или 'Default', если input пуст (через ||).
//
const input = ''
const variable = input || 'default'
console.log(
    variable
)

//Nullish: То же самое, но через ?? (Nullish coalescing) для значения 0.
//
const inputOne = 0

const nullish = (inputOne ?? 'default')
console.log(nullish)
// SwitchDay: Через switch выведи название дня недели по номеру (1-7).
//

const dat = 3;

switch (dat) {
    case 1:
        console.log('mon')
        break
    case 2:
        console.log('tue')
        break
    case 3:
        console.log('wed')
        break
    case 4:
        console.log('thu')
        break
    case 5:
        console.log('fri')
        break
    case 6:
        console.log('sat')
        break
    case 7:
        console.log('sun')
}
//LogicAnd: Выполни console.log, только если переменная isReady истинна (через &&).
//
const isReady = false;
isReady && console.log('!!')
//EvenOdd: Через тернарный оператор проверь число на четность.
//
const div = 5;
console.log(
    (div % 2 === 0) ? 'even' : 'odd'
)
//NestedTernary: Напиши статус заказа: 1 - "Новый", 2 - "В работе", 3 - "Завершен", иначе - "Ошибка" (в одну строку).
const state = 4
console.log((state === 1) ? 'new' : ((state === 2) ? 'in work' : ((state === 3) ? 'ended' : 'error')))
//
// Уровень 4: Специалист (Loops & Iterations)
//
// Фокус: Переборы и управление потоком.
//
// For100: Выведи все четные числа от 2 до 100.
for (let i = 0; i <= 100; i++) {
    if (i % 2 === 0) {
        console.log(i)

    }
}
//
// Backwards: Выведи числа от 50 до 0 с шагом 5.

for (let i = 50; i >= 0; i = i - 5) {
    console.log(i)
}
//
// SumLoop: Посчитай сумму чисел от 1 до 100 через while.
//
let indx = 1
let sum = 0;
while (indx <= 100) {
    sum = sum + indx;
    indx++;

}
console.log(sum)
// ArrayLog: Пройдись по массиву ['Node', 'JS', 'Architect'] через for...of.
//

const arrNode = ['Node', 'JS', 'Architect']

for (let i = 0; i < arrNode.length; i++) {
    console.log(arrNode[i]);
}

for (index of arrNode) {
    console.log('index', index)
}
// ObjKeys: Выведи все ключи объекта user через for...in.
//

const objKey = {...Object.assign({}, arrNode)}

console.log(objKey)
for (let key in objKey) {
    console.log(key)
    console.log(objKey[key])
}

// FindSeven: Цикл от 1 до 20. Если число 7 — прерви цикл (break).
//
for (let i = 1; i <= 20; i++) {
    if (i === 7) {
        console.log(`im break cycle i=${i}`)
        break;
    }
}
// SkipThree: Цикл от 1 до 10. Пропусти итерацию на числе 3 (continue).
//
for (let i = 1; i <= 10; i++) {
    if (i === 3) {
        i++;

    }
    console.log(i)
}


// Power: Напиши цикл, который возводит число 2 в 10-ю степень.
//
let res = 1
for (let i = 1; i <= 10; i++) {
    console.log(res = res * 2)
}
// StarString: Сформируй строку из 10 звездочек * через цикл.
let asterix = '*';
for (let i = 1; i <= 10; i++) {
    asterix = asterix + '*';
}
console.log(asterix)
//
// ArrayDouble: Дан массив чисел. Создай новый, где каждое число умножено на 2 (используя for).

const arrNumb = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const arrRes = [];
for (let i = 0; i < arrNumb.length; i++) {
    arrRes.push(arrNumb[i] * 2);
}
console.log(arrRes)