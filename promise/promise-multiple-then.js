const promise = new Promise((resolve, reject) => {
  resolve(100);
});
console.log(Object.keys(promise));

promise
  .then((value) => {
    console.log("----then1 value", value);

    // return した値valueがpromiseオブジェクト以外の場合暗黙的にresolve(value)が呼ばれ、次のthenメソッドが呼ばれる
    // これをコメントアウトすると次のthenにはvalue=undefinedが渡る 関数でreturnを書かない場合 暗黙的にundefinedが返されるため
    return 200;
  })
  .then((value) => {
    console.log("----then2 value", value);
  })
  .catch((error) => {
    console.error(error);
  });
