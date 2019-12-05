import React from 'react';
import './hackernews.css';
import Httpservice from '../httpservice/httpservice';
import NewsList from '../news-list/news-list';
import { Preloader } from '../preloader/preloader';


export default class Hackernews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allStorieIdsArray: [],
      visibleNewIdsArray: [],
      visibleNewsArray: [],
      load:false
    };
  }

  service = new Httpservice();

  /**
   * первичный запрос списка новостей, точнее их id
   */
  componentDidMount() {
    this.service.getData('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then(allNewsArray => {
      this.setFirstNewsData(allNewsArray)
      console.log(this.state);
    })
  }

  setFirstNewsData(responseArray) {
    this.setState(state => ({
      allStorieIdsArray: [...responseArray],
      visibleNewIdsArray: responseArray.splice(0, 10),  // * первые 10 новостей, для превьюшки
      load: true
    }));

    if (this.state.visibleNewIdsArray.length > 0) {
        this.loadNews(this.state.visibleNewIdsArray)
    }
  }

  loadNews(newsIdArray) {
    newsIdArray.forEach(id => {
      this.service.getData(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(fullNews => {
      this.setState(state => ({
        visibleNewsArray: [...state.visibleNewsArray, fullNews]
      }));
      console.log(this.state);
    })
    })
  }

  getVisibleNews() {
    this.state.visibleNewIdsArray.forEach(vId => {

    });
    this.service.getData()
  }

  newsCreate() {
    const newsList = this.state.visibleNewsArray.map(news => (

      <NewsList key = {news.id} newsData = {news} ></NewsList>
    ));

    return newsList;
  }

  render() {
    const newsList = this.newsCreate();
    return (
      <div className = 'wrapper'>
        {this.state.load ? newsList : <Preloader></Preloader>}

      </div>
    )
  }




}

