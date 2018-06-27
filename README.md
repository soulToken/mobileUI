# 100carelogin

> 100care注册及登录    集成三个ui 框架   elementUI vantUI cube-ui(滴滴开源UI框架)

src/theme.styl:    是自定义 主题色的代码  

一些相关的配置文件也都做了一些 修改

## 配置
修改打包路径为绝对路径，背景图片路径等等

## 引入模块
svg
mock
cube-ui
vant-ui
vuex
vue-router (404页面)
axios


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 描述
空白模板的 ui demo      引入svg mock cube-ui vant-ui
git vscode 
##  项目结构解析
    主要写的是你可能会修改的文件
  一：  config/index.js
          proxyTable: {
            '/apis': {
                // 测试环境
                // target: 'http://192.168.1.50:8080',  // 接口域名
                // target: 'http://clinic.100care.cn',//線上地址
                target: 'http://192.168.0.119:8080',//線上地址
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''   //需要rewrite重写的,
                }              
            }
            }, 
            以上代码用户设置开发环境跨域问题  
    二： src/api
            该文件夹里面的两个js  用于封装所有请求，get post 方式例子都有
        src/assets 
            存储静态文件
        src/components
            组件
        src/mock
            随机生成的本地数据，后端没提供数据的时候可以用本地数据
        src/router
            路由文件 所有路由配置
        src/svg
            项目中切图可以直接在阿里图标库下载svg 图片 然后项目中可以直接引用
        src/vuex
            用于存储 数据， 组建之前传递数据



 

