// Lab session: js-m0-drill-lvl3-2026-03-23-19-00

// Created at: 2026-03-23-19-00
console.log("Environment is ready!");

const age = 61;

const checkAge = age >= 18 && age <= 65 ? "work" : "Hollidays";

console.log(checkAge);

console.log("-".repeat(60));

let a = 3;
const b = 4;
const c = 5;

if (a < b) {
	a = b;
}

if (a < c) {
	a = c;
}

console.log(a);

console.log("-".repeat(60));

const count = 18;

const countCheck = count > 0 ? " in stock" : " not";

console.log(countCheck);

console.log("-".repeat(60));

function checkAdmin(token, admin) {
	if (!token) {
		return "get out";
	}
	if (!admin) {
		return "get out";
	}
	return `welcome`;
}

const token = 1;
const admin = 0;

console.log(checkAdmin(token, admin));

console.log("-".repeat(60));

const input = "0";

const inputState = input || "default";
console.log(inputState);

console.log("-".repeat(60));

const nulishCoal = input ?? "default";

console.log(nulishCoal);
console.log("-".repeat(60));

const day = 3;

switch (day) {
	case 1: {
		console.log("su");
		break;
	}
	case 2: {
		console.log("mo");
		break;
	}
	case 3: {
		console.log("tu");
		break;
	}
}
console.log("-".repeat(60));

const isReady = true;

const readyState = isReady && console.log("ready");

console.log("-".repeat(60));

const anyNumber = 13;

const checkOddEven = anyNumber % 2 === 0 ? " even " : "odd";

console.log(checkOddEven);

console.log("-".repeat(60));

const order = 2;

const orderState =
	order === 1
		? "new"
		: order === 2
			? "in work"
			: order === 3
				? "complete"
				: "Error";
console.log(orderState);
