import { isObject, isString, isArray } from '@/utils/shared';

export const __DEV__ = process.env.NODE_ENV === 'development';
/**
 * 遍历并获取指定值
 * @param {Object} data 响应信息
 * @param {String|Array} data 要过滤的响应信息字段
 * @param {String} defaultValue 默认值
 */
const traversal = (data, path, defaultValue = '') => {
  let returnedValue = void 0;
  String(path)
    .split('.')
    .forEach(key => {
      try {
        if (typeof returnedValue !== 'undefined') {
          returnedValue = returnedValue[key];
        } else {
          returnedValue = data[key];
        }
      } catch (err) {
        returnedValue = void 0;
      }
    });
  if (typeof returnedValue === 'undefined') {
    return defaultValue;
  }
  return returnedValue;
};
/**
 * 获取响应状态码和信息
 * @param {Object} param 过滤前响应信息和要过滤的字段
 * @param {Object} param.data 响应信息
 * @param {String|Array} param.path 要过滤的响应信息字段
 * @param {Boolean} isMerge 对于多个path字段是否合并
 */
const getRetCodeOrMsg = ({ data = {}, path = '' }, isMerge) => {
  let finalReturnedValue = '';
  const mergeData = [];
  if (isObject(data)) {
    if (isString(path)) {
      return traversal(data, path, '');
    } else if (isArray(path)) {
      path.forEach(pk => {
        if (traversal(data, pk, '') !== '') {
          if (isMerge) {
            mergeData.push(`${pk}:${traversal(data, pk)}`);
          } else {
            finalReturnedValue = traversal(data, pk);
            return false;
          }
        }
      });

      if (isMerge) {
        finalReturnedValue = mergeData.join(',');
      }

      return finalReturnedValue;
    }
  }
  return '';
};
/**
 * 过滤cgi响应信息（响应状态码和响应信息）
 * @param {String|Object} curResponseText 服务器返回的文本数据
 * @return {Object} resp 响应状态码和响应信息
 * @return {Number|String} resp.bizcode 响应状态码
 * @return {String} resp.bizmsg 响应信息
 */
export const filterCgiResp = curResponseText => {
  let responseData = {};
  if (isObject(curResponseText)) {
    responseData = curResponseText;
  } else {
    try {
      responseData = JSON.parse(curResponseText);
    } catch (err) {
      responseData = {};
    }
  }
  const bizcode = getRetCodeOrMsg({
    data: responseData,
    path: ['ret', 'code', 'retcode'],
  });
  const bizmsg = getRetCodeOrMsg({
    data: responseData,
    path: ['info', 'result', 'msg'],
  });
  return { bizcode, bizmsg };
};

export const jsonParse = str => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return false;
  }
};
