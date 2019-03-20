import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';

export default class DeliveryChallan extends Component {
    
    state=[

    ];  

    handleChangePartyCode=()=>{
        console.log("prty");
    }
      
  render() {
    return (
      <div className="cs-form">
            <section className="cs-form__container">
                    <div className="row">
                        <div className="col-2">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Party Code</label> 
                                <Select className='cs-select' classNamePrefix="cs-select" 
                                value={this.state.partyCode}
                                onChange={this.handleChangePartyCode}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="cs-form__group">
                                <label className="cs-form__label">Name</label>
                                <div className="cs-form__data"></div>
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
                                <DatePicker className="cs-form__control cs-form__control--datepicker form-control"/>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
      </div>
    );
  }
}
