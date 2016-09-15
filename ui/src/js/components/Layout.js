import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  // in ECMAScript 6
// or
//var ReactBsTable = require("react-bootstrap-table");
//var BootstrapTable = ReactBsTable.BootstrapTable;
//var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      products:[]
    };
    var that = this;
    setInterval(function(){
      axios.get("http://localhost:8082/getuserscore")
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
        <TableHeaderColumn isKey={true} dataField="name">Participant</TableHeaderColumn>
        <TableHeaderColumn  dataField="score">Score</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
