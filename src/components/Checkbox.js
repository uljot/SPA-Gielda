import React, { Component } from 'react'
import axios from 'axios'
import Firebase from 'firebase'

class Checkbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currency: this.props.currency,
      rates: [],
      dates: [],
      checked: false,
      data: null
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    Firebase.database().ref("rates").orderByKey().limitToLast(10).on('value', (snapshot) =>
    {
      let labels =[
        'DATA',
      ]
      labels =  labels.concat(Object.keys(snapshot.val()))

    let values = []

    for(let date in   snapshot.val()){
      for(let currency in   snapshot.val()[date]){
        if(!values[currency])
          values[currency] = []
        values[currency].push(snapshot.val()[date][currency].mid)
      }
    }
console.log(values)
      this.setState((prevState, props) => {
        return {
          currency: prevState.currency,
          rates: prevState.rates,
          dates: prevState.dates,
          checked: prevState.checked,
          data: values
        };
      })
    });
  }

  handleClick () {
    if (this.state.checked === false){
      this.state.data[this.props.currency]
      this.setState((prevState, props) => {
        return {
          currency: prevState.currency,
          rates: prevState.rates,
          dates: prevState.dates,
          checked: true,
          data: prevState.data
        };})

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
