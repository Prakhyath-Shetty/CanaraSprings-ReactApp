import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import Grid from './../../components/grid.jsx';
import $ from 'jquery';


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
            partyCodes:[
                { value: '1097', label: '1097' ,name:'Executive Engineer(MSP), Karnataka Power Corpn. Ltd,Dandeli, 581325',destination:'Bengaluru'},
                { value: '1105', label: '1105' ,name:'Executive Engineer(MSP), Karnataka Power Corpn. Ltd,Jogfalls, 577435' ,destination:'Kozhikode'},
                { value: '1170', label: '1170',name:'M/S Raja Industrial Works, Garden Area, Shimoga,577201',destination:'Coimbatore' },
                { value: '1434', label: '1434' ,name:'The Stores Manager Beml Ltd., Mysore Truck Division, Belavadi Post Mysore,570018',destination:'Bengaluru'},
                { value: '1705', label: '1705' ,name:'Deputy Manager- Stores, Central Receipt Stores, metropolitan Transport Corp(Chennai) Ltd, Ayanavaram, Chennai, 600023',destination:'Bengaluru'},
                { value: '2250', label: '2250' ,name:'Executive Engineer(MSP), Karnataka Power Corpn. Ltd,Hosangadi, 576282',destination:'Bengaluru'}
            ],
            lorryNumberSelected:null,
            lorryNumbers:[                
                { value: 'KA-19-D-1188',label:'KA-19-D-1188',nameAddress:'nameAddress1'},
                { value: 'KA-19-D-3061',label:'KA-19-D-3061',nameAddress:'nameAddress2'},
                { value: 'KA-19-D-2100',label:'KA-19-D-2100',nameAddress:'nameAddress3'},
                { value: 'KA-19-D-7171',label:'KA-19-D-7171',nameAddress:'nameAddress4'},
                { value: 'KA-19-D-8596',label:'KA-19-D-8596',nameAddress:'nameAddress5'},
                { value: 'KA-19-D-9875',label:'KA-19-D-9875',nameAddress:'nameAddress6'},
                { value: 'KA-19-D-1235',label:'KA-19-D-1235',nameAddress:'nameAddress7'},
                { value: 'KA-19-D-9832',label:'KA-19-D-9832',nameAddress:'nameAddress8'},
                { value: 'KA-19-D-7423',label:'KA-19-D-7423',nameAddress:'nameAddress9'},
                { value: 'KA-19-D-8524',label:'KA-19-D-8524',nameAddress:'nameAddress10'}
            ],
            destinationSelected:null,
            destinations:[                
                { value: 'Bengaluru',label:'Bengaluru'},
                { value: 'Kozhikode',label:'Kozhikode'},
                { value: 'Coimbatore',label:'Coimbatore'},
                { value: 'Vijayawada',label:'Vijayawada'},
                { value: 'Hyderabad',label:'Hyderabad'},
                { value: 'Hubali',label:'Hubali'},
                { value: 'Chennai',label:'Chennai'}
            ]
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

    componentDidMount(){
        this.initDefaults()
    }

    focucNextControl(item){    
        console.log(item)    
        let all_inputs,all_input_array, new_index,move_to,current_input;
        
        all_inputs = "input,textarea,select";
        current_input = $(item.control).find("input[role='combobox']");
        

        all_input_array = $("body").find(all_inputs).filter(':visible');
        new_index = all_input_array.index(current_input) + 1;
        move_to = all_input_array.eq(new_index);
        move_to.focus();
        move_to.select();        
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
            return item.value.startsWith(keys) === true;
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
        //this.setState({ isLoading: true });
       
        setTimeout(() => {
          const { lorryNumbers } = this.state;
          const newOption = this.createOption(inputValue);
        
          this.setState({
            //isLoading: false,
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

    render(){
        const { partyCodeSelected,partyCodes,lorryNumberSelected,lorryNumbers , destinationSelected,destinations,name,nameAddress } = this.state;
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
                                <div className="cs-form__data">0</div>
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
                                <input type="number" className="cs-form__control form-control" placeholder=""/>                                    
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
                            <Grid/>
                        </section>
                    </div>
                    <div className="col-4">
                        <section className="cs-form__summary">
                            <div className="cs-form__summary-item">
                                <div className="cs-form__data">0</div>                                
                                <label className="cs-form__label">Total Quantity</label>                                
                            </div>
                            <div className="cs-form__summary-item">
                                <div className="cs-form__data">0</div>                                
                                <label className="cs-form__label">Total Weight</label>                                
                            </div>
                            <div className="cs-form__summary-item">
                                <div className="cs-form__data">0</div>                                
                                <label className="cs-form__label">Total Amount</label>                                
                            </div>
                            <div className="cs-form__summary-item">
                                <div className="cs-form__data">0</div>                                
                                <label className="cs-form__label">Discount %</label>                                
                            </div>
                            <div className="cs-form__summary-item">
                                <div className="cs-form__data">0</div>                                
                                <label className="cs-form__label">Bill Amount</label>                                
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
                        <button className="cs-btn btn">Save</button>
                        <button className="cs-btn btn">Cancel</button>
                    </span>
                </article>
            </div>    
        )
    }
}
