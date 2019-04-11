import * as actionTypes from './actionTypes';

let intialstate={
        payload:{
            dcNumber:0,
            products:[],
            partyCodes:[],
            lorryNumbers:[],
            destinations:[],
            status:''
        },
        loading:true
    }


const deliveryChallanReducers=(state=intialstate,action)=>{
    console.log("action.status",action.status)
    switch(action.type){
        case actionTypes.FETCH_DELIVERYCHALLAN:
            return {...state,
                payload:action.payload,
                loading:action.loading
            }
        case actionTypes.POST_DELIVERYCHALLAN:
        
            return {...state,
                status:action.status
            }
        default: 
            return state;
    }
}

export default deliveryChallanReducers;