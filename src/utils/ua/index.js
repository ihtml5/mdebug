// from https://github.com/chenshenhai/blog/issues/7 thanks
/**
 * @description 解析ua信息
 * @module ua
 */

import { isBrowser } from '../shared';

/**
 * @description 获取pc端对应ua信息
 * @param {*} userAgent
 */
const getPCBrowserInfo = userAgent => {
  let name = 'unknown';
  let version = 'unknown';
  let engine = 'unknown';
  let engineVer = 'unknown';
  let machineSys = 'unknown';
  const tempuserAgent = userAgent.toLowerCase();
  if (tempuserAgent.indexOf('windows') > -1) {
    machineSys = 'windows';
  } else if (tempuserAgent.indexOf('linux') > -1) {
    machineSys = 'linux';
  } else if (tempuserAgent.indexOf('mac') > -1) {
    machineSys = 'mac';
  }

  if (isBrowser && window.opera) {
    engineVer = window.opera.version();
    version = window.opera.version();
    engine = 'opera';
  } else if (/AppleWebKit\/(\S+)/.test(userAgent)) {
    engineVer = RegExp.$1;
    engine = 'webkit';
    if (/Chrome\/(\S+)/.test(userAgent)) {
      version = RegExp.$1;
      name = 'chrome';
    } else if (/Version\/(\S+)/.test(userAgent)) {
      version = RegExp.$1;
      name = 'safari';
    } else {
      // approximate version
      let safariVersion = 1;
      const wekitVersion = parseFloat(engineVer);

      if (wekitVersion < 100) {
        safariVersion = 1;
      } else if (wekitVersion < 312) {
        safariVersion = 1.2;
      } else if (wekitVersion < 412) {
        safariVersion = 1.3;
      } else {
        safariVersion = 2;
      }

      version = safariVersion;
      name = 'safari';
    }
  } else if (/KHTML\/(\S+)/.test(userAgent) || /Konqueror\/([^;]+)/.test(userAgent)) {
    engineVer = RegExp.$1;
    version = RegExp.$1;
    engine = 'khtml';
    name = 'konq';
  } else if (/rv:([^)]+)\) Gecko\/\d{8}/.test(userAgent)) {
    engineVer = RegExp.$1;
    engine = 'gecko';
    // determine if itâ€™s Firefox
    if (/Firefox\/(\S+)/.test(userAgent)) {
      version = RegExp.$1;
      name = 'firefox';
    }
  } else if (/MSIE ([^;]+)/.test(userAgent)) {
    engineVer = RegExp.$1;
    version = RegExp.$1;
    engine = 'ie';
    name = 'ie';
  }

  return {
    machine: 'PC',
    name,
    version,
    engineVer,
    engine,
    machineSys,
  };
};
/**
 * @description 解析ua信息
 * @param {*} userAgent
 */
export const getSysInfo = userAgent => {
  const { machineSys, engineVer } = getPCBrowserInfo(userAgent);
  const os = {
    mac: machineSys === 'mac',
    version: engineVer,
    name: machineSys,
  };
  const browser = {};
  const osTypes = {
    iphone: userAgent.match(/(iphone)\s(os\s)?([\d_]+)/i),
    ipad: userAgent.match(/(ipad).*\s([\d_]+)/i),
    ipod: userAgent.match(/(ipod).*\s([\d_]+)/i),
    android: userAgent.match(/(android)\s([\d.]+)/i),
    windows: userAgent.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),
  };

  if (osTypes.ipod) {
    os.ios = true;
    os.ipod = true;
    os.version = osTypes.ipod[2].replace(/_/g, '.');
    os.name = 'ipod';
  }
  if (osTypes.ipad) {
    os.ios = true;
    os.ipad = true;
    os.version = osTypes.ipad[2].replace(/_/g, '.');
    os.name = 'ipad';
  }
  if (osTypes.iphone) {
    os.iphone = true;
    os.ios = true;
    os.version = osTypes.iphone[3].replace(/_/g, '.');
    os.name = 'iphone';
  }
  if (osTypes.android) {
    const {
      android: [, , androidVer],
    } = osTypes;
    os.android = true;
    os.version = androidVer;
    os.name = 'android';
  }
  if (osTypes.windows) {
    const {
      windows: [, , windowsVer],
    } = osTypes;
    os.windows = true;
    os.version = windowsVer;
    os.name = 'windows';
  }

  const browserTypes = {
    WEISHI: userAgent.match(/weishi_(\d+?\.\d+?\.\d+?)/i),
    YYB: userAgent.match(/\/qqdownloader\/(\d+)(?:\/(appdetail|external|sdk))?/i),
    mojii: userAgent.match(/mojii/i),
    IE: userAgent.match(/; msie\b|; trident\b|\bedge\//i),
    WeChat:
      userAgent.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/) ||
      userAgent.match(/MicroMessenger\/((\d+)\.(\d+))/),
    MQQClient:
      (!userAgent.match(/QQReader/) && userAgent.match(/QQ\/(\d+\.\d+)/i)) ||
      userAgent.match(/V1_AND_SQ_([\d.]+)/), // QQ阅读伪装成了QQ然而不具备QQ的jsapi
    MQQReader: userAgent.match(/QQReader/i),
    QQvideo: userAgent.match(/TADChid/) ? false : userAgent.match(/QQLiveBrowser\/([\d.]+)/), // 若发现广告userAgent,则不认为在app内。若先进入正常app的webview,再进入广告webview（广告webview是以添加参数方式修改userAgent）,会误判为还在app内，而使用app的jsapi
    QQHDvideo: userAgent.match(/QQLiveHDBrowser\/([\d.]+)/),
    TBSSDK: userAgent.match(/MQQBrowser\/(\d+\.\d+)/i) && userAgent.match(/MSDK\/(\d+\.\d+)/),
    MQQBrowser: userAgent.match(/MQQBrowser\/(\d+\.\d+)/i),
    UCBrowser: userAgent.match(/ucbrowser\/(\d+\.\d+)/i),
    Qzone: userAgent.match(/Qzone\/[\w\d_]*(\d\.\d)[.\w\d_]*/i),
    Weibo: userAgent.match(/Weibo/i),
    qqnews: userAgent.match(/qqnews\/(\d+\.\d+\.\d+)/i),
    QQLiveBroadcast: userAgent.match(/QQLiveBroadcast/i),
    kuserAgentibao: userAgent.match(/qnreading\/(\d+\.\d+\.\d+)/i),
    liebao: userAgent.match(/LieBaoFast\/(\d+\.\d+\.\d+)/i),
    baiduboxapp: userAgent.match(/baiduboxapp\/(\d+\.\d+\.\d+)/i), // 手机百度
    IEMobile: userAgent.match(/IEMobile(\/|\s+)(\d+\.\d+)/) || userAgent.match(/WPDesktop/),
    douban: userAgent.match(/com\.douban\.frodo\/(\d+\.\d+\.\d+)/i),
    MiuiBrowser: userAgent.match(/MiuiBrowser\/(\d+\.\d+)/i),
    BingPreview: userAgent.match(/BingPreview\/(\d+\.)/i),
    TADChid: userAgent.match(/TADChid\/(\d+)/i),
    Chrome: os.ios ? userAgent.match(/CriOS\/(\d+\.\d+)/) : userAgent.match(/Chrome\/(\d+\.\d+)/),
    Safari: userAgent.match(/Safari\/(\d+\.\d+)/),
    sukan: userAgent.match(/synopsis/i),
    qmkege: userAgent.match(/qmkege\/(\d+\.\d+)/),
  };

  if (browserTypes.MQQReader) {
    // 非主流的QQ阅读
    browser.MQQReader = true;
    browser.version = 1;
    browser.name = 'MQQReader';
  } else if (browserTypes.IEMobile) {
    browser.IEMobile = true;
    browser.version = 1;
    browser.name = 'IEMobile';
  } else {
    for (const i in browserTypes) {
      if (browserTypes[i]) {
        browser[i] = true;
        browser.version = browserTypes[i][1] || 0;
        browser.name = i;
        break;
      }
    }
  }
  return {
    browser,
    os,
  };
};

export const isWeixin = (userAgent = '') => {
  const [match] = userAgent.toLowerCase().match(/micromessenger\/(\d+)\.(\d+)\.(\d+)/) || [];
  if (match) {
    return true;
  }
  return false;
};
