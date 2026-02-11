console.log('Project drill-log-m0 initialized at 2026-02-11_16-58');
// Перепиши `if (isActive == true)` в краткий вид.
// if (isActive)

// 2. Создай тернарник для `const mode = (speed > 60) ? 'fast' : 'slow'`.
const speed = 70;
const mode = (speed > 60) ? 'fast' : 'slow'
console.log(mode)

// 3. Инвертируй флаг `isOpen` без использования `if`.
const isOpen = true;
console.log(isOpen)
console.log(!isOpen)

// 4. Реализуй `switch` для 3-х цветов светофора.

const switcher = 3
switch (switcher) {
    case 1 : {
        console.log('red');
        break;
    }
    case 2 : {
        console.log('yellow');
        break;
    }

    case 3: {
        console.log('green');
        break;
    }
    default: {
        console.log('какой цвет твой')
    }

}
// 5. Напиши цикл `for` от 1 до 10.
//
for (let i = 1; i <= 10; i++) {
    console.log(i)
}


// ### Уровень 2: Adv. Beginner (Short-circuit)
// 6. Вызови `app.start()` только если `isAuth` истинно через `&&`.
const isAuth = true;
isAuth && console.log('call app.start()');
// 7. Присвой `userName || 'Guest'` через оператор ИЛИ.

const userName = '0'
const papaName = userName || 'guest'
console.log(papaName)
// 8. Напиши условие: `num` больше 0 И `num` меньше 100.
const num = 101
if (num > 0 && num < 100) {
    console.log('you are in a range')
}
// 9. Цикл `for`: выведи каждое второе число от 0 до 20.

for (let i = 0; i <= 20; i++) {
//     выводим нечетные числа
    if (i % 2 !== 0) {
        console.log(i)
    }
}
// 10. Используй `!` дважды (`!!`), чтобы превратить строку в `boolean`.

console.log(!!'you are in a range')


// ### Уровень 3: Competent (Трансформации)


// 11. Упрости по Де Моргану: `!(A || B)`
//  !A && !B
// 12. Упрости по Де Моргану: `!(A && B)`.
//  !A || !B
// 13. Напиши `while`, который работает, пока `energy > 0`.

const energy = 0;

while (energy > 0) {
    console.log('я работаю')
}
console.log('out of cycle while')

// 14. Реализуй проверку: `age` в диапазоне [18, 65].
const age = 21;
if (age >= 18 && age <= 65) {
    console.log('ты не пенсия')
}
// 15. Создай цепочку тернарников для оценки: 5, 4, 3, 2.

const input = 3;
console.log(
    (input === 5) ? '5 ' : ((input === 4) ? '4' : ((input === 3) ? '3' : ((input === 2) ? '2' : 'empty')))
)
