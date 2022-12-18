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
      {
        test: /\.less$/,
        use: [
            require.resolve('style-loader'),
            {
                loader: require.resolve('css-loader'),
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                },
            },
            require.resolve('less-loader')
        ]
    },
    ]);
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    return config
  }
};
