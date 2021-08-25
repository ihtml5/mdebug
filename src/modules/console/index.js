import Console from '@/panels/console';
import { connect } from 'react-redux';
import { setKeywords } from '@/reducers/settings';

const mapStateToProps = (state = {}) => {
    return {
        consoleinfo: state.console,
        keywords: state.settings.keywords,
    }
};
const mapDispatchToProps = (dispatch) => {
    return ({
        onSetKeywords: data => {
            dispatch(setKeywords(data))
        }
    })
};
export default connect(mapStateToProps, mapDispatchToProps)(Console)
