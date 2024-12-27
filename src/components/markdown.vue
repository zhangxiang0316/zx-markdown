<template>
  <div v-html="value" style="width: 100%;height: 100vh"></div>
</template>

<script setup>
import {computed} from "vue";

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

const hljsOpts = {
  html: true,
  linkify: true,
  breaks: true,
  xhtmlOut: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
        );
      } catch (__) {
      }
    }

    return (
        '<pre class="hljs"><code>' +
        md.utils.escapeHtml(str) +
        "</code></pre>"
    );
  }
};
const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  xhtmlOut: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
        );
      } catch (__) {
      }
    }

    return (
        '<pre class="hljs"><code>' +
        md.utils.escapeHtml(str) +
        "</code></pre>"
    );
  }
});
md
    .use(sub)
    .use(sup)
    .use(emoji)
    .use(katex)
    .use(EchartsPlugin, props.loading)
    .use(spanLine)
    .use(ins)

const value = computed(() => {
  return md.render(markdownValue.value)
})
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