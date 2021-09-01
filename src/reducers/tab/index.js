import { TABS } from '@/constants';
import { emitter } from '@/utils/emitter';

const { trigger: emit } = emitter;

const SELECTTAB = 'MDEBUG/SELECTTAB';
const UPDATETAB = 'MDEBUG/UPDATETAB';
const FILTERTAB = 'MDEBUG/FILTERTAB';

export const selectTab = data => ({
  type: SELECTTAB,
  data,
});

export const updateTab = data => ({
  type: UPDATETAB,
  data,
});

export const filterTab = data => ({
  type: FILTERTAB,
  data,
});

const doSelectTab = (
  state = {
    curTab: {
      currentIndex: 0,
      id: 'mdebugSystem',
    },
    tabs: TABS,
    filter: [],
  },
  action = {},
) => {
  switch (action.type) {
    case SELECTTAB:
      emit('changeTab', {
        curTab: action.data,
      });
      return {
        ...state,
        curTab: action.data,
      };
    case UPDATETAB:
      const { tabs } = state;
      return {
        ...state,
        tabs: [...tabs, ...action.data],
      };
    case FILTERTAB:
      const { tabs: ntabs } = state;
      return {
        ...state,
        tabs: ntabs.filter(tab => {
          const alias = tab.id.slice(6).toLowerCase();
          if (Array.isArray(action.data)) {
            return action.data.indexOf(alias) < 0;
          }
          return [action.data].indexOf(alias) < 0;
        }),
      };
    default:
      return state;
  }
};

export default doSelectTab;
