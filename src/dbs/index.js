module.exports = {
  initMongo: require('./init.mongo'),
  initSequelizePG: require('./init.sequelizePG'),
  initRabbit: require('./init.rabbit'),
  initIoRedis: require('./init.redis'),
};
