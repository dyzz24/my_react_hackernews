import React from 'react';
import './userinfo.css';
import Httpservice from '../httpservice/httpservice';


export class Userinfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {userData: {}}

  }

  service = new Httpservice();

  componentDidMount() {
    // const test = this.match;
    const userId = this.props.match.params.id;
    this.getUserInfo(userId)
    console.log(userId)
  }

  getUserInfo(userId) {
    this.service
          .getData(
            `https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`
          )
          .then(userInfo => {console.log(userInfo)
          this.setState({userData: userInfo});
          });
  }
  
  timePipe = (time) => {
    const data = new Date(time * 1000).toUTCString();
    return data;
  }


  render() {
  return (

    <div className = 'userpopup'>
    <div className = 'user'>
      <div className = 'user__info'>
        <div className = 'header'></div>
      <div className = 'user__avatar'>
        <div className = 'user__name'>{this.state.userData.id}</div>
      </div>
      <div className = 'info__txt'>
        <p>О пользователе:</p>
          <p className = 'maintxt'>{this.state.userData.about}</p>

          <p>Зарегистрирован:</p>
          <p className = 'maintxt'>{this.timePipe(this.state.userData.created)}</p>

          <p>Репутация:</p>
          <p className = 'maintxt'>{this.state.userData.karma}</p>
      </div>
      </div>
    </div>
    </div>


  );
  }




}

