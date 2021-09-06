import { __DEV__ } from '@/utils';

const MDEBUGTOGGLE = 'MDEBUG/TOGGLE';
const MDEBUGSEARCH = 'MDEBUG/SEARCH';

export const setMdevTools = data => ({
  type: MDEBUGTOGGLE,
  data,
});

export const setKeywords = data => ({
  type: MDEBUGSEARCH,
  data,
});

const setSettings = (
  state = {
    mdevtools: {
      showDebug: __DEV__,
      height: 0.4,
    },
  },
  action = {},
) => {
  switch (action.type) {
    case MDEBUGTOGGLE:
      return {
        ...state,
        mdevtools: {
          ...state.mdevtools,
          ...action.data,
        },
      };
    case MDEBUGSEARCH:
      return {
        ...state,
        keywords: { ...state.keywords, ...action.data },
      };
    default:
      return state;
  }
};

export default setSettings;
