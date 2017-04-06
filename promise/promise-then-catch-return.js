const aPromise = new Promise((resolve) => {
  resolve(100);
});

const thenPromise = aPromise.then((value) => {
  console.log(value);
});

const catchPromise = thenPromise.catch((error) => {
  console.error(error);
});

// .then .catchメソッドは、新たなpromiseオブジェクトを返すことを確認する
console.log(aPromise !== thenPromise); // => true
console.log(thenPromise !== catchPromise); // => true

// この特徴をふまえて 下記のスクリプトの挙動を確認する
// promiseオブジェクトに対して 同期的に複数.thenを呼び出すと どれも同じものを返す
// valueは、逐次的に2倍されると予想されるが、thenは呼ぶたびに異なるオブジェクトを返すので 下記
// 3つのthen関数にそれぞれ同じvalue=100が渡される
// アンチパターン
const bPromise = new Promise((resolve) => {
  resolve(100);
});

bPromise.then((value) => {
  console.log('----then1', value);
  return value * 2;
});

bPromise.then((value) => {
  console.log('----then2: ', value);
  return value * 2;
});

bPromise.then((value) => {
  console.log("1: " + value);
});

console.log("======================");
// cPromiseに対して、thenメソッドをチェーンすると最初に渡した100が２倍されていく
const cPromise = new Promise((resolve) => {
  resolve(100);
});

bPromise.then((value) => {
  console.log('----then1', value);
  return value * 2;
}).then((value) => {
  console.log('----then2: ', value);
  return value * 2;
}).then((value) => {
  console.log("1: " + value);
});

//
