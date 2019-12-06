import React from 'react';
import './userinfo.css'

export class Userinfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}

  }

  componentDidMount() {
    // const test = this.match;
    const userId = this.props.match.params.id;
    console.log(userId)
  }


  render() {
  return (

    <div className = 'userpopup'>
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>


  );
  }




}

