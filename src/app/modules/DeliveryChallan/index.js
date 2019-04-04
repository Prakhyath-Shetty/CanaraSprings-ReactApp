import { connect } from 'react-redux';
import DeliveryChallan from './deliveryChallan.jsx';
import { bindActionCreators } from 'redux';

import {createDeliveryChallan} from './actions';
import {getDeliveryChallanDetails} from './actions';


const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps",state.deliveryChallan);
    return {
      products:state.deliveryChallan
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators(
      {
        createDeliveryChallan,
        getDeliveryChallanDetails
      },
      dispatch
    );
  

export const DeliverChallanCont = connect(mapStateToProps,mapDispatchToProps)(DeliveryChallan);
