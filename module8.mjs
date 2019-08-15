class Location {
  constructor(city) {
    console.log(`inside Location constructor`);
    this._city = city;
  }
}

class Restaurant extends Location {
  constructor(name, city) {
    super(city);
    console.log(`inside the Restaurant constructor(${name}, ${city})`);
    this._id = 33;
  }
  show() {
    console.log(`Restaurant.id=${this._id}`);
  }

  get id() {
    return this._id;
  }
}


let r = Reflect.construct(Restaurant, []);
console.log(r instanceof Restaurant); // true

let r1 = Reflect.construct(Restaurant, ['George', 'Seattle']);
console.log(r1);

function restaurantMaker() {
  console.log(`in restaurantMaker function()`);
}

Reflect.construct(Restaurant, ['George', 'Portland'], restaurantMaker);

Reflect.apply(Restaurant.prototype.show, { id: 99 }, []);

console.log(Reflect.getPrototypeOf(Restaurant));

let r2 = new Restaurant('George', "Portland");

// add the getId() method to Restaurant instance r2
let setup = {
  getId() {
    return 88;
  }
};
Reflect.setPrototypeOf(r2, setup);
console.log(r2.getId()); // 88

Reflect.set(r2, 'id', 99);
console.log(r2.id); // 99

let r4 = new Restaurant();
let alt = { id: 9999 };
Reflect.set(r4, '_id', 77, alt);
console.log(r4._id);
console.log(alt._id);

console.log(Reflect.has(r4, 'id')); // true
console.log(Reflect.has(r4, '_city')); // true

console.log(Reflect.ownKeys(r4)); // _city, _id

Reflect.defineProperty(r4, 'myNewProperty', {
  value: "12345",
  configurable: true,
  enumerable: true
});
console.log(r4.myNewProperty); // 12345

console.log(Reflect.getOwnPropertyDescriptor(r4, 'myNewProperty'));

Reflect.deleteProperty(r4, 'myNewProperty');

console.log(r4.myNewProperty); // undefined

let rest = {
  id: 3000
};

console.log(Reflect.isExtensible(rest)); // true
rest.location = 'Seattle'; // that's ok to add a property unless it is closed
console.log(rest.location); // Seattle

Reflect.preventExtensions(rest);
console.log(Reflect.isExtensible(rest)); // false - now is false since we called preventExtensions() above
// rest.location1 = 'Seattle'; // this throws an error: TypeError: Cannot add property location1, object is not extensible
