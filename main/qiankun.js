import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';

// step-1 注册应用
registerMicroApps([
  {
    name: 'subr', // app name registered
    entry: '//localhost:3000',
    container: '#reactContainer',
    activeRule: '/app-react',
  },
  {
    name: 'subv',
    entry: '//localhost:8082',
    container: '#vueContainer',
    activeRule: '/app-vue',
  },
]);

// step-2 设置默认启动应用
// 这一步可以忽略，具体看需求
setDefaultMountApp('/app-react');

// step-3 启动应用
start();
