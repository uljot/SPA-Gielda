import { Component } from 'react';
import Firebase from 'firebase';
import axios from 'axios';

class NBPFetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nbpA: null,
      nbpC: null
    };
  }

  componentDidMount() {
    const { date } = this.props;
    axios.get("http://api.nbp.pl/api/exchangerates/tables/A/" + date + "/?format=json")
      .then(response => {
        const nbpA = response.data;
        this.setState({ nbpA });
      });
    axios.get("http://api.nbp.pl/api/exchangerates/tables/C/" + date + "/?format=json")
      .then(response => {
        const nbpC = response.data;
        this.setState({ nbpC });
      });
  }

  render() {
    const { nbpA } = this.state;
    const { nbpC } = this.state;
    
    if(nbpA && nbpC) {
      var parseC = nbpC[0].rates.reduce(function (result, item) {
        result[item.code] = result[item.code] || [];
        result[item.code].currency = item.currency;
        result[item.code].bid = item.bid;
        result[item.code].ask = item.ask;
        return result;
      }, {});
      
      var mergeWithA = nbpA[0].rates.reduce(function (result, item) {
        result[item.code] = result[item.code] || [];
        result[item.code].currency = item.currency;
        result[item.code].mid = item.mid;
        result[item.code].bid = parseC[item.code] ? parseC[item.code].bid : null;
        result[item.code].ask = parseC[item.code] ? parseC[item.code].ask : null;
        return result;
      }, {});
      Firebase.database().ref("rates/" + nbpC[0].effectiveDate).set(mergeWithA);
    }
    
    return (
      null
    );
  }
}

export default NBPFetch;
