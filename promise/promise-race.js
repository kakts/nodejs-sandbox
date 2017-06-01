// promise.replace
// promiseオブジェクトの配列を引数に渡す
// 引数に渡したオブジェクトの中でどれか一つでもFulFilledまたRejectedになったら次の処理を実行する

const time400 = new Promise((resolve, reject) => {
  console.log("time400");
  setTimeout(() => {
    resolve(400);
  }, 400);
});

const time100 = new Promise((resolve, reject) => {
  console.log("time100");
  setTimeout(() => {
    resolve(100);
  }, 100);
});

const time4000 = new Promise((resolve, reject) => {
  console.log("time4000");
  setTimeout(() => {
    resolve(4000);
  }, 4000);
});

const time700 = new Promise((resolve, reject) => {
  console.log("time700");
  setTimeout(() => {
    resolve(700);
  }, 700);
});

Promise
  .race([time400, time100, time4000, time700])
  .then((value) => {
    // time100が一番早くresolveが呼ばれるので 100が渡ってくる
    console.log("then value:", value);
  })
  .catch((error) => {
    console.error("error");
    console.error(error);
  });
