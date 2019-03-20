import * as ActionTypes from './actions';

const partymasterReducers=(state=[],action)=>{
    switch(action.type){
        case ActionTypes.GET_PARTYMASTER: 
            return {...state,
                payload:action.payload
            }

        default: 
            return state;

    }
}

export default partymasterReducers;