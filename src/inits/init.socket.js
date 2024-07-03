const { Server } = require('socket.io');
const {
  timeConstants: { _5_SECOND, _10_SECOND, _25_SECOND },
} = require('@/constants');

class SocketConnection {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: [
          'Content-Type',
          'Content-Length',
          'Accept-Encoding',
          'X-CSRF-Token',
          'Authorization',
          'accept',
          'origin',
          'Cache-Control',
          'X-Requested-With',
          'X-Device-Id',
        ],
        credentials: true,
      },
      allowEIO3: true, // Cho phép tương thích với các client sử dụng Engine.IO phiên bản 3
      maxHttpBufferSize: 1e6, // Giới hạn kích thước tối đa của một gói tin HTTP (byte)
      pingTimeout: _5_SECOND, // Thời gian chờ (ms) trước khi coi một kết nối là đã mất
      pingInterval: _25_SECOND, // Khoảng thời gian (ms) giữa các gói tin PING được gửi và chờ PONG
      upgradeTimeout: _10_SECOND, // Thời gian chờ (ms) trước khi hủy nâng cấp
      allowRequest: (req, callback) => {
        let noOriginHeader = req.headers.origin === undefined;
        callback(null, !noOriginHeader); // Chấp nhận kết nối nếu có origin header
      },
      transports: ['polling', 'websocket'], // Các phương thức vận chuyển được hỗ trợ
      cookie: {
        name: 'io', // Tên cookie
        httpOnly: true, // Cookie chỉ có thể truy cập qua HTTP, không qua JavaScript client
        sameSite: 'strict', // Chống lại CSRF
      },
    });
  }

  initialize() {
    this.io.on('connection', socket => {
      //* User connect
      console.log('A user connected');

      //* User Disconnect
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      //* Receive message
      socket.on('client_message', data => {
        console.log(data);
      });
    });
  }

  sendData({ eventName, data }) {
    const prefixedEventName = `server_${eventName}`;
    console.log(prefixedEventName);
    this.io.emit(prefixedEventName, data);
  }
}

module.exports = SocketConnection;
