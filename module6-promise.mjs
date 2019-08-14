
class MyPromiseLand {
  constructor() {

  }

  doResolveAsync(timeout = 2000) {
    return new Promise((resolve, reject) => {
      console.log('in promise code..');
      setTimeout(() => {
        console.log('resolving .. ');
        resolve(`OK(${timeout})`);
      }, timeout);
    });
  }

  doRejectAsync(timeout = 2000) {
    return new Promise((resolve, reject) => {
      console.log('in promise reject code..');
      setTimeout(() => {
        console.log('rejecting...');
        reject(`FAIL right now!${timeout}`);
      }, timeout);
    });
  }

  doChainPromiseAsync(anotherPromise) {
    console.log('in doChainPromiseAsync() code..');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Chaining with resolve() with another promise..`);
        resolve(anotherPromise); // resolving with another promise
      }, 1000);
    });
  }

  doAutoResolvePromiseAsync() {
    console.log('in doAutoResolvePromiseAsync() code..');
    return Promise.resolve('Autoresolve on promise..');
  }

  doAutoRejectPromiseAsync() {
    console.log('in doAutoRejectPromiseAsync() code..');
    return Promise.reject('Autoreject called..');
  }
}

const onResolved = (result) => {
  console.log(`Resolved with ${result}`);
};
const onRejected = (reason) => {
  console.log(`Reject with ${reason}`);
};

let promLand1 = new MyPromiseLand();
let prom1 = promLand1.doResolveAsync();
prom1.then(onResolved, onRejected);

let prom2 = promLand1.doRejectAsync();
prom2.then(onResolved, onRejected);

// chaining event functions example
let prom3 = promLand1.doResolveAsync();
prom3
  .then((value) => {
    console.log(`Chaining resolve .. ${value}`);
    console.log('Return another promise from then() handler will chain the promises');
    return promLand1.doAutoResolvePromiseAsync(); 
  })
  .then((value) => {
    console.log(`Next then() called with: ${value}`);
    return 'Now just return a simple string that will also generate a new promise';
  })
  .then((value) => {
    console.log(`Next second time on chaining promises: ${value}`);
  });

// catch on a promise
let prom4 = promLand1.doRejectAsync();
prom4
  .then(onResolved)
  .catch((reason) => {
    console.log(`in Promise.catch(${reason})`);
  });

let prom5 = promLand1.doResolveAsync();
let prom6 = promLand1.doChainPromiseAsync(prom5);
prom6
  .then(
    (result) => {
      console.log(`Chaining success: ${result}`);
    }).catch((reason) => {
      console.log(`Chaining catch: ${reason}`);
    });

promLand1.doAutoResolvePromiseAsync().then((result) => {
  console.log(`Autoresolve handler with: ${result}`);
});

promLand1.doAutoRejectPromiseAsync().then((reason) => {
  console.log(`Autoreject handler with: ${reason}`);
});

// now wait for ALL promises to finish or, at least 1 to fail
Promise.all(
  [promLand1.doAutoResolvePromiseAsync(), promLand1.doResolveAsync()])
  .then((result) => {
    console.log(`Promise.all resolve handler: ${result}`); // result is an array with 2 results here..
  })
  .catch((reason) => {
    console.log(`Promise.all catch handler: ${reason}`); // catch is not called!
  });

// now Promise.all where one of the promises is rejected - the first reject on any promise, exits Promise.all() and calls .catch
Promise.all(
  [promLand1.doAutoResolvePromiseAsync(), promLand1.doResolveAsync(), promLand1.doAutoRejectPromiseAsync()])
  .then((result) => {
    console.log(`Promise.all resolve handler: ${result}`); // this is not called since one of the promises is rejected
  })
  .catch((reason) => {
    console.log(`Promise.all catch handler: ${reason}`); // catch is called because of doAutoRejectPromiseAsync() rejected promise
  });

// first promise resolves in 2 secs and the second promise resolves in 5 secs
// race() will wait for the resolve of the first promise to resolve and will not wait for the second promise (5 secs)
Promise.race([promLand1.doResolveAsync(1000), promLand1.doResolveAsync(5000)])
.then(
  (value) => {
    console.log(`Promise.race resolve handler called with (${value})`); // this is only called for the promise resolved in 2 secs
  },
  (reason) => console.log(`Promise.race reject handler called with (${reason})`)
);

// another example where the resolve is 2 secs and the reject is 5
Promise.race([promLand1.doResolveAsync(1100), promLand1.doRejectAsync(5100)])
.then(
  (value) => {
    console.log(`Promise.race resolve handler called with (${value})`); // this is called for the first promise resolved in 2 secs
  },
  (reason) => {
    console.log(`Promise.race reject handler called with (${reason})`); // this is NOT called even though the second promise is rejected in 5 secs
  }
);