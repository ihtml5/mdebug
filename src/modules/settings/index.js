import Settings from '@/panels/settings';
import { connect } from 'react-redux';
import { setMdevTools } from '@/reducers/settings';

const mapStateToProps = (state = {}) => {
  return {
    settings: state.settings,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateSettings: data => {
      dispatch(setMdevTools(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
