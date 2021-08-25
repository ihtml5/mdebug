/**
 *  lodash简易实现，与lodash接口基本保持一致。
 *  为精简代码体积，函数参数只实现基础校验，稳定性低于lodash
 *
 */
export function getTag(src) {
    return Object.prototype.toString.call(src);
  }
  
  export function hasOwnProperty(obj, keyName) {
    return Object.prototype.hasOwnProperty.call(obj, keyName);
  }
  
  export function isObject(obj) {
    return getTag(obj) === '[object Object]';
  }
  
  export function isArray(arr) {
    return getTag(arr) === '[object Array]';
  }
  
  export function isString(str) {
    return getTag(str) === '[object String]';
  }
  
  export function isBoolean(bool) {
    return getTag(bool) === '[object Boolean]';
  }
  
  export function isNumber(number) {
    return getTag(number) === '[object Number]';
  }
  
  export function isFunction(func) {
    return getTag(func) === '[object Function]';
  }
  
  export function isEmpty(value) {
    if (value === null || value === undefined) {
      return true;
    }
    if (isArray(value) || isString(value)) {
      return value.length === 0;
    }
    if (isObject(value)) {
      return Object.keys(value).length === 0;
    }
    return true;
  }
  
  export function has(obj, keyName) {
    return obj !== null && obj !== undefined && hasOwnProperty(obj, keyName);
  }
  
  export function reduce(...args) {
    const [src, func] = args;
    let i = 0;
    let[,, acc] = args;
    if (isArray(src)) {
      if (args.length !== 3) {
        const [nacc] = src;
        acc = nacc;
      }
      while (i < src.length) {
        acc = func(acc, src[i], i, src);
        i += 1;
      }
      return acc;
    }
    if (isObject(src)) {
      const keys = Object.keys(src);
      if (args.length !== 3) {
        acc = src[keys[0]];
      }
      while (i < keys.length) {
        const key = keys[i];
        acc = func(acc, src[key], key, src);
        i += 1;
      }
      return acc;
    }
    return acc;
  }
  
  export function forEach(src, func) {
    let i = 0;
    if (isArray(src)) {
      while (i < src.length) {
        const rst = func(src[i], i, src);
        if (rst === false) {
          break;
        }
        i += 1;
      }
    } else if (isObject(src)) {
      const keys = Object.keys(src);
      while (i < keys.length) {
        const key = keys[i];
        const rst = func(src[key], key, src);
        if (rst === false) {
          break;
        }
        i += 1;
      }
    }
  }
  
  export function map(src, func) {
    const rst = [];
    let i = 0;
    if (isArray(src)) {
      while (i < src.length) {
        rst.push(func(src[i], i, src));
        i += 1;
      }
    } else if (isObject(src)) {
      const keys = Object.keys(src);
      while (i < keys.length) {
        const key = keys[i];
        rst.push(func(src[key], key, src));
        i += 1;
      }
    }
    return rst;
  }
  
  const charCodeOfDot = '.'.charCodeAt(0);
  const reEscapeChar = /\\(\\)?/g;
  // const rePropName = RegExp(
  //   // Match anything that isn't a dot or bracket.
  //   '[^.[\\]]+' + '|' +
  //   // Or match property names within brackets.
  //   '\\[(?:' +
  //     // Match a non-string expression.
  //     '([^"\'][^[]*)' + '|' +
  //     // Or match strings (supports escaping characters).
  //     '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  //   ')\\]'+ '|' +
  //   // Or match "" as the space between consecutive dots or empty brackets.
  //   '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  // , 'g')
  
  const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;
  
  export function stringToPath(string) {
    const result = [];
    if (string.charCodeAt(0) === charCodeOfDot) {
      result.push('');
    }
    string.replace(rePropName, (match, expression, quote, subString) => {
      let key = match;
      if (quote) {
        key = subString.replace(reEscapeChar, '$1');
      } else if (expression) {
        key = expression.trim();
      }
      result.push(key);
    });
    return result;
  }
  
  export function toPath(value) {
    if (!isString(value)) {
      return [];
    }
    return stringToPath(value);
  }
  
  const isSimNull = obj => typeof obj === 'undefined' || obj === null;
  export function get(object, path, defaultValue) {
    let pathb = path;
    let objectb = object;
    if (isSimNull(objectb)) {
      return defaultValue;
    }
    if (!Array.isArray(pathb)) {
      const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      const reIsPlainProp = /^\w*$/;
      const isKey = function isKey(value, obj) {
        const type = typeof value;
        if (type === 'number' || type === 'boolean' || value === null) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (!isSimNull(obj) && value in Object(obj));
      };
      if (isKey(pathb, objectb)) {
        pathb = [pathb];
      } else {
        pathb = stringToPath(pathb);
      }
    }
    let index = 0;
    const { length } = pathb;
    while (!isSimNull(objectb) && index < length) {
      objectb = objectb[pathb[index]];
      index += 1;
    }
    if (index && index === length) {
      return objectb === undefined ? defaultValue : objectb;
    }
    return defaultValue;
  }
  
  // 只能pick第一级key且浅拷贝object
  export function pick(object, ...paths) {
    if (object === null || object === undefined) {
      return {};
    }
    return reduce(
      paths,
      (rst, path) => {
        const rstb = rst;
        if (isArray(path)) {
          forEach(path, (item) => {
            if (has(object, item)) {
              rstb[item] = object[item];
            }
          });
        } else if (has(object, path)) {
          rstb[path] = object[path];
        }
        return rstb;
      },
      {},
    );
  }
  
  export function camelCase(str) {
    if (str === null || str === undefined) {
      return '';
    }
    return reduce(
      `${str}`.split(/_|-| /),
      (acc, word, index) => {
        let wordb = word;
        wordb = wordb.toLowerCase();
        return acc + (index ? wordb.slice(0, 1).toUpperCase() + wordb.slice(1) : wordb);
      },
      '',
    );
  };