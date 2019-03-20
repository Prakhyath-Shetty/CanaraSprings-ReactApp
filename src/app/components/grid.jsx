import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import ReactAutocomplete from 'react-autocomplete';
import Select from 'react-select';
import $ from 'jquery';

export default class Grid extends React.Component {
  constructor() {
    super();
    this.gridRef = React.createRef();
    this.state = {
      data: [
          {"sn":1,"productNumber":"","quantity":0,"rate":0,"total":0}       
      ],
      products:[              
        { id: '1', label: '125.06/A2', rate:1400},
        { id: '2', label: '125.06/AM', rate:2320},
        { id: '3', label: '125.06/2P', rate:150},
        { id: '4', label: '125.063', rate:230},
        { id: '5', label: '125.064', rate:4500 },
        { id: '5', label: '125.06/AM1', rate:180 }
        ]
    };
    this.renderEditable = this.renderEditable.bind(this);
    this.renderAutocomplete =this.renderAutocomplete.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.navigate =this.navigate.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  onKeyDown(e){      
    if(e.keyCode===13||e.which===13){
        e.preventDefault();   
        const currentCell = $(e.currentTarget).parents(".rt-td");
        const currentRow = $(e.currentTarget).parents(".rt-tr-group");
        if(currentCell.next(".rt-td").length > 0 && currentCell.next(".rt-td").find(".cs-grid__textbox,input[role='combobox']").length > 0){
            currentCell.next(".rt-td").find(".cs-grid__textbox,input[role='combobox']").focus();
            currentCell.next(".rt-td").find(".cs-grid__textbox").select()
        }else{
            if(!currentRow.next(".rt-tr-group").length>0){
                this.addRow();
            }else{              
                currentRow.next(".rt-tr-group").find(".rt-tr .rt-td:eq(1)").find(".cs-grid__textbox,input[role='combobox']").focus();             
            }
        }       
     }
     else{
       
        const strLen = e.currentTarget.value.toString().length;
       
        switch(e.keyCode){
          case 37 : 
            if(e.currentTarget.selectionStart === 0){
              this.navigate($(e.currentTarget),'prev')
            }
          break;
          case 38:
            this.navigate($(e.currentTarget),'up')
          break;
          case 39:
            if((strLen - e.currentTarget.selectionStart) === 0){
              this.navigate($(e.currentTarget),'next')
            }           
          break;
          case 40:
            this.navigate($(e.currentTarget),'down')
          break
        }
     }
  }

  navigate(item,dir){
    const currentIndex =  item.parents(".rt-td").index();
    const currentRow = item.parents(".rt-tr-group");
    const currentCell = item.parents(".rt-td");

    if(dir ==='next' || dir === 'prev'){    
        if(currentCell[dir](".rt-td").length > 0){
            currentCell[dir](".rt-td").find(".cs-grid__textbox,input[role='combobox']").focus();
            currentCell[dir](".rt-td").find(".cs-grid__textbox").select()
        }  
    }else if(dir ==='up'){             
        if(currentRow.prev(".rt-tr-group").length>0){                      
            currentRow.prev(".rt-tr-group").find(".rt-tr .rt-td:eq("+currentIndex+")").find(".cs-grid__textbox,input[role='combobox']").focus();             
        }
    }else if(dir ==='down'){            
        if(currentRow.next(".rt-tr-group").length>0){                      
            currentRow.next(".rt-tr-group").find(".rt-tr .rt-td:eq("+currentIndex+")").find(".cs-grid__textbox,input[role='combobox']").focus();             
        }
    }
  }

  addRow(){
    let newData = this.state.data;
    if(newData.length>0){
        const slNo = this.state.data[this.state.data.length-1].sn;
        newData.push(
            {"sn":slNo + 1,"productNumber":"","quantity":0,"rate":0,"total":0}
        )
    }else{
      newData.push(
        {"sn":1,"productNumber":"","quantity":0,"rate":0,"total":0}
      )
    }
    
    this.setState(state => ({
        data: newData
    }));
  }

  deleteRow(cellInfo){
    let newData = this.state.data;
    newData = newData.filter((item,key)=>{
        return key !== cellInfo.index
    });
    this.setState(state => ({
      data: newData
    }));
    
  }
  
  renderEditable(cellInfo) {
    return (   
      <input className="cs-grid__textbox" type="text"
            value={this.state.data[cellInfo.index][cellInfo.column.id]}             
            onKeyDown={(e)=>{this.onKeyDown(e,cellInfo)}}
            onChange={e => {
              
                const data = [...this.state.data];
                data[cellInfo.index][cellInfo.column.id] = e.target.value;
                if(cellInfo.column.id==='rate'||cellInfo.column.id==='quantity'){
                    data[cellInfo.index]['total'] = parseInt(data[cellInfo.index]['rate']) * data[cellInfo.index]['quantity'] 
                }
                
                this.setState({ data });
            }}
        />
    );
  }

  renderAutocomplete(cellInfo){
      return(
        <ReactAutocomplete 
            items={this.state.products}
            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.label}
            renderItem={(item, highlighted) =>
            <div
                key={item.id}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
                {item.label}
            </div>
            }
            value={this.state.data[cellInfo.index][cellInfo.column.id]} 
            onChange={e => {
                const data = [...this.state.data];
                data[cellInfo.index][cellInfo.column.id] = e.target.value;               
               
                this.setState({ data });
            }}
            onSelect={(e,value) =>{
                const data = [...this.state.data];
                data[cellInfo.index][cellInfo.column.id] = value.label;
                if(cellInfo.column.id==='productNumber'){
                    data[cellInfo.index]['rate'] = value.rate 
                }
                this.setState({ data });
                const row = $(".cs-grid").find(".rt-tbody .rt-tr-group")[cellInfo.index];
                const col = $(row).find('.rt-tr .rt-td')[2];
                $(col).find(".cs-grid__textbox").focus();
                $(col).find(".cs-grid__textbox").select();
            }}
            inputProps = {{'onKeyDown':this.onKeyDown}}            
        />
        );
  }

  renderAction(cellInfo){
    return(
      <button className="cs-btn cs-btn--link btn" onClick={()=>this.deleteRow(cellInfo)}><i className="fas fa-trash-alt"></i></button>
    )
  }
  render() {
    const { data } = this.state;
    return (
        <React.Fragment>
          <div className="clearfix m-b-1"><button className="float-right cs-btn btn cs-btn--link" onClick={()=>{this.addRow()}}><i className="fas fa-plus m-r-1"></i>Add</button></div>
          <ReactTable
            data={data}
            columns={[
              {
                  Header: "Sl. No.",
                  accessor: "sn"
                  //Cell: this.renderEditable
              },
              {
                Header: "Product Number",
                accessor: "productNumber",
                Cell: this.renderAutocomplete
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                Cell: this.renderEditable
              },
              {
                Header: "Rate",
                id: "rate",
                Cell: this.renderEditable
              },
              {
                  Header: "Total",
                  id: "total",
                  Cell: this.renderEditable
              },
              {
                Header: "Action",
                id: "total",
                Cell: this.renderAction
              }
            ]}
            defaultPageSize={10}
            style={{
              maxHeight: "250px"
            
            }}         
            className="cs-grid" 
            minRows = {0}
            ref={this.gridRef}
            showPagination={false}
          />  
        </React.Fragment>
             
      
    );
  }
}
