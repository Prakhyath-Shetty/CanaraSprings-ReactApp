
import * as actionTypes from './actionTypes';


export const fetchDeliveryChallanDetails=()=>async (dispatch)=>{
    dispatch(requestDeliveryChallanDetails());
      const res = await fetch('http://localhost:4789/api/DeliveryChallan');
      const json = await res.json();
      dispatch(reciveDeliveryChallanDetails(json));
}

export const postDeliveryChallanData=(deliveryChallanData)=> (dispatch)=>{
    // const res = await fetch('http://localhost:4789/api/DeliveryChallan', {
    //             method: 'Post',
    //             headers: {
    //                 'accept': 'application/json',
    //                 'content-Type': 'application/json'
    //                 },
    //             body: JSON.stringify(deliveryChallanData)});

    // const json =  res.json();
    // console.log("res.json",json);
    // console.log("res.json",json.PromiseValue);
    // if(res.ok===true){
    //     console.log("res.success",(res.ok));
    //     dispatch(reciveResponceDeliveryChallanPost);
    // } 

    try {
        fetch('http://localhost:4789/api/DeliveryChallan', {
            method: 'Post',
            headers: {
                'accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify(deliveryChallanData)})
            .then(function(response) {
                if(response.ok){
                    return response.json();
                }
            })
            .then(function(data) {
                console.log("data",data);
                if(data){
                    console.log(data);
                    dispatch(reciveResponceDeliveryChallanPost(data));
                }
                else{
                    //call dispatch 
                    alert("failed calling server")
                }
                
            });
    } catch (ex) {
        if(ex.responce && ex.responce.status===400){
             //call dispatch 
            alert("failed calling server");
        }
    }
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

export function reciveResponceDeliveryChallanPost(response) {
    return {type: actionTypes.POST_DELIVERYCHALLAN, status:response.status, error:response.error};
}