const path=require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports={
    entry:path.join(__dirname,'./src/index.tsx'),
    mode:'production',
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          },
          {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
          }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js','.jsx' ]
    },
    externals: {//避免打包
      'react': {
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
          root: 'React',
      },
      'react-dom': {
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom',
          root: 'ReactDOM'
      },
      'react-router': {
        commonjs: 'react-router',
        commonjs2: 'react-router',
        amd: 'react-router',
        root: 'ReactRouter'
      },
      'antd':{
        commonjs: 'antd',
        commonjs2: 'antd',
        amd: 'antd',
        root: 'antd',
      },
      'lodash':{
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_',
      },
      'react-resizable':{
        commonjs: 'react-resizable',
        commonjs2: 'react-resizable',
        amd: 'react-resizable',
        root: 'react-resizable',
      },
      'axios':{
        commonjs: 'axios',
        commonjs2: 'axios',
        amd: 'axios',
        root: 'axios',
      },
      'moment':{
        commonjs: 'moment',
        commonjs2: 'moment',
        amd: 'moment',
        root: 'moment',
      },
      '@ant-design/icons':{
        commonjs: '@ant-design/icons',
        commonjs2: '@ant-design/icons',
        amd: '@ant-design/icons',
        root: '@ant-design/icons',
      },
      'react-router-cache-route':{
        commonjs: 'react-router-cache-route',
        commonjs2: 'react-router-cache-route',
        amd: 'react-router-cache-route',
        root: 'react-router-cache-route',
      },
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    plugins:[
      new CleanWebpackPlugin()
    ],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'index.js',
        library: "ANTD_BASE_MODULE",
        libraryTarget:'umd',
        umdNamedDefine: true
    },
}