const { initIoRedis } = require('@/dbs');
const {
  timeConstants: { _1_DAY },
} = require('@/constants');
const {
  cacheHelpers: { generateCacheKey },
} = require('@/helpers');
const {
  CacheConstants: { TEST },
} = require('@/constants');

class TestModels {
  constructor(namespace) {
    this.namespace = namespace;
    this.type = TEST;
    this.client = initIoRedis.getClient();
  }

  generateKey(identifier) {
    return generateCacheKey({
      namespace: this.namespace,
      type: this.type,
      identifier: identifier,
    });
  }

  async getTest(id) {
    const key = this.generateKey(id);
    const userData = await this.client.get(key);
    return userData ? JSON.parse(userData) : null;
  }

  async setTest(id, testData) {
    const key = this.generateKey(id);
    await this.client.set(key, JSON.stringify(testData), 'EX', _1_DAY);
  }
}
module.exports = TestModels;
