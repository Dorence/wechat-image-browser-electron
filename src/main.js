import { loadStore } from './store';
import { createApp } from 'vue'
import App from './App.vue'

import 'vfonts/Lato.css' // 通用字体
import 'vfonts/FiraCode.css' // 等宽字体
import './styles/main.scss'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

let app = createApp(App);
loadStore(app);
app.mount('#app');
