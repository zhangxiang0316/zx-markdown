import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import fs from 'fs';
import quote from "./src/plug/quote.js";


export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: path.resolve(__dirname, 'zx-markdown'),
        lib: {
            entry: 'src/components/index.js', // 组件库的入口文件
            name: 'index',     // 库的全局变量名
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue'], // 排除 Vue 依赖
            output: {
                globals: {
                    vue: 'Vue'
                }
            },
            plugins: [
                {
                    name: 'generate-package-json',
                    closeBundle() {
                        // 生成 package.json 文件
                        const packageJson = {
                            name: 'zx-markdown',
                            version: '0.0.5',
                            description: "markdown解析器，支持语法高亮，数学公式，代码块，任务列表，echarts图",
                            main: "index.es.js",
                            keywords: ["markdown","echarts","quote"],
                            author: "q64492246",
                            license: "MIT",
                            scripts: {
                                "test": "echo \"Error: no test specified\" && exit 1"
                            },
                        };
                        fs.writeFileSync(path.resolve(__dirname, 'zx-markdown/package.json'), JSON.stringify(packageJson, null, 2));
                    }
                }
            ]
        },
    },

})
