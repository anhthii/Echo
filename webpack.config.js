
module.exports = function (env = 'dev') {
  return require(`./webpack.${env}.js`);
};