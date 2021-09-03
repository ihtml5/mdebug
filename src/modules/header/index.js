import Header from '@/components/header';
import { connect } from 'react-redux';
import { selectTab } from '@/reducers/tab';

const mapStateToProps = (state = {}, ownProps) => {
  return {
    tabs: state.tabInfo.tabs,
    curTab: state.tabInfo.curTab,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectTab: data => {
      dispatch(selectTab(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
