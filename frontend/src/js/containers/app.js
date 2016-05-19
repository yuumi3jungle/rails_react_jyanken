import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JyankeGamePage from '../components/jyanken';
import * as jyankenActions from '../actions/jyanken';

const  mapStateToProps = (state) => ({scores : state.scores, status: state.status, tabIndex: state.tabIndex})
const  mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(jyankenActions, dispatch)})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JyankeGamePage)

