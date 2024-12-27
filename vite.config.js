import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: "dist", //输出文件名称
        lib: {
            entry: path.resolve(__dirname, "./src/components/index.js"), //指定组件编译入口文件
            name: "zx-markdown", //库名称
        }, //库编译模式配置
        rollupOptions: {
            // 外部化处理那些你不想打包进库的依赖
            external: ["vue"],
        },
    },
})
