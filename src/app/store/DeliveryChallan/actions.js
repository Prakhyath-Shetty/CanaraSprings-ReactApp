
import * as actionTypes from './actionTypes';


export const fetchDeliveryChallanDetails=()=>async (dispatch)=>{
    dispatch(requestDeliveryChallanDetails());
      const res = await fetch('http://localhost:4789/api/DeliveryChallan');
      const json = await res.json();
      dispatch(reciveDeliveryChallanDetails(json));
}

export const postDeliveryChallanData=(deliveryChallanData)=> async (dispatch)=>{
    console.log("deliveryChallanData",JSON.stringify(deliveryChallanData));
    const res = await fetch('http://localhost:4789/api/DeliveryChallan', {
                method: 'Post',
                headers: {
                    'accept': 'application/json',
                    'content-Type': 'application/json'
                    },
                body: JSON.stringify(deliveryChallanData)});
                
    console.log("deliveryChallanData",JSON.stringify(deliveryChallanData));
    const json = await res.json();
    console.log("res.json",json);
}


export function requestDeliveryChallanDetails() {
    return {
        type: actionTypes.FETCH_DELIVERYCHALLAN, 
        payload:{
            dcNumber:0,
            products:[],
            partyCodes:[],
            lorryNumbers:[],
            destinations:[]
        }, 
        loading:true
    };
}

export function reciveDeliveryChallanDetails(data) {
    return {type: actionTypes.FETCH_DELIVERYCHALLAN, payload:data, loading:false};
}

export function reciveRespondDeliveryChallanPost(data) {
    return {type: actionTypes.POST_DELIVERYCHALLAN, payload:data, redirectUrl:"", loading:false};
}