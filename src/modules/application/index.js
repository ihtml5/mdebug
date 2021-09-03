import Application from '@/panels/application';
import { connect } from 'react-redux';
import { selectSubTb } from '@/reducers/application';
import { setKeywords } from '@/reducers/settings';

const mapStateToProps = (state = {}, ownProps) => {
  return {
    storageType: state.application.storageType,
    keywords: state.settings.keywords,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSelectTab: data => {
      dispatch(selectSubTb(data));
    },
    onSetKeywords: data => {
      dispatch(setKeywords(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Application);
