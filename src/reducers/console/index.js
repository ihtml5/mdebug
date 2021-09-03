const GETCONSOLE = 'MDEBUG/CONSOLE';

export const getConsole = data => ({
  type: GETCONSOLE,
  data,
});

const setConsole = (state = [], action = {}) => {
  switch (action.type) {
    case GETCONSOLE:
      return [...state, action.data];
    default:
      return state;
  }
};

export default setConsole;
