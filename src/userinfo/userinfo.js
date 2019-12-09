import React from 'react';
import './userinfo.css';
import Httpservice from '../httpservice/httpservice';
import { Link, Redirect } from "react-router-dom";

export class Userinfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {userData: {}, return: false}

  }

  service = new Httpservice();

  componentDidMount() {
    // const test = this.match;
    const userId = this.props.match.params.id;
    this.getUserInfo(userId)
  }

  getUserInfo(userId) {
    this.service
          .getData(
            `https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`
          )
          .then(userInfo => {
          this.setState({userData: userInfo});
          });
  }
  
  timePipe = (time) => {
    const data = new Date(time * 1000).toUTCString();
    return data;
  }

  closePopup = (e) => {
    if(e.target.className === 'userpopup') {
      this.setState({return: true})
    }
  }

  createMarkup = html => {
    return { __html: String(html) };
  };


  render() {
  return (

    <div className = 'userpopup' onClick = {e => this.closePopup(e)}>
    <div className = 'user'>
      <div className = 'user__info'>
        <div className = 'header'>
          <span>Информация о пользователе</span>
          <Link to = '/' className = 'close'></Link>
          {this.state.return ? <Redirect to='/'/> : null}
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

