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
const downImage = `
    <svg t="1735869332035" className="icon" viewBox="0 0 1024 1024" version="1.1"
         xmlns="http://www.w3.org/2000/svg" p-id="4238" width="200" height="200">
        <path
            d="M200.430933 405.162667a40.96 40.96 0 0 1 57.890134 0L509.952 656.247467a27.306667
             27.306667 0 0 0 38.570667 0l251.4944-251.153067a40.96 40.96 0 1 1 57.890133 58.026667l-251.4944 251.0848a109.226667 109.226667 0 0 1-154.282667 0L200.362667 463.121067a40.96 40.96 0 0 1 0-57.9584z"
            fill="#aaa" p-id="4239"></path>
    </svg>`

const baseStyle = `.toggle-btn{
                                    cursor: pointer;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                  }
                                  svg{
                                      width: 15px;
                                      height: 15px;
                                  }
                                  .copy-btn,.language-name{
                                      font-size: 12px;
                                      padding: 0 5px;
                                      color: #aaa !important;
                                      text-decoration: none;
                                  }
                                  .copy-btn{
                                    cursor: pointer;
                                  }
                                  .copy-btn:hover{
                                        color: #fff !important;
                                  }
                                .line-numbers-rows{
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
                                .line-numbers-rows span{
                                    pointer-events: none;
                                    display: block;
                                    counter-increment: linenumber;
                                }
                                .line-numbers-rows span:before{
                                      content: counter(linenumber);
                                      color: #999;
                                      display: block;
                                }       `

export default function hljsPlugin(md) {
    md.options.highlight = function (str, lang) {
        const codeIndex = parseInt(Date.now()) + Math.floor(Math.random() * 10000000)
        let html = `<div class="code-actions" style="position: sticky; top: 0; background-color: #7e85a3 ; z-index: 1; display: flex; justify-content: start; padding: 5px;">
                            <div class="toggle-btn" onclick="toggleCode('code${codeIndex}')">${downImage}</div>
                             ${lang ? `<div class="language-name">${lang}</div>` : ''}
                             <div style="flex: 1"></div>
                             <a class="copy-btn"  data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</a>
                             <style> ${baseStyle} </style>
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
                return `${html}<pre id="code${codeIndex}" class="hljs" style="overflow-x: auto;"><code>${preCode}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
            } catch (error) {
                console.log(error)
            }
        }
        const preCode = md.utils.escapeHtml(str)
        return `${html}<pre id="code${codeIndex}" class="hljs" style="overflow-x: auto;"><code>${preCode}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
    }
}

// 修改 toggleCode 函数以切换图标
window.toggleCode = function (id) {
    const codeBlock = document.getElementById(id);
    const button = codeBlock.previousElementSibling.querySelector('.toggle-btn');
    if (codeBlock.style.display === 'none') {
        codeBlock.style.display = 'block';
        button.style.transform = 'rotate(0deg)'; // 恢复初始状态
    } else {
        codeBlock.style.display = 'none';
        button.style.transform = 'rotate(180deg)'; // 旋转180度
    }
}
