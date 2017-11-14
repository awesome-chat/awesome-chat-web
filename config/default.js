const path = require('path');

const ROOT = path.resolve(__dirname, '../');

module.exports = {
  site: 'awesome-chat-web',
  repository: '',
  timeout: {
    request: 10000,
  },
  alias: {
    '@root': path.resolve(__dirname, '../'),
    '@node_modules': path.join(ROOT, 'node_modules'),
    '@build': path.join(ROOT, 'build'),
    '@client': path.join(ROOT, 'client'),
    '@server': path.join(ROOT, 'server'),
    '@config': path.join(ROOT, 'config'),
  },
  port: 3000,
};
