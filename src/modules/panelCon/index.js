import Panel from '@/components/panel';
import { connect } from 'react-redux';

const mapStateToProps = (state = {} , ownProps) => {  
  return {
    isActive: ownProps.id === state.tabInfo.curTab.id,
    tabs: state.tabInfo.tabs,
    curTab: state.tabInfo.curTab
  }
}
export default connect(mapStateToProps)(Panel);
