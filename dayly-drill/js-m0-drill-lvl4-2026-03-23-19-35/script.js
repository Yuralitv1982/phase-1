// Lab session: js-m0-drill-lvl4-2026-03-23-19-35
// Created at: 2026-03-23-19-35
console.log("Environment is ready!");

for (let i = 2; i <= 100; i = i + 2) {
	console.log(i);
}

console.log("-".repeat(60));

for (let i = 50; i >= 0; i = i - 5) {
	console.log(i);
}

console.log("-".repeat(60));

// console.log('');
let res = 0;
for (let i = 1; i <= 100; i++) {
	res = res + i;
}

console.log(res);

console.log("-".repeat(60));

const arrayNode = ["node", "js", "arc", 1, false];

for (const val of arrayNode) {
	console.log(val);
}

console.log("-".repeat(60));

const user = {
	name: "Yurec",
	age: "43",
	city: "zap",
};

for (const key in user) {
	console.log(key);
	// console.log(user[key]);
}

console.log("-".repeat(60));

const iterationBreak = 7;
for (let i = 1; i <= 20; i++) {
	if (i === iterationBreak) {
		console.log(`cycle = ${i} - out of cycle`);
		break;
	}
	console.log(i);
}

console.log("-".repeat(60));
const iterationEmpty = 3;

for (let i = 1; i <= 10; i++) {
	if (i === iterationEmpty) {
		console.log(`iteration ${i} continue`);
		continue;
	}

	console.log(i);
}

console.log("-".repeat(60));

let resultMultiple = 1;
const multiple = 2;
for (let i = 1; i <= 10; i++) {
	resultMultiple = resultMultiple * multiple;
	console.log(resultMultiple);
}

console.log("-".repeat(60));

let strAsterix = "";

for (let i = 1; i <= 10; i++) {
	strAsterix = strAsterix + "*";
}

console.log(strAsterix);

const numArr = [2, 4, 3, 5, 6, 9];
const resArr = [];
for (const val of numArr) {
	resArr.push(val * 2);
}

console.log(resArr);
