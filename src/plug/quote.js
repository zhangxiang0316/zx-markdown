/**
 * create by zhangxiang on 2024/7/11  09:20
 * 类注释：引用插件
 * 备注：12月2日下午，[[在海南省三亚市海棠区海南环岛旅游公路上发生了一起车祸，导致一名年轻女性机车骑手去世。「[{"index":1,"href":"https://baidu.com","value":"导致一名年轻女性机车骑手去世导"},{"index":1,"href":"https://baidu.com","value":"导致一名年轻女性机车骑手去世导"}]」]]
 */

export default function quote(markdown) {
    markdown.inline.ruler.push('utils', (state, silent) => {
        const start = state.pos;
        const max = state.posMax;
        if (state.src[start] !== '[' || state.src[start + 1] !== '[') {
            return false;
        }
        let end = start + 2;
        while (end < max && (state.src[end] !== ']' || state.src[end + 1] !== ']')) {
            end++;
        }
        if (end >= max) {
            return false;
        }
        if (!silent) {
            const token = state.push('custom_inline', '', 0);
            const content = state.src.slice(start + 2, end);
            // 正则表达式
            const regex = /「(\[.*\])」/;
            const match = content.match(regex);
            let extractedArray = []
            if (match && match[1]) {
                try {
                    extractedArray = JSON.parse(match[1]); // 将字符串解析为数组
                    token.content = content.replace(regex, '');
                    token.comeForm = extractedArray;
                } catch (e) {
                    console.error("解析数组失败:", e);
                }
            } else {
                console.log("未找到符合条件的数组");
            }
            // 提取内容
            // 输出结果

        }
        state.pos = end + 2;
        return true;
    });

    markdown.renderer.rules.custom_inline = (tokens, idx) => {
        let from = ''
        for (let i = 0; i < tokens[idx].comeForm.length; i++) {
            const item = tokens[idx].comeForm[i]
            from += `<a class="come-from" target="_blank" href="${item.href}">${item.index}
                         <span class="come-from-detail">${item.value}</span>
                     </a> `;
        }
        return `<span class="custom">
                    ${tokens[idx].content}
                    <span class="from">${from}</span>
                    <style>
                     .custom:hover{
                          border-bottom: 1px dashed #7269FB;
                        }
                        .come-from{
                          position: relative;
                          overflow: visible;
                          clip: auto;
                          display: inline-block;
                          text-decoration: none;
                          color: #7269FB;
                          line-height: 20px;
                          width: 20px;
                          margin-right: 10px;
                          text-align: center;
                          font-size: 12px;
                          background: #7269FB1A!important;
                          border-radius: 50%;
                        }
                        .come-from:hover {
                          color: white;
                          background: #7269FB!important;
                          border-radius: 50%;
                        }
                       
                        .come-from-detail{
                          visibility: hidden;
                          max-width: 300px;
                          min-width: 250px;
                          max-height: 500px;
                          overflow-y: scroll;
                          background: rgba(0, 0, 0, 0.7);
                          color: #fff;
                          padding: 10px;
                          border-radius: 10px;
                          text-align: center;
                          position: absolute;
                          z-index: 10;
                          top: 30px;
                          left: 0;
                          right: 0;
                        }
                        .come-from:hover .come-from-detail{
                          visibility: visible;
                        }
                        </style>
                 </span>`;
    };
};
