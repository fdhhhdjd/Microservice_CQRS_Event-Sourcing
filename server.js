'use strict';

require('module-alias/register');

const http = require('http');

const app = require('@/app');
const { initSocket } = require('@/inits');
const {
  appConfigs: {
    app: { port },
  },
} = require('@/configs');

const PORT = port || 5000;

const server = http.createServer(app);

//* Connect Socket IO
const globalIo = new initSocket(server);
globalIo.initialize();
global.io = globalIo;

server.listen(PORT, () => {
  console.info(`🚀 Server is listening on port http://localhost:${PORT}`);
});
