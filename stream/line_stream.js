"use strict";


const { Writable, Readable} = require('stream');
let h = 0;
const rdb = new Readable({
  read: function() {
    console.log("Readable called:", h);
    h++;
    return h;
  }
});
const wdb = new Writable(
  {
    write: function() {
      console.log("Writable called");
    }
  }
);

console.log("----rdb", rdb);
console.log("----wdb", wdb);

rdb.on('data', (chunk) => {
  console.log("rdb: data event emitted", chunk);
});

rdb.on('end', () => {
  console.log("rdb: end event emitted", chunk);
});

rdb.on('close', () => {
  console.log("rdb: close event emitted");
});

rdb.on('readable', () => {
  let chunk;

  while (chunk = readable.read() < 10) {
    console.log(`Received ${chunk}`);
  }
  console.log("Finished")
})

rdb._read(() => {
  console.log("rdb: read called");
  for (let i = 0; i < 10; i++) {

  }
})
