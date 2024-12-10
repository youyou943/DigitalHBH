import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; // 引入路由


// 引入 Element Plus 及其样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

const app = createApp(App);
app.use(router); // 使用路由
// 全局注册 Element Plus
app.use(ElementPlus);

app.mount('#app')
