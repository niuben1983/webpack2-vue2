# Vue2 + webpack2多页面架构

## 注意
html下为入口主页面

## 安装

```
npm install
```
## 本地开发和调试

```
npm run dev   //打包
npm start  //运行
```

## 发布

```
npm run pre  //线上测试
npm run prod //生产
```

## 技术选型

- 框架 - Vue + axios
- 模块化 - es6
- 构建工具 - webpack

## 目录结构

```
├── README.md         //项目说明文档 
├── webpack.config.js       //构建配置文件 
├── node_modules
├── package.json      //node依赖配置文件
├── prod              //发布目录 
├── pre              //线上测试目录 
├── dev              //本地测试目录 
├── src               //源码目录
