export const getResonse = curTarget => {
  try {
    if (!curTarget) {
      return null;
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText#Exceptions
    const { responseType, response = null, responseText = null } = curTarget;
    const isReponseTextType = ['', 'text'].indexOf(responseType) !== -1;
    if (isReponseTextType) {
      return responseText;
    } else if (responseType === 'json') {
      return response;
    }
  } catch (err) {
    console.warn(`getResponse ${err}`);
  }
};

export const getAjaxHeaders = request => {
  // Create a map of header names to values
  const headerMap = {};

  try {
    const headers = request.getAllResponseHeaders();

    // null if no response has been received. If a network error happened, an empty string is returned.
    if (headers === null || headers === '') {
      return headerMap;
    }

    // Convert the header string into an array
    // of individual headers
    const arr = headers.trim().split(/[\r\n]+/);

    arr.forEach(line => {
      const parts = line.split(': ');
      const header = parts.shift();
      const value = parts.join(': ');
      headerMap[header] = value;
    });
  } catch (error) {
    console.error(`get ajax header error. ${error}`);
  }

  return headerMap;
};

export const getFetchHeaders = resp => {
  const headerMap = {};
  if (!resp || !resp.headers) return headerMap;

  try {
    for (const pair of resp.headers.entries()) {
      headerMap[pair[0]] = pair[1];
    }
  } catch (error) {
    console.error(`get fetch header error. ${error}`);
  }

  return headerMap;
};
