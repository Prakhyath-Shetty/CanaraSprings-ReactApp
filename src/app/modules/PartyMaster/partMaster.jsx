import React, { Component } from 'react'
import ReactTable from 'react-table';


class PartyMaster extends Component {

  render() {
      const columns = [{
        Header: 'Code',
        accessor: 'code'
      }, {
        Header: 'Name',
        accessor: 'name'
      }, {
        Header: 'Address',
        accessor: 'address' 
      }, {
        Header: 'Category', 
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
                showPagination={false}
            />
          </section>
        </div>
      )
  }
}


export default PartyMaster;