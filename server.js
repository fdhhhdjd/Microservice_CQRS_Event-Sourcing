require('module-alias/register');

const app = require('@/app');
const {
  appConfigs: {
    app: { port },
  },
} = require('@/configs');

const PORT = port || 5000;

app.listen(PORT, () => {
  console.info(`Api backend start with http://localhost:${PORT}`);
});
