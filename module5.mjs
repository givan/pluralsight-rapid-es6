class Calculator {
  constructor() {

  }
  add() {

  }
}

let c = new Calculator();
console.log(Calculator.name);
console.log(c.add.name);

let fn = function calc() {
  return 0;
}
console.log(fn.name);

let fn1 = function () {
  return 0;
}
let newFn = fn1;
console.log(newFn.name);

let a = { x: 3 };
let b = { y: 4 };
Object.setPrototypeOf(a, b);
console.log(a.y);

let a1 = { a: 1 }, b1 = {a: 5, b: 2}
Object.defineProperty(b1, 'c', {
  value: 10,
  enumerable: false
});
let target = {};
Object.assign(target, a1, b1);
console.log(target);

let c1 = {c: 111};
Object.setPrototypeOf(b1, c1);
target = {};
Object.assign(target, a1, b1);
console.log(target) ; // no proerty 'c', inheritance didnt include the properties of c1 into b1; the prorotype chain is not walked by Object.assign()

let amount = NaN;
console.log(amount === amount); // false
console.log(Object.is(amount, amount)); // true

let amount1 = 0, total1 = -0;
console.log(amount1 === total1); // true
console.log(Object.is(amount1, total1)); // false

let title = 'George Ivanov';
console.log(title.startsWith('George'));
console.log(title.endsWith('Ivanov'));
console.log(title.includes('Iva'));

let surfer = "\u{1F30a}\u{1f3c4}\u{1f40b}";
console.log(surfer.length); // 6 (bytes - wrong number of chars)
console.log(Array.from(surfer).length); // 3 chars (correct)
console.log(surfer); // renders the unicode chars

title = "Mazatla\u0301n";
console.log(`${title} ${title.length}`); // Mazatlan has 9 chars!?!?!?
console.log(`${title} ${title.normalize().length}`); // how is correct - shows 8 chars
console.log(String.fromCodePoint(0x1f3c4)); // shows our surfer symbol

title = 'Surfer';
let output = String.raw `${title} \u{1f3c4}\n`;
console.log(output);

let wave = '\u{1f30a}';
console.log(wave.repeat(10)); // 10 wave unicode chars (from the astral planes)

console.log(Number.parseInt === parseInt); // true - use Number.parseInt; same with Number.parseFloat

let s = 'NaN';
console.log(isNaN(s)); // true
console.log(Number.isNaN(s)); // false - because it's a string

s = '98000';
console.log(isFinite(s));
console.log(Number.isFinite(s)); // false because it's a string, not a number

let sum = 10.22;
console.log(Number.isInteger(sum)); // false since it has decimal point
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // 2^53 - 1 is the last safe integer
a = Math.pow(2, 53) - 1;
console.log(Number.isSafeInteger(a)); // true - that is MAX_SAFE_INTEGER from above
b = Math.pow(2, 53);
console.log(Number.isSafeInteger(b)); // false
console.log(Math.trunc(22.333));