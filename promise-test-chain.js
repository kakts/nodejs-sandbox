var promise = Promise.resolve();

function taskA() {
  console.log("task A");
}

function taskB() {
  console.log("task B");
}

function onRejected(error) {
  console.log("Catch Error: A or B", error);
}

function finalTask() {
  console.log("task Final");
}
// taskA taskB finalTask
promise
  .then(taskA)
  .then(taskB)
  .catch(onRejected)
  .then(finalTask);
