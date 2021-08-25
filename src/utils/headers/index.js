// https://github.com/github/fetch/blob/master/fetch.js#L368
import { getSysInfo } from '@/utils/ua';

export const parseHeaders = rawHeaders => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach(line => {
    const parts = line.split(':');
    const key = parts.shift().trim();
    if (key) {
      const value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
};

// 获取ie下的ajax请求地址，当获取不到的时候才请求
export const getIEUrl = xhrReq => {
  if (!xhrReq) {
    return false;
  }
  const { browser } = getSysInfo(navigator.userAgent);
  if (['IE', 'IEmobile'].indexOf(browser.name) < 0) {
    return false;
  }
  try {
    const IEUrl = parseHeaders(xhrReq.getAllResponseHeaders() || '').get('X-Request-URL');
    return IEUrl;
  } catch (err) {
    console.warn(`get IEUrl ${err}`);
    return false;
  }
};
