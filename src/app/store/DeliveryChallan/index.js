import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeliveryChallan from '../../components/DeliveryChallan/DeliveryChallan';
import {fetchDeliveryChallanDetails,postDeliveryChallanData} from './actions';


const mapStateToProps = (state, ownProps) => {
    return {
      loading:state.deliveryChallan.loading,
      dcNumber:state.deliveryChallan.payload.dcNumber,
      products:state.deliveryChallan.payload.products,
      destinations:state.deliveryChallan.payload.destinations,
      lorryNumbers:state.deliveryChallan.payload.lorryNumbers,
      partyCodes:state.deliveryChallan.payload.partyCodes
    }
  }
  
const mapDispatchToProps = (dispatch, ownProps) =>
    bindActionCreators(
      {
        fetchDeliveryChallanDetails,
        postDeliveryChallanData
      },
      dispatch
    );
  

export const DeliverChallanCont = connect(mapStateToProps,mapDispatchToProps)(DeliveryChallan);
