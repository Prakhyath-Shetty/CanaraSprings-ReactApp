
import * as actionTypes from './actionTypes';


export const fetchDeliveryChallanDetails=()=>async (dispatch)=>{
    dispatch(requestDeliveryChallanDetails());
      const res = await fetch('http://localhost:4789/api/DeliveryChallan');
      const json = await res.json();
      dispatch(reciveDeliveryChallanDetails(json));
}

export const postDeliveryChallanData=(deliveryChallanData)=>async (dispatch)=>{
    debugger
    const res = await fetch('http://localhost:4789/api/DeliveryChallan', {
    method: 'post',
    headers: {
            'accept': 'application/json',
            'content-Type': 'application/json'
            },
    body: JSON.stringify(deliveryChallanData)});
    const json = await res.json();
    console.log("",json);

    // fetch('http://localhost:4789/api/values', 
    // { method: 'post',
    // headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // body: JSON.stringify(deliveryChallanData)}).then(function(response) {
    //     return response.json();
    //   }).then(function(data) {
    //     console.log("respond",data);
    // });
}


export function requestDeliveryChallanDetails() {
    return {
        type: actionTypes.FETCH_DELIVERYCHALLAN, 
        payload:{
            products:"",
            partyCodes:"",
            lorryNumbers:"",
            destinations:""
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