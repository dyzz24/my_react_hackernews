import React from 'react';
import './news-list.css';
import Httpservice from '../httpservice/httpservice';
import ListItem from '../list-item/list-item';
import { Preloader } from '../preloader/preloader';

export default class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: this.props.newsData,
      opened: false,
      kids: [],
      loading: false
    };

    console.log(this.state);
  }
  service = new Httpservice();

  loadNews = () => {
    if (this.state.kids.length === 0) {
      // * enable preloader*/
      this.setState({ loading: true });
      let counter = 0;
      this.state.newsData.kids.forEach((id, index, arr) => {
        this.service
          .getData(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
          .then(news => {
            counter = counter + 1;
            this.setState(state => ({
              kids: [...state.kids, news]
            }));
            // * грузанули все новости*/
            if (arr.length === counter) {
              this.setState({ loading: false });
            }
          });
      });

      this.setState({ opened: true });
    } else {
      this.setState(state => ({
        opened: !state.opened
      }));
    }
  };

  render() {
    const kidsView = this.state.kids

      .filter(kids => kids) // * need for not-null objects (else crash) */
      .map(kids => <NewsList key={kids.id} newsData={kids}></NewsList>);

    const state = this.state.newsData;
    const openedState = this.state.opened ? 'open' : 'close';

    return (
      <ul>

        {this.state.loading ? (
          <Preloader></Preloader>
        ) : (
          <ListItem
            state={state}
            openedState={openedState}
            kidsView={kidsView}
            loadNews={this.loadNews}
            loading = {this.state.loading}
          ></ListItem>
        )}
      </ul>
    );
  }
}
