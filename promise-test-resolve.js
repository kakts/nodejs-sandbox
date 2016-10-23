var promise = new Promise((resolve, reject) => {
  resolve('hello promise');
});

promise.then((value) => {
  // called
  console.log('resolve called. : ' + value);
}).catch((error) => {
  // not called
  console.error(error);
});
