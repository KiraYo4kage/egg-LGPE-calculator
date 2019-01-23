'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546481841158_2585';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cluster = {
    listen: {
      port: 7003,
      hostname: '127.0.0.1',
    },
  };

  config.siteFile = {
    '/favicon.ico': '/public/favicon.ico',
    '/public/favicon.ico': '/public/pokeball-flat.png',
  };

  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.assets = {
    publicPath: '/view',
    devServer: {
      port: 7003,
    },
  };

  return config;
};
