// Lab session: js-m0-drill-lvl2-2026-03-22-20-25

// Created at: 2026-03-22-20-25
console.log("Environment is ready!");

console.log(parseInt("42px", 10));

console.log("-".repeat(60));

let numBoolStr = 0;

console.log(numBoolStr);

numBoolStr = Boolean(numBoolStr);

console.log(numBoolStr);
numBoolStr = numBoolStr.toString();

console.log(numBoolStr);

numBoolStr = Boolean(numBoolStr);

console.log(numBoolStr);

numBoolStr = Number(numBoolStr);

console.log(numBoolStr);

console.log("-".repeat(60));

console.log("10" / "2" + 5);

console.log("-".repeat(60));

console.log(null + 1);
console.log(undefined + 1);

console.log("-".repeat(60));

const bigint1 = 2n;

const bigint2 = 3n;

console.log(bigint1 * bigint2);

// console.log(Number(bigint1));
//
// console.log(parseInt(bigint1, 10));
//
console.log("-".repeat(60));

const variable = [];
if (
	variable === " " ||
	variable === 0 ||
	(Array.isArray(variable) && variable.length === 0) ||
	(variable &&
		Object.keys(variable).length === 0 &&
		variable.constructor === Object)
) {
	console.log("!! empty");
}

console.log("-".repeat(60));

console.log("str" + 5 + true);

console.log("-".repeat(60));

console.log(null === undefined);
console.log(null == undefined);

console.log("-".repeat(60));

console.log(isNaN("abc" * 10));

console.log("-".repeat(60));
const prompt1 = "4";
const prompt2 = "2";

console.log(Number(prompt1) + Number(prompt2));
