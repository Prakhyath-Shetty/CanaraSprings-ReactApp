import { TOGGLE_LOADER } from './appActions.js'

const initialState=[];

function toggleLoader(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LOADER:
            return Object.assign({}, state, {
                isActive: !state.isActive
            })       
        default:
            return state
    }
  }

  export default toggleLoader;