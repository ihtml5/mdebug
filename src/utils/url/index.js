
/**
 * @description 解析link
 * @param {String} url
 * @returns {Object}
 */
import { isObject } from '@/utils/shared';
import { emitter } from '@/utils/emitter';

const { trigger: emit } = emitter;

export const parseLink = (url) => {
    if (!url) {
      return {};
    }
    const aTag = document.createElement('a');
    aTag.href = url;
    return {
      host: aTag.host,
      hash: aTag.hash,
      path: aTag.pathname,
      search: aTag.search,
      protocol: aTag.protocol.slice(0, -1),
    };
};

export const proxyLink = (url) => {
  const { host, hash, path, search, protocol } = parseLink(url);
  const allRules = getRules() || {};
  const proxyDomain = isObject(allRules) ? allRules[host] : false;
  setProxyRules(host, proxyDomain || host);
  emit('proxy', {
    key: host,
    value: host
  });
  return `${protocol}://${proxyDomain || host}${path}${search}${hash}`;
}

export const fixLink = (url) => {
  const { host, hash, path, search, protocol } = parseLink(url);
  return `${protocol}://${host}${path}${search}${hash}`;
}

export const cleanLink = (url = window.location.href) => {
  const { host, path, protocol } = parseLink(url);
  return `${protocol}://${host}${path}`;
}
// proxy methods
export const getRules = () => {
  try {
    const curMedbugProxyRules = window.localStorage.getItem(`mdebugProxyRules${cleanLink()}`)
    return JSON.parse(curMedbugProxyRules) || {};
  } catch (err) {
    console.error(err);
    return {};
  }
};
export let proxyrules = getRules() || {};
export const clearProxyRules = () => {
  proxyrules = {};
  try {
    window.localStorage.removeItem(`mdebugProxyRules${cleanLink()}`);
  } catch (err) {
    console.error(`mdebugProxyRules${cleanLink()} ${err}`);
  }
}
export const getProxyRules = () => proxyrules;
export const setProxyRules = (key, value) => {
  proxyrules[key] = value;
  try {
      window.localStorage.setItem(`mdebugProxyRules${cleanLink()}`, JSON.stringify(proxyrules));
  } catch (err) {
      console.error(`setMdebugProxyRules ${err}`);
  }
}