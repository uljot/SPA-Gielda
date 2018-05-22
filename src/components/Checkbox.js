import React, { Component } from 'react'
import axios from 'axios'

class Checkbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currency: this.props.currency,
      rates: [],
      checked: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    if (this.state.checked === false){
      axios.get('http://api.nbp.pl/api/exchangerates/rates/a/' + this.state.currency +'/last/10/?format=json')
        .then(response => this.setState({rates: response.data.rates, checked: true}))

      } else {
        this.setState({rates:[], checked: false})
      }

}
  render () {
    console.log(this.state.rates);
    var data = [];
    data[0] = this.state.currency;
    data[1] = this.state.rates;
    const toChart = data;
    console.log(toChart);

    return (
      <div className='checkbox__container'>
        <input type="checkbox" className='checkbox' onClick = {this.handleClick}/> {this.props.currency}
      </div>
    )
  }
}
export default Checkbox
