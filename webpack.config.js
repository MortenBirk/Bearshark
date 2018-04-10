var path = require('path');
module.exports = {
  entry: {
    'umd/index.js': './src/index.js',
    'styleguidist_components/BearsharkTableOfContentsWrapper.js':  './src/styleguidist_components/BearsharkTableOfContentsWrapper.js',
    'styleguidist_components/BearsharkComponentWrapper.js':  './src/styleguidist_components/BearsharkComponentWrapper.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]',
    library: 'bearshark',
    libraryTarget: 'umd'
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
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'bearshark': {
      root: 'Bearshark',
      commonjs2: 'bearshark',
      commonjs: 'bearshark',
      amd: 'bearshark'
    },
    'react-styleguidist/lib/rsg-components/TableOfContents/TableOfContentsRenderer': 'commonjs react-styleguidist/lib/rsg-components/TableOfContents/TableOfContentsRenderer',
    'react-styleguidist/lib/rsg-components/ReactComponent/ReactComponentRenderer': 'commonjs react-styleguidist/lib/rsg-components/ReactComponent/ReactComponentRenderer'
  }
};
