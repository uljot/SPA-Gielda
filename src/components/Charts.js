import React, { Component } from 'react';
import withAuthorization from './withAuthorization';

import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";

import Checkbox from "./Checkbox";

//var data = <NBPCharts currency ="GBP"/>;

//console.log(data);

var data = [
{
"table":"A",
"currency":"funt szterling",
"code":"GBP",
"rates":[
{"no":"087/A/NBP/2018",
"effectiveDate":"2018-05-07",
"mid":4.8236},
{"no":"088/A/NBP/2018","effectiveDate":"2018-05-08","mid":4.8471},
{"no":"089/A/NBP/2018","effectiveDate":"2018-05-09","mid":4.8894},
{"no":"090/A/NBP/2018","effectiveDate":"2018-05-10","mid":4.8513},
{"no":"091/A/NBP/2018","effectiveDate":"2018-05-11","mid":4.8311},
{"no":"092/A/NBP/2018","effectiveDate":"2018-05-14","mid":4.8314},
{"no":"093/A/NBP/2018","effectiveDate":"2018-05-15","mid":4.8640},
{"no":"094/A/NBP/2018","effectiveDate":"2018-05-16","mid":4.8875},
{"no":"095/A/NBP/2018","effectiveDate":"2018-05-17","mid":4.9093},
{"no":"096/A/NBP/2018","effectiveDate":"2018-05-18","mid":4.9117}]}];

var rate = [];

rate[0] = data[0].code;

  for (var i=0; i<10; i++){
  rate[i+1] = data[0].rates[i].mid;
};

const CHART_DATA = {
  columns: [
    rate,
  ],
  type: "line"
};

class LineChart extends Component {
  render() {
    return <BillboardChart data={CHART_DATA} />;
  }
}

const Charts = () =>
  <div>
    <h1>Wykresy</h1>
    <LineChart/>
    <Checkbox currency = "GBP"/>
    <Checkbox currency = "EUR"/>
  </div>


  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Charts);
