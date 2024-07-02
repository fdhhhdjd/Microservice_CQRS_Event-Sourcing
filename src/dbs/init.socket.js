const { Server } = require('socket.io');

class SocketConnection {
  constructor(server) {
    this.io = new Server(server);
    this.initialize();
  }

  initialize() {
    this.io.on('connection', __ => {
      console.log('A user connected');

      this.sendData('server_client_connected', { message: 'Welcome To Tai Dev 👌!' });
    });
  }

  sendData({ eventName, data }) {
    const prefixedEventName = `server_${eventName}`;
    this.io.emit(prefixedEventName, data);
  }
}

module.exports = SocketConnection;
