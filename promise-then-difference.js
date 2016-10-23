// 1: それぞれの　then は同時に呼び出される
var aPromise = new Promise((resolve) => {
  resolve(100);
});

// This is the anti-pattern of Promise

aPromise.then((value) => {
  console.log("aPromise A", value);
  return value * 2;
});

aPromise.then((value) => {
  console.log("aPromise B", value);
  return value * 2;
});

aPromise.then((value) => {
  console.log("1: " + value);
});

// vs

// 2: then はpromise chain通り順番に呼び出される
var bPromise = new Promise(function (resolve) {
    resolve(100);
});
bPromise.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log("2: " + value); // => 100 * 2 * 2
});
