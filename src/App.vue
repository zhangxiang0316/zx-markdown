<template>
  <zx-markdown v-model:markdownValue="value" :loading="false"/>
</template>

<script setup>
import { ref } from "vue";
// 使用动态导入
const value = ref(`


12月2日下午，[[在海南省三亚市海棠区海南环岛旅游公路上发生了一起车祸，导致一名年轻女性机车骑手去世。<span><a target="_blank" href='https://mparticle.uc.cn/article.html?uc_param_str=frdnsnpfvecpntnwprdssskt#!wm_aid=9e2166d7fd27f788a69f5c5868260a74!!wm_id=ae137f9360e14236bf45147e896de8f7!!admincptm=1733360935238'>1<span>在海南省三亚市海棠区海南环岛旅游公路上发生一起车祸，一名年轻女性机车骑手去世。</span></a></span><span><a target="_blank" href='https://mparticle.uc.cn/article.html?uc_param_str=frdnsnpfvecpntnwprdssskt#!wm_aid=00895a900d5695994d44488af55dc018!!wm_id=ae137f9360e14236bf45147e896de8f7'>2<span>在海南省三亚市海棠区海南环岛旅游公路上发生一起车祸，一名年轻女性机车骑手去世。</span></a></span><span><a target="_blank" href='https://3g.china.com/act/news/10000169/20241205/47704514.html'>3<span>在海南省三亚市海棠区海南环岛旅游公路上发生了一起车祸，导致一名年轻女性机车骑手去世。</span></a></span><span><a target="_blank" href='https://mparticle.uc.cn/article_org.html?uc_param_str=frdnsnpfvecpntnwprdssskt#!wm_cid=656991714453497856!!wm_id=ae137f9360e14236bf45147e896de8f7'>5<span>在海南省三亚市海棠区海南环岛旅游公路上发生一起车祸，一名年轻女性机车骑手去世。</span></a></span>]][[该女骑手网名叫“DJ万小橘”，拥有1.4万粉丝，以机车骑行出名<span><a target="_blank" href='https://mparticle.uc.cn/article.html?uc_param_str=frdnsnpfvecpntnwprdssskt#!wm_aid=9e2166d7fd27f788a69f5c5868260a74!!wm_id=ae137f9360e14236bf45147e896de8f7!!admincptm=1733360935238'>1<span>该女骑手网名叫“DJ万小橘”，</span></a></span><span><a target="_blank" href='https://mparticle.uc.cn/article.html?uc_param_str=frdnsnpfvecpntnwprdssskt#!wm_aid=00895a900d5695994d44488af55dc018!!wm_id=ae137f9360e14236bf45147e896de8f7'>2<span>该女骑手网名叫“DJ万小橘”，</span></a></span><span><a target="_blank" href='https://mparticle.uc.cn/article_org.html?uc_param_str=frdnsnpfvecpntnwprdssskt#!wm_cid=656991714453497856!!wm_id=ae137f9360e14236bf45147e896de8f7'>5<span>该女骑手网名叫“DJ万小橘”，</span></a></span>]]。案件正在处理中，[[具体情况暂时不便透露。<span><a target="_blank" href='https://m.toutiao.com/article/7444189875328352795/'>7<span>具体情况暂时不便透露。</span></a></span>]]




- [x] 2022-3-4 新增添加新图表功能,新增查看属性功能，点击跳转Echarts 官网查看属性相关信息

- [x] 2022-3-5 新增用户系统，注册后新创建的表单在个人中心可以看到

- [x] 2022-3-7 新增图表支持使用网络js 或者项目中原有的js

- [x] 2022-3-8 添加收藏功能

- [x] 2022-3-9 新增下载案例功能，支持案例导出为html(外部链接支持，代码中引用的外部json暂不支持，弱存在内部引用，导出后修改引用地址)

- [x] 2022-3-9 对于显示有问题的图表，添加iframe 展示方式，点击右上角切换模式查看

- [x] 2022-3-31 修改部分图片不展示问题，取消图片懒加载

- [x] 2022-4-2  编辑器添加echarts 属性智能提示

- [x] 2022-4-8 调整版本切换策略

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

## KaTeX$公式

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

<style>
.markdown-content li {
  margin-left: 20px;
  margin-top: 10px;
}

.markdown-content span a {
  position: relative;
  overflow: visible; /* 让内容超出父元素布局 */
  clip: auto;
  display: inline-block;
  text-decoration: none;
  color: #7269FB;
  line-height: 20px;
  width: 20px;
  margin-right: 10px;
  text-align: center;
  font-size: 12px;
  background: #7269FB1A;
  border-radius: 50%;
}

.markdown-content span a:hover {
  color: white;
  background: #7269FB;
  border-radius: 50%; /* 将伪元素的边框半径设置为50%，使背景呈现圆形 */
}

.markdown-content span:hover {
  border-bottom: 1px dashed #7269FB;
}

.markdown-content span a span {
  visibility: hidden;
  max-width: 300px;
  min-width: 250px;
  max-height: 500px;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  position: absolute;
  z-index: 10;
  top: 30px;
  left: 0;
  right: 0;
}

.markdown-content span a:hover span {
  visibility: visible;
}
</style>
