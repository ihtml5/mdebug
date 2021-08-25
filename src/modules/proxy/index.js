import { connect } from 'react-redux';
import { setKeywords } from '@/reducers/settings';
import ProxyAPI from '@/panels/proxy';

const mapStateToProps = (state = {}) => {
    return {
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
export default connect(mapStateToProps, mapDispatchToProps)(ProxyAPI)
