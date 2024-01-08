import { CONSOLEMAPPING } from '@/constants';
import { isFunction, isString, isError } from '@/utils/shared';
import { emitter } from '@/utils/emitter';
import { getIEUrl } from '@/utils/headers';
import { getResonse, getAjaxHeaders, getFetchHeaders } from '@/utils/ajax';
import { fakeConsole } from '@/utils/console';
import { getRcTiming } from '@/utils/resources';
import { ERRORTYPES } from '@/constants/error';
import { proxyLink } from './utils/url';

const { trigger: emit } = emitter;
const proxyConsole = () => {
  Object.keys(CONSOLEMAPPING)
    .filter(cmapKey => cmapKey !== 'all')
    .forEach(method => {
      console[method] = (...rest) => {
        let emitProxyConsole = rest.length > 0;
        rest.forEach(val => {
          const isReactSelfConsole =
            isString(val) &&
            (val.indexOf('Check the render method') !== 0 ||
              val.indexOf('Reconciliation') !== 0 ||
              val.indexOf('Cannot update during an existing state transition') !== 0);
          if (!emitProxyConsole && isReactSelfConsole) {
            emitProxyConsole = false;
            return false;
          }
        });
        if (emitProxyConsole) {
          emit('console', {
            type: method,
            value: [...rest],
            timestamp: new Date().getTime(),
          });
        }
        fakeConsole[method].apply(window.console, rest);
      };
    });

    // 处理清除函数
    console.clear = () => {
      emit('console', {
        type: 'clear',
        timestamp: new Date().getTime(),
      });
      fakeConsole.clear.apply(window.console);
    }
};
const proxyAjax = () => {
  const fakeAjax = Object.create(null);
  let ajaxSendTime = new Date().getTime();
  let ajaxStartTime = null;
  let ajaxResponseTime = null;
  console.log('truenproxyAjax',XMLHttpRequest)
  const handleEvent = function(event, isErrFlag,request) {
    console.log("nameMMMMMMMMMMMMMMMMMMMM",event)
    console.log("nameMMMMMMMMMMMMMMMMMMMM",isErrFlag)
    console.log("nameMMMMMMMMMMMMMMMMMMMM",request)
    ajaxResponseTime = new Date().getTime();
    try {
      // 修改获取ajax reponseUrl逻辑
      const curTarget = event && (event.currentTarget || event.target);
      const curAjaxUrl = curTarget.mdebugAjaxURL;
      const curMethods = curTarget.mdebugMethods;
      const QueryString = curTarget.QueryString || {};
      const curAajxSendTime = curTarget.mdebugAjaxSendTime || ajaxSendTime;
      const headers = event.headers || {};
      let currentStatus = '';
      let cgiurl = '';
      if (curTarget) {
        currentStatus = curTarget.status;
        cgiurl = curTarget.responseURL || getIEUrl(curTarget) || curAjaxUrl;
      }
      const curResponseText = getResonse(curTarget);
      if (String(isErrFlag) === 'timeout') {
        emit('network', {
          name: cgiurl,
          delay: Math.round(Math.max(ajaxResponseTime - curAajxSendTime, 0)),
          httpcode: 'timeout',
          starttime: ajaxStartTime,
          request:request,
          method:curMethods,
          QueryString,
          headers,
          response: curResponseText,
          initiatorType: 'xhr',
          type: 'xhr',
        });
        emit('console', {
          type: 'error',
          value: [{
            err_msg: 'ajax请求错误',
            err_stack: `错误码:${currentStatus}`,
            level: 'error',
            err_type: 'xhr',
            err_code: currentStatus,
            err_desc: JSON.stringify({
              fileName: cgiurl,
              request:request,
              method:curMethods,
              QueryString,
              category: 'xhr',
              text: 'xhr request timeout',
              status: currentStatus,
            }),
            headers,
          }],
          timestamp: new Date().getTime(),
        });
        return;
      }
      try {
        
        emit('network', {
            name: cgiurl,
            delay: Math.round(Math.max(ajaxResponseTime - curAajxSendTime, 0)),
            httpcode: currentStatus,
            starttime: ajaxStartTime,
            request:request,
            method:curMethods,
            QueryString,
            headers,
            response: curResponseText,
            initiatorType: 'xhr',
            type: 'xhr',
        });
      } catch (err) {
        console.warn(err);
      }
      if (typeof currentStatus === 'number' && (currentStatus < 200 || currentStatus >= 300)) {
        emit('console', {
          type: 'error',
          value: [{
            err_msg: 'ajax请求错误',
            err_stack: `错误码:${currentStatus}`,
            level: 'error',
            err_type: 'ajax',
            err_code: currentStatus,
            err_desc: JSON.stringify({
              fileName: cgiurl,
              request:request,
              method:curMethods,
              QueryString,
              category: 'ajax',
              text: curTarget.statusText,
              status: currentStatus,
            }),
            headers,
          }],
          timestamp: new Date().getTime(),
        });
      }
    } catch (err) {
      console.error(`Ajax handleEvent ${err}`);
    }
  };
  fakeAjax.send = XMLHttpRequest.prototype.send;
  fakeAjax.open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, boolean = true) {
    // proxy url
    console.log("argumentssssssssssssssssssssssssssssss", arguments)
    const proxyUrl = proxyLink(url);
    fakeAjax.open.apply(this, [method, proxyUrl || url, boolean]);
    this.mdebugAjaxURL = proxyUrl || url;
    this.mdebugMethods = method;
    if(method==="GET"){
      try {
        const path = url.split('?')[1];
        if(!path || !path.length){
          this.QueryString  = ""
          return
        } 
        const urlres= path.replace(/&/g, '","').replace(/=/g, '":"');
        const reqDataString = '{"' + urlres + '"}';
        this.QueryString  = JSON.parse(reqDataString);
      } catch (error) {
        this.QueryString  = ""
      }
    }
  };
  XMLHttpRequest.prototype.send = function(data) {
    console.log("sendDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", arguments)
    ajaxStartTime = new Date().getTime();
    ajaxSendTime = new Date().getTime();
    this.mdebugAjaxSendTime = ajaxSendTime;
    const { onloadend, ontimeout } = this;
    let requestObj = {}
    if(arguments[0] && typeof arguments[0] === 'string'){
      try {
        requestObj = JSON.parse(arguments[0])
      } catch (error) {
        let request = [...arguments][0].split("&")
          request.forEach(item => {
            requestObj[item.split("=")[0]] = item.split("=")[1]
          })
      }
    }
    if( Object.prototype.toString.call(arguments[0]) === '[object FormData]'){
      requestObj = "file"
    }
    this.onloadend = function(event) {
      console.log("eventtttttttttttttTTTTTTTTTTTTTT", event)
      console.log("sendDDrequestDDDDDDD", requestObj)
      const headerMap = getAjaxHeaders(this);
      handleEvent(Object.assign(event, { headers: headerMap }),"success",requestObj);

      if (typeof onloadend === 'function') {
        onloadend.apply(this, arguments);
      }
    };
    this.ontimeout = function(event) {
      const headerMap = getAjaxHeaders(this);
      handleEvent(Object.assign(event, { headers: headerMap }), 'timeout');

      if (typeof ontimeout === 'function') {
        ontimeout.apply(this, arguments);
      }
    };
    fakeAjax.send.apply(this, [data]);
  };
};
const proxyFetch = () => {
  if (!isFunction(window.fetch)) return;
  const nativeFetch = window.fetch;
  window.fetch = (...rest) => {
    const fetchStartTime = new Date().getTime();
    const fetchBeginTime = new Date().getTime();
    let fetchEndTime = fetchBeginTime;
    // proxy url
    const [cgiurl] = rest;
    const proxyUrl = proxyLink(cgiurl);
    const options = [proxyUrl, ...rest.slice(1)];
    return nativeFetch(...options)
      .then(res => {
        fetchEndTime = new Date().getTime();
        const headers = getFetchHeaders(res);
        // HTTP响应状态码非 2xx
        if (!res.ok && res.url !== '') {
          emit('network', {
            name: options[0],
            delay: Math.round(Math.max(fetchEndTime - fetchBeginTime, 0)),
            httpcode: res.status,
            starttime: fetchStartTime,
            headers,
            response: '',
            type: 'fetch',
            initiatorType: 'fetch',
          });
          emit('console', {
            type: 'error',
            value: [
              JSON.stringify({
                err_msg: 'fetch not ok',
                err_type: 'fetch',
                err_code: res.status,
                err_desc: JSON.stringify({
                  type: 'error',
                  fileName: rest[0],
                  options: rest[1],
                  category: 'fetch',
                }),
                headers,
              }),
            ],
            timestamp: new Date().getTime(),
          });
        }
        // HTTP 2xx，访问响应主体的每个方法都返回一个Promise
        // 当关联的数据类型准备好时，将被解析
        // https://github.com/swissquote/fetch-filter
        try {
          // 仅当返回值是json时候才进行过滤
          const contentType = res.headers ? res.headers.get('content-type') : '';
          const canToJson = isString(contentType) && contentType.includes('application/json');
          if (canToJson) {
            // https://developer.mozilla.org/en-US/docs/Web/API/Response/clone
            const respClone = res.clone();
            respClone
              .json()
              .then(respCurResult => {
                try {
                  emit('network', {
                    name: rest[0],
                    delay: Math.round(Math.max(fetchEndTime - fetchBeginTime, 0)),
                    httpcode: res.status,
                    starttime: fetchStartTime,
                    headers,
                    response: respCurResult,
                    type: 'fetch',
                    initiatorType: 'fetch',
                  });
                } catch (err) {
                  console.warn(err);
                }
              })
              .catch(err => {
                console.error('getCgiInfo', err);
              });
          }
        } catch (err) {
          console.error('getCgiInfo', err);
        }
        return res;
      })
      .catch(err => {
        emit('console', {
          type: 'error',
          value: [
            JSON.stringify({
              err_msg: 'fetch not ok',
              err_stack: `${err}`,
              err_type: 'fetch',
              err_desc: JSON.stringify({
                type: 'error',
                fileName: rest[0],
                options: rest[1],
                category: 'fetch',
              }),
              headers: {},
            }),
          ],
          timestamp: new Date().getTime(),
        });
      });
  };
};
const proxyError = () => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror
  window.addEventListener(
    'error',
    e => {
      const target = e.target ? e.target : e.srcElement;
      if (target !== window && target.nodeName && ERRORTYPES[target.nodeName.toUpperCase()]) {
        const lowerNodeName = target.nodeName.toLowerCase();
        emit('console', {
          type: 'error',
          value: [`${target.currentSrc || target.src || target.href} is load error`],
          timestamp: new Date().getTime(),
        });
        emit('network', {
          name: target.currentSrc || target.src || target.href,
          delay: 0,
          httpcode: 'error',
          starttime: 0,
          type:
            ['link', 'script', 'css', 'img'].indexOf(lowerNodeName) < 0 ? 'media' : lowerNodeName,
          initiatorType: lowerNodeName,
        });
      }
    },
    true,
  );
  const _oldOnerror = window.onerror;
  window.onerror = (msg, URL, line, col, error, ...restArgs) => {
    if (msg === 'Script error.' && !URL) {
      return false;
    }
    let _error = {};
    setTimeout(() => {
      const _col = col || (window.event && window.event.errorCharacter) || 0;
      if (error && error.stack) {
        _error = {
          err_msg: msg,
          err_stack: error.stack,
          err_type: 'jserror',
        };
      } else {
        _error = {
          err_msg: msg,
          err_stack: '',
          err_type: 'jserror',
        };
      }
      _error.err_desc = JSON.stringify({
        url: window.location.href,
        fileName: URL,
        category: 'javascript',
        line,
        col: _col,
      });
      emit('console', {
        type: 'error',
        value: [_error],
        timestamp: new Date().getTime(),
      });
    }, 0);
    if (isFunction(_oldOnerror)) {
      return _oldOnerror.apply(this, [msg, URL, line, col, error, ...restArgs]);
    } else {
      return false;
    }
  };
  // Tracking unhandled rejected Promises http://2ality.com/2016/04/unhandled-rejections.html
  window.addEventListener(
    'unhandledrejection',
    event => {
      const errorInfo = {
        err_msg: isError(event.reason) ? event.reason.message : event.reason,
        err_type: ERRORTYPES.PROMISE,
        err_desc: JSON.stringify({
          url: window.location.href,
          category: 'promise',
        }),
        err_stack: isError(event.reason) ? event.reason.stack : event.reason || 'promise is error',
      };
      emit('console', {
        type: 'error',
        value: [errorInfo],
        timestamp: new Date().getTime(),
      });
      event.preventDefault();
    },
    true,
  );
};
// 自动采集静态资源耗时
let isCollectResourcing = false;
const proxyResources = () => {
  const collect = () => {
    const entries = getRcTiming();
    entries.forEach(entry => emit('network', entry));
  };
  const startCollectResourcing = () => {
    if (isCollectResourcing) return;
    isCollectResourcing = true;
    // 加载成功的资源上报
    setInterval(collect, 300);
    performance.onresourcetimingbufferfull = collect;
  };
  startCollectResourcing();
};

const proxyWebSocket = () => {
  const wsTimeFormat = () => {
    const date = new Date();
    const seconds = date.getSeconds();
    const milliSeconds = date.getMilliseconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    return `${hours}:${minutes}:${seconds}.${milliSeconds}`;
  };

  const handlerMessageSend = event => {
    if (event) {
      const { target, type, data } = event;
      const { url, readyState } = target || {};
      emit('network', {
        wsType: type,
        name: url,
        content: data,
        readyState,
        type: 'websocket',
        time: wsTimeFormat(),
      });
    }
  };

  const WebSocketProxy = new Proxy(window.WebSocket, {
    construct: (target, args) => {
      const instance = new target(...args);

      const onOpenHandler = event => {
        handlerMessageSend(event);
      };

      const onCloseHandler = event => {
        handlerMessageSend(event);
        instance.removeEventListener('open', onOpenHandler);
        instance.removeEventListener('message', onMessageHandler);
        instance.removeEventListener('close', onCloseHandler);
      };

      const onMessageHandler = event => {
        handlerMessageSend(event);
      };

      instance.addEventListener('open', onOpenHandler);
      instance.addEventListener('message', onMessageHandler);
      instance.addEventListener('close', onCloseHandler);

      const sendProxy = new Proxy(instance.send, {
        apply: (target, ctx, args) => {
          emit('network', {
            wsType: 'send',
            name: ctx.url,
            content: args[0],
            readyState: 1,
            type: 'websocket',
            time: wsTimeFormat(),
          });
          target.apply(ctx, args);
        },
      });

      instance.send = sendProxy;

      return instance;
    },
  });

  window.WebSocket = WebSocketProxy;
};

export const init = () => {
  proxyAjax();
  proxyFetch();
  proxyConsole();
  proxyError();
  proxyResources();
  proxyWebSocket();
};
