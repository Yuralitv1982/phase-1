console.log('Project drill-js-m0 initialized at 2026-02-05_15-56');

// 1. StringToNum: "100px" -> number 100
// TODO:
const pixel = '100px';

console.log(pixel)
console.log(typeof parseInt(pixel, 10))

// 2. BoolTrap: !! для [0, "", " ", [], {}, null] (выведи результат в ряд)
// TODO:

console.log('-'.repeat(30))

const primitive = 5;

console.log(primitive)

if (primitive === 0 || primitive === '' || primitive === ' ' || primitive === null || primitive === Array.isArray(primitive) && primitive.length === 0 || typeof primitive === 'object' && Object.keys(primitive).length === 0) {

    console.log('!!')

} else console.log(primitive);


// 3. MathCoercion: результат "20" * "2" + "10"
// TODO:

console.log(Number('20') * Number('2') + Number('10'))

console.log('--'.repeat(30))
// 4. NullishDefault: переменная x = input (если input null/undefined, то 50. Если 0, то 0)
// TODO:
function checkInput(input) {
    if (input === undefined || input === null) {
        return 50;
    } else if (input === 0) {
        return 0;
    } else return input

}

console.log(checkInput(5))
console.log(checkInput(null))
console.log(checkInput(0))

// 5. OrDefault: переменная y = input (если input любая "пустота" или 0, то "Empty")
// TODO:

console.log('--'.repeat(30))

function checkEmpty(input) {
    if (input === undefined || input === null || input === ' ' || typeof input === 'object' && Object.keys(input).length === 0 || Array.isArray(input) && input.length === 0 || input === 0) {
        return 'empty'
    } else return input;
}

console.log(checkEmpty('0'));
console.log(checkEmpty('sdf'));
console.log(checkEmpty([]));
console.log(checkEmpty({}));
console.log(checkEmpty(['SLDKJF']));

// 6. Strict: Сравни null и undefined (мягко и строго)
// TODO:
console.log(null == undefined);
console.log(null === undefined);

const numBigInt1 = 10n
const numBigInt2 = 20n

console.log(numBigInt1 * numBigInt2);

// 8. IsItNaN: Проверь, является ли "hello" / 2 числом (результат true/false)
// TODO:
console.log(isNaN('hello' / 2))

// 9. ConcatMagic: Сложи "Result: " + true + 10
// TODO:
console.log('result : ' + true + 10)


// 10. AgeCheck: age 18-60 ? "work" : "rest" (тернарка)
// TODO:
const age = 16
console.log((age >= 18 && age <= 60) ? 'work' : 'rest')

// 11. MaxOfThree: Найти большее из a, b, c (через Math.max)
// TODO:

const a = 2;
const b = 3;
const c = 4;
let max;
if (a > b) {
    max = a;
} else {
    max = b;
}
if (max < c) {
    max = c;
    console.log(max)
} else {
    console.log(max)
}

// 12. GuardToken: Функция: если !token, вернуть "exit", иначе "ok"
// TODO:
const token = 3
console.log(!token ? 'exit' : 'ok')

// 13. EvenOdd: Число четное ? "even" : "odd"
// TODO:
const n = 5
console.log(n % 2 === 0 ? 'even' : 'odd')

// 14. SwitchStatus: 1-"start", 2-"stop", default-"unknown"
// TODO:

const caseInput = 5;

switch (caseInput) {
    case 1:
        console.log('start')
        break;
    case 2:
        console.log('stop')
        break;
    default:
        console.log('unknown')
}

// 15. ShortCircuit: Выполни console.log("Go"), если isTrue истинно (через &&)
// TODO:

const isTrue = true;

isTrue && console.log('go');

// 16. ArrayEmpty: Проверь, что массив arr пустой (true/false)
// TODO:

function checkArr(arr) {
    return (Array.isArray(arr) && arr.length === 0)
}

console.log(checkArr([3243]));

// 17. ObjEmpty: Проверь, что объект obj без ключей (true/false)
// TODO:

function checkObj(obj) {
    return Object.keys(obj).length === 0;
}

console.log(checkObj({name: 'ods'}));

// 18. NestedShort: Статус: 1-"A", 2-"B", иначе "C" (тернарка в одну строку)
// TODO:
function checkABC(num) {
    return (num === 1) ? 'A ' : ((num === 2) ? 'B' : 'C')
}

console.log(checkABC(2))

// 19. TypeCheck: Выведи тип null, [], undefined (через typeof)
// TODO:

console.log(typeof null)
console.log(typeof undefined)
console.log(typeof [])

// 20. ParseFloat: "12.5rem" -> 12.5
// TODO:
const rem = '12.5rem'
console.log(parseFloat(rem));