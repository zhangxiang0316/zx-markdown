const CHART_PREFIX = 'echarts_content_';
const DEFAULT_HEIGHT = '300px';
const LOADING_STYLES = {
    container: `
        width: 100%;
        height: ${DEFAULT_HEIGHT};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fafafa;
        border-radius: 4px;
    `,
    spinner: `
        position: relative;
        width: 40px;
        height: 40px;
        margin-bottom: 12px;
    `,
    innerRing: `
        position: absolute;
        width: 40px;
        height: 40px;
        border: 2px solid transparent;
        border-top-color: #1890ff;
        border-right-color: #1890ff;
        border-radius: 50%;
        animation: spinnerOne 1s linear infinite;
    `,
    outerRing: `
        position: absolute;
        width: 32px;
        height: 32px;
        border: 2px solid transparent;
        border-top-color: #40a9ff;
        border-right-color: #40a9ff;
        border-radius: 50%;
        top: 4px;
        left: 4px;
        animation: spinnerTwo 0.8s linear infinite;
    `,
    text: `
        color: #666;
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        opacity: 0.85;
        background: linear-gradient(45deg, #1890ff, #40a9ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 500;
    `,
    keyframes: `
        @keyframes spinnerOne {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes spinnerTwo {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(4px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
    `
};

// 防抖函数
function debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 图表实例管理
const chartInstances = new Map();

export default function EchartsPlugin(md, isLoading) {
    const originalFence = md.renderer.rules.fence.bind(md.renderer.rules);

    // 清理图表实例
    function destroyChart(chartId) {
        const chart = chartInstances.get(chartId);
        if (chart) {
            chart.dispose();
            chartInstances.delete(chartId);
        }
    }

    // 初始化图表
    function initChart(chartId, options) {
        try {
            // eslint-disable-next-line no-undef
            const chart = echarts.init(document.getElementById(chartId));
            chartInstances.set(chartId, chart);
            if (!isLoading) {
                chart.setOption(options);
            }
            // 添加防抖的 resize 处理
            const handleResize = debounce(() => chart.resize());
            window.addEventListener('resize', handleResize);
            // 返回清理函数
            return () => {
                window.removeEventListener('resize', handleResize);
                destroyChart(chartId);
            };
        } catch (err) {
            console.error('Chart initialization failed:', err);
            return null;
        }
    }

    md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        if (token.info !== 'echarts') {
            return originalFence(tokens, idx, options, env, slf);
        }

        try {
            const code = token.content.trim();
            const chartData = JSON.parse(code);
            const chartId = `${CHART_PREFIX}${Math.random().toString(36).slice(-10)}`;

            // 验证图表配置
            if (!chartData || typeof chartData !== 'object') {
                throw new Error('Invalid chart configuration');
            }

            if (isLoading) {
                return `
                    <div style="${LOADING_STYLES.container}">
                        <div class="loading-spinner" style="${LOADING_STYLES.spinner}">
                            <div class="spinner-ring-outer" style="${LOADING_STYLES.outerRing}"></div>
                            <div class="spinner-ring-inner" style="${LOADING_STYLES.innerRing}"></div>
                        </div>
                        <div style="${LOADING_STYLES.text}">图表加载中...</div>
                        <style>
                            ${LOADING_STYLES.keyframes}
                            .loading-spinner {
                                filter: drop-shadow(0 0 1px rgba(24, 144, 255, 0.2));
                            }
                            .spinner-ring-inner, .spinner-ring-outer {
                                box-shadow: 0 0 8px rgba(24, 144, 255, 0.1);
                            }
                            .loading-spinner + div {
                                animation: fadeIn 0.4s ease, pulse 2s ease-in-out infinite;
                            }
                        </style>
                    </div>
                `;
            }

            // 在下一个事件循环中初始化图表
            setTimeout(() => initChart(chartId, chartData), 0);

            return `<div id="${chartId}" style="width: 100%; height: ${DEFAULT_HEIGHT}"></div>`;
        } catch (err) {
            console.error('Chart parsing failed:', err);
            return `<pre class="error">图表配置错误: ${err.message}</pre>`;
        }
    };
};
