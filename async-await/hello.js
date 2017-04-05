async function afn1(flag) {
  if (flag) {
    return Promise.resolve("success");
  }
  return Promise.reject("heee");
}

afn1(false).then(v => console.log(v))
  .catch(e => {
    console.error('----error');
    console.error(e);
  });

async function afn2(msg) {

}

const useAsyncFunction = () => {
  await 
}
