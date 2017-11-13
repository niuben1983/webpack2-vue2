# 专题

# Vue + webpack

## 注意
html下为入口主页面

## 安装

```
npm install 
或
npm install --save-dev webpack webpack-dev-server vue vue-hot-reload-api vue-html-loader vue-loader vue-style-loader vue-template-compiler
npm install --save-dev url-loader style-loader imagemin-webpack-plugin image-webpack-loader image-loader html-webpack-plugin
npm install --save-dev glob file-loader extract-text-webpack-plugin css-loader clean-webpack-plugin autoprefixer
npm install --save-dev babel babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 babel-runtime
```
## 本地开发和调试

```
webpack   //打包
npm run start  //运行
```

## 发布

```
npm run build //生产
```

## 技术选型

- 框架 - Vue
- 模块化 - es6
- 构建工具 - webpack

## 目录结构

```
├── README.md         //项目说明文档 
├── webpack.config.js       //构建配置文件 
├── node_modules
├── dist              //打包目录 
├── package.json      //node依赖配置文件
├── src               //源码目录
