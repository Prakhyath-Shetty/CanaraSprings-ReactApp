import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/header';
import Body from './common/body';
import Footer from './common/footer';
import {PartyMasterCont} from './modules/PartyMaster';
import {DeliverChallanCont} from './modules/DeliveryChallan';
import Dashboard from './components/dashboard.jsx';
import NotFound from './components/notFoundPage';

export default class App extends Component {
  
  render() {
    return (
      <React.Fragment>
          <Header/>
          <Body>
            <Switch>
              <Route path='/reports' component={Header} />
              <Route path='/invoice' component={Footer} />
              <Route path='/deliverychallan' component={DeliverChallanCont} />
              <Route path='/stockmanegment' component={Body} />
              <Route path='/ratemaster' component={Body} />
              <Route path='/partymaster' component={PartyMasterCont} />
              <Route exact path='/' component={Dashboard} />
              <Route path='' component={NotFound} />
            </Switch>
          </Body>
          <Footer/>
      </React.Fragment>
    );
  }
}
