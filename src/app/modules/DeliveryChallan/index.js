import { connect } from 'react-redux';
import DeliveryChallan from './deliveryChallan.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSave: ()=>{
          alert('Saved');
        }
    }
  }

export const DeliverChallanCont = connect(mapStateToProps,mapDispatchToProps)(DeliveryChallan);
