// vue.config.js
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    // Here you can modify the existing HtmlWebpackPlugin instance without adding a new one
    config.plugin('html').tap(args => {
      args[0].title = 'Your New Title'; // Example: Changing the title
      // Add more modifications as needed
      return args;
    });
  },
});
