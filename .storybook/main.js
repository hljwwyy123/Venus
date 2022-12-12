const path = require('path')

 module.exports = {
  stories: ['../stories/**/*.sb.ts[x]'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  staticDirs: ['../static'],
  webpackFinal: async config => {
    config.module.rules = config.module.rules.concat([
      {
        test: /\.glsl$/,
        loaders: [
          {
            loader: 'webpack-glsl-loader'
          },
        ]
      },
    ]);
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    return config
  }
};
