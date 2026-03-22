// Lab session: js-m0-drill-lvl3-2026-03-22-20-49

// Created at: 2026-03-22-20-49
console.log("Environment is ready!");

const age = 8;

const workOrRest = age >= 18 && age <= 65 ? "work" : "hollydays";

console.log(workOrRest);
console.log("-".repeat(60));

let a = 3;

const b = 5;

const c = 7;

if (a < b) {
	a = b;
}
if (a < c) {
	a = c;
}

console.log(a);

console.log("-".repeat(60));

const count = 3;

const checkCount = count > 0 ? "in stok " : "not";

console.log(checkCount);

console.log("-".repeat(60));

function checkAccess(admin, token) {
	if (!token) {
		return "get out";
	}

	if (!admin) {
		return "get out";
	}

	return "welcome";
}

const admin = 0;
const token = 1;

console.log(checkAccess(admin, token));

console.log("-".repeat(60));

const input = "yea!";
const varInput = input || "Default";

console.log(varInput);

console.log("-".repeat(60));

const source = null;
const final = source ?? "empty";
console.log(final);

console.log("-".repeat(60));
const day = 5;

switch (day) {
	case 1: {
		console.log("mon");
		break;
	}

	case 2: {
		console.log("tu");
		break;
	}

	case 3: {
		console.log("we");
		break;
	}

	case 4: {
		console.log("th");
		break;
	}
	case 5: {
		console.log("fr");
		break;
	}
}
console.log("-".repeat(60));
const isReady = true;

isReady && console.log("is true");
console.log("-".repeat(60));

const anyNum = 7;

const checkOddEven = anyNum % 2 === 0 ? "number is even" : "number is odd";

console.log(checkOddEven);

console.log("-".repeat(60));

const orderCur = 1;

const orderState =
	orderCur === 1
		? "new"
		: orderCur === 2
			? "in work"
			: orderCur === 3
				? "complete"
				: "Error";

console.log(orderState);
