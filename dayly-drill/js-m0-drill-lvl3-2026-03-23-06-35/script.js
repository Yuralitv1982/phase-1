// Lab session: js-m0-drill-lvl3-2026-03-23-06-35
// Created at: 2026-03-23-06-35
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

console.log(null + 1);
console.log(undefined + 1);

const bigInt1 = 2n;

const bigInt2 = 3n;

console.log(bigInt1 * bigInt2);

console.log("-".repeat(60));

const emptyVar = [];

if (
	emptyVar === 0 ||
	emptyVar === " " ||
	(Array.isArray(emptyVar) && emptyVar.length === 0) ||
	(emptyVar &&
		Object.keys(emptyVar).length === 0 &&
		emptyVar.constructor === Object)
) {
	console.log("!! variable is empty");
}

console.log("-".repeat(60));

console.log("str" + 5 + false);

console.log("-".repeat(60));

console.log(null == undefined);
console.log(null === undefined);

console.log("-".repeat(60));

console.log(isNaN("abc" * 10));

console.log("-".repeat(60));

const promt1 = "5";
const promt2 = "3";

console.log(Number(promt1) + Number(promt2));
