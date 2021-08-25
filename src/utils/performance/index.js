import { isPerfTiming } from '@/utils/shared';
// 计算加载时间
export const getPfTiming = () => {
    try {
      const performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
      if (!performance) {
        return {};
      }
      const { timing } = performance || {};
      if (!timing || !isPerfTiming(timing)) {
        return {};
      }
      const timeOrigin = timing.fetchStart;
      const times = {};
      // 后端响应时间
      times.time_response = timing.responseStart - timing.requestStart;
      // html页面下载时间
      times.time_firstpaint = timing.responseEnd - timing.responseStart;
      // domready
      times.time_domready = timing.domContentLoadedEventStart - timing.responseEnd;
      // 准备新页面所耗费的时间
      times.time_readyStart = timing.fetchStart - timing.navigationStart;
      // 重定向期间花费的时间
      times.time_redirectTime = timing.redirectEnd - timing.redirectStart;
      // 应用程序缓存
      times.time_appcacheTime = timing.domainLookupStart - timing.fetchStart;
      // DNS查询时间
      times.time_dns = timing.domainLookupEnd - timing.domainLookupStart;
      // TCP连接时间
      times.time_tcp = timing.connectEnd - timing.connectStart;
      // 请求期间花费的时间
      times.time_requestTime = timing.responseEnd - timing.requestStart;
      // 请求完成DOM加载
      times.time_initDomTreeTime = timing.domInteractive - timing.responseEnd;
      // 加载活动时间
      times.time_loadEventTime = timing.loadEventEnd - timing.loadEventStart;
      // 首屏时间
      times.time6 = timing.domLoading - timeOrigin;
      // 首页时间
      times.time7 = timing.loadEventEnd - timeOrigin;
      // 解析dom树耗时
      times.time8 = timing.domComplete - timing.domInteractive;
      return times;
    } catch (err) {
      return {};
    }
};

export const timingToObject = () => {
  try {
    const performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
    if (!performance) {
      return false;
    }
    const { timing } = performance || {};
    if (!timing || !isPerfTiming(timing)) {
      return false;
    }
    const newTiming = {};
    for (const timingK in timing) {
      newTiming[timingK] = timing[timingK];
    }
    return newTiming;
  } catch (err) {
    return false;
  }
}
export const version = '0.1.0';
