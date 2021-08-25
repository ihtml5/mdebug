import { nativeHasOwn } from '../shared/index';

let customEventIndex = -1;
let topices = {};
/**
 * @description eventBus
 * @module emitter
 */
/**
 * @description emitter
 */
export const emitter = {
  on: (topic, cb, context) => {
    if (!topices[topic]) {
      topices[topic] = [];
    }
    customEventIndex = customEventIndex + 1;
    // 生成唯一的token，便于后期取消
    const token = `forjs-uid-${customEventIndex}`;
    topices[topic].push({
      context: context,
      cb: cb,
      token: token,
    });
    return token;
  },
  clearAll: function() {
    topices = {};
  },
  clear: function(topic) {
    if (topices[topic]) {
      delete topices[topic];
    }
  },
  off: function(value) {
    const descendantTopicExists = function(topic) {
      for (const t in topices) {
        if (nativeHasOwn.call(topices, t) && t.indexOf(topic) === 0) {
          return true;
        }
      }
      return false;
    };
    const isTopic = typeof value === 'string'
      && (nativeHasOwn.call(topices, value) || descendantTopicExists(value));
    const isToken = !isTopic && typeof value === 'string';
    const isFunction = typeof value === 'function';
    let t = null;
    let result = true;
    let topic = null;
    if (isTopic) {
      emitter.clear(value);
      return;
    }
    for (t in topices) {
      if (nativeHasOwn.call(topices, t)) {
        topic = topices[t];
        for (let i = 0, tl = topic.length; i < tl; i++) {
          if (isToken && topic[i].token === value) {
            topic.splice(i, 1);
            result = value;
          } else if (isFunction && topic[i].cb === value) {
            topices[t].splice(i, 1);
            result = true;
          }
        }
      }
    }
    return result;
  },
  once: function(topic, cb) {
    if (!topices[topic]) {
      topices[topic] = [];
    }
    topices[topic].push({
      context: this,
      cb: cb,
      once: true,
    });
  },
  trigger: function(topic, data, async) {
    if (!nativeHasOwn.call(topices, topic)) {
      return;
    }
    const throwException = ex => () => {
      throw ex;
    };
    const callSubscriberWithExceptions = (subscriber, data, async) => {
      const emitSubscribe = (data) => {
        if (subscriber.cb) {
          subscriber.cb.call(subscriber.context, data);
        }
        if (subscriber.once) {
          subscriber.cb = function() {};
        }
      };
      if (async === true) {
        try {
          emitSubscribe(data);
        } catch (err) {
          setTimeout(throwException(err), 0);
        }
      }
      emitSubscribe(data);
    };
    const distributeMsg = () => {
      if (nativeHasOwn.call(topices, topic)) {
        const subscribers = topices[topic];
        const cbLen = subscribers.length;
        for (let i = 0; i < cbLen; i++) {
          callSubscriberWithExceptions(subscribers[i], data, async);
        }
      }
    };
    if (async === true) {
      setTimeout(distributeMsg, 0);
    } else {
      distributeMsg();
    }
    return true;
  },
};
 