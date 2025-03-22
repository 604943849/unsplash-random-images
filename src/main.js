import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { Refresh } from '@element-plus/icons-vue';

const app = createApp(App);
app.use(ElementPlus);
app.component('refresh-icon', Refresh); // 注册刷新图标
app.mount('#app');