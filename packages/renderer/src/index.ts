import {createApp} from 'vue';
import App from '/@/App.vue';
import '/@/styles/reset.less';
import router from './router';

createApp(App).use(router).mount('#app');
