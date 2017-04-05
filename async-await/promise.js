async function hello(msg) {
  await isValid(msg);
  return sendNextMessage();
};

const isValid = (msg) => {
  if (!msg) {
    console.log('msg is not set');
    return Promise.reject({type: 'Invalid_Message'});
  }
  return true;
};

const sendNextMessage = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Sending next message');
      resolve('Message has been sent');
    }, 100);
  });
};

const rejectCase = (err) => {
  if (err.type === 'Invalid_Message') {
    console.error('Invalid message error');
    return;
  }
  console.log(err);
  new Error('this is an error');
};

// work
// hello('test')
//   .then(res => console.log('hello -> then' + res))
//   .then(res => console.log('hello2 -> then' + res))
//   .catch(err => rejectCase(err));

// // error
// hello()
//   .then(res => console.log('hello -> then' + res))
//   .catch(err => rejectCase(err));


function asyncFun() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Async hello world');
    }, 1000);
  });
};

asyncFun()
  .then((value) => {
    // success
    console.log('--success--', value);
  })
  .catch((error) => {
    console.error('--error--', error);
  });
