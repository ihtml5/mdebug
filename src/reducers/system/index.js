const GETPERFORMANCE = 'MDEBUG/GETPERFORMANCE';

export const getPerformance = data => ({
    type: GETPERFORMANCE,
    data,
});


const doPerformance = (state = {
    performance: {},
    page: {
        url: window.location.href,
        ua: navigator.userAgent,
    },
}, action = {}) => {
    switch (action.type) {
        case GETPERFORMANCE:

            return {
                ...state,
                performance: action.data,
            };
        default:
            return state;
    }
}

export default doPerformance;

