import { combineReducers } from 'redux';
import criteriaReducer from './criteriaReducer';
import criterionListReducer from './criterionListReducer';
import profileReducer from './profileReducer';
import screenReducer from './screenReducer';
import tagsReducer from './tagReducer';

export default combineReducers({
  profile: profileReducer,
  screen: screenReducer,
  criterionList: criterionListReducer,
  criteria: criteriaReducer,
  tag: tagsReducer,
});
