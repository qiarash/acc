import {combineReducers} from 'redux'

const user = (state=null,action) => {
  switch (action.type) {
    case 'USER_INFO':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default combineReducers({
  user,
});
