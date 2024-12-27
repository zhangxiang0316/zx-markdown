<template>
  <div style="width: 100vw;">
    <markdown v-model:markdownValue="value" :loading="false"/>
  </div>
</template>

<script setup>
import Markdown from "./markdown.vue";
import {ref} from "vue";

let value = ref(`
 ":)", ":-)"

## **粗体**
\`\`\`
**粗体**
__粗体__
\`\`\`
## *斜体*
\`\`\`
*斜体*
_斜体_
\`\`\`
## 标题
\`\`\`
# 一级标题 #
一级标题
====
## 二级标题 ##
二级标题
----
### 三级标题 ###
#### 四级标题 ####
##### 五级标题 #####
###### 六级标题 ######
\`\`\`
## 分割线
\`\`\`
***
---
\`\`\`
****
## ^上^角~下~标
\`\`\`
上角标 x^2^
下角标 H~2~0
\`\`\`
## ++下划线++ ~~中划线~~

++下划线++
~~中划线~~

\`\`\`
++下划线++
~~中划线~~
\`\`\`
## ==标记==
\`\`\`
==标记==
\`\`\`
## 段落引用
\`\`\`
> 一级
>> 二级
>>> 三级
...
\`\`\`

## 列表
\`\`\`
有序列表
1.
2.
3.
...
无序列表
-
-
...
\`\`\`

## 任务列表

- [x] 已完成任务
- [ ] 未完成任务

\`\`\`
- [x] 已完成任务
- [ ] 未完成任务
\`\`\`

## 链接
[链接](www.baidu.com)

![图片描述](https://img2.baidu.com/it/u=1337068678,3064275007&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750)
\`\`\`
[链接](www.baidu.com)
![图片描述](http://www.image.com)
\`\`\`




\`\`\`echarts
{
    "backgroundColor": "#000",
    "title": {
        "text": "",
        "subtext": "",
        "left": "center",
        "textStyle": {
            "color": "#fff",
            "fontSize": 18
        }
    },
    "tooltip": {
        "trigger": "item",
        "formatter": "{a} <br/>{b}：{d}%"
    },
    "series": [
        {
            "name": "消息发布",
            "type": "pie",
            "radius": [
                "0%",
                "20%"
            ],
            "color": [
                "#06bde2",
                "#efd93c",
                "#01e9de",
                "#feadac",
                "#fae395",
                "#91d4e5",
                "#8eb3e8"
            ],
            "itemStyle": {
                "normal": {
                    "label": {
                        "show": false
                    },
                    "opacity": 0.8
                }
            },
            "label": {
                "normal": {
                    "position": "inner"
                }
            },
            "data": [
                {
                    "value": 20,
                    "name": "局机关"
                },
                {
                    "value": 5,
                    "name": "执法队"
                },
                {
                    "value": 10,
                    "name": "指挥部"
                },
                {
                    "value": 13,
                    "name": "管理中心"
                }
            ]
        },
        {
            "type": "pie",
            "silent": true,
            "radius": [
                "27%",
                "26%"
            ],
            "label": {
                "normal": {
                    "show": false
                }
            },
            "labelLine": {
                "normal": {
                    "show": false
                }
            },
            "data": [
                {
                    "name": "1",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "2",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "3",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "4",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "5",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "6",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "7",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "8",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "9",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "10",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "11",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "12",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "13",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "14",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "15",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "16",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "17",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "18",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "19",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "20",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "21",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "22",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "23",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "24",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "25",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "26",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "27",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "28",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "29",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "30",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "31",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "32",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "33",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "34",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "35",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "36",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "37",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "38",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "39",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "40",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "41",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "42",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "43",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "44",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "45",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "46",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "47",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "48",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "49",
                    "value": 25,
                    "itemStyle": {
                        "normal": {
                            "color": "#fafbfb",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                },
                {
                    "name": "50",
                    "value": 20,
                    "itemStyle": {
                        "normal": {
                            "color": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "borderColor": "rgba(0,0,0,0)"
                        }
                    }
                }
            ]
        },
        {
            "name": "收到监管",
            "type": "pie",
            "radius": [
                "31%",
                "40%"
            ],
            "color": [
                "#06bde2",
                "#efd93c",
                "#01e9de",
                "#feadac",
                "#fae395",
                "#91d4e5",
                "#8eb3e8"
            ],
            "itemStyle": {
                "normal": {
                    "label": {
                        "show": false
                    }
                }
            },
            "label": {
                "normal": {
                    "formatter": "{b}{d}%"
                }
            },
            "data": [
                {
                    "value": 22,
                    "name": "局机关"
                },
                {
                    "value": 15,
                    "name": "执法队"
                },
                {
                    "value": 10,
                    "name": "指挥部"
                },
                {
                    "value": 23,
                    "name": "管理中心"
                }
            ]
        },
        {
            "name": "预警下发",
            "type": "pie",
            "radius": [
                "51%",
                "65%"
            ],
            "color": [
                "#06bde2",
                "#efd93c",
                "#01e9de",
                "#feadac",
                "#fae395",
                "#91d4e5",
                "#8eb3e8"
            ],
            "label": {
                "normal": {
                    "formatter": "{b}{d}%"
                }
            },
            "itemStyle": {
                "normal": {
                    "label": {
                        "show": false
                    }
                }
            },
            "data": [
                {
                    "value": 30,
                    "name": "局机关"
                },
                {
                    "value": 25,
                    "name": "执法队"
                },
                {
                    "value": 10,
                    "name": "指挥部"
                },
                {
                    "value": 13,
                    "name": "管理中心"
                }
            ]
        }
    ]
}
\`\`\`



## 代码段落
\`\`\` type

代码段落

\`\`\`


\` 代码块 \`

\`\`\`c++
int main()
{
    printf("hello world!");
}
\`\`\`

## 表格(table)
\`\`\`
| 标题1 | 标题2 | 标题3 |
| :--  | :--: | ----: |
| 左对齐 | 居中 | 右对齐 |
| ---------------------- | ------------- | ----------------- |
\`\`\`
| 标题1 | 标题2 | 标题3 |
| :--  | :--: | ----: |
| 左对齐 | 居中 | 右对齐 |
| ------------ | ------ | --- |
| 撒旦法萨法 | 大萨达 | 收拾收拾 |

## $\\KaTeX$公式

我们可以渲染公式例如：$x_i + y_i = z_i$和$\\sum_{i=1}^n a_i=0$
我们也可以单行渲染
$$\\sum_{i=1}^n a_i=0$$
$$\\sum_{i=1}^n a_i=0$$


\`\`\` javascript
md.use(highlightjs, hljsOpts)
    .use(sub)
    .use(sup)
    .use(katex)
    .use(EchartsPlugin, props.loading)
    .use(spanLine)
\`\`\`

`)

</script>

<style scoped>
:deep(.hljs) {
  background: #50556B !important;
  border-radius: 3px;
  padding: 5px;
}

:deep(code) {
  color: #ccc !important;
}
</style>
