
function doubleUp(value) {
  if (isNaN(value)) {
    throw new Error ("Invalid value");
  }
  return value * 2;
}

function increment(value) {
  if (isNaN(value)) {
    throw new Error ("Invalid value");
  }
  return value + 1;
}

function output(value) {
  console.log(value);
}

// Initial value is 1
var promise = Promise.resolve(1);
// taskA taskB finalTask
promise
  .then(increment)
  .then(doubleUp)
  .then(output)
  .catch((error) => {
    // called when error has happend
    console.error(error);
  });
