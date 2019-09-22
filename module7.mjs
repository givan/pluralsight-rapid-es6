let salaries = Array.of(9000);
console.log(salaries);

let amounts = [800, 900, 1000];
salaries = Array.from(amounts, function (value) {
  return value + this.adjustment;
}, { adjustment: 50 });
console.log(salaries);

// the following will fail if used:
// salaries = Array.from(amounts, (value) => {
// fails because it doesn't have this and returns error this.adjustment is undefined
// whereas using simple function() declaration gets this reference to the adjustment object below
// salaries = Array.from(amounts, (value) => value + this.adjustment, { adjustment: 50 }); 
// ERROR: TypeError: Cannot read property 'adjustment' of undefined
// console.log(salaries);

salaries.fill(900); // sets all elements to 900
console.log(salaries);

salaries.fill(800, 1); // sets all elements at index 1 and beyond to 800;
console.log(salaries);

salaries.fill(700, 1, 2); // the third param is the index to stop fill at (not inclusive)
console.log(salaries);

let res = salaries.find(value => value > 700); // returns the first value that fits the criteria (not ALL)
console.log(res);

res = salaries.findIndex(function (value) {
  return this === value;
}, 700);
console.log(res); // found element at index 1

let ids = [1, 2, 3, 4, 5];
ids.copyWithin(3, 0, 2);
console.log(ids); //Array(5) [1, 2, 3, 1, 2]

ids = ['A', 'B', 'C'];
console.log(...ids.entries());
console.log(...ids.keys());

let buffer = new ArrayBuffer(1024);
buffer[0] = 0xff;
console.log(buffer.byteLength);
console.log(buffer);

buffer = new ArrayBuffer(100);
let a = new Int8Array(buffer);
a[0] = 0xff; // 255
console.log(a[0]); // -1

let b = new Int16Array(buffer); // uses the same buffer however contains 16 bit signed integers;
// it is little endian hence the -1 for 1 byte integers (in a array) becomes 255 for 2 byte integers (in b array)
console.log(b[0]); // 255

let dv = new DataView(buffer, 0, 32); // uses big endinan always, no matter of the underlying OS
console.log(dv.byteLength);
dv.setInt8(0, 1); // sets index 0 to the value of 1 for the first 8 bits
console.log(dv.getInt16(0)); // this reads up the first 16 bits as uint16; this equals to 256
console.log(dv.getInt8(0)); // this equals to 1; not to -1 as is in the above example

buffer = new ArrayBuffer(1024);
a = new Uint8Array(buffer);
b = new Uint16Array(buffer);
a[1] = 1;
console.log(b[0]); // uint uses little endian so high order byte is used for the value itself hence its 256

/// Map
let employee1 = { name: "George" };
let employee2 = { name: "Joy" };
let employees = new Map();
employees.set(employee1, "ABC");
employees.set(employee2, "DEF");
console.log(employees.get(employee1));

employees.delete(employee1);
console.log(employees.size);

employees.clear();
console.log(employees.size);

let arr = [
  [employee1, 'ABC'],
  [employee2, 'DEF']
];
employees = new Map(arr);
console.log(employees.size);
console.log(employees.has(employee2)); // true - contains key 'employee2' object
console.log(...employees.values()); // ABC DEF

let originalArray = [...employees.entries()]; // this be the same like 'arr' above
console.log(originalArray[0][0] == arr[0][0]); // should be true

let weakEmployees = new WeakMap(arr);
employee1 = null;
console.log(weakEmployees.size); // undefined

let perks = new Set();
perks.add('Car');
perks.add('vacation');
perks.add('Car');
console.log(perks.size); // 2, not 3

perks = new Set(['Car', 'vacation', 'Car']);
console.log(perks.size);
console.log(perks.has('Car'));// true
console.log(perks.has('Hat'));// false
console.log(...perks.keys());
console.log(...perks.values());
console.log(...perks.entries());

perks = new Set([
  { key: 1 },
  { key: 1 }
]);
console.log(perks.size); // 2 - two separate object literals even though they look the same

// perks = new WeakSet([1, 3, 5]); // Error - the keys must be objectc! can't use primitive types

let p1 = { name: 'p1' };
let p2 = { name: 'p2' };
perks = new WeakSet([p1, p2]);
console.log(perks.has(p1));// true
console.log(perks.size); // undefined

class Perks extends Array {
  sum() {
    let total = 0;
    this.map(v => total += v);
    return total;
  }
}

a = Perks.from([5, 10, 15]);
console.log(a instanceof Perks); // true
console.log(a.length);

b = a.reverse();
console.log(b instanceof Perks); // true

a = Perks.from([1, 2, 3]);
console.log(a.sum()); // 6

class Artist {
  constructor(name, address) {
    this._name = name;
    this._address = address;
  }

  get name () {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}

const leonardo = new Artist("Leonardo", "Los Angeles");
console.log(`Property setter: ${leonardo.name}`);
leonardo.name = "Vuna";
console.log(`Property setter: ${leonardo.name}`);
