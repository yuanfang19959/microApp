import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'subr', // app name registered
    entry: '//localhost:3000',
    container: '#reactContainer',
    activeRule: '#/subr',
  },
  {
    name: 'subv',
    entry: '//localhost:8080',
    container: '#vueContainer',
    activeRule: '#/subv',
  },
]);

start();