import React, { Component } from 'react';
import withAuthorization from './withAuthorization';

import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";

const CHART_DATA = {
  columns: [
    ["data1", 30, 20, 50, 40, 60, 50],
    ["data2", 200, 130, 90, 240, 130, 220],
    ["data3", 300, 200, 160, 400, 250, 250]
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
  </div>

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(Charts);
