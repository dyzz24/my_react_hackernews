import React from 'react';
import './news-list.css';
import Httpservice from '../httpservice/httpservice';

export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: this.props.newsData,
      opened: false,
      kids: [],
    };

    console.log(this.state);
  }
  service = new Httpservice();

  loadNews = () => {
    if (this.state.kids.length === 0) {
      this.state.newsData.kids.forEach(id => {
        this.service
          .getData(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
          .then(news => {
            this.setState(state => ({
              kids: [...state.kids, news],
            }));
            console.log(this.state);
          });
      });

      this.setState({opened: true});
    } else {
      this.setState((state) => ({
        opened: !state.opened
      }));
    }
  };

  createMarkup = html => {
    return { __html: String(html) };
  };

  render() {
    const kidsView = this.state.kids.map(kids => (
      <NewsList key={kids.id} newsData={kids}>
        {' '}
      </NewsList>
    ));

    const state = this.state.newsData;
    const openedState = this.state.opened;

    return (
      <ul>
        <li className="news">
          <span className="news__title">{state.title}</span>
          <span className="news__author">{state.by}</span>

          {state.text ? (
            <span
              className="news__text"
              dangerouslySetInnerHTML={this.createMarkup(state.text)}
            ></span>
          ) : null}
          {state.kids && state.kids.length > 0 ? (
            <button onClick={this.loadNews}>Открыть</button>
          ) : null}

          {(kidsView.length > 0 && openedState) ? kidsView : null}
        </li>
      </ul>
    );
  }
}
