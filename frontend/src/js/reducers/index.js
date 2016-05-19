import { combineReducers } from 'redux'
import {
  RECEIVE_SCORES, RECEIVE_STATUS, SELECT_TAB
} from '../actions/jyanken'


const scores = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SCORES:
      return action.scores
    default:
      return state
  }
}

const status = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STATUS:
      return action.status
    default:
      return state
  }
}

const tabIndex = (state = 0, action) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tabIndex
    default:
      return state
  }
}

export default combineReducers({
  scores,
  status,
  tabIndex
})
