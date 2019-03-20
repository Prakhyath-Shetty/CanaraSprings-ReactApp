import React, { Component } from 'react'
import ReactTable from 'react-table';
import { bindActionCreators } from 'redux';

import "react-table/react-table.css";
import { connect } from 'react-redux';
import {fetchPartyMaster} from './actions';

class PartyMaster extends Component {

  render() {
    
      const columns = [{
        Header: 'Code',
        accessor: 'code' // String-based value accessors!
      }, {
        Header: 'Name',
        accessor: 'name'
      }, {
        Header: 'Address',
        accessor: 'address' // Custom value accessors!
      }, {
        Header: 'Category', // Custom header components!
        accessor: 'category'
      }]
     
      return (
        
        <div>
          <section className="cs-form__container">  
          <h4>Party Master</h4>
          <br />
              <ReactTable
                data={this.props.data}
                columns={columns}
                defaultPageSize={10}
                style={{
                  maxHeight: "250px" 
                }} 
                className="cs-grid" 
                minRows = {0}
            />
          </section>
        </div>
      )
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(fetchPartyMaster, dispatch) }
}

function mapStateToProps(state){
  return {
    data: state.partymasterReducers,
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(PartyMaster);