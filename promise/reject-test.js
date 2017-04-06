const taskA = () => {
  console.log("Task A");
  throw new Error("throw Error @ Task A");
};

const taskB = () => {
  console.log("Task B"); // 呼ばれない
};

const onRejected = (error) => {
  console.error(error); // => "throw Error @ Task A"
}

const finalTask = () => {
  console.log("Final Task");
}

const promise = Promise.resolve();
promise
  .then(taskA) // ここでエラーが投げられる
  .then(taskB) // 呼ばれない
  .catch(onRejected) // エラー処理
  .then(finalTask); // 呼ばれない

  
