import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';  // in ECMAScript 6
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.responseType= 'json';
axios.defaults.headers.common['Authorization'] = "Bearer QN_9mF-sgCvT2DaMQVfytF3q40_LZMaXHERvmWo4WXQ";

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

//welcome.UserName.apps.osecloud.com
//each successfull hit earns 1c$