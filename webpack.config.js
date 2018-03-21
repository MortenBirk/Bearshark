var path = require('path');
module.exports = {
  entry: {
    'index.js': './src/index.js',
    'styleguidist_components/BearsharkTableOfContentsWrapper.js':  './src/styleguidist_components/BearsharkTableOfContentsWrapper.js',
    'styleguidist_components/BearsharkComponentWrapper.js':  './src/styleguidist_components/BearsharkComponentWrapper.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom',
    'bearshark': 'commonjs bearshark',
    'react-styleguidist/lib/rsg-components/TableOfContents/TableOfContentsRenderer': 'commonjs react-styleguidist/lib/rsg-components/TableOfContents/TableOfContentsRenderer',
    'react-styleguidist/lib/rsg-components/ReactComponent/ReactComponentRenderer': 'commonjs react-styleguidist/lib/rsg-components/ReactComponent/ReactComponentRenderer'
  }
};
