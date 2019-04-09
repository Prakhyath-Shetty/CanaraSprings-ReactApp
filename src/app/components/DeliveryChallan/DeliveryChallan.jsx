import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import Grid from '../grid';
import $ from 'jquery';
import { PacmanLoader } from 'react-spinners';


export default class DeliveryChallan extends React.Component{
    constructor(props) {
        super(props);           
        this.partyCodeSelectRef = React.createRef();
        this.lorryNumberSelectRef = React.createRef();
        this.destinationSelectRef =React.createRef();
        this.state = {
            startDate: new Date(),
            name:null,
            nameAddress:null,
            partyCodeSelected:null,
            partyCodes:[],
            lorryNumberSelected:null,
            lorryNumbers:[],
            destinationSelected:null,
            destinations:[],
            discount:"",
            data: [{"sn":1,"productNumber":"","quantity":0,"rate":0,"weight":0,"total":0}],
            products:[],
            dcNumber:null,
            totalQuantity:0,
            totalWeight:0,
            totalAmount:0,
            saveAmmount:0,
            billAmount:0,
            s:[{}]
        };
        this.initDefaults = this.initDefaults.bind(this);    
        this.handleDateChange = this.handleDateChange.bind(this); 
        this.handlePartyCodeChange = this.handlePartyCodeChange.bind(this);  
        this.handlePartyCodeAsyncChange = this.handlePartyCodeAsyncChange.bind(this);
        this.handleLorryNumberChange = this.handleLorryNumberChange.bind(this); 
        this.handleLorryNumberCreate = this.handleLorryNumberCreate.bind(this);
        this.handleDestinationChange = this.handleDestinationChange.bind(this);
        this.setName = this.setName.bind(this);
        this.setNameAddress = this.setNameAddress.bind(this);
        this.handleChangeDiscount=this.handleChangeDiscount.bind(this);
        this.handleSave=this.handleSave.bind(this);

        this.focucNextControl = this.focucNextControl.bind(this);
    }
    
    initDefaults(){
        let all_inputs,text_input,dropdowns_input,autocomplete;
        
        all_inputs = "input,textarea,select"
        text_input  = "input[type='text']:not('.cs-grid__textbox'), textarea,input[type='number']:not('.cs-grid__textbox')";
        

        $("body").on("keydown", text_input, function(e) {
          var enter_key,  input_array , move_to, new_index, self,enter_key_name;
          enter_key = 13;
          enter_key_name = 'enter';
      
          if (e.keyCode === enter_key || e.which === enter_key_name) {
            self = $(this);
      
            // some controls should react as designed when pressing enter
            if (e.keyCode === enter_key && (self.prop('type') === "submit" || self.prop('type') === "textarea")) {
              return true;
            }

            input_array = $("body").find(all_inputs).filter(':visible');
            new_index = input_array.index(this) + 1;
            move_to = input_array.eq(new_index);
            move_to.focus();
            move_to.select();
            e.preventDefault();            
          }
        });

        $(window).keyup(function(e) {
            if (e.ctrlKey && e.altKey && e.which === 83) {
                //ctrl + altKey + s
                alert("Saved");
            }else if (e.ctrlKey && e.altKey && e.which === 67){
                //ctrl + altKey + c
                alert("Cancel");
            }
        });
    }

    componentWillMount(){
        this.initDefaults();
        this.props.fetchDeliveryChallanDetails();
    }

    focucNextControl(item){
        let all_inputs,all_input_array, new_index,move_to,current_input;
        
        all_inputs = "input,textarea,select";
        current_input = $(item.control).find("input[role='combobox']");
        

        all_input_array = $("body").find(all_inputs).filter(':visible');
        new_index = all_input_array.index(current_input) + 1;
        move_to = all_input_array.eq(new_index);
        move_to.focus();
        move_to.select();        
    }

    componentWillReceiveProps(nextProps){
        const dcNumber=nextProps.dcNumber;
        this.setState({dcNumber})
        
        if(nextProps.products!==this.props.products){
            this.setState({products:nextProps.products});
        }

        if(nextProps.partyCodes!==this.props.partyCodes){
            const duplicatePartyCodes=[...nextProps.partyCodes]
            const Newpartycodes = duplicatePartyCodes.map(x=>({
                value:x.id,
                label:x.code,
                name:x.name +", "+x.address1,
                address1:x.address1,
                address2:x.address2,
                destination:x.destination}));
            this.setState({partyCodes:Newpartycodes});
        }

        if(nextProps.destinations!==this.props.destinations){
            const duplicateDestinations=[...nextProps.destinations]
            const NewLorryNumbers = duplicateDestinations.map(x=>({
                value:x.id,
                label:x.name,
                state:x.state.name}));
            this.setState({destinations:NewLorryNumbers});
        }

        if(nextProps.lorryNumbers!==this.props.lorryNumbers){
            const duplicateLorryNumbers=[...nextProps.lorryNumbers]
            const NewLorryNumbers = duplicateLorryNumbers.map(x=>({
                value:x.id,
                label:x.vehicleNumber,
                nameAddress:x.vehicleOwner.name +", "+x.vehicleOwner.address,
                address1:x.address1,
                address2:x.address2}));
            this.setState({lorryNumbers:NewLorryNumbers});
        }
    }

    handlePartyCodeChange(partyCodeSelected){
        this.setState({ partyCodeSelected });            
        this.setName(partyCodeSelected);   
        let curDestinationSelected = partyCodeSelected ? this.state.destinations.filter((item,key) => {return item.label === partyCodeSelected.destination}):[];
        this.handleDestinationChange(curDestinationSelected[0],true);
        this.focucNextControl(this.partyCodeSelectRef.current);       
    }

    handlePartyCodeAsyncChange(keys){
        let allPartyCodes = this.state.partyCodes,filteredPartyCodes=[];
        filteredPartyCodes = allPartyCodes.filter((item,key,items)=>{
            return item.label.startsWith(keys) === true;
        })
        if(filteredPartyCodes.length===1){
            this.setState({ partyCodeSelected:filteredPartyCodes[0] });     
        }
    }

    setName(partyCodeSelected){
        this.setState({ name: (partyCodeSelected ? partyCodeSelected.name :'NA')});
    }
 
    handleLorryNumberChange(lorryNumberSelected){
        this.setState({ lorryNumberSelected });        
        this.setNameAddress(lorryNumberSelected);
        this.focucNextControl(this.lorryNumberSelectRef.current.select);        
    }

    createOption(label){
        return{
           label,
           value: label.toLowerCase().replace(/\W/g, ''),
        }
    };

    handleLorryNumberCreate(inputValue){
        setTimeout(() => {
          const { lorryNumbers } = this.state;
          const newOption = this.createOption(inputValue);
        
          this.setState({
            lorryNumbers: [...lorryNumbers, newOption],
            lorryNumberSelected: newOption,
          });
        }, 1000);
    };

    setNameAddress(lorryNumberSelected){
        this.setState({ nameAddress: (lorryNumberSelected ? lorryNumberSelected.nameAddress:'NA')});
    }

    handleDestinationChange(destinationSelected,isNoFocus){
        this.setState({ destinationSelected });
        if(!isNoFocus) this.focucNextControl(this.destinationSelectRef.current);        
    }

    handleDateChange(date) {
        this.setState({startDate: date});
    }

    handleChangeDiscount(e){
        this.setState({discount:e.currentTarget.value},function () {
            this.handleBillCalculation();
            });
    }

    handleUpdateGridData=data=>{
        this.setState({data},function () {
            this.handleBillCalculation();
            });
    }

    handleUpdateGridNewData=newData=>{
        this.setState({ data:newData },function () {
            this.handleBillCalculation();
            });
    }

    handleBillCalculation=()=>{
        const {discount,data}=this.state;
        const totalQuantity = data.reduce(function(prev, cur) {
            return parseInt(prev) + parseInt(cur.quantity);
          }, 0);
          this.setState({totalQuantity});
          
        //   if(isNaN(caltotalQuantity)){
        //     this.setState({totalQuantity:0});
        //   }
        //   else{
        //     this.setState({totalQuantity:caltotalQuantity});
        //   }
         
        const totalWeight= data.reduce(function(prev, cur) {
            return parseInt(prev) + parseInt(cur.quantity * cur.weight);
        }, 0);
        this.setState({totalWeight});

        const totalAmount = data.reduce(function(prev, cur) {
            return parseInt(prev) + parseInt(cur.total);
        }, 0);
        this.setState({totalAmount});

        const saveAmmount = parseFloat((totalAmount*discount) / 100);
        this.setState({saveAmmount});

        const billAmount = totalAmount-saveAmmount;
        this.setState({billAmount});
    };

    handleSave(){
        // var current_date = this.state.startDate;  
        // console.log(current_date);
        // // Convert minutes Offset in hours offset
        //  var utc_offset_hours = current_date.getTimezoneOffset() / 60;  
        //  utc_offset_hours = (-1) * utc_offset_hours;
        //  console.log(utc_offset_hours);

        // var dd = this.state.startDate.getDate();
        // var mm = this.state.startDate.getMonth();
        // var yy = this.state.startDate.getFullYear();
        // var fulldate = dd + "-" + mm + "-" + yy;
        console.log(this.state.data);
        
        const deliveryChallanData=[{
            PartyId:this.state.partyCodeSelected.value,
            VehicleId:(this.state.lorryNumberSelected.value).toString(),
            DcNumber:this.state.dcNumber,
            DestinationId:this.state.destinationSelected.value,
            TotalQuantity:this.state.totalQuantity,
            Weight:this.state.totalWeight,
            BillAmount:this.state.billAmount,
            ProductDetails:this.state.data,
            DeliveryChallanDate:this.state.startDate,
            Discount:this.state.discount,
        }];
        this.props.postDeliveryChallanData(deliveryChallanData);
    }

    render(){
        const { partyCodeSelected,partyCodes,lorryNumberSelected,lorryNumbers,destinationSelected,destinations,name,nameAddress,discount,totalQuantity,totalWeight,totalAmount,saveAmmount,billAmount,dcNumber } = this.state;

        if(this.props.loading){
        return ( 
                <div className="cs-form">
                    <div align="center">
                        <PacmanLoader
                            size={20}
                            color="#3A9CEE"
                            loading={this.props.products.loading}
                        />
                    </div>
                </div> 
            );
        }
        else
        {
            return(                                   
            <div className="cs-form">
                <section className="cs-form__container">
                    <div className="row">
                        <div className="col-2">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Party Code</label> 
                                <Select className='cs-select' classNamePrefix="cs-select"
                                    value={partyCodeSelected}
                                    onChange={this.handlePartyCodeChange}
                                    options={partyCodes} autoFocus={true} ref={this.partyCodeSelectRef}
                                    onInputChange={this.handlePartyCodeAsyncChange}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Name</label>
                                <div className="cs-form__data">{name===null ? 'NA':name}</div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="cs-form__group">
                                <label className="cs-form__label">D.C. No</label>
                                <div className="cs-form__data">{dcNumber}</div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Date</label>   
                                <div className="cs-datepicker">
                                <DatePicker className="cs-form__control cs-form__control--datepicker form-control"
                                    selected={this.state.startDate}  onChange={this.handleDateChange}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cs-form__container">
                    <div className="row">
                        <div className="col-2">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Lorry Number</label>
                                <Select.Creatable className='cs-select' classNamePrefix="cs-select" ref={this.lorryNumberSelectRef}
                                    value={lorryNumberSelected}
                                    onChange={this.handleLorryNumberChange}
                                    options={lorryNumbers}
                                    //isSearchable ={true}
                                    onCreateOption={this.handleLorryNumberCreate}
                                />
                                
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Owner's Name and Address</label>
                                <div className="cs-form__data">{nameAddress===null ? 'NA':nameAddress}</div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Destination</label>
                                <Select className='cs-select' classNamePrefix="cs-select" ref={this.destinationSelectRef}
                                    value={destinationSelected}
                                    onChange={this.handleDestinationChange}
                                    options={destinations}
                                />
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Discount</label>
                                <input type="number" className="cs-form__control form-control" placeholder=""
                                name="discount"
                                value={discount===isNaN?0:discount}
                                onChange={this.handleChangeDiscount}/>                                    
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="cs-form__group">
                                <label className="cs-form__label">INV. No.</label>
                                <div className="cs-form__data">NA</div>                                    
                            </div>
                        </div>
                    </div>
                </section>
                <div className="row">
                    <div className="col-8">
                        <section className="cs-form__container cs-form__container--mHeight150">                           
                            <Grid
                                {...this.state}
                                handleUpdateData={this.handleUpdateGridData}
                                handleUpdateNewData={this.handleUpdateGridNewData}
                            />
                        </section>
                    </div>
                    <div className="col-4">
                        <section className="cs-form__summary">
                            <div className="cs-form__summary-item">
                                <label className="cs-form__label">Total Quantity</label>                                
                                <div className="cs-form__data">{totalQuantity}</div>   
                            </div>
                            <div className="cs-form__summary-item">                                                            
                                <label className="cs-form__label">Total Weight</label> 
                                <div className="cs-form__data">{totalWeight}</div>                                   
                            </div>
                            <div className="cs-form__summary-item">                                                            
                                <label className="cs-form__label">Total Amount</label> 
                                <div className="cs-form__data">{totalAmount}</div>                                   
                            </div>
                            <div className="cs-form__summary-item">                                                               
                                <label className="cs-form__label">Discount {discount===0?"":discount}%</label> 
                                <div className="cs-form__data">{saveAmmount}</div>                                   
                            </div>
                            <div className="cs-form__summary-item">                                                 
                                <label className="cs-form__label">Bill Amount</label> 
                                <div className="cs-form__data">{billAmount}</div>                                   
                            </div>
                        </section>
                        <section className="cs-form__container" style={{'display':'none'}}>
                            <div className="cs-form__group row">
                                <label className="col-sm-8 cs-form__label">Total Quantity</label>
                                <div className="col-sm-4">
                                    <div className="cs-form__data">0</div>
                                </div>
                            </div>
                            <div className="cs-form__group row">
                                <label className="col-sm-8 cs-form__label">Total Weight</label>
                                <div className="col-sm-4">
                                    <div className="cs-form__data">0</div>
                                </div>
                            </div>
                            <div className="cs-form__group row">
                                <label className="col-sm-8 cs-form__label">Total Amount</label>
                                <div className="col-sm-4">
                                    <div className="cs-form__data">0</div>
                                </div>
                            </div>
                            <div className="cs-form__group row">
                                <label className="col-sm-8 cs-form__label">Discount %</label>
                                <div className="col-sm-4">
                                    <div className="cs-form__data">0</div>
                                </div>
                            </div>
                            <div className="cs-form__group row">
                                <label className="col-sm-8 cs-form__label">Bill Amount</label>
                                <div className="col-sm-4">
                                    <div className="cs-form__data">0</div>
                                </div>
                            </div>
                        </section>
                    </div>                                
                </div>                            
                <article className="cs-form__actions">
                    <span className="float-right">
                        <button className="cs-btn btn" onClick={this.handleSave}>Save</button>
                        <button className="cs-btn btn">Cancel</button>
                    </span>
                </article>
            </div>    
            )
        }
    }
}
