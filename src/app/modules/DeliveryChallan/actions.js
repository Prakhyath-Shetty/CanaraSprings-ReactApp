export const CREATE_DELIVERYCHALLAN="CREATE_DELIVERYCHALLAN";
export const FETCH_DELIVERYCHALLAN="FETCH_DELIVERYCHALLAN";

export const createDeliveryChallan=(data1)=>(dispatch)=>{
    console.log("called",data1);
    fetch('http://localhost:4789/api/values/Post', {
        method: 'post',
        body: JSON.stringify(data1)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
  });

};

export const getDeliveryChallanDetails=()=>async (dispatch)=>{
  dispatch(beforefetchDeliveryChallanDetails());
    const res = await fetch('http://localhost:4789/api/values');
    const json = await res.json();
    dispatch(fetchDeliveryChallanDetails(json));
};

export function createPostDeliveryChallan(payload) {
  return {type: CREATE_DELIVERYCHALLAN, payload};
}

export function beforefetchDeliveryChallanDetails() {
  return {type: FETCH_DELIVERYCHALLAN, payload:""};
}

export function fetchDeliveryChallanDetails(payload) {
  return {type: FETCH_DELIVERYCHALLAN, payload};
}