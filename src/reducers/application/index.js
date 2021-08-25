const SELECTAPPLICATIONTAB = 'MDEBUG/SELECTAPPLICATIONTAB';

export const selectSubTb = data => ({
    type: SELECTAPPLICATIONTAB,
    data,
});


const selectApplication = (state = {
    storageType: 'LocalStorage',
}, action = {}) => {
    switch (action.type) {
        case SELECTAPPLICATIONTAB:

            return {
                ...state,
                storageType: action.data,
            };
        default:
            return state;
    }
}

export default selectApplication;

