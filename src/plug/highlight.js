/**
 * create by Administrator on 2024-12-28 15:04
 * 类注释：
 * 备注：
 */

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
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'
import go from 'highlight.js/lib/languages/go'
import cpp from 'highlight.js/lib/languages/cpp'

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
hljs.registerLanguage('css', css);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('cpp', cpp);

export default function hljsPlugin(md) {
    md.options.highlight = function (str, lang) {
        const codeIndex = parseInt(Date.now()) + Math.floor(Math.random() * 10000000)
        let html = `<div class="code-actions">
      ${lang ? `<div class="lanage-name">${lang}</div>` : ''}
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
}
