const timeout = (delay) => {
  // promiseインスタンスをreturnする
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('timer callback');
      resolve()
    }, delay);
  });
};

async function timer() {
  console.log('timer started');
  await Promise.resolve(timeout(100));
  console.log('timer finished');
}

timer();
