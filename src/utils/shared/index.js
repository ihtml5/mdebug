/**
 * @module shared
 * @description 公共方法
 */
 export const isBrowser = typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string';
 export const nativeToString = Object.prototype.toString;
 export const nativeHasOwn = Object.prototype.hasOwnProperty;
 export const isArray = obj => nativeToString.call(obj) === '[object Array]';
 export const isObject = obj => nativeToString.call(obj) === '[object Object]';
 export const isPerfTiming = obj => nativeToString.call(obj) === '[object PerformanceTiming]';
 export const isString = obj => typeof obj === 'string';
 export const isUndefined = obj => typeof obj === 'undefined';
 export const isFunction = func => typeof func === 'function';
 export const isNumber = num => typeof num === 'number';
 export const hasProp = (obj, key) => nativeHasOwn.call(obj, key);
 export const isError = error => nativeToString.call(error) === '[object Error]';
 export const isXMLHttpRequest = item => nativeToString.call(item) === '[object XMLHttpRequest]'
 export const noop = () => {};
 export const debounce = (func, delay, callback) => {
   let timer = null;
   return function(...rest) {
     const context = this;
     clearTimeout(timer);
     timer = setTimeout(() => {
       func.apply(context, rest);
       if (typeof callback === 'function') {
         callback();
       }
     }, delay);
   };
 };