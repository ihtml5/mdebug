import Network from '@/panels/network';
import { connect } from 'react-redux';
import { setKeywords } from '@/reducers/settings';

const mapStateToProps = (state = {}) => {
    return {
        network: state.network,
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
export default connect(mapStateToProps, mapDispatchToProps)(Network)
