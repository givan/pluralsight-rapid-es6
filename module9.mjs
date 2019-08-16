class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  getId() {
    return 11100;
  }
}

let e = new Employee('Joy', 1000);

let proxy = new Proxy(e, {
  get: function (target, prop, receiver) {
    // target is 'e' object from above
    // prop is 'salary'
    // receiver is the proxy object

    if (prop === 'salary') {
      return 'Denied';
    } else {
      return Reflect.get(target, prop, receiver);
    }
  }
});

console.log(proxy.salary); // Denied (not 1000)
console.log(proxy.name); // Joy

let getIdMethodProxy = new Proxy(e.getId, {
  apply: function (target, thisArg, argumentList) {
    return Reflect.apply(target, thisArg, argumentList);
  }
});
console.log(getIdMethodProxy()); // call getId on e but there will be no this in the method

let someObj = {
  tableId: 100
};

let someObjProxy = new Proxy(someObj, {
  get: function (target, prop, receiver) {
    // this will be called when someObj is called with non existing property
    return `Property ${prop} does not exist`;
  }
})

Object.setPrototypeOf(someObj, someObjProxy);
console.log(someObj.tableId); // 100
console.log(someObj.nonExistingProperty); // Property nonExistingProperty does not exist

var t = {
  tableId: 999
};

let revocableProxy = Proxy.revocable(t, {
  get: function (target, prop, receiver) {
    if (Reflect.has(target, prop))
      return Reflect.get(target, prop, receiver) + 100;
    else
      return `[[${prop}]]`;
  }
});

console.log(`${revocableProxy.proxy.tableId}`); // 999 + 100 => 1099
revocableProxy.revoke(); // revoke the proxy
// console.log(`'${revocableProxy.proxy.tableId}`); // throws an error: TypeError: Cannot perform 'get' on a proxy that has been revoked

