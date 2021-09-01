import { connect } from 'react-redux';
import { setMdevTools, setKeywords } from '@/reducers/settings';
import ToolBar from '@/components/toolbar';

const mapStateToProps = state => {
  return {
    mdevtools: state.settings.mdevtools,
    keywords: state.settings.keywords,
    tabInfo: state.tabInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowDebug: data => dispatch(setMdevTools(data)),
    onKeywords: data => dispatch(setKeywords(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
