import MPerformance from '@/panels/performance';
import { connect } from 'react-redux';
import { getPerformance } from '@/reducers/system';

const mapStateToProps = (state = {}, ownProps) => {
    return {
        isActive: ownProps.id === state.tabInfo.curTab.id,
        tabs: state.tabInfo.tabs,
        curTab: state.tabInfo.curTab,
        system: state.system,
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        getPerformance: data => {
            dispatch(getPerformance(data));
        }
    })
};
export default connect(mapStateToProps, mapDispatchToProps)(MPerformance)
