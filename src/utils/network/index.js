import { networkLog } from '@/constants';

export const addNetworkLog = data => {
  const { type } = data;
  if (type === 'websocket') {
    const { name, wsType, readyState } = data;
    const websocketState = wsType === 'close' && readyState === 3 ? 'close' : 'connect';
    const websocketItem = networkLog.find(el => el.name === name);
    if (websocketItem) {
      const { messages = [] } = websocketItem;
      messages.push(data);
      websocketItem.httpcode = websocketState;
      if (websocketState === 'close') {
        websocketItem.wsClosed = true;
        websocketItem.delay = new Date().getTime() - websocketItem.starttime;
      }
    } else {
      networkLog.push({
        name,
        messages: [],
        type,
        wsClosed: false,
        starttime: new Date().getTime(),
        httpcode: websocketState,
        initiatorType: 'ws',
      });
    }
  } else {
    networkLog.push(data);
  }
};
