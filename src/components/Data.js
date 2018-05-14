import { Component } from 'react';
import Firebase from 'firebase';

export class DataAccess extends Component {
  constructor(props) {
    super(props);
	
    this.state = {
      data: null,
	  from: props.from
    };
  }

  componentDidMount() {
    const { from } = this.state;
	
    Firebase.database().ref(from).on('value', (snapshot) =>
      this.setState(() => ({ data: snapshot.val() }))
    );
  }

  render() {
    const { data } = this.state;
	
    return (
	  !!data && data
    );
  }
}
