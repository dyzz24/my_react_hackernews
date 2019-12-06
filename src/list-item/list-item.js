import React from 'react';
import { Preloader } from '../preloader/preloader';
import { Link } from "react-router-dom";



export default class ListItem extends React.Component {
  constructor(props) {
    super();

  }


  loadNews = () => {
      this.props.loadNews();
  }

  scoreColor = scope => {
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

  createMarkup = html => {
    return { __html: String(html) };
  };


  render() {
  return (

    <li className="news">
      {this.props.loading ? <Preloader></Preloader> : null}
      {this.props.state.deleted ? <p className = 'news__deleted'>Запись удалена</p>: null}
    <span className="news__title">{this.props.state.title}</span>
    <div className="news__txtwrapper tohover">
      Автор: <span className="news__author">{this.props.state.by}
      </span>
      <Link className = 'news__userlink' to={`/user/${this.props.state.by}`}></Link>
    </div>
    {this.props.state.score > 0 ? (
      <div className="news__txtwrapper">
        Рейтинг:
        <span
          className="news__rate"
          style={{ background: this.scoreColor(this.props.state.score) }}
        >
          {this.props.state.score}
        </span>
      </div>
    ) : null}

    {this.props.state.text ? (
      <span
        className="news__text"
        dangerouslySetInnerHTML={this.createMarkup(this.props.state.text)}
      ></span>
    ) : null}
    {this.props.state.kids && this.props.state.kids.length > 0 ? (
      <div className="news__btnblock" onClick={this.loadNews}>
        
        <span>{this.props.openedState === 'open' ? 'Свернуть' : 'Развернуть'}</span>
        <i className={'icon button ' + this.props.openedState}></i>
      </div>
    ) : null}
    <div className={'news__wrapperState ' + this.props.openedState}>{this.props.kidsView}</div>
  </li>


  );
    }

}

