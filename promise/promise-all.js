aPromise = new Promise((resolve, reject) => {
  resolve(4);
});

bPromise = new Promise((resolve, reject) => {
  resolve(5);
});

// .allはpromiseオブジェクトの配列を引数に取る
// 引数に渡したpromiseオブジェクトのすべてがresolveされたときに次の.then を呼ぶ
Promise
  .all([aPromise, bPromise])
  .then((value) => {
    console.log('resolved')
    console.log(value); // [4, 5]を返す
  })
  .catch((error) => {
    console.error('error');
    console.error(error);
  });
