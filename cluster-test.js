// clusterテスト用
// master workerプロセス共に、このプログラムの上から処理が走る

"use strict";

const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
  // masterプロセスの場合の処理

  // Keep track of http requests
  var numReqs = 0;
  setInterval(() => {
    console.log('numReqs =', numReqs);
  }, 1000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  // cpu数を取得し、cpu数分だけ、ワーカープロセスをforkする
  const numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach((id) => {
    // クラスター毎にメッセージハンドラー(リクエスト数カウント処理)を設定する
    // messageイベントを受信したときに発火する
    cluster.workers[id].on('message', messageHandler);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);

  });
} else {
  // workerプロセスの処理

  // Worker processes have a http server
  http.Server((req, res) => {
    console.error('---Request header.', req.headers)
    res.writeHead(200);
    res.end('hello world \n');

    // notify master about the requests
    process.send({
      cmd: 'notifyRequest'
    });
  }).listen(8000);
}
