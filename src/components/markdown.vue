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
:deep(ul li) {
  list-style-type: none;
}

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