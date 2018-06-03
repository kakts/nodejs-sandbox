const fs = require('fs');

const rs = fs.createReadStream("test.txt", {
  highWaterMark: 10,
  start: -1000
});
rs.setEncoding('utf8')
rs.on('open', function(fd) {
  console.log("open called", fd);
});

rs.on('ready', function() {
  console.log("ready");
});
let count = 0;
rs.on('data', function(chunk) {
  console.log("so far", rs.bytesRead)
  console.log(count++ + ":" + chunk);
});


// streamで読み込んでstreamで書き出す streamクラスをつくるれ
