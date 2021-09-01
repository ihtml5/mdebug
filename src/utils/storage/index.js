export const setSessionLog = data => {
  const mdebuglog = window.sessionStorage.getItem('mdebugconsolelog');
  const logcnt = JSON.parse(mdebuglog);
  logcnt.push(data);
  window.sessionStorage.setItem('mdebugconsolelog', JSON.stringify(logcnt));
};
export const setCooKie = (name, value, Days = 30) => {
  const exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
};
