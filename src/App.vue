<template>
  <zx-markdown v-model:markdownValue="value" :loading="false"/>
</template>

<script setup>
import {ref} from "vue";
// 使用动态导入
const value = ref(`

\`\`\`javascript

// 代码高亮
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/ir-black.css";
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import nginx from 'highlight.js/lib/languages/nginx';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';
import shell from 'highlight.js/lib/languages/shell'
hljs.registerLanguage('go', go);
hljs.registerLanguage('cpp', cpp);

\`\`\`


fdasfsdafsaf


12月2日下午，[[在海南省三亚市海棠区海南环岛旅游公路上发生了一起车祸，导致一名年轻女性机车骑手去世。「[{"index":1,"href":"https://baidu.com","value":"导致一名年轻女性机车骑手去世导"},{"index":2,"href":"https://baidu.com","value":"导致一名年轻女性机车骑手去世导"}]」]]
\`\`\`echarts
{
    "backgroundColor": "#ccc",
    "angleAxis": {
        "type": "category"
    },
    "radiusAxis": {
        "min": 0,
        "max": 100,
        "interval": 20
    },
    "polar": {},
    "tooltip": {
        "confine": true
    },
    "legend": {
        "show": true,
        "right": "0%",
        "top": "center",
        "orient": "vertical",
        "data": [
            "分类1",
            "分类2",
            "分类3",
            "分类4",
            "分类5",
            "分类6",
            "分类7",
            "分类8",
            "分类9"
        ]
    },
    "series": [
        {
            "type": "pie",
            "radius": "80%",
            "center": [
                "50%",
                "50%"
            ],
            "roseType": "area",
            "label": {
                "normal": {
                    "show": true
                },
                "emphasis": {
                    "show": true
                }
            },
            "data": [
                {
                    "value": 45,
                    "name": "分类1"
                },
                {
                    "value": 62,
                    "name": "分类2"
                },
                {
                    "value": 100,
                    "name": "分类3"
                },
                {
                    "value": 79,
                    "name": "分类4"
                },
                {
                    "value": 65,
                    "name": "分类5"
                },
                {
                    "value": 53,
                    "name": "分类6"
                },
                {
                    "value": 86,
                    "name": "分类7"
                },
                {
                    "value": 95,
                    "name": "分类8"
                },
                {
                    "value": 38,
                    "name": "分类9"
                }
            ]
        }
    ]
}

\`\`\`

`)

</script>

<style>
.markdown-content li {
  margin-left: 20px;
  margin-top: 10px;
}

/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 5px;
  /* 对应横向滚动条的宽度 */
  height: 5px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #eee;
  border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  border-radius: 32px;
}
</style>
