import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/header';
import Body from './common/body';
import Footer from './common/footer';
import Dashboard from './components/dashboard.jsx';
import {DeliverChallanCont} from './store/DeliveryChallan/index';
import Commingsoon from './components/commingsoon';
import NotFound from './components/notFoundPage';

export default class App extends Component {
  
  render() {
    return (
      <React.Fragment>
          <Header/>
          <Body>
            <Switch>
              <Route path='/reports' component={Commingsoon} />
              <Route path='/invoice' component={Commingsoon} />
              <Route path='/deliverychallan' component={DeliverChallanCont} />
              <Route path='/stockmanegment' component={Commingsoon} />
              <Route path='/ratemaster' component={Commingsoon} />
              <Route path='/partymaster' component={Commingsoon} />
              <Route exact path='/' component={Dashboard} />
              <Route path='' component={NotFound} />
            </Switch>
          </Body>
          <Footer/>
      </React.Fragment>
    );
  }
}
