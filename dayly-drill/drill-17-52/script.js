// Drill: drill-17-52
// RAM-mode: ACTIVE
console.log('Strict Airbnb environment is ready!');

function createUser(name, role = 'guest') {
  return ` Name ${name} role : ${role}`;
}

console.log(createUser('yurec'));

function sumAll(...nums) {
  return nums;
}

console.log(sumAll(1, 2, 3, 5, 6, false, 'str'));

function logConfig(appName, version = 1.0, ...features) {
  return `appName ${appName}, version = ${version}, features : ${features}`;
}

console.log(logConfig('newApp', undefined, '--flag1', 'flag2', '--flag3'));

function fnDeclaration() {
  return arguments;
}

console.log(fnDeclaration('arg', 'arg2', 'arg3'));

const fnArrow = () => arguments;

console.log(fnArrow());

function processData(val) {
  return val === undefined ? null : val * 2;
}

console.log(processData());
