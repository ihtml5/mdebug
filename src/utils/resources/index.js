const getType = type => {
  if (type === 'xmlhttprequest') {
    return 'xhr';
  }
  if (type === 'css') {
    return 'img';
  }
  if (['link', 'script', 'fetch', 'img'].indexOf(type) !== -1) {
    return type;
  }
  return 'media';
};
// 统计页面资源性能
export const getRcTiming = () => {
  try {
    if (!window.performance || !window.performance.getEntries) {
      console.warn('prerformance is not supported');
      return [];
    }
    const resource = performance.getEntries();
    const resourceList = [];
    if (!resource && !resource.length) {
      return resourceList;
    }
    try {
      resource
        .filter(res => ['css', 'img', 'link', 'script'].indexOf(res.initiatorType) !== -1)
        .forEach(item => {
          const json = {
            name: item.name,
            httpcode: 200,
            time_redirect: item.redirectEnd - item.redirectStart,
            time_dns: item.domainLookupEnd - item.domainLookupStart,
            time_requestTime: item.responseEnd - item.requestStart,
            time_tcp: item.connectEnd - item.connectStart,
            initiatorType: getType(item.initiatorType),
            starttime: Math.floor(item.startTime),
            entryType: item.entryType,
            delay: Math.floor(item.duration) || 0,
            size: item.decodedBodySize || 0,
            nextHopProtocol: item.nextHopProtocol,
            type: getType(item.initiatorType),
          };
          resourceList.push(json);
        });
    } catch (err) {
      console.error('get resourceTiming err::::', err);
    }
    performance.clearResourceTimings();
    return resourceList;
  } catch (err) {
    console.warn('get performance happen error');
    return [];
  }
};
