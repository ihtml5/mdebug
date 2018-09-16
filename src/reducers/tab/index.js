import { TABS } from '@/constants';

const SELECTTAB = 'MDEBUG/SELECTTAB';
const GETSOURCE = 'MDEBUG/GETSOURCE';

export const selectTab = data => ({
    type: SELECTTAB,
    data,
});

export const getSource = data => ({
    type: GETSOURCE,
    data,
});

const doSelectTab = (state = {
    curTab: {
        currentIndex: 0,
        id: 'mdebug-application',
    },
    tabs: TABS,
}, action = {}) => {
    switch (action.type) {
        case SELECTTAB:
            return {
                ...state,
                curTab: action.data,
            };
        case GETSOURCE:
            return {
                ...state,
                tabs: action.data,
            };
        default:
            return state;
    }
}

export default doSelectTab;

