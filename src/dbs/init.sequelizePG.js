const { Sequelize } = require('sequelize');
const {
  pg: { user, password, host, port, database }
} = require('../configs/pg.configs');
const { _5_SECOND, _10_SECOND } = require('../constants/timeConstants');

class SequelizePGConnection {
  constructor() {
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 10, // Số lượng kết nối tối đa
        min: 0, // Số lượng kết nối tối thiểu
        acquire: _10_SECOND, // Thời gian tối đa (ms) pool sẽ thử kết nối trước khi báo lỗi
        idle: _5_SECOND // Thời gian một kết nối được giữ mở mà không sử dụng trước khi được giải phóng
      },
      logging: false, // Bật log để theo dõi các truy vấn (có thể thay thế bằng hàm tùy chỉnh hoặc thư viện log)
      benchmark: true, // Hiển thị thời gian thực thi truy vấn
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ // Mức độ cô lập giao dịch
    });
    this.connectTimeout = undefined;
    this.isConnected = false;
  }

  async initDatabase(retries = 10) {
    while (retries > 0 && !this.isConnected) {
      try {
        await this.sequelize.authenticate();
        console.log('CONNECTED TO POSTGRESQL SUCCESS 🐘 !!');
        this.isConnected = true;
        clearTimeout(this.connectTimeout);
      } catch (error) {
        console.error('Failed to connect to PostgreSQL database:', error);
        retries -= 1;
        console.info(`Retrying to connect... (${10 - retries}/10)`);
        await new Promise(resolve => setTimeout(resolve, _5_SECOND));
      }
    }

    if (!this.isConnected) {
      this.handleTimeoutError();
    }
  }

  handleTimeoutError() {
    this.connectTimeout = setTimeout(() => {
      console.error('Failed to connect to PostgreSQL database after retries');
      throw new Error('Failed to connect to PostgreSQL database after retries');
    }, _10_SECOND);
  }

  closeDatabase() {
    if (this.isConnected) {
      clearTimeout(this.connectTimeout);
      this.sequelize
        .close()
        .then(() => console.info('Disconnected from PostgreSQL database.'));
    }
  }
}

module.exports = new SequelizePGConnection();
