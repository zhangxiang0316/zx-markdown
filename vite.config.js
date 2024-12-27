import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: 'src/components/index.js', // 组件库的入口文件
            name: 'zx-markdown',     // 库的全局变量名
            fileName: (format) => `zx-markdown.${format}.js`
        },
        rollupOptions: {
            external: ['vue'], // 排除 Vue 依赖
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
