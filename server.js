require('module-alias/register');

const http = require('http');

const app = require('@/app');
const SocketConnection = require('@/dbs/init.socket');

const {
  appConfigs: {
    app: { port },
  },
} = require('@/configs');

const PORT = port || 5000;

const server = http.createServer(app);

new SocketConnection(server);

server.listen(PORT, () => {
  console.info(`Api backend start with http://localhost:${PORT}`);
});
