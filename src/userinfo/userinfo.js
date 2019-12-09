import React from 'react';
import './userinfo.css';
import Httpservice from '../httpservice/httpservice';
import { Link } from "react-router-dom";

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

  closePopup = () => {
    console.log(this.props.navigation);
  }

  createMarkup = html => {
    return { __html: String(html) };
  };


  render() {
  return (

    <div className = 'userpopup' onClick = {this.closePopup}>
    <div className = 'user'>
      <div className = 'user__info'>
        <div className = 'header'>
          <span>Информация о пользователе</span>
         
          <Link to = '/' className = 'close'></Link>
        </div>
      <div className = 'user__avatar'>
        <div className = 'user__name'>{this.state.userData.id}</div>
      </div>
      <div className = 'info__txt'>
        <p>О пользователе:</p>
          <p className = 'maintxt' dangerouslySetInnerHTML={this.createMarkup(this.state.text || 'Не задано')}></p>

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

