import React, { useState, useEffect } from 'react';
import './userinfo.css';
import Httpservice from '../httpservice/httpservice';
import { Link, Redirect } from "react-router-dom";

export const Userinfo = (props) => {

  const service = new Httpservice();
  const [userData, setUserData] = useState({});
  const [returned, setReturned] = useState(false);

  useEffect(() =>{
    const userId = props.match.params.id;
    getUserInfo(userId)
  } , [])



 const getUserInfo = (userId) => {
    service
          .getData(
            `https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`
          )
          .then(userInfo => {
          setUserData(userInfo)
          });
  }
  
 const timePipe = (time) => {
    const data = new Date(time * 1000).toUTCString();
    return data;
  }

 const closePopup = (e) => {
    if(e.target.className === 'userpopup') {
      setReturned(true)
    }
  }

 const createMarkup = html => {
    return { __html: String(html) };
  };


  return (

    <div className = 'userpopup' onClick = {e => closePopup(e)}>
    <div className = 'user'>
      <div className = 'user__info'>
        <div className = 'header'>
          <span>Информация о пользователе</span>
          <Link to = '/' className = 'close'></Link>
          {returned ? <Redirect to='/'/> : null}
        </div>
      <div className = 'user__avatar'>
        <div className = 'user__name'>{userData.id}</div>
      </div>
      <div className = 'info__txt'>
        <p>О пользователе:</p>
          <p className = 'maintxt' dangerouslySetInnerHTML={createMarkup(userData.about || 'Не задано')}></p>

          <p>Зарегистрирован:</p>
          <p className = 'maintxt'>{timePipe(userData.created)}</p>

          <p>Репутация:</p>
          <p className = 'maintxt'>{userData.karma}</p>
      </div>
      </div>
    </div>
    </div>


  );

}


