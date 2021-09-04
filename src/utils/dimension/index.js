export const getClientInfo = () => {
  const width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  const height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return {
    width,
    height,
  };
};
