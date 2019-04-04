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
    
    this.renderEditable = this.renderEditable.bind(this);
    this.renderAutocomplete =this.renderAutocomplete.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.navigate =this.navigate.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.isNumeric = this.isNumeric.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  isNumeric(e){
    const x=e.which||e.keycode;
    if((x>=48 && x<=57) || x==8 ||
      (x>=35 && x<=40)|| x==46)
      return true;
    else
      return false;
  }

  isAlphanumeric(e){
    const TCode = e.currentTarget.value;
    const x=e.which||e.keycode;
    if((x>=48 && x<=57) || x==8 || (x>=35 && x<=40)|| x==46 || (x>64 && x<91) || (x>96 && x<123))
      return true;
    else
      return false;
  }

  onKeyDown(e,isNumericOnly){      
    
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
        break;
      }
    } 
    
    if(isNumericOnly){
      if (!this.isNumeric(e)) e.preventDefault();
    }else{
      if (!this.isAlphanumeric(e)) e.preventDefault();
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
    let newData = this.props.data;
    if(newData.length>0){
        const slNo = this.props.data[this.props.data.length-1].sn;
        newData.push(
            {"sn":slNo + 1,"productNumber":"","quantity":0,"rate":0,"weight":0,"total":0}
        )
    }else{
      newData.push(
        {"sn":1,"productNumber":"","quantity":0,"rate":0,"weight":0,"total":0}
      )
    }
    console.log("newData",newData)
    this.props.handleUpdateNewData(newData);
  }

  deleteRow(cellInfo){
    let newData = this.props.data;
    newData = newData.filter((item,key)=>{
        return key !== cellInfo.index
    });
    this.props.handleUpdateNewData(newData);
    
  }
  
  renderEditable(cellInfo) {
    return (   
      <input className="cs-grid__textbox" type="text"
            value={this.props.data[cellInfo.index][cellInfo.column.id]}    

            onKeyDown={(e)=>{
              this.onKeyDown(e,true);             
            }}
            onChange={e => {
              
                const data = [...this.props.data];
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
            items={this.props.products}
            shouldItemRender={(item, value) =>{   
              //console.log("partNumber-",item.partNumber.toLowerCase().replace(/[^0-9a-zA-Z]/g, ""),"value-",value.toLowerCase())           
              return  item.partNumber.toLowerCase().replace(/[^0-9a-zA-Z]/g, "").indexOf(value.toLowerCase()) > -1
            }}
            getItemValue={item => item.partNumber}
            renderItem={(item, highlighted) =>
            <div key={item.id}  style={{ backgroundColor: highlighted ? '#eee' : 'transparent',padding:'5px'}}>
                {item.partNumber}
            </div>
            }
            value={this.props.data[cellInfo.index][cellInfo.column.id]} 
            onChange={e => {
                const data = [...this.props.data];
                data[cellInfo.index][cellInfo.column.id] = e.target.value;              
                this.setState({ data });
            }}
            onSelect={(e,value) =>{
                const data = [...this.props.data];
                data[cellInfo.index][cellInfo.column.id] = value.partNumber;
                if(cellInfo.column.id==='productNumber'){
                    data[cellInfo.index]['rate'] = value.rate 
                    data[cellInfo.index]['weight'] = value.weight
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
    const { data } = this.props;
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
