import {CREATE_DELIVERYCHALLAN,FETCH_DELIVERYCHALLAN} from './actions';

let intialstate={
        payload:""
    }


const deliveryChallanReducers=(state=intialstate,action)=>{
    switch(action.type){
        case CREATE_DELIVERYCHALLAN: 
            return {...state,
                payload:action.payload
            }
        case FETCH_DELIVERYCHALLAN:
        console.log( "reducer payload",action.payload);
            return {...state,
                payload:action.payload

            }
        default: 
            return state;
    }
}

export default deliveryChallanReducers;