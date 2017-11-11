var path = require('path');
var fs = require('fs');

const __ROOT = path.resolve(__dirname, '../');
const __NODE_MODULES = path.join(__ROOT, 'node_modules');
const __BUILD = path.join(__ROOT, 'build');
const __CLIENT = path.join(__ROOT, 'client');
const __BUILD_COMMONLIB = path.join(__BUILD, 'commonlib');

const commonlibManifest = path.join(__BUILD_COMMONLIB, 'manifest.json');

const manifest = {
  commonlib: {},
  assets: {},
};

if (fs.existsSync(commonlibManifest)) {
  manifest.commonlib = require(commonlibManifest);
}

const octoKey = 'com.sankuai.sjst.ecom.feskynet'/* octoKey */;

module.exports = {
  site: 'awesome-chat-web',
  repository: "",
  timeout: {
    request: 10000
  },
  port: 3000
};
