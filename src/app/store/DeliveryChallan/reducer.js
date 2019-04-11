import * as actionTypes from './actionTypes';

let intialstate={
        payload:{
            dcNumber:0,
            products:[],
            partyCodes:[],
            lorryNumbers:[],
            destinations:[]
        },
        loading:true
    }


const deliveryChallanReducers=(state=intialstate,action)=>{
    switch(action.type){
        case actionTypes.FETCH_DELIVERYCHALLAN:
        console.log( "reducer",action.payload);
            return {...state,
                payload:action.payload,
                loading:action.loading
            }
        default: 
            return state;
    }
}

export default deliveryChallanReducers;