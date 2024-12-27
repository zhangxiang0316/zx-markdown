import markdown from './markdown.vue'

const install = (app) => {
    app.component('zx-markdown', markdown)
}

export default install