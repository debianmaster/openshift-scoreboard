import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  // in ECMAScript 6
axios.defaults.baseURL = location.href+'api';
axios.defaults.responseType= 'json';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      products:[]
    };
    var that = this;
    setInterval(function(){
      axios.get("/getuserscore")
        .then((response) => {
          console.log(response.data); 
          that.setState({products:response.data});
        })
        .catch((err) => {
        })
    },3000);
  }

  render() {
    return (
      <BootstrapTable data={this.state.products} striped={true} hover={true}>
        <TableHeaderColumn isKey={true} dataField="providerUserName">Participant</TableHeaderColumn>
        <TableHeaderColumn  dataField="score">Score</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
