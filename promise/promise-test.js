
// Promise.resolveは、new Promiseのショートカットメソッド
Promise.resolve(42).then(function(value) {
  console.log(value);
});

// Promise.resolve()の戻り値はpromiseオブジェクトなので、メソッドチェーンで.thenをつかって成功時の処理をかける

// Promise.reject(object)
var r = Promise.reject(new Error("error"));
// Promise.rejectは新たなpromiseオブジェクトを生成するためfalseになる
console.log(r === Promise.reject(r));

var aPromise = new Promise((resolve, reject) => {
  resolve(42);
  var a = 1
  if (!a) {
    rejected(new Error('error'));
  }
});

aPromise.then((value) => {
  console.log('--------1', value);
})
.then((value) => {
  console.log('--------2', value);
})

// then onFulfilledの処理を登録
// catch onRejectedの処理を登録


var bPromise = Promise.resolve();

bPromise
  .then(() => {
    console.log('Task A');
    throw new Error('throw')
  })
