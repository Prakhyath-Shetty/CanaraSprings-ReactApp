import React, { Component } from 'react'

export default class Body extends Component {
  render() {
    return (
        <section className="cs-body">
                <ul className="cs-body__breadcrumbs"><li className="cs-body__breadcrumbs-item"><a>Delivery Challan</a></li><li className="cs-body__breadcrumbs-item"><a>Create New</a></li></ul>
                <div className="cs-body__container">                
                    <div className="cs-content">
                        {this.props.children}
                    </div>
                </div>
        </section>
    );
  }
}
