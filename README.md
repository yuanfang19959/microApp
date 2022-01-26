#### microApp( 微前端)
项目演示：[DEMO](http://www.yuanfang19959.cn) 

这边撑着空闲的时间研究下，考虑到之前在公司做的一个巨大的后台系统；时间长了延伸出很多问题；
1. 这个大系统，有很多模块；随着后面项目的迭代，模块越来越多；导致后面启动一次项目要好久好久；
2. 参与的人过多，可能代码水平层次不齐，导致后面代码耦合性太高，不便于维护，过度依赖主系统；
3. 比如说这个模块有bug，那咋把这个模块的bug改了，那么就要把整个项目重新打包一遍再重新发布一版；
偶然一次看到[qiankun](https://qiankun.umijs.org/zh) ，既然他存在坑定有他的优点吧。后台系统过大，可以把不同模块拆成单独的模块；

#### 主应用main（vue3.0 + webpack)
本来是想用vite + vue3的，无奈qiankun暂时不支持；关于乾坤原理暂时不知道，先会用了在说。后面有时间再去研究原理；
qiankun.js
```javascript
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';

// step-1 注册应用
registerMicroApps([
  {
    name: 'subr', // app name registered
    entry: '/child/react-history/',
    container: '#reactContainer',
    activeRule: '/app-react',
  },
  {
    name: 'subv',
    entry: '/child/vue-history/',
    container: '#vueContainer',
    activeRule: '/app-vue',
  },
]);

// step-2 设置默认启动应用
// 这一步可以忽略，具体看需求
setDefaultMountApp('/app-react');

// step-3 启动应用
start();
```

qiankunState.js 此文件用于和子系统通信
```javascript
import { initGlobalState } from "qiankun";
import store from './src/store/index'

const initialState = {
    //这里写初始化数据
    msg: "$$$$$$",
    type: ''
};


// 初始化 state
const actions = initGlobalState(initialState);
actions.onGlobalStateChange((state, prev) => {//监听公共状态的变化
    if (state.type === "open@@@") {
        console.log(location)
        location.pathname = '/app-react'
    }
    console.log("主应用: 变更前");
    console.log(prev);
    console.log("主应用: 变更后");
    console.log(state.msg);
    store.commit('setMsg', state.msg);//这里我把公共状态存到主应用的vuex里了
});

export default actions;

```

---------------------------------------
#### 子应用sub-react-hash（react + webpack)
##### 路由模式history
子应用这边比较特殊，以react为例;
1. src下创建pulic-path.js
```javascript
if (window.__POWERED_BY_QIANKUN__) {
__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2. 修改路由的base参数
```javascript
<Router basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
      <Link to="/">首页</Link>
      <Link to="/kapa">kapa</Link>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Ge></Ge>} ></Route>
          <Route path="/kapa" element={<Kapa></Kapa>} ></Route>
        </Routes>
      </div>
    </Router>
```
3. 入口文件修改
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function render(props) {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```
4. 根目录创建.rescriptsec.js
```javascript
const { name } = require('./package');

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    // console.log('123', process.env.NODE_ENV)
    config.output.publicPath = process.env.NODE_ENV === 'production' ?'/child/react-history/':'/';
    return config;
  },

  devServer: (_) => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    // config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
};
```

---------------------------------------
#### 子应用sub-b（vue3.0 + webpack)
#####  路由模式history
