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
