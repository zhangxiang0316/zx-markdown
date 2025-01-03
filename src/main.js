import { createApp } from 'vue'
import App from './App.vue'
import ZxMarkdown from "zx-markdown";
import "zx-markdown/zx-markdown.css";
// import ZxMarkdown from './components'


createApp(App).use(ZxMarkdown).mount('#app')
