// Drill: drill-18-17
// RAM-mode: ACTIVE
console.log('Strict Airbnb environment is ready!');

function otherSum(string, number, boolean) {
  result1 = string + number + boolean;
  result2 = number + string + boolean;
  result3 = boolean + number + string;
  result4 = number + boolean + string;
  return `result1: ${result1}, result2: ${result2}, result3:${result3} ,  result4 ${result4}`;
}

console.log(otherSum('5', 5, true));

const someArray = [0, '', null, undefined, NaN, false, [], {}, '0', 'false'];

const arrFltr = someArray.filter(Boolean);

console.log(arrFltr);

const arrFltrArr = someArray.filter(Array);
console.log(arrFltrArr);
