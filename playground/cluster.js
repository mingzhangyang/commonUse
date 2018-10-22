/**
 * Created by yangm11 on 10/22/2018.
 */
'use strict';

const cluster = require('cluster');
const http = require('http');
const os = require('os');

const NumCPUs = os.cpus().length;
let stat = {
  count: 0
};

if (cluster.isMaster) {
  for (let i = 0; i < NumCPUs; i++) {
    cluster.fork();
  }
  cluster.on('online', worker => {
    console.log(`Worker id: ${worker.process.pid} is online.`)
  });
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}\n and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
  cluster.on('message', worker => {
    console.log('Message from ' + worker.process.pid + ', count: ' + stat.count); // why stat.count is always 0?
  });
} else {
  http.createServer((req, res) => {
    stat.count++;
    process.send('A request has received. Please log.');
    res.writeHead(200);
    res.end(`Process ${process.pid} responded! The total requests received for now is: ${stat.count}`);
  }).listen(8000);
}


if (typeof module !== 'undefined') {
  // Node environment, 
  if (module.parent) {
    // required as module

  } else {
    // run as executable

    console.log('Starting server ...');
    console.log(process.pid, stat.count);

  }
} else if (typeof window === 'object') {
  // Browser environment
} 