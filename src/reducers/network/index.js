const GETNETWORK = 'MDEBUG/NETWORK';

export const getNetWork = data => ({
  type: GETNETWORK,
  data,
});

const setNetWork = (state = [], action = {}) => {
  switch (action.type) {
    case GETNETWORK:
      return [...state, action.data];
    default:
      return state;
  }
};

export default setNetWork;
