import React from 'react';
import { Preloader } from '../preloader/preloader';
import { Link } from 'react-router-dom';

const ListItem = props => {
  const loadNews = () => {
    props.loadNews();
  };

  const scoreColor = scope => {
    let scopeColor = '';
    if (scope <= 100) {
      scopeColor = '#90f854';
    }

    if (scope <= 200 && scope > 100) {
      scopeColor = '#f3d738';
    }

    if (scope > 200) {
      scopeColor = ' #ff4646';
    }
    return scopeColor;
  };

  const createMarkup = html => {
    return { __html: String(html) };
  };

  const showAuthor = () => {
    return (
      <div className='news__txtwrapper tohover'>
        Автор: <span className='news__author'>{props.state.by}</span>
        <Link className='news__userlink' to={`/user/${props.state.by}`}></Link>
      </div>
    );
  };

  const showPreloadDeleteArticle = () => {
    if (props.loading) {
      return <Preloader></Preloader>;
    } else if (props.state.deleted) {
      return <p className='news__deleted'>Запись удалена</p>;
    }
  };

  const showScope = () => {
    if (props.state.score > 0) {
      return (
        <div className='news__txtwrapper'>
          Рейтинг:
          <span
            className='news__rate'
            style={{ background: scoreColor(props.state.score) }}
          >
            {props.state.score}
          </span>
        </div>
      );
    }
  };

  const showText = () => {
    if(props.state.text) {
        return(<span
          className='news__text'
          dangerouslySetInnerHTML={createMarkup(props.state.text)}
        ></span>)
    }
  }

  const showKids = () => {
    if(props.state.kids && props.state.kids.length > 0) {
      return (<div className='news__btnblock' onClick={loadNews}>
      <span>
        {props.openedState === 'open' ? 'Свернуть' : 'Развернуть'}
      </span>
      <i className={'icon button ' + props.openedState}></i>
    </div>)
    }
  }

  return (
    <li className='news'>
      {showPreloadDeleteArticle()}
      <span className='news__title'>{props.state.title}</span>
      {showAuthor()}
      {showScope()}
      {showText()}
      {showKids()}
      <div className={'news__wrapperState ' + props.openedState}>
        {props.kidsView}
      </div>
    </li>
  );
};

export default ListItem;
