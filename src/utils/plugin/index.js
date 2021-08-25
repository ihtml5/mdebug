// https://zhuanlan.zhihu.com/p/32119059
import isClass from 'is-class';

const plugins = new Map();

/**
 * 返回一个字符串，该字符串是根据指定插件类型及别名组合生成的唯一键。
 */
const getPluginKey = (pluginType, pluginAlias) => `${pluginType}/${pluginAlias}`;

/**
 * 返回指定插件类型及别名是否已被注册。
 */
export const hasPluginClass = (pluginType, pluginAlias) => {
  const pluginKey = getPluginKey(pluginType, pluginAlias);
  return plugins.has(pluginKey);
}

/**
 * 注册指定插件类型及别名对应的类。
 */
export const registerPluginClass = (pluginType, pluginAlias, pluginClass) => {
  if (hasPluginClass(pluginType, pluginAlias)) {
    throw new Error(`Plugin alias of "${pluginType}/${pluginAlias}" has already been registered.`);
  }
  if (!isClass(pluginClass)) {
    throw new Error('The "pluginClass" argument must be an ES6 class.');
  }
  const pluginKey = getPluginKey(pluginType, pluginAlias);
  plugins.set(pluginKey, pluginClass);
  return pluginKey;
}

/**
 * 返回指定插件类型及别名对应的类。
 */
export const getPluginClass = (pluginType, pluginAlias) => {
  if (!hasPluginClass(pluginType, pluginAlias)) {
    throw new Error(`Plugin alias of "${pluginType}/${pluginAlias}" has not been registered yet.`);
  }
  const pluginKey = getPluginKey(pluginType, pluginAlias);
  return plugins.get(pluginKey);
}