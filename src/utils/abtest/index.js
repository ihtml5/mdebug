import qs from 'qs';
import { parse as cookieParse } from 'cookie';
import * as _ from '@/utils/mlodash';

export const getABTest = (cookieKey = 'abconf') => {
    try {
      const abCookieString = decodeURIComponent(cookieParse(document.cookie)[cookieKey] || '{}')
      const abCookie = JSON.parse(abCookieString);
      return abCookie || {};
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  export const getABConf = (confKey) => {
    const ab = getABTest('pluginabconf');
    const confMap = _.reduce(
    _.get(ab, 'conf_list', []),
    (acc, item) => {
        Object.assign(acc, item.conf || {});
        return acc;
    },
    {},
    );
    const parsedUrl = qs.parse(window.location.search.slice(1));
    const enableAbFromUrl = String(parsedUrl.pluginab) === '1';
    if (confKey) {
    if (enableAbFromUrl) {
        const confValue = parsedUrl[confKey];
        return typeof confValue !== 'undefined' ? confValue : confMap[confKey];
    }
    return confMap[confKey];
    }
    if (enableAbFromUrl) {
    return {
        ...confMap,
        ...parsedUrl,
    };
    }
    return confMap;
  };