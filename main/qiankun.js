import { registerMicroApps, start } from 'qiankun';

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

start();