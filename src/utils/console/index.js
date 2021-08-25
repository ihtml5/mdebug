import { isObject } from '@/utils/shared';
const methodList = ['log', 'info', 'warn', 'debug', 'error', 'trace'];

export const fakeConsole = {
    time: window.console.time,
    timeEnd: window.console.timeEnd,
    clear: window.console.clear,
};

methodList.forEach(method => {
    fakeConsole[method] = window.console[method];
});


export function findObj(obj, keywords) {
    return Object.keys(obj).map(ikey => ({
        key: ikey,
        value: obj[ikey]
    })).find(val => val.key.toLowerCase().indexOf(keywords) !== -1 || change([val.value], keywords))
}

export function change(logvalue, keywords) {
    return logvalue.find(item => {
        if (Array.isArray(item)) {
            return change(item)
        } else if (isObject(item)) {
           return findObj(item, keywords)
        } else if (Object.prototype.toString.call(item) === '[object XMLHttpRequest]') {
            const xmlInfo = {};
            for (const key in item) {
                xmlInfo[key] = item[key];
            }
            return findObj(xmlInfo, keywords);
        } else {
            return String(item).toLowerCase().indexOf(keywords) !== -1
        }
    })
}