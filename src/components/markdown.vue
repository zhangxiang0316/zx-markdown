<template>
  <div v-html="value" class="markdown-content markdown-body"></div>
</template>

<script setup>
import 'github-markdown-css'
import {computed, onMounted} from "vue";
import MarkdownIt from "markdown-it";
// 下标
import sub from 'markdown-it-sub'
// 上标
import sup from 'markdown-it-sup'
// 数学公式
import katex from 'markdown-it-katex'
// Echarts图表
import EchartsPlugin from '../plug/echarts.js'
// 分割线
import quote from '../plug/quote.js'
//下划线 ++下换线++
import ins from 'markdown-it-ins'
// emoji表情
import {full as emoji} from 'markdown-it-emoji'
import taskLists from 'markdown-it-task-lists'
import deflist from 'markdown-it-deflist'
import container from 'markdown-it-container'
import highlight from '../plug/highlight.js'
// 引入 clipboard复制
import ClipboardJS from 'clipboard'

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
const md = new MarkdownIt();
md.use(highlight)
    .use(sub)
    .use(sup)
    .use(container)
    .use(emoji)
    .use(katex)
    .use(EchartsPlugin, props.loading)
    .use(quote)
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
.markdown-body {
  background: transparent !important;
}

:deep(pre) {
  margin-top: 10px;
  padding: 0 !important;
}

:deep(.hljs) {
  background: #50556B !important;
  border-radius: 0 0 3px 3px;
  padding: 5px 5px 5px 40px !important;
  position: relative;
  margin-bottom: 10px;
  margin-top: 0;
  overflow-x: scroll;
}

.markdown-content {
  line-height: 32px;
}

:deep(code) {
  line-height: 32px;
  background: #e8edf8;
  margin: 0 4px;
  padding: 0 5px;
  border-radius: 3px;
}

:deep(.hljs code) {
  line-height: 32px;
  background: none;
}

:deep(.line-numbers-rows) {
  position: absolute;
  pointer-events: none;
  top: 5px;
  left: 5px;
  width: 20px;
  font-size: 12px;
  line-height: 32px !important;
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

:deep(.copy-btn),
:deep(.language-name) {
  font-size: 12px;
  padding: 0 5px;
  color: #aaa !important;
  text-decoration: none;
}

:deep(.copy-btn) {
  cursor: pointer;
}

:deep(.copy-btn:hover) {
  color: #fff !important;
}
</style>