/**
 * create by zhangxiang on 2024/7/11  09:20
 * 类注释：
 * 备注：
 */

export  default function spanLine(markdown) {
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
            token.content = state.src.slice(start + 2, end);
        }

        state.pos = end + 2;
        return true;
    });

    markdown.renderer.rules.custom_inline = (tokens, idx) => {
        return `<span class="custom">${tokens[idx].content}</span>`;
    };
};
