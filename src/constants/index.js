export const TABS = [
  {
    name: '系统',
    enName: 'System',
    id: 'mdebugSystem',
    alias: 'system',
  },
  {
    name: 'Elements',
    enName: 'Elements',
    id: 'mdebugElements',
    alias: 'elements',
  },
  {
    name: '日志',
    enName: 'Console',
    id: 'mdebugConsole',
    alias: 'console',
  },
  {
    name: 'Network',
    enName: 'Network',
    id: 'mdebugNetwork',
    alias: 'network',
  },
  {
    name: 'Application',
    enName: 'Application',
    id: 'mdebugApplication',
    alias: 'application',
  },
  {
    name: 'React',
    enName: 'React',
    id: 'mdebugReact',
    alias: 'react',
  },
  {
    name: 'Detection',
    enName: 'Detection',
    id: 'mdebugDetection',
    alias: 'detection',
  },
  {
    name: 'Proxy',
    enName: 'Proxy',
    id: 'mdebugProxy',
    alias: 'proxy',
  },
  {
    name: 'Performance',
    enName: 'Performance',
    id: 'mdebugPerformance',
    alias: 'performance',
  },
  {
    name: 'Settings',
    enName: 'Settings',
    id: 'mdebugSettings',
    alias: 'settings',
  },
];

export const TRANSLATES = {
  url: {
    zh: '页面地址',
    en: 'URL',
  },
  ua: {
    zh: '浏览器标示',
    en: 'UA',
  },
};

export const TRANSLATE = key => {
  if (!key) {
    return '';
  }
  return TRANSLATES[String(key).toLowerCase()];
};

export const CONSOLEMAPPING = {
  all: {
    zh: '所有',
    en: 'all',
  },
  log: {
    zh: '普通',
    en: 'log',
    color: '#000',
  },
  info: {
    zh: '通知',
    en: 'info',
    color: '#6a5acd',
  },
  warn: {
    zh: '警告',
    en: 'warn',
    color: 'orange',
  },
  error: {
    zh: '错误',
    en: 'error',
    color: '#dc143c',
  },
  debug: {
    zh: '调试',
    en: 'debug',
    color: '#000',
  },
  trace: {
    zh: '追踪',
    en: 'trace',
    color: '#000',
  },
};
export const sessionLog = [];
export const networkLog = [];
export const STORAGEMAPPING = ['LocalStorage', 'SessionStorage', 'Cookie'];
export const PERFORMANCEMAPPING = ['emonitor', 'timing'];

export const WEBSOCKETMAPPING = ['all', 'message', 'send'];
export const websocketLog = {};
