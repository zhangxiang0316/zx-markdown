<template>
  <div v-html="value"></div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import MarkdownIt from "markdown-it";
// 下标
import sub from 'markdown-it-sub'
// 上标
import sup from 'markdown-it-sup'
// 数学公式
import katex from 'markdown-it-katex'
// Echarts图表
import EchartsPlugin from '../utils/echarts.js'
// 分割线
import spanLine from '../utils/span-line.js'
//下划线 ++下换线++
import ins from 'markdown-it-ins'
// emoji表情
import {full as emoji} from 'markdown-it-emoji'
import taskLists from 'markdown-it-task-lists'
import deflist from 'markdown-it-deflist'
import container from 'markdown-it-container'
// 引入 clipboard复制
import ClipboardJS from 'clipboard'
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

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('shell', shell);

const emit = defineEmits(['update:markdownValue'])
const props = defineProps({
  markdownValue: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: true
  }
})
const markdownValue = computed({
  get: () => props.markdownValue,
  set: (value) => emit('update:markdownValue', value)
})

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  xhtmlOut: true,
  typographer: true,
  highlight: function (str, lang) {
    const codeIndex = parseInt(Date.now()) + Math.floor(Math.random() * 10000000)
    let html = `<div class="code-actions">
      ${lang ? `<span class="lanage-name">${lang}</span>` : ''}
      <a class="copy-btn" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</a>
    </div>`
    const linesLength = str.split(/\n/).length - 1
    // 生成行号
    let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
    for (let index = 0; index < linesLength; index++) {
      linesNum = linesNum + '<span></span>'
    }
    linesNum += '</span>'
    if (lang && hljs.getLanguage(lang)) {
      try {
        const preCode = hljs.highlight(lang, str, true).value
        html = html + preCode
        return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
      } catch (error) {
        console.log(error)
      }
    }
    const preCode = md.utils.escapeHtml(str)
    html = html + preCode
    return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
  }
});
md.use(sub)
    .use(sup)
    .use(container)
    .use(emoji)
    .use(katex)
    .use(EchartsPlugin, props.loading)
    .use(spanLine)
    .use(ins)
    .use(taskLists)
    .use(deflist)

const value = computed(() => {
  return md.render(markdownValue.value)
})
// 添加 onMounted 钩子初始化 clipboard
onMounted(() => {
  const clipboard = new ClipboardJS('.copy-btn')
  clipboard.on('success', (e) => {
    const button = e.trigger
    button.textContent = '已复制'
    setTimeout(() => {
      button.textContent = '复制'
    }, 1000)
    e.clearSelection()
  })
})
</script>
<style scoped>
:deep(.hljs) {
  background: #50556B !important;
  border-radius: 3px;
  padding: 5px 5px 5px 40px !important;
  position: relative;
}

:deep(code) {
  color: #ccc !important;
  line-height: 25px;
}

:deep(.line-numbers-rows) {
  position: absolute;
  pointer-events: none;
  top: 5px;
  left: 5px;
  width: 20px;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  user-select: none;
  counter-reset: linenumber;
}

:deep(.line-numbers-rows span) {
  pointer-events: none;
  display: block;
  counter-increment: linenumber;
}

:deep(.line-numbers-rows span:before) {
  content: counter(linenumber);
  color: #999;
  display: block;
}

:deep(.code-actions) {
  position: absolute;
  right: 15px;
  top: 8px;
  opacity: 0;
  transition: all 0.2s;
  display: flex;
  gap: 15px;
  align-items: center;
  z-index: 1;
}

:deep(.hljs:hover) .code-actions {
  opacity: 1;
}

:deep(.copy-btn),
:deep(.lanage-name) {
  font-size: 12px;
  color: #999;
  text-decoration: none;
}

:deep(.copy-btn) {
  cursor: pointer;
}

:deep(.copy-btn:hover) {
  color: #fff;
}

:deep(.lanage-name:hover) {
  color: #fff;
}
</style>