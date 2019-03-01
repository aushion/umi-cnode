# umi-cnode
### 安装
项目地址：（`git clone`）

```shell
git clone https://github.com/aushion/umi-cnode.git
```

通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```

### 启动服务

```
npm run dev:weapp
```

发布代码
```
npm run build
```


### 目录结构
<pre>
.
├── README.md           
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── static         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── pages          // 各种页面
│   └── app.js        // 入口页js
│   └── app.styl        // 入口页样式
│ 

<pre>
