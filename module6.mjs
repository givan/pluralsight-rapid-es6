let items = [1, 3, 5, 7, 9];
console.log(typeof items[Symbol.iterator]);

let arrIterator = (arr) => {
  let it = arr[Symbol.iterator]();
  let i = 0;
  for (let v of it) {
    console.log(`arr[${i}]=${v}`);
    i++;
  }

  // second way of iterating over an iterator
  i = 0;
  let it2 = arr[Symbol.iterator]();
  let result = it2.next();
  while (!result.done) {
    console.log(`arr[${i}]=${result.value}`);
    i++;
    result = it2.next();
  }
}

arrIterator(items);

// define my own generator (iterable class)
// read up from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
/* 
Built-in iterables:
String, Array, TypedArray, Map and Set are all built-in iterables, because their prototype objects all have a Symbol.iterator method.
*/
class IdGenerator {
  constructor(start, end) {
    this._start = start;
    this._end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this._start; i < this._end; i++) {
      let result = yield i;
      if (result) {
        break;
      }
    }
  }
};

let generator = new IdGenerator(0, 3);
for (let count of generator) {
  console.log(`Count=${count}`);
}

// another way to iterate - obviously more code to write and less elegant
// let itId = generator[Symbol.iterator]();
// let res = itId.next();
// while (!res.done) {
//   console.log(`while.value: ${res.value}`);
//   res = itId.next();
// }

let gen2 = new IdGenerator(0, 15);
let itGen2 = gen2[Symbol.iterator]();
let result = itGen2.next();
while (!result.done) {
  console.log(`itGen2.value=${result.value}`);
  result = itGen2.next(result.value === 7); // stopping the generator at 7 even though it can go up to 15
}

let gen3 = new IdGenerator(0, 15);
let itGen3 = gen3[Symbol.iterator]();
result = itGen3.next();
while (!result.done) {
  console.log(`itGen3.value=${result.value}`);
  if (result.value === 7) {
    result = itGen3.return(77); // stopping the generator at 7 even though it can go up to 15; and we return 77 value
    console.log(`itGen3.value=${result.value}`); // this will output 77 and will exit the while loop since iterator's done: true
  } else {
    result = itGen3.next();
  }
}