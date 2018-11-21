/**
 * Created by yangm11 on 10/22/2018.
 */
'use strict';

const cluster = require('cluster');
const http = require('http');
const os = require('os');

const NumCPUs = os.cpus().length;
let stat = {
  pid: process.pid,
  count: 0
};

// let workers = [];

function registerHandlers(worker) {
  worker.on('message', msg => {
    console.log(`Message from worker with pid ${worker.process.pid}: ${typeof msg === 'string' ? msg : JSON.stringify(msg)}`);
    stat[msg.pid] = msg.count;
  });
  worker.on('online', () => {
    console.log(`Worker id: ${worker.process.pid} is online.`);
  });
  worker.on('exit', (w, code, signal) => {
    console.log(`Worker with pid ${w.process.pid} died with code ${code} and signal ${signal}`);
    console.log('Restarting a new worker');
    registerHandlers(cluster.fork());
  })
}

function init() {
  if (cluster.isMaster) {
    for (let i = 0; i < NumCPUs; i++) {
      let worker = cluster.fork();
      // workers.push(worker);
      registerHandlers(worker);
    }
    cluster.on('message', () => {
      console.log(stat);
    })
  } else {
    http.createServer((req, res) => {
      stat.count++;
      process.send(stat);
      res.writeHead(200);
      res.end(`Process ${process.pid} responded! The stat object is: ${JSON.stringify(stat)}`);
    }).listen(8000);
  }
}


if (typeof module !== 'undefined') {
  // Node environment, 
  if (module.parent) {
    // required as module

  } else {
    // run as executable

    init();
  }
} else if (typeof window === 'object') {
  // Browser environment
} 