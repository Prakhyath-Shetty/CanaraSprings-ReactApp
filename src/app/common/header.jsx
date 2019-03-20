import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
        <header className="cs-header">
            <div className="cs-header__logo">CanaraSprings</div>
            <nav className="cs-nav">
                <ul className="cs-nav__list">
                    <li className="cs-nav__list-item"><NavLink to="/">Dashboard</NavLink></li>
                    <li className="cs-nav__list-item"><NavLink to="/partymaster">Party Master</NavLink></li>
                    <li className="cs-nav__list-item"><NavLink to="/ratemaster">Rate Master</NavLink></li>
                    <li className="cs-nav__list-item"><NavLink to="/stockmanegment">Stock Management</NavLink></li>
                    <li className="cs-nav__list-item"><NavLink to="/deliverychallan">Delivery Challan</NavLink></li>
                    <li className="cs-nav__list-item"><NavLink to="/invoice">Invoice</NavLink></li>
                    <li className="cs-nav__list-item"><NavLink to="/reports">Reports</NavLink></li>
                </ul>
            </nav>
            <ul className="cs-header__toolbar">
                <li className="cs-header__toolbar-item" title="username"><i className="far fa-user-circle"></i>Naveen</li>
                <li className="cs-header__toolbar-item" title="logout"><i className="fas fa-sign-out-alt"></i>Logout</li>
            </ul>
        </header>
    );
  }
}
